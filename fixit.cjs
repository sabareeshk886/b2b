const fs = require('fs');

const localPoolsStr = `    'MUMBAI': ['/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/mum%203.jpg', '/images/catalog/mum%204.jpg', '/images/catalog/mum%205.jpg', '/images/catalog/mum%206.jpg', '/images/catalog/mum%207.jpg'],
    'MATHERAN': ['/images/catalog/mat%201.jpg', '/images/catalog/mat%203.jpg', '/images/catalog/mat%204.jpg', '/images/catalog/mat%205.jpg', '/images/catalog/mat%206.jpg', '/images/catalog/mat%207.jpg', '/images/catalog/mat%209.jpg', '/images/catalog/mat%2010.jpg', '/images/catalog/mat.jpg'],
    'AGRA': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/del%203.jpg', '/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg'],
    'RAJASTHAN': ['/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg', '/images/catalog/raj%203.jpg', '/images/catalog/raj%204.jpg', '/images/catalog/raj%206.jpg', '/images/catalog/raj%207.jpg', '/images/catalog/raj%208.jpg', '/images/catalog/raj%2010.jpg'],
    'PUNJAB': ['/images/catalog/amr%201.jpg', '/images/catalog/amr%202.jpg', '/images/catalog/amr%203.jpg', '/images/catalog/amr%204.jpg', '/images/catalog/amr%205.jpg', '/images/catalog/amr%206.jpg'],
    'CHENNAI': ['/images/catalog/chn%201.jpg', '/images/catalog/chn%202.jpg', '/images/catalog/chn%203.jpg', '/images/catalog/chn%204.jpg'],
    'DELHI': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/del%203.jpg', '/images/catalog/del%204.jpg', '/images/catalog/del%205.jpg'],
    'KASOL': ['/images/catalog/ksl%201.jpg', '/images/catalog/ksl%202.jpg', '/images/catalog/ksl%203.jpg', '/images/catalog/ksl%204.jpg'],
    'MANALI': ['/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg', '/images/catalog/man%203.jpg', '/images/catalog/man%204.jpg', '/images/catalog/man%205.jpg', '/images/catalog/man%206.jpg', '/images/catalog/man%207.jpg', '/images/catalog/man%208.jpg', '/images/catalog/man%209.jpg', '/images/catalog/man%2010.jpg', '/images/catalog/man%2011.jpg'],
    'KERALA': ['/images/catalog/chn%201.jpg', '/images/catalog/chn%202.jpg', '/images/catalog/chn%203.jpg', '/images/catalog/chn%204.jpg'],
    'HIMACHAL': ['/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg', '/images/catalog/man%203.jpg', '/images/catalog/man%204.jpg'],
    'KASHMIR': ['/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg', '/images/catalog/man%203.jpg'],
    'ANDAMAN': ['/images/catalog/chn%201.jpg', '/images/catalog/chn%202.jpg'],
    'SOUTH': ['/images/catalog/chn%201.jpg', '/images/catalog/chn%202.jpg', '/images/catalog/chn%203.jpg', '/images/catalog/chn%204.jpg'],
    'GOA': ['/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/mum%203.jpg'],
    'NORTH': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/del%203.jpg', '/images/catalog/del%204.jpg', '/images/catalog/del%205.jpg', '/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg', '/images/catalog/man%203.jpg'],
    'DUBAI': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg', '/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg'],
    'BALI': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg', '/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg'],
    'MALDIVES': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg', '/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg'],
    'THAI': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg', '/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg'],
    'EUROPE': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg', '/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg'],
    'VIETNAM': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg', '/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg'],
    'SINGAPORE': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg', '/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg'],
    'DEFAULT': ['/images/catalog/del%201.jpg', '/images/catalog/del%202.jpg', '/images/catalog/raj%201.jpg', '/images/catalog/raj%202.jpg', '/images/catalog/mum%201.jpg', '/images/catalog/mum%202.jpg', '/images/catalog/man%201.jpg', '/images/catalog/man%202.jpg'],
`;

const premiumButtonStr = `                        {/* More Button */}
                        <div className="mt-20 text-center">
                            <Link href="/login">
                                <button className="group relative px-8 py-4 font-bold text-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,106,78,0.3)] hover:-translate-y-1">
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#006A4E] to-[#004d38] transition-transform duration-300 group-hover:scale-105"></div>
                                    <div className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent transition-opacity duration-300"></div>
                                    <span className="relative flex items-center justify-center text-lg tracking-wide">
                                        Explore All Packages
                                        <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </span>
                                </button>
                            </Link>
                        </div>`;

