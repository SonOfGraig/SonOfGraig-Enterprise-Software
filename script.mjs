import fs from 'fs';

const chunk = fs.readFileSync('.next/static/chunks/app/(public)/popia/page.js', 'utf8');
const match = chunk.match(/sourceMappingURL=data:application\/json;charset=utf-8;base64,([^"]+)"/);
if (match) {
    const base64 = match[1];
    const sourceMap = JSON.parse(Buffer.from(base64, 'base64').toString('utf8'));
    
    for (let i = 0; i < sourceMap.sources.length; i++) {
        if (sourceMap.sources[i].includes('popia/page.tsx')) {
            console.log("FOUND SOURCE");
            fs.writeFileSync('app/(public)/popia/page.tsx', sourceMap.sourcesContent[i]);
        }
        if (sourceMap.sources[i].includes('popia/popia.css')) {
            console.log("FOUND CSS");
            fs.writeFileSync('app/(public)/popia/popia.css', sourceMap.sourcesContent[i]);
        }
    }
} else {
    console.log("No source map");
}
