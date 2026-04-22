const fs = require('fs');

const files = [
  'app/page.tsx', 
  'app/dashboard/trips/page.tsx', 
  'app/dashboard/trips/[id]/page.tsx'
];

const LOCAL_POOLS = {
    'MUMBAI': ['/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/mum%203.jpg', '/images/catalog/mum%204.jpg', '/images/catalog/mum%205.jpg', '/images/catalog/mum%206.jpg', '/images/catalog/mum%207.jpg'],
    'MATHERAN': ['/images/catalog/mat%201.jpg', '/images/catalog/mat%203.jpg', '/images/catalog/mat%204.jpg', '/images/catalog/mat%205.jpg', '/images/catalog/mat%206.jpg', '/images/catalog/mat%207.jpg', '/images/catalog/mat%209.jpg', '/images/catalog/mat%2010.jpg', '/images/catalog/mat.jpg'],
    'RAJASTHAN': ['/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg', '/images/catalog/raj%203.jpg', '/images/catalog/raj%204.jpg', '/images/catalog/raj%206.jpg', '/images/catalog/raj%207.jpg', '/images/catalog/raj%208.jpg', '/images/catalog/raj%2010.jpg'],
    'PUNJAB': ['/images/catalog/amr%201.jpg', '/images/catalog/amr%202.jpg', '/images/catalog/amr%203.jpg', '/images/catalog/amr%204.jpg', '/images/catalog/amr%205.jpg', '/images/catalog/amr%206.jpg'],
    'CHENNAI': ['/images/catalog/chn%201.jpg', '/images/catalog/chn%202.jpg', '/images/catalog/chn%203.jpg', '/images/catalog/chn%204.jpg'],
    'DELHI': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/del%203.jpg', '/images/catalog/del%204.jpg', '/images/catalog/del%205.jpg'],
    'KASOL': ['/images/catalog/ksl%201.jpg', '/images/catalog/ksl%202.jpg', '/images/catalog/ksl%203.jpg', '/images/catalog/ksl%204.jpg'],
    'MANALI': ['/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg', '/images/catalog/man%203.jpg', '/images/catalog/man%204.jpg', '/images/catalog/man%205.jpg', '/images/catalog/man%206.jpg', '/images/catalog/man%207.jpg', '/images/catalog/man%208.jpg', '/images/catalog/man%209.jpg', '/images/catalog/man%2010.jpg', '/images/catalog/man%2011.jpg'],
};
LOCAL_POOLS['AGRA'] = LOCAL_POOLS['DELHI'].slice(0, 3).concat(LOCAL_POOLS['RAJASTHAN'].slice(0, 2));
LOCAL_POOLS['NORTH'] = LOCAL_POOLS['DELHI'].concat(LOCAL_POOLS['MANALI'].slice(0, 3));
LOCAL_POOLS['SOUTH'] = LOCAL_POOLS['CHENNAI'];
LOCAL_POOLS['KERALA'] = LOCAL_POOLS['CHENNAI']; 
LOCAL_POOLS['GOA'] = LOCAL_POOLS['MUMBAI'].slice(0, 3); 
LOCAL_POOLS['HIMACHAL'] = LOCAL_POOLS['MANALI'];
LOCAL_POOLS['KASHMIR'] = LOCAL_POOLS['MANALI'].slice(0, 3);
LOCAL_POOLS['ANDAMAN'] = LOCAL_POOLS['CHENNAI'].slice(0, 2);
LOCAL_POOLS['DEFAULT'] = [...LOCAL_POOLS['DELHI'].slice(0,2), ...LOCAL_POOLS['RAJASTHAN'].slice(0,2), ...LOCAL_POOLS['MUMBAI'].slice(0,2), ...LOCAL_POOLS['MANALI'].slice(0,2)];

LOCAL_POOLS['DUBAI'] = LOCAL_POOLS['DEFAULT'];
LOCAL_POOLS['BALI'] = LOCAL_POOLS['DEFAULT'];
LOCAL_POOLS['MALDIVES'] = LOCAL_POOLS['DEFAULT'];
LOCAL_POOLS['THAI'] = LOCAL_POOLS['DEFAULT'];
LOCAL_POOLS['EUROPE'] = LOCAL_POOLS['DEFAULT'];
LOCAL_POOLS['VIETNAM'] = LOCAL_POOLS['DEFAULT'];
LOCAL_POOLS['SINGAPORE'] = LOCAL_POOLS['DEFAULT'];

let newRegionImagesObj = 'const REGION_IMAGES: Record<string, string[]> = {\n';
for (const [key, val] of Object.entries(LOCAL_POOLS)) {
   newRegionImagesObj += `    '${key}': [\n        '${val.join("',\n        '")}'\n    ],\n`;
}
newRegionImagesObj += '};';

for (let f of files) {
   let content = fs.readFileSync(f, 'utf-8');
   
   if (content.includes('REGION_IMAGES')) {
       content = content.replace(/const REGION_IMAGES: Record<string, string\[\]> = \{[\s\S]*?\};/g, newRegionImagesObj);
   }

   if (f.includes('dashboard/trips/page.tsx')) {
       if (!content.includes(`includes('NORTH')`)) {
           content = content.replace(/else if \(text\.includes\('DELHI'\)\) category = 'DELHI';/g, 
           "else if (text.includes('DELHI')) category = 'DELHI';\n        else if (text.includes('NORTH')) category = 'NORTH';\n        else if (text.includes('AGR')) category = 'NORTH';");
       }
   }
   
   if (f.includes('app/page.tsx')) {
        if (!content.includes(`includes('AGR')) category = 'NORTH'`)) {
           content = content.replace(/else if \(text\.includes\('NORTH'\)\) category = 'NORTH';/g, 
           "else if (text.includes('NORTH')) category = 'NORTH';\n        else if (text.includes('AGR')) category = 'NORTH';");
       }
   }

   if (f.includes('[id]/page.tsx')) {
       content = content.replace(/https:\/\/images\.unsplash\.com\/photo-1501785888041-af3ef285b470/g, '/images/catalog/del%201.jpg');
   }

   fs.writeFileSync(f, content);
}
console.log('Replaced successfully');
