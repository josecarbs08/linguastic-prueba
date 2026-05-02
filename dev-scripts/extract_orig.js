const fs = require('fs');
const zlib = require('zlib');

const indexBuf = fs.readFileSync('.git/index');
const entriesCount = indexBuf.readUInt32BE(8);

let offset = 12;
let foundHash = null;

for (let i = 0; i < entriesCount; i++) {
  offset += 40;
  const hash = indexBuf.slice(offset, offset + 20).toString('hex'); offset += 20;
  const flags = indexBuf.readUInt16BE(offset); offset += 2;
  const nameLen = flags & 0x0FFF;
  
  let name = '';
  if (nameLen < 0xFFF) {
      name = indexBuf.slice(offset, offset + nameLen).toString('utf8');
      offset += nameLen;
  } else {
      let nameEnd = offset;
      while(indexBuf[nameEnd] !== 0) nameEnd++;
      name = indexBuf.slice(offset, nameEnd).toString('utf8');
      offset = nameEnd;
  }
  const pad = 8 - ((offset - 12) % 8);
  offset += pad;

  if (name === 'index.html') {
      foundHash = hash;
      break;
  }
}

if (foundHash) {
    const dir = foundHash.substring(0, 2);
    const file = foundHash.substring(2);
    const objPath = `.git/objects/${dir}/${file}`;
    if (fs.existsSync(objPath)) {
        const decompressed = zlib.inflateSync(fs.readFileSync(objPath));
        const nullIdx = decompressed.indexOf(0);
        const content = decompressed.slice(nullIdx + 1).toString('utf8');
        fs.writeFileSync('index_orig.html', content);
        console.log('Restored index_orig.html!');
    }
}
