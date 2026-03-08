import { motion, useScroll, useTransform, AnimatePresence, useSpring, useMotionValue } from 'motion/react';
import { ShoppingBag, ArrowRight, Star, Shield, Zap, Check, Droplets, Activity, Play } from 'lucide-react';
import { useState, useEffect } from 'react';

function Preloader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2200);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[200] bg-[#050505] flex items-center justify-center"
    >
      <div className="relative flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-3xl md:text-5xl font-display tracking-[0.3em] uppercase text-white mb-4"
        >
          Obsidian
        </motion.div>
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1px] bg-white/30 w-full origin-left"
        />
      </div>
    </motion.div>
  );
}

function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, [cursorX, cursorY]);

  return (
    <motion.div
      className="custom-cursor fixed top-0 left-0 w-8 h-8 rounded-full border border-white/40 pointer-events-none z-[100] mix-blend-difference flex items-center justify-center"
      style={{ x: cursorXSpring, y: cursorYSpring }}
    >
      <div className="w-1 h-1 bg-white rounded-full" />
    </motion.div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'glass-panel-strong py-4' : 'py-6'}`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="text-2xl font-display tracking-widest uppercase">Obsidian</div>
        <div className="hidden md:flex gap-8 text-xs font-semibold tracking-[0.2em] uppercase text-white/60">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#design" className="hover:text-white transition-colors">Design</a>
          <a href="#specs" className="hover:text-white transition-colors">Specs</a>
        </div>
        <button className="flex items-center gap-2 bg-white text-black px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform duration-300">
          <ShoppingBag size={14} />
          <span>Reserve</span>
        </button>
      </div>
    </motion.nav>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);
  const scale = useTransform(scrollY, [0, 1000], [1, 1.1]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20 bg-[#050505]">
      <div className="absolute inset-0 bg-noise z-20" />
      
      <motion.div 
        style={{ y: y1, scale, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/20 via-[#050505]/60 to-[#050505] z-10" />
        <img 
          src="https://images.unsplash.com/photo-1587836374361-f16c16b51f12?q=80&w=2070&auto=format&fit=crop" 
          alt="Obsidian Watch" 
          className="w-full h-full object-cover opacity-70"
          referrerPolicy="no-referrer"
        />
      </motion.div>

      <div className="relative z-30 text-center px-6 max-w-5xl mx-auto mt-20 w-full">
        <div className="overflow-hidden mb-6">
          <motion.h2 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs md:text-sm font-semibold tracking-[0.5em] text-white/60 uppercase"
          >
            The New Standard
          </motion.h2>
        </div>
        
        <div className="overflow-hidden mb-8">
          <motion.h1 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 2.4, ease: [0.16, 1, 0.3, 1] }}
            className="text-[18vw] sm:text-7xl md:text-[14vw] leading-[0.85] font-display uppercase tracking-tighter"
          >
            Obsidian <br/> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/30">
              Series X
            </span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12"
        >
          <button className="group relative px-8 py-4 bg-white text-black rounded-full overflow-hidden w-full sm:w-auto">
            <div className="absolute inset-0 bg-neutral-200 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
            <span className="relative z-10 flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs">
              Secure Yours <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
          <button className="group px-8 py-4 rounded-full border border-white/20 hover:bg-white/5 transition-colors w-full sm:w-auto font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2">
            <Play size={14} className="group-hover:text-white/70 transition-colors" /> Watch Film
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function Marquee() {
  const words = ["Precision Engineering", "Swiss Movement", "Limited Production", "Aerospace Titanium", "Sapphire Crystal"];
  
  return (
    <div className="py-6 border-y border-white/10 bg-[#050505] overflow-hidden relative z-20 flex">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center">
            {words.map((word, j) => (
              <div key={j} className="flex items-center">
                <span className="text-sm font-display tracking-[0.2em] uppercase text-white/40 mx-8">{word}</span>
                <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function BentoFeatures() {
  return (
    <section id="features" className="py-32 px-6 relative z-20 bg-[#050505]">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-4xl md:text-6xl font-display uppercase tracking-tighter mb-6">
            Engineered for <br/><span className="text-white/40">Extremes</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[250px] md:auto-rows-[300px]">
          {/* Large Feature 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 glass-panel rounded-3xl p-8 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?q=80&w=2000&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700"
              alt="Titanium Texture"
              referrerPolicy="no-referrer"
            />
            <div className="relative z-20 h-full flex flex-col justify-between">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                <Shield size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-display uppercase tracking-wide mb-2">Grade 5 Titanium</h3>
                <p className="text-white/50 text-sm max-w-sm">Forged from aerospace-grade titanium, offering an unparalleled strength-to-weight ratio. 40% lighter than steel.</p>
              </div>
            </div>
          </motion.div>

          {/* Small Feature 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glass-panel rounded-3xl p-8 relative overflow-hidden group"
          >
            <div className="relative z-20 h-full flex flex-col justify-between">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                <Star size={20} />
              </div>
              <div>
                <h3 className="text-xl font-display uppercase tracking-wide mb-2">Sapphire Glass</h3>
                <p className="text-white/50 text-sm">Virtually unscratchable crystal face with dual anti-reflective coating.</p>
              </div>
            </div>
          </motion.div>

          {/* Small Feature 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glass-panel rounded-3xl p-8 relative overflow-hidden group"
          >
            <div className="relative z-20 h-full flex flex-col justify-between">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                <Activity size={20} />
              </div>
              <div>
                <h3 className="text-xl font-display uppercase tracking-wide mb-2">Kinetic Drive</h3>
                <p className="text-white/50 text-sm">Powered by your movement. Stores up to 6 months of power reserve.</p>
              </div>
            </div>
          </motion.div>

          {/* Large Feature 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 glass-panel rounded-3xl p-8 relative overflow-hidden group"
          >
            <img 
              src="https://images.unsplash.com/photo-1518837695005-2083093ee35b?q=80&w=2000&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 mix-blend-luminosity"
              alt="Water Texture"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10" />
            <div className="relative z-20 h-full flex flex-col justify-between">
              <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur-md">
                <Droplets size={20} />
              </div>
              <div>
                <h3 className="text-2xl font-display uppercase tracking-wide mb-2">300m Water Resistance</h3>
                <p className="text-white/50 text-sm max-w-sm">Hermetically sealed case architecture. Ready for the deepest dives and the harshest environments.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function StickyShowcase() {
  return (
    <section id="design" className="relative bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-start relative">
          
          {/* Scrolling Text Content */}
          <div className="w-full lg:w-1/2 py-12 lg:py-[30vh] space-y-20 lg:space-y-[30vh] relative z-20 order-2 lg:order-1">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase mb-4">01 / The Dial</div>
              <h2 className="text-4xl md:text-5xl font-display uppercase tracking-tighter mb-6">Absolute Clarity</h2>
              <p className="text-lg text-white/50 leading-relaxed max-w-md">
                The multi-layered dial features hand-applied indices filled with Super-LumiNova X1, ensuring perfect legibility in total darkness.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase mb-4">02 / The Bezel</div>
              <h2 className="text-4xl md:text-5xl font-display uppercase tracking-tighter mb-6">Tactile Precision</h2>
              <p className="text-lg text-white/50 leading-relaxed max-w-md">
                A 120-click unidirectional ceramic bezel provides satisfying, precise feedback. Engineered to resist scratches and UV fading forever.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ margin: "-20% 0px -20% 0px" }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase mb-4">03 / The Caliber</div>
              <h2 className="text-4xl md:text-5xl font-display uppercase tracking-tighter mb-6">Heart of Obsidian</h2>
              <p className="text-lg text-white/50 leading-relaxed max-w-md">
                Visible through the exhibition caseback, our in-house Caliber X movement beats at 28,800 vph, decorated with Côtes de Genève.
              </p>
            </motion.div>
          </div>

          {/* Sticky Image */}
          <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen lg:sticky top-0 flex items-center justify-center overflow-hidden z-10 order-1 lg:order-2 pt-12 lg:pt-0">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent rounded-full blur-[100px] scale-75" />
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop" 
              alt="Watch Detail" 
              className="relative z-10 w-full max-w-[250px] md:max-w-md h-auto object-cover rounded-[2rem] grayscale hover:grayscale-0 transition-all duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>

        </div>
      </div>
    </section>
  );
}

function Checkout() {
  const [isHovered, setIsHovered] = useState(false);
  const [model, setModel] = useState<'obsidian' | 'ghost'>('obsidian');

  const price = model === 'obsidian' ? '1,899' : '2,199';
  const originalPrice = model === 'obsidian' ? '2,499' : '2,899';

  return (
    <section id="specs" className="py-32 px-6 relative overflow-hidden bg-[#050505]">
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="glass-panel rounded-[2rem] md:rounded-[3rem] p-6 md:p-16 border border-white/10 flex flex-col md:flex-row gap-8 md:gap-12 items-center"
        >
          {/* Left: Image Preview */}
          <div className="w-full md:w-1/2 flex justify-center">
            <AnimatePresence mode="wait">
              <motion.img
                key={model}
                initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.5 }}
                src={model === 'obsidian' 
                  ? "https://images.unsplash.com/photo-1587836374361-f16c16b51f12?q=80&w=800&auto=format&fit=crop" 
                  : "https://images.unsplash.com/photo-1622434641406-a158123450f9?q=80&w=800&auto=format&fit=crop"}
                alt="Watch Model"
                className={`w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 object-cover rounded-full drop-shadow-2xl ${model === 'obsidian' ? 'grayscale opacity-80' : 'grayscale-0'}`}
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
          </div>

          {/* Right: Selection & Checkout */}
          <div className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left">
            <h2 className="text-xs font-bold tracking-[0.3em] uppercase text-white/50 mb-4">Configure Yours</h2>
            <h3 className="text-4xl md:text-6xl font-display uppercase tracking-tighter mb-8">
              Claim Your <br/>Legacy
            </h3>
            
            {/* Model Selector */}
            <div className="flex gap-4 mb-8 bg-white/5 p-2 rounded-full border border-white/10">
              <button 
                onClick={() => setModel('obsidian')}
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${model === 'obsidian' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
              >
                Obsidian Black
              </button>
              <button 
                onClick={() => setModel('ghost')}
                className={`px-6 py-2 rounded-full text-xs font-bold tracking-widest uppercase transition-all ${model === 'ghost' ? 'bg-white text-black' : 'text-white/50 hover:text-white'}`}
              >
                Ghost Silver
              </button>
            </div>

            <div className="text-3xl font-light mb-10 flex items-center gap-4">
              <span className="text-white/40 line-through text-xl">${originalPrice}</span>
              <span>${price}</span>
            </div>

            <button 
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="relative w-full px-12 py-5 bg-white text-black rounded-full overflow-hidden group"
            >
              <AnimatePresence mode="wait">
                {isHovered ? (
                  <motion.div
                    key="hover"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="relative z-10 flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-sm"
                  >
                    <Check size={18} /> Checkout Now
                  </motion.div>
                ) : (
                  <motion.div
                    key="normal"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="relative z-10 flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-sm"
                  >
                    <ShoppingBag size={18} /> Add to Cart
                  </motion.div>
                )}
              </AnimatePresence>
              <div className="absolute inset-0 bg-neutral-200 scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-300 ease-in-out" />
            </button>

            <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-6 text-xs text-white/40 font-semibold uppercase tracking-widest">
              <span className="flex items-center gap-2"><Shield size={14}/> Lifetime Warranty</span>
              <span className="flex items-center gap-2"><Zap size={14}/> Free Shipping</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-20 px-6 border-t border-white/10 text-center bg-[#050505] relative z-20">
      <div className="max-w-md mx-auto mb-20 relative">
        <h4 className="text-xs font-bold tracking-[0.2em] uppercase text-white/50 mb-6">Join the Inner Circle</h4>
        <div className="relative">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="w-full bg-transparent border-b border-white/20 pb-4 text-sm focus:outline-none focus:border-white transition-colors placeholder:text-white/30"
          />
          <button className="absolute right-0 bottom-4 text-xs font-bold uppercase tracking-widest hover:text-white/70 transition-colors flex items-center gap-2">
            Subscribe <ArrowRight size={12} />
          </button>
        </div>
      </div>

      <div className="text-3xl font-display tracking-widest uppercase mb-6">Obsidian</div>
      <p className="text-white/40 text-sm mb-10 max-w-md mx-auto leading-relaxed">
        Redefining the boundaries of horology. Designed in Switzerland, worn globally.
      </p>
      <div className="flex justify-center gap-8 text-xs font-semibold tracking-widest uppercase text-white/50">
        <a href="#" className="hover:text-white transition-colors">Instagram</a>
        <a href="#" className="hover:text-white transition-colors">Twitter</a>
        <a href="#" className="hover:text-white transition-colors">Terms</a>
        <a href="#" className="hover:text-white transition-colors">Privacy</a>
      </div>
      <div className="mt-16 text-white/20 text-xs">
        &copy; {new Date().getFullYear()} Obsidian Timepieces. All rights reserved.
      </div>
    </footer>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-white selection:text-black">
      <AnimatePresence mode="wait">
        {loading && <Preloader key="preloader" onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      <CustomCursor />
      <Navbar />
      <Hero />
      <Marquee />
      <BentoFeatures />
      <StickyShowcase />
      <Checkout />
      <Footer />
    </div>
  );
}
