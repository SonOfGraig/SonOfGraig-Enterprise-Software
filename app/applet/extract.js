const fs = require('fs');

const chunk = fs.readFileSync('/app/applet/.next/static/chunks/app/(public)/popia/page.js', 'utf8');

// Find the base64 source map in the eval string
const match = chunk.match(/sourceMappingURL=data:application\/json;charset=utf-8;base64,([^"]+)"/);
if (match) {
    const base64 = match[1];
    const sourceMap = JSON.parse(Buffer.from(base64, 'base64').toString('utf8'));
    
    // sourceMap.sources contains the filenames
    // sourceMap.sourcesContent contains the original source
    
    for (let i = 0; i < sourceMap.sources.length; i++) {
        if (sourceMap.sources[i].includes('popia/page.tsx')) {
            console.log("FOUND SOURCE:");
            // write it to a file so we can view it
            fs.writeFileSync('/tmp/original_page.tsx', sourceMap.sourcesContent[i]);
            console.log("Wrote /tmp/original_page.tsx");
        }
    }
} else {
    console.log("No source map found");
}
