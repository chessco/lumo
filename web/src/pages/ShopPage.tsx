import React from 'react';
import { Link } from 'react-router-dom';

export default function ShopPage() {
  const handleItemClick = (itemName: string) => {
    // Basic interaction simulation
    console.log(`User selected: ${itemName}`);
  };

  return (
    <div className="bg-surface text-on-surface font-body-md overflow-x-hidden min-h-screen selection:bg-primary-container selection:text-on-primary-container">
      {/* Background Layer (Glowing Tent Aesthetic) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-fixed/30 via-transparent to-surface"></div>
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(255, 221, 179, 0.4) 0%, transparent 70%)' }}></div>
      </div>

      {/* Top App Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface dark:bg-surface-dim shadow-[0_8px_0_0_rgba(130,85,0,0.1)] flex justify-between items-center px-margin-mobile h-20 w-full">
        <div className="flex items-center gap-base">
          <span className="text-headline-lg-mobile font-headline-lg-mobile text-primary">Lumo</span>
        </div>
        <div className="flex items-center gap-md">
          <button className="material-symbols-outlined text-primary hover:scale-105 active:translate-y-1 transition-all">stars</button>
          <button className="material-symbols-outlined text-primary hover:scale-105 active:translate-y-1 transition-all">settings</button>
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container">
            <img className="w-full h-full object-cover" alt="User avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4HcrN2veJYQjCGQMCgqp6TmbI7tZJmwXYVWp0teEG7gLCARTGFXAMBPqnNB4CXwAysQ1oxfSYum37gZnUOx3iQuAsBgTFt9xNZbM3Ke2mC9v0mRhU-CCiOi0Dw3N5qRkAGXvyXnoy12Dlb1gFC7NCEl9Bfq2pcUGJ6mkZcHWmrMvKpiNtTmbtmHfM0JOf6kWFxEu429gM4o57F7REtUyy7plQlNgCN6d8I_kc66om-KcRUG2Tw-KZ-w_QgmUsD8gI0ReEREfN" />
          </div>
        </div>
      </header>

      <main className="relative z-10 pt-24 pb-32 px-margin-mobile min-h-screen">
        {/* Star Balance & Shopkeeper Section */}
        <section className="flex flex-col md:flex-row items-center justify-between gap-lg mb-xl mt-md">
          <div className="relative flex items-center gap-md">
            <div className="lumi-container relative">
              <div className="absolute -inset-4 bg-primary-fixed blur-2xl opacity-40 rounded-full"></div>
              <img className="w-32 h-32 object-contain relative z-10" alt="Lumi" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHLtXcs66-7A8ZwNFv2d2jzWnzOhbfUVm8tSsKi-lq3b0iZBqdudcuQP4jDnz0pl_9cK5uHOxVssFcoRjKx0ge9P9vKH5SBnT3tgrDyRvMt-kd41MC5ohWul40lfhdk60YCxSnpymibAYXpsZnTMx3RyZWmoMBRi5cg4zbX9bcbWp-ft6rSIKB4k64R8YZCFZDxO1Q-B1GEXlEeQ81K249-t5PD325GvRL3z3kwn2kjxQxCCQchCM7BrpOUqx78PR_hgS42dS_" />
            </div>
            <div className="relative">
              <div className="bg-surface-container-lowest border-2 border-primary-fixed-dim rounded-xl px-md py-sm shadow-lg max-w-[200px] relative after:content-[''] after:absolute after:left-0 after:top-1/2 after:-translate-x-full after:-translate-y-1/2 after:border-y-[10px] after:border-y-transparent after:border-r-[15px] after:border-r-surface-container-lowest">
                <p className="font-body-md text-on-surface leading-tight">What will you pick today?</p>
              </div>
            </div>
          </div>
          
          <div className="glass-card border-2 border-primary-container rounded-lg p-md flex flex-col items-center justify-center min-w-[180px] shadow-xl star-pulse">
            <span className="font-label-caps text-label-caps text-on-surface-variant mb-xs">YOUR STARS</span>
            <div className="flex items-center gap-sm">
              <span className="material-symbols-outlined text-4xl text-primary-fixed-dim" style={{fontVariationSettings: "'FILL' 1"}}>stars</span>
              <span className="text-headline-xl font-headline-xl text-primary">1,250</span>
            </div>
          </div>
        </section>

        {/* Category Filter Chips */}
        <section className="mb-lg overflow-x-auto hide-scrollbar -mx-margin-mobile px-margin-mobile">
          <div className="flex gap-md pb-xs">
            <button className="bg-primary-container text-on-primary-container px-lg py-sm rounded-full font-interactive-text whitespace-nowrap shadow-md hover:scale-105 transition-transform active:scale-95">All Items</button>
            <button className="bg-surface-container-high text-on-surface-variant px-lg py-sm rounded-full font-interactive-text whitespace-nowrap hover:bg-primary-fixed/30 transition-all">Outfits</button>
            <button className="bg-surface-container-high text-on-surface-variant px-lg py-sm rounded-full font-interactive-text whitespace-nowrap hover:bg-primary-fixed/30 transition-all">World Decor</button>
            <button className="bg-surface-container-high text-on-surface-variant px-lg py-sm rounded-full font-interactive-text whitespace-nowrap hover:bg-primary-fixed/30 transition-all">Pet Pals</button>
          </div>
        </section>

        {/* Rewards Grid (Bento Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
          {/* Item Card 1: Outfits */}
          <div onClick={() => handleItemClick('Star Voyager Cape')} className="glass-card rounded-lg p-md flex flex-col gap-md shadow-lg border-b-4 border-primary-fixed group cursor-pointer hover:shadow-2xl transition-all">
            <div className="relative bg-surface-container rounded-md h-48 flex items-center justify-center overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Cape" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUayCUibaFa9QBSv8Dgae9DADxngrjhg1LXxtFVGyqP1PtBjCohhO7tN33ExharrgmnG5WuKHs8zbD52RLv1BuhsffilZXgwxUg7qh2Dsc3Qn1QbeMH2lbMejLr8fMaE69k_51K_jpRmm_J9irE2-6O9iv4Io18H8BR_RO0G10jiNHMXvOw9hsa5M3kHf-SLWbqfViytDm5sdyZ6t-HauGbF7qeawutbcU7Hqr_0pQDFjg9ikNJOJZtWVf26IijhbMnFGdUjLk" />
              <div className="absolute top-sm left-sm bg-secondary-container text-on-secondary-container text-xs font-bold px-sm py-xs rounded-full uppercase tracking-widest">Outfit</div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-headline-lg-mobile text-on-surface">Star Voyager Cape</h3>
                <p className="font-body-md text-on-surface-variant">Look magical in every story!</p>
              </div>
              <div className="bg-primary-container text-on-primary-container rounded-lg px-md py-sm font-interactive-text flex items-center gap-xs">
                50 <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: "'FILL' 1"}}>stars</span>
              </div>
            </div>
          </div>

          {/* Item Card 2: Pet Pals */}
          <div onClick={() => handleItemClick('Pip the Phoenix')} className="glass-card rounded-lg p-md flex flex-col gap-md shadow-lg border-b-4 border-tertiary-fixed group cursor-pointer hover:shadow-2xl transition-all">
            <div className="relative bg-surface-container rounded-md h-48 flex items-center justify-center overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Pet Pal" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAb1ED4vmI2N24zo32RDA7KDdSQyUkUEEvEp3Fb7dh-FiNKTfBmxiW1nJObYhpP3TE_hjrhqKguMkt4c6909TQwNuqFsF7M3eeeW5YU658l0Q9j5ehAZbVTkPeb_-P-X1MbNoUyeeijYx3xNaPMdLl9AY55MB63SrkdgWB0KiAiRqPENxiaW1mOp_UG7KEjbBl-dk4sxfHowaB9NoUGvMvLbYWsKR_rx8ZCbMilE0OgjdMxvnCCfs0M9jb7DlY4gIEbae2blgL" />
              <div className="absolute top-sm left-sm bg-tertiary-container text-on-tertiary-container text-xs font-bold px-sm py-xs rounded-full uppercase tracking-widest">Pet Pal</div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-headline-lg-mobile text-on-surface">Pip the Phoenix</h3>
                <p className="font-body-md text-on-surface-variant">A warm friend for your travels.</p>
              </div>
              <div className="bg-primary-container text-on-primary-container rounded-lg px-md py-sm font-interactive-text flex items-center gap-xs">
                120 <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: "'FILL' 1"}}>stars</span>
              </div>
            </div>
          </div>

          {/* Item Card 3: Decor */}
          <div onClick={() => handleItemClick('Dreamlight Tree')} className="glass-card rounded-lg p-md flex flex-col gap-md shadow-lg border-b-4 border-secondary-fixed group cursor-pointer hover:shadow-2xl transition-all">
            <div className="relative bg-surface-container rounded-md h-48 flex items-center justify-center overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Decor" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRLTY91tsM0fc27h7H4PPYasqdfFlJa7eKlT-MC2MiI9U7yegReL9D7-H-MFcPSoYbLUbmJYJqTD5-Idf4J4kwoGbVYEYUhc4OpOajvWTsCQ8vnsWfKgXDNtypxWI-cEkPKrwqEQ-gYDET3JaLgBOJTH9jfO7RgqoT5qiQaHgA8s8u4j-2Us-PX3yhAAU0NNHuepudSnB5dkwQPSGfzLyZgvq7ZOVpA81uZhXOKTFA2znW7tfjxhNSyl-Hi79tOsjPpWETtQTe" />
              <div className="absolute top-sm left-sm bg-secondary-container text-on-secondary-container text-xs font-bold px-sm py-xs rounded-full uppercase tracking-widest">Decor</div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-headline-lg-mobile text-on-surface">Dreamlight Tree</h3>
                <p className="font-body-md text-on-surface-variant">Make your world glow at night.</p>
              </div>
              <div className="bg-primary-container text-on-primary-container rounded-lg px-md py-sm font-interactive-text flex items-center gap-xs">
                75 <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: "'FILL' 1"}}>stars</span>
              </div>
            </div>
          </div>

          {/* Item Card 4: Outfit */}
          <div onClick={() => handleItemClick('Moon Jumpers')} className="glass-card rounded-lg p-md flex flex-col gap-md shadow-lg border-b-4 border-primary-fixed group cursor-pointer hover:shadow-2xl transition-all">
            <div className="relative bg-surface-container rounded-md h-48 flex items-center justify-center overflow-hidden">
              <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Outfit" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5Rzv0fwPD5PBNzPsqWinEJU75M988EbadYHE0sCGOd6s7JhQreC6Jg2uVFN_YU_YSaGd8354TC2hZfKhnYleVkWKAiJZjbxXGNF9WmcRx7eElQ6nxwWxvjKn9NP5Ilmu829ANz6hiAr0ejQn9S544Dm9win78V7nvLOyIe4GZOnushZtGDFcABXl0eNA95ittMsB50jQWd3jDyetTh4qNKfaimeaZWH6HvyZuATRHSNkj6hS1gB-haxhczB0fZ0Yw6HfpWg1z" />
              <div className="absolute top-sm left-sm bg-secondary-container text-on-secondary-container text-xs font-bold px-sm py-xs rounded-full uppercase tracking-widest">Outfit</div>
            </div>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-headline-lg-mobile text-on-surface">Moon Jumpers</h3>
                <p className="font-body-md text-on-surface-variant">Bouncy boots for space walks!</p>
              </div>
              <div className="bg-primary-container text-on-primary-container rounded-lg px-md py-sm font-interactive-text flex items-center gap-xs">
                90 <span className="material-symbols-outlined text-lg" style={{fontVariationSettings: "'FILL' 1"}}>stars</span>
              </div>
            </div>
          </div>

          {/* Locked Item Example */}
          <div className="glass-card rounded-lg p-md flex flex-col gap-md shadow-lg border-b-4 border-outline-variant grayscale opacity-75 relative group">
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-surface/40 backdrop-blur-[2px] rounded-lg">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant">lock</span>
              <p className="font-label-caps text-label-caps mt-xs">LOCKED</p>
            </div>
            <div className="relative bg-surface-container rounded-md h-48"></div>
            <div className="flex justify-between items-end">
              <div>
                <h3 className="font-headline-lg-mobile text-on-surface">Mystery Dragon</h3>
                <p className="font-body-md text-on-surface-variant">Reach Level 10 to unlock!</p>
              </div>
              <div className="bg-surface-container-highest text-on-surface-variant rounded-lg px-md py-sm font-interactive-text flex items-center gap-xs">
                ??? <span className="material-symbols-outlined text-lg">stars</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="h-12"></div>
      </main>

      <button className="fixed bottom-28 right-margin-mobile z-40 bg-secondary-container text-on-secondary-container p-md rounded-full shadow-2xl flex items-center gap-sm hover:scale-110 active:scale-95 transition-all group">
        <span className="material-symbols-outlined text-3xl group-hover:rotate-12 transition-transform">auto_awesome</span>
        <span className="font-interactive-text pr-xs">Earn More Stars</span>
      </button>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 w-full z-50 flex justify-around items-center px-2 pb-safe h-24 bg-surface-container-low dark:bg-surface-container-lowest shadow-[0_-4px_20px_rgba(107,61,202,0.1)] rounded-t-lg">
        <Link className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-2 hover:bg-secondary-fixed-dim/20 transition-colors" to="/">
          <span className="material-symbols-outlined">home</span>
          <span className="font-label-caps text-label-caps">Home</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-2 hover:bg-secondary-fixed-dim/20 transition-colors" to="/speech">
          <span className="material-symbols-outlined">mic</span>
          <span className="font-label-caps text-label-caps">Speak</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-2 hover:bg-secondary-fixed-dim/20 transition-colors" to="/read">
          <span className="material-symbols-outlined">auto_stories</span>
          <span className="font-label-caps text-label-caps">Read</span>
        </Link>
        <Link className="flex flex-col items-center justify-center text-on-surface-variant px-4 py-2 hover:bg-secondary-fixed-dim/20 transition-colors" to="/stories">
          <span className="material-symbols-outlined">auto_awesome</span>
          <span className="font-label-caps text-label-caps">Stories</span>
        </Link>
        <Link className="flex flex-col items-center justify-center bg-secondary-container text-on-secondary-container rounded-xl px-4 py-2 shadow-lg scale-110 transition-all" to="/shop">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>public</span>
          <span className="font-label-caps text-label-caps">World</span>
        </Link>
      </nav>
    </div>
  );
}
