const fs = require('fs');
const zlib = require('zlib');

// Try to find the blob hash for index.html in the git index
const indexBuf = fs.readFileSync('.git/index');
// The index format: DIRC, version(4), entries count(4)
const entriesCount = indexBuf.readUInt32BE(8);

let offset = 12;
let foundHash = null;

for (let i = 0; i < entriesCount; i++) {
  const ctimeSec = indexBuf.readUInt32BE(offset); offset += 8;
  const mtimeSec = indexBuf.readUInt32BE(offset); offset += 8;
  const dev = indexBuf.readUInt32BE(offset); offset += 4;
  const ino = indexBuf.readUInt32BE(offset); offset += 4;
  const mode = indexBuf.readUInt32BE(offset); offset += 4;
  const uid = indexBuf.readUInt32BE(offset); offset += 4;
  const gid = indexBuf.readUInt32BE(offset); offset += 4;
  const size = indexBuf.readUInt32BE(offset); offset += 4;
  
  const hash = indexBuf.slice(offset, offset + 20).toString('hex'); offset += 20;
  const flags = indexBuf.readUInt16BE(offset); offset += 2;
  const nameLen = flags & 0x0FFF;
  
  let name = '';
  if (nameLen < 0xFFF) {
      name = indexBuf.slice(offset, offset + nameLen).toString('utf8');
      offset += nameLen;
  } else {
      // Find null terminator
      let nameEnd = offset;
      while(indexBuf[nameEnd] !== 0) nameEnd++;
      name = indexBuf.slice(offset, nameEnd).toString('utf8');
      offset = nameEnd;
  }
  
  // Padding
  const pad = 8 - ((offset - 12) % 8);
  offset += pad;

  if (name === 'index.html') {
      foundHash = hash;
      break;
  }
}

if (foundHash) {
    console.log('Found index.html hash: ' + foundHash);
    const dir = foundHash.substring(0, 2);
    const file = foundHash.substring(2);
    const objPath = `.git/objects/${dir}/${file}`;
    if (fs.existsSync(objPath)) {
        const compressed = fs.readFileSync(objPath);
        const decompressed = zlib.inflateSync(compressed);
        
        // Find the null byte that separates header from content
        const nullIdx = decompressed.indexOf(0);
        const content = decompressed.slice(nullIdx + 1).toString('utf8');
        fs.writeFileSync('index.html', content);
        console.log('Restored index.html from git objects!');
    } else {
        console.log('Object file not found: ' + objPath);
    }
} else {
    console.log('index.html not found in git index');
}
