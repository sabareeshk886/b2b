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
    
    // 1. Imports
    p = p.replace(/import \{ ArrowRight, Globe \} from 'lucide-react';/, "import { ArrowRight, Globe, Percent, Palette, Headset } from 'lucide-react';");
    
    // 2. REGION_IMAGES array. Be extremely specific.
    const regionSectionStart = p.indexOf('const REGION_IMAGES: Record<string, string[]> = {');
    const regionSectionEnd = p.indexOf('    };', regionSectionStart);
    if (regionSectionStart > -1 && regionSectionEnd > -1) {
        p = p.substring(0, regionSectionStart) + "const REGION_IMAGES: Record<string, string[]> = {\n" + localPoolsStr + "    };" + p.substring(regionSectionEnd + 6);
    }

    // 3. DJB2 hashing
    p = p.replace(/const hash = seedStr\.split\(''\)\.reduce\(\(acc: number, char: string\) => acc \+ char\.charCodeAt\(0\), 0\);/g, "const hashVal = seedStr.split('').reduce((acc: number, char: string) => (((acc << 5) - acc) + char.charCodeAt(0)) | 0, 0);\n        const hash = Math.abs(hashVal);");
    
    // 4. North / Agr region
    if (!p.includes("else if (text.includes('NORTH')) category = 'NORTH';")) {
       p = p.replace(/else if \(text\.includes\('DELHI'\)\) category = 'DELHI';/, "else if (text.includes('DELHI')) category = 'DELHI';\n        else if (text.includes('NORTH')) category = 'NORTH';\n        else if (text.includes('AGR')) category = 'NORTH';");
    }

    // 5. Unsplash imageUrl exclusion
    p = p.replace(/image: trip.imageUrl \|\| getTripImage\(trip\)/g, "image: (trip.imageUrl && !trip.imageUrl.includes('unsplash.com')) ? trip.imageUrl : getTripImage(trip)");

    // 6. Premium Redesign buttons
    const btnStart = p.indexOf('{/* More Button like Airbnb "Show more" */}');
    const btnEnd = p.indexOf('</section>', btnStart);
    if (btnStart > -1 && btnEnd > -1) {
       p = p.substring(0, btnStart) + premiumButtonStr + "\n                    </div>\n                </section>" + p.substring(btnEnd + 10);
    }

    // 7. Premium Redesign section
    const secStart = p.indexOf('{/* Benefits Section - Airbnb style (Minimal) */}');
    const secEnd = p.indexOf('</section>', secStart);
    if (secStart > -1 && secEnd > -1) {
       p = p.substring(0, secStart) + premiumSectionStr + p.substring(secEnd + 10);
    }
    
    fs.writeFileSync('app/page.tsx', p);
    console.log("Success");
} catch(e) {
    console.error(e);
}
