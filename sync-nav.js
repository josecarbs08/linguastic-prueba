const fs = require('fs');

try {
  const indexHtml = fs.readFileSync('index.html', 'utf8');

  // Extract Tailwind config
  const twStart = indexHtml.indexOf('<script id="tailwind-config">');
  const twEnd = indexHtml.indexOf('</script>', twStart) + 9;
  const tailwindConfig = indexHtml.slice(twStart, twEnd);
  console.log("Found Tailwind Config length:", tailwindConfig.length);

  // Extract ALL style blocks from index.html (main <style> + any extra <style id="..."> blocks)
  // We want everything from the first <style> to the last </style> before </head>
  const headEnd = indexHtml.indexOf('</head>');
  const styleStart = indexHtml.indexOf('<style>');
  // Find the last </style> before </head>
  let lastStyleEnd = -1;
  let searchPos = styleStart;
  while (searchPos < headEnd) {
    const nextEnd = indexHtml.indexOf('</style>', searchPos);
    if (nextEnd === -1 || nextEnd >= headEnd) break;
    lastStyleEnd = nextEnd + 8;
    searchPos = nextEnd + 8;
  }
  const allStyleBlocks = indexHtml.slice(styleStart, lastStyleEnd);
  console.log("Found ALL Styles length:", allStyleBlocks.length);

  // Extract Nav
  const navStart = indexHtml.indexOf('<nav');
  const navEnd = indexHtml.indexOf('</nav>') + 6;
  let navBlock = indexHtml.slice(navStart, navEnd);
  console.log("Found Nav length:", navBlock.length);

  // Extract Mobile Menu (from after </nav> to <main)
  const mobileMenuStart = indexHtml.indexOf('<!-- Mobile Menu Overlay -->', navEnd);
  const mainStart = indexHtml.indexOf('<main', mobileMenuStart);
  let mobileMenu = '';
  if (mobileMenuStart !== -1 && mainStart !== -1) {
    mobileMenu = indexHtml.slice(mobileMenuStart, mainStart).trim();
    console.log("Found Mobile Menu length:", mobileMenu.length);
  }

  // Convert internal anchors to point to index.html
  navBlock = navBlock.replace(/href=\"#([^\"]+)\"/g, 'href="index.html#$1"');
  if (mobileMenu) {
    mobileMenu = mobileMenu.replace(/href=\"#([^\"]+)\"/g, 'href="index.html#$1"');
  }

  // Extract Footer
  const footerStart = indexHtml.indexOf('<footer');
  let footerBlock = '';
  if (footerStart !== -1) {
    const footerEnd = indexHtml.indexOf('</footer>', footerStart) + 9;
    footerBlock = indexHtml.slice(footerStart, footerEnd);
    footerBlock = footerBlock.replace(/href=\"#([^\"]+)\"/g, 'href="index.html#$1"');
    console.log("Found Footer length:", footerBlock.length);
  }

  const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== 'index.html' && f !== 'index_orig.html');

  for(let file of files) {
    let content = fs.readFileSync(file, 'utf8');

    // Replace Tailwind Config
    const fTwStart = content.indexOf('<script id="tailwind-config">');
    if(fTwStart !== -1) {
      const fTwEnd = content.indexOf('</script>', fTwStart) + 9;
      content = content.slice(0, fTwStart) + tailwindConfig + content.slice(fTwEnd);
    } else {
      content = content.replace('</head>', tailwindConfig + '\n</head>');
    }

    // Replace ALL style blocks: remove any existing <style> blocks (except those marked as page-specific)
    const fHeadEnd = content.indexOf('</head>');
    let headPart = content.slice(0, fHeadEnd);
    
    // Remove all style blocks UNLESS they have data-page-specific
    const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/g;
    headPart = headPart.replace(styleRegex, (match) => {
      if (match.includes('data-page-specific')) return match;
      return '';
    });
    
    // Re-inject our unified style blocks from index.html
    content = headPart + '\n' + allStyleBlocks + '\n' + content.slice(fHeadEnd);


    // Replace Nav
    const fNavStart = content.indexOf('<nav');
    if(fNavStart !== -1) {
      const fNavEnd = content.indexOf('</nav>', fNavStart) + 6;
      content = content.slice(0, fNavStart) + navBlock + content.slice(fNavEnd);
    } else {
      content = content.replace(/<body[^>]*>/i, match => match + '\n' + navBlock);
    }

    // Replace Mobile Menu
    if (mobileMenu) {
      const fMobileStart = content.indexOf('<!-- Mobile Menu Overlay -->');
      if (fMobileStart !== -1) {
        // Find the end of the mobile menu div (it ends with </div> before <main)
        const fMainStart = content.indexOf('<main', fMobileStart);
        if (fMainStart !== -1) {
          content = content.slice(0, fMobileStart) + mobileMenu + '\n\n' + content.slice(fMainStart);
        }
      }
    }

    // Replace Footer
    if (footerBlock) {
      const fFooterStart = content.indexOf('<footer');
      if (fFooterStart !== -1) {
        const fFooterEnd = content.indexOf('</footer>', fFooterStart) + 9;
        content = content.slice(0, fFooterStart) + footerBlock + content.slice(fFooterEnd);
      }
    }

    // Ensure app-ui.js is included
    if (!content.includes('js/app-ui.js')) {
      content = content.replace('</body>', '    <script src="js/app-ui.js"></script>\n    <script>\n      if (window.AppUI) { window.appUiInstance = new window.AppUI(); }\n    </script>\n</body>');
    }

    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
} catch(e) {
  console.error(e);
}
