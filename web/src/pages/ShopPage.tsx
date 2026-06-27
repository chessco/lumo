import React from 'react';
import { Link } from 'react-router-dom';

export default function ShopPage() {
  const handleItemClick = (itemName: string) => {
    // Basic interaction simulation
    console.log(`User selected: ${itemName}`);
  };

  return (
    <div className="bg-gradient-to-b from-purple-50 via-white to-blue-50 text-gray-800 font-sans overflow-x-hidden min-h-screen">
      {/* Background Layer (Glowing Tent Aesthetic) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-200/30 via-transparent to-white"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(255, 221, 179, 0.4) 0%, transparent 70%)' }}></div>
      </div>

      {/* Top App Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 flex justify-between items-center px-6 h-20 w-full">
        <div className="flex items-center gap-3">
          <span className="text-3xl font-black text-purple-600">Lumo</span>
        </div>
        <div className="flex items-center gap-4">
          <button className="material-symbols-outlined text-purple-500 hover:scale-110 transition-transform">stars</button>
          <button className="material-symbols-outlined text-gray-400 hover:text-gray-600 transition-colors">settings</button>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-purple-200 shadow-sm">
            <img className="w-full h-full object-cover" alt="User avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4HcrN2veJYQjCGQMCgqp6TmbI7tZJmwXYVWp0teEG7gLCARTGFXAMBPqnNB4CXwAysQ1oxfSYum37gZnUOx3iQuAsBgTFt9xNZbM3Ke2mC9v0mRhU-CCiOi0Dw3N5qRkAGXvyXnoy12Dlb1gFC7NCEl9Bfq2pcUGJ6mkZcHWmrMvKpiNtTmbtmHfM0JOf6kWFxEu429gM4o57F7REtUyy7plQlNgCN6d8I_kc66om-KcRUG2Tw-KZ-w_QgmUsD8gI0ReEREfN" />
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-24 pb-32 px-6 min-h-screen">
        {/* Star Balance & Shopkeeper Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12 mt-4">
          <div className="relative flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-4 bg-purple-200 blur-2xl opacity-60 rounded-full"></div>
              <img className="w-32 h-32 object-contain relative z-10 animate-[float-clouds_4s_ease-in-out_infinite]" alt="Lumi" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHLtXcs66-7A8ZwNFv2d2jzWnzOhbfUVm8tSsKi-lq3b0iZBqdudcuQP4jDnz0pl_9cK5uHOxVssFcoRjKx0ge9P9vKH5SBnT3tgrDyRvMt-kd41MC5ohWul40lfhdk60YCxSnpymibAYXpsZnTMx3RyZWmoMBRi5cg4zbX9bcbWp-ft6rSIKB4k64R8YZCFZDxO1Q-B1GEXlEeQ81K249-t5PD325GvRL3z3kwn2kjxQxCCQchCM7BrpOUqx78PR_hgS42dS_" />
            </div>
            <div className="relative">
              <div className="bg-white border-2 border-gray-100 rounded-2xl px-5 py-3 shadow-lg max-w-[200px] relative after:content-[''] after:absolute after:left-0 after:top-1/2 after:-translate-x-full after:-translate-y-1/2 after:border-y-[10px] after:border-y-transparent after:border-r-[15px] after:border-r-white">
                <p className="font-bold text-gray-700 leading-tight">What will you pick today?</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm border-2 border-yellow-200 rounded-3xl p-6 flex flex-col items-center justify-center min-w-[180px] shadow-xl star-pulse">
            <span className="font-bold text-xs tracking-widest text-gray-400 mb-1">YOUR STARS</span>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-4xl text-yellow-400" style={{fontVariationSettings: "'FILL' 1"}}>stars</span>
              <span className="text-4xl font-black text-yellow-500">1,250</span>
            </div>
          </div>
        </section>

        {/* Category Filter Chips */}
        <section className="mb-10 overflow-x-auto hide-scrollbar -mx-6 px-6">
          <div className="flex gap-4 pb-2">
            <button className="bg-purple-600 text-white px-6 py-2 rounded-full font-bold whitespace-nowrap shadow-md hover:scale-105 transition-transform active:scale-95">All Items</button>
            <button className="bg-white text-gray-500 border-2 border-gray-100 px-6 py-2 rounded-full font-bold whitespace-nowrap hover:bg-gray-50 transition-all">Outfits</button>
            <button className="bg-white text-gray-500 border-2 border-gray-100 px-6 py-2 rounded-full font-bold whitespace-nowrap hover:bg-gray-50 transition-all">World Decor</button>
            <button className="bg-white text-gray-500 border-2 border-gray-100 px-6 py-2 rounded-full font-bold whitespace-nowrap hover:bg-gray-50 transition-all">Pet Pals</button>
          </div>
        </section>

        {/* Rewards Grid (Bento Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Item Card 1: Outfits */}
          <div onClick={() => handleItemClick('Star Voyager Cape')} className="bg-white rounded-3xl p-4 flex flex-col gap-4 shadow-lg border-2 border-gray-100 border-b-8 group cursor-pointer hover:shadow-2xl transition-all">
            <div className="relative bg-gray-50 rounded-2xl h-48 flex items-center justify-center overflow-hidden border-2 border-gray-100">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Cape" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUayCUibaFa9QBSv8Dgae9DADxngrjhg1LXxtFVGyqP1PtBjCohhO7tN33ExharrgmnG5WuKHs8zbD52RLv1BuhsffilZXgwxUg7qh2Dsc3Qn1QbeMH2lbMejLr8fMaE69k_51K_jpRmm_J9irE2-6O9iv4Io18H8BR_RO0G10jiNHMXvOw9hsa5M3kHf-SLWbqfViytDm5sdyZ6t-HauGbF7qeawutbcU7Hqr_0pQDFjg9ikNJOJZtWVf26IijhbMnFGdUjLk" />
              <div className="absolute top-3 left-3 bg-blue-100 text-blue-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest border-2 border-white">Outfit</div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-bold text-lg text-gray-800">Star Voyager Cape</h3>
                <p className="text-sm font-medium text-gray-500">Look magical in every story!</p>
              </div>
              <div className="bg-yellow-100 text-yellow-700 rounded-xl px-4 py-2 font-bold flex items-center gap-1 border-2 border-white shadow-sm">
                50 <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: "'FILL' 1"}}>stars</span>
              </div>
            </div>
          </div>

          {/* Item Card 2: Pet Pals */}
          <div onClick={() => handleItemClick('Pip the Phoenix')} className="bg-white rounded-3xl p-4 flex flex-col gap-4 shadow-lg border-2 border-gray-100 border-b-8 group cursor-pointer hover:shadow-2xl transition-all">
            <div className="relative bg-gray-50 rounded-2xl h-48 flex items-center justify-center overflow-hidden border-2 border-gray-100">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Pet Pal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAb1ED4vmI2N24zo32RDA7KDdSQyUkUEEvEp3Fb7dh-FiNKTfBmxiW1nJObYhpP3TE_hjrhqKguMkt4c6909TQwNuqFsF7M3eeeW5YU658l0Q9j5ehAZbVTkPeb_-P-X1MbNoUyeeijYx3xNaPMdLl9AY55MB63SrkdgWB0KiAiRqPENxiaW1mOp_UG7KEjbBl-dk4sxfHowaB9NoUGvMvLbYWsKR_rx8ZCbMilE0OgjdMxvnCCfs0M9jb7DlY4gIEbae2blgL" />
              <div className="absolute top-3 left-3 bg-pink-100 text-pink-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest border-2 border-white">Pet Pal</div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-bold text-lg text-gray-800">Pip the Phoenix</h3>
                <p className="text-sm font-medium text-gray-500">A warm friend for your travels.</p>
              </div>
              <div className="bg-yellow-100 text-yellow-700 rounded-xl px-4 py-2 font-bold flex items-center gap-1 border-2 border-white shadow-sm">
                120 <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: "'FILL' 1"}}>stars</span>
              </div>
            </div>
          </div>

          {/* Item Card 3: Decor */}
          <div onClick={() => handleItemClick('Dreamlight Tree')} className="bg-white rounded-3xl p-4 flex flex-col gap-4 shadow-lg border-2 border-gray-100 border-b-8 group cursor-pointer hover:shadow-2xl transition-all">
            <div className="relative bg-gray-50 rounded-2xl h-48 flex items-center justify-center overflow-hidden border-2 border-gray-100">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Decor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRLTY91tsM0fc27h7H4PPYasqdfFlJa7eKlT-MC2MiI9U7yegReL9D7-H-MFcPSoYbLUbmJYJqTD5-Idf4J4kwoGbVYEYUhc4OpOajvWTsCQ8vnsWfKgXDNtypxWI-cEkPKrwqEQ-gYDET3JaLgBOJTH9jfO7RgqoT5qiQaHgA8s8u4j-2Us-PX3yhAAU0NNHuepudSnB5dkwQPSGfzLyZgvq7ZOVpA81uZhXOKTFA2znW7tfjxhNSyl-Hi79tOsjPpWETtQTe" />
              <div className="absolute top-3 left-3 bg-green-100 text-green-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest border-2 border-white">Decor</div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-bold text-lg text-gray-800">Dreamlight Tree</h3>
                <p className="text-sm font-medium text-gray-500">Make your world glow at night.</p>
              </div>
              <div className="bg-yellow-100 text-yellow-700 rounded-xl px-4 py-2 font-bold flex items-center gap-1 border-2 border-white shadow-sm">
                75 <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: "'FILL' 1"}}>stars</span>
              </div>
            </div>
          </div>

          {/* Item Card 4: Outfit */}
          <div onClick={() => handleItemClick('Moon Jumpers')} className="bg-white rounded-3xl p-4 flex flex-col gap-4 shadow-lg border-2 border-gray-100 border-b-8 group cursor-pointer hover:shadow-2xl transition-all">
            <div className="relative bg-gray-50 rounded-2xl h-48 flex items-center justify-center overflow-hidden border-2 border-gray-100">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Outfit" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5Rzv0fwPD5PBNzPsqWinEJU75M988EbadYHE0sCGOd6s7JhQreC6Jg2uVFN_YU_YSaGd8354TC2hZfKhnYleVkWKAiJZjbxXGNF9WmcRx7eElQ6nxwWxvjKn9NP5Ilmu829ANz6hiAr0ejQn9S544Dm9win78V7nvLOyIe4GZOnushZtGDFcABXl0eNA95ittMsB50jQWd3jDyetTh4qNKfaimeaZWH6HvyZuATRHSNkj6hS1gB-haxhczB0fZ0Yw6HfpWg1z" />
              <div className="absolute top-3 left-3 bg-blue-100 text-blue-700 text-xs font-black px-3 py-1 rounded-full uppercase tracking-widest border-2 border-white">Outfit</div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-bold text-lg text-gray-800">Moon Jumpers</h3>
                <p className="text-sm font-medium text-gray-500">Bouncy boots for space walks!</p>
              </div>
              <div className="bg-yellow-100 text-yellow-700 rounded-xl px-4 py-2 font-bold flex items-center gap-1 border-2 border-white shadow-sm">
                90 <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: "'FILL' 1"}}>stars</span>
              </div>
            </div>
          </div>

          {/* Locked Item Example */}
          <div className="bg-white rounded-3xl p-4 flex flex-col gap-4 shadow-sm border-2 border-gray-200 border-b-4 grayscale opacity-75 relative group">
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[2px] rounded-3xl">
              <span className="material-symbols-outlined text-4xl text-gray-500">lock</span>
              <p className="font-bold text-sm mt-1 text-gray-600 tracking-wider">LOCKED</p>
            </div>
            <div className="relative bg-gray-100 rounded-2xl h-48 border-2 border-gray-200"></div>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-bold text-lg text-gray-800">Mystery Dragon</h3>
                <p className="text-sm font-medium text-gray-500">Reach Level 10 to unlock!</p>
              </div>
              <div className="bg-gray-200 text-gray-500 rounded-xl px-4 py-2 font-bold flex items-center gap-1 border-2 border-white">
                ??? <span className="material-symbols-outlined text-lg">stars</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="h-12"></div>
      </main>

      <button className="fixed bottom-28 right-6 z-40 bg-yellow-400 text-yellow-900 px-6 py-4 rounded-full shadow-lg flex items-center gap-3 hover:scale-105 active:scale-95 transition-all group font-bold border-2 border-white btn-3d">
        <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">auto_awesome</span>
        <span>Earn More Stars</span>
      </button>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-2 pb-safe h-24 bg-white/90 backdrop-blur-md shadow-[0_-10px_20px_rgba(0,0,0,0.05)] rounded-t-3xl border-t-2 border-gray-100">
        <Link className="flex flex-col items-center justify-center text-gray-500 px-4 py-2 hover:bg-gray-100 rounded-full transition-colors" to="/">
          <span className="material-symbols-outlined">home</span>
          <span className="text-xs font-bold mt-1 tracking-wider uppercase">Home</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-gray-500 px-4 py-2 hover:bg-gray-100 rounded-full transition-colors" to="/speech">
          <span className="material-symbols-outlined">mic</span>
          <span className="text-xs font-bold mt-1 tracking-wider uppercase">Speak</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-gray-500 px-4 py-2 hover:bg-gray-100 rounded-full transition-colors" to="/read">
          <span className="material-symbols-outlined">auto_stories</span>
          <span className="text-xs font-bold mt-1 tracking-wider uppercase">Read</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-gray-500 px-4 py-2 hover:bg-gray-100 rounded-full transition-colors" to="/stories">
          <span className="material-symbols-outlined">auto_awesome</span>
          <span className="text-xs font-bold mt-1 tracking-wider uppercase">Stories</span>
        </Link>
        <Link className="flex flex-col items-center justify-center bg-purple-100 text-purple-700 rounded-2xl px-4 py-2 shadow-sm border-2 border-purple-200 scale-110 transition-all" to="/shop">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>public</span>
          <span className="text-xs font-bold mt-1 tracking-wider uppercase">World</span>
        </Link>
      </nav>
    </div>
  );
}