const premiumSectionStr = `                {/* Benefits Section - Premium Redesign */}
                <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-gray-50/50">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#006A4E] via-transparent to-transparent pointer-events-none"></div>
                    <div className="container mx-auto px-6 md:px-12 relative z-10">
                        <div className="text-center max-w-2xl mx-auto mb-16">
                            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                                The Fernway Advantage
                            </h2>
                            <p className="text-lg text-gray-500">
                                Elevate your travel business with tools and pricing designed strictly for industry professionals.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_40px_rgb(0,106,78,0.08)] hover:-translate-y-2 transition-all duration-300">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#006A4E]/10 to-[#006A4E]/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Percent className="w-8 h-8 text-[#006A4E]" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-[#006A4E] transition-colors">Best Wholesale Rates</h3>
                                <p className="text-gray-500 leading-relaxed text-lg">Save up to 30% compared to retail prices. Our massive volume allows us to offer unmatched pricing specifically for B2B partners.</p>
                            </div>

                            <div className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_40px_rgb(0,106,78,0.08)] hover:-translate-y-2 transition-all duration-300">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/10 to-blue-500/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Palette className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">White-Label Branding</h3>
                                <p className="text-gray-500 leading-relaxed text-lg">Generate stunning, professional brochures and itineraries with your company logo and custom branding in seconds.</p>
                            </div>

                            <div className="group p-8 rounded-3xl bg-white border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_8px_40px_rgb(0,106,78,0.08)] hover:-translate-y-2 transition-all duration-300">
                                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <Headset className="w-8 h-8 text-purple-600" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-purple-600 transition-colors">24/7 Premium Support</h3>
                                <p className="text-gray-500 leading-relaxed text-lg">Dedicated account managers and operations team available around the clock to ensure your clients have a flawless experience.</p>
                            </div>
                        </div>
                    </div>
                </section>`;

try {
    let p = fs.readFileSync('app/page.tsx', 'utf-8');
    p = p.replace(/import \{ ArrowRight, Globe \} from 'lucide-react';/, "import { ArrowRight, Globe, Percent, Palette, Headset } from 'lucide-react';");
    p = p.replace(/const REGION_IMAGES: Record<string, string\[\]> = \{[\s\S]*?\n    \};\n/m, "const REGION_IMAGES: Record<string, string[]> = {\n" + localPoolsStr + "};\n");
    let replacedP = false;
    p = p.replace(/const hash = seedStr\.split\(''\)\.reduce\(\(acc: number, char: string\) => acc \+ char\.charCodeAt\(0\), 0\);/g, () => { replacedP = true; return "const hashVal = seedStr.split('').reduce((acc: number, char: string) => (((acc << 5) - acc) + char.charCodeAt(0)) | 0, 0);\n        const hash = Math.abs(hashVal);"; });
    if (!p.includes("else if (text.includes('NORTH')) category = 'NORTH';")) {
       p = p.replace(/else if \(text\.includes\('DELHI'\)\) category = 'DELHI';/, "else if (text.includes('DELHI')) category = 'DELHI';\n        else if (text.includes('NORTH')) category = 'NORTH';\n        else if (text.includes('AGR')) category = 'NORTH';");
    }
    p = p.replace(/\{\/\* More Button like Airbnb \"Show more\" \*\/\}[\s\S]*?<\/div>\n                    <\/div>\n                <\/section>/m, premiumButtonStr + "\n                    </div>\n                </section>");
    p = p.replace(/\{\/\* Benefits Section - Airbnb style \(Minimal\) \*\/\}[\s\S]*?<\/section>/m, premiumSectionStr);
    fs.writeFileSync('app/page.tsx', p);
    if (!replacedP) console.log("Missing hash replace on page");

    let d = fs.readFileSync('app/dashboard/trips/page.tsx', 'utf-8');
    d = d.replace(/const REGION_IMAGES: Record<string, string\[\]> = \{[\s\S]*?\n};\n/m, "const REGION_IMAGES: Record<string, string[]> = {\n" + localPoolsStr + "};\n");
    let replacedD = false;
    d = d.replace(/const hash = seedStr\.split\(''\)\.reduce\(\(acc, char\) => acc \+ char\.charCodeAt\(0\), 0\);/g, () => { replacedD = true; return "const hashVal = seedStr.split('').reduce((acc: number, char: string) => (((acc << 5) - acc) + char.charCodeAt(0)) | 0, 0);\n        const hash = Math.abs(hashVal);"; });
    if (!d.includes("else if (text.includes('NORTH')) category = 'NORTH';")) {
       d = d.replace(/else if \(text\.includes\('DELHI'\)\) category = 'DELHI';/, "else if (text.includes('DELHI')) category = 'DELHI';\n        else if (text.includes('NORTH')) category = 'NORTH';\n        else if (text.includes('AGR')) category = 'NORTH';");
    }
    fs.writeFileSync('app/dashboard/trips/page.tsx', d);
    if (!replacedD) console.log("Missing hash replace on trips");

    let id = fs.readFileSync('app/dashboard/trips/[id]/page.tsx', 'utf-8');
    id = id.replace(/https:\/\/images\.unsplash\.com\/photo-1501785888041-af3ef285b470/g, '/images/catalog/del%201.jpg');
    fs.writeFileSync('app/dashboard/trips/[id]/page.tsx', id);
    
    console.log("Success");
} catch(e) {
    console.error(e);
}
