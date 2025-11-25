"use client"
import { useState, useEffect} from 'react';
import { motion, useScroll, useTransform, AnimatePresence} from 'framer-motion';
import { 
  Utensils, MapPin, Phone, Clock, Star, ChefHat, 
  Leaf, ShieldCheck, Zap, Calendar, User, ChevronRight, 
  ChevronLeft, Menu as MenuIcon, X, Instagram, Facebook, Twitter
} from 'lucide-react';

// --- DATA & ASSETS ---
const TOP_FOODS = [
  {
    id: 1,
    name: "Butter Chicken Royale",
    rating: 5,
    price: "₹380",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    desc: "Slow-cooked tandoori chicken in a rich, velvety tomato gravy."
  },
  {
    id: 2,
    name: "Pahadi Mutton Curry",
    rating: 4.8,
    price: "₹450",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356f36?auto=format&fit=crop&w=800&q=80",
    desc: "Authentic Kumaoni style mutton with local herbs and spices."
  },
  {
    id: 3,
    name: "Paneer Tikka Sizzler",
    rating: 4.9,
    price: "₹320",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
    desc: "Smoked paneer cubes served on a hot iron plate with veggies."
  },
  {
    id: 4,
    name: "Haldwani Special Thali",
    rating: 5,
    price: "₹250",
    image: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=800&q=80",
    desc: "The complete meal experience representing the soul of Uttarakhand."
  }
];

const MENU_CATEGORIES = {
  "Starters": [
    { name: "Crispy Corn", price: "₹180", desc: "Sweet corn tossed in spicy tangy sauce." },
    { name: "Chicken 65", price: "₹240", desc: "Spicy, deep-fried chicken bites." },
    { name: "Hara Bhara Kabab", price: "₹160", desc: "Healthy spinach and pea patties." },
    { name: "Chilli Potato", price: "₹150", desc: "Crispy potato wedges in chinese sauce." },
  ],
  "Main Course": [
    { name: "Dal Makhani", price: "₹220", desc: "Black lentils simmered overnight with cream." },
    { name: "Kadhai Paneer", price: "₹260", desc: "Cottage cheese with bell peppers." },
    { name: "Chicken Curry", price: "₹320", desc: "Homestyle spicy chicken gravy." },
    { name: "Mushroom Masala", price: "₹240", desc: "Button mushrooms in spicy onion gravy." },
  ],
  "Breads & Rice": [
    { name: "Butter Naan", price: "₹45", desc: "Soft leavened bread with butter." },
    { name: "Jeera Rice", price: "₹120", desc: "Basmati rice tempered with cumin." },
    { name: "Lachha Paratha", price: "₹50", desc: "Layered whole wheat bread." },
    { name: "Veg Biryani", price: "₹200", desc: "Aromatic rice layered with vegetables." },
  ]
};

const FEATURES = [
  { icon: ShieldCheck, title: "100% Hygiene", desc: "We follow strict sanitization protocols in our kitchen." },
  { icon: Leaf, title: "Fresh Ingredients", desc: "Farm-to-table vegetables sourced locally from Haldwani." },
  { icon: Zap, title: "No Old Stock", desc: "We prepare food fresh daily. Zero tolerance for stale items." },
];

// --- COMPONENTS ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-md py-2 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center transform rotate-3 hover:rotate-0 transition-all duration-300">
            <Utensils className="text-white" size={24} />
          </div>
          <span className="text-2xl font-bold text-white tracking-tighter">
            Haldwani<span className="text-orange-500">Foods</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {['Home', 'About', 'Menu', 'Location'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-white/80 hover:text-orange-500 font-medium transition-colors text-sm uppercase tracking-widest">
              {item}
            </a>
          ))}
          <a href="#reservation" className="bg-white text-black px-6 py-2 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all transform hover:scale-105 shadow-lg shadow-orange-500/20">
            Book Table
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black fixed inset-0 z-40 flex flex-col items-center justify-center space-y-8"
          >
            {['Home', 'About', 'Menu', 'Location', 'Reservation'].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`} 
                onClick={() => setIsOpen(false)}
                className="text-3xl font-bold text-white hover:text-orange-500"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero3D = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden bg-black flex items-center justify-center perspective-1000">
      {/* Background Image Parallax */}
      <motion.div 
        style={{ y: y1 }}
        className="absolute inset-0 z-0 opacity-60"
      >
        <img 
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1920&q=80" 
          alt="Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div 
        style={{ y: y2, opacity }}
        className="relative z-10 text-center px-4 max-w-4xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, type: "spring" }}
          className="mb-6 inline-block"
        >
          <span className="py-2 px-6 border border-orange-500/50 rounded-full text-orange-400 text-sm tracking-[0.2em] uppercase bg-black/30 backdrop-blur-sm">
            Est. 2018
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-8xl font-bold text-white mb-6 leading-tight drop-shadow-2xl">
          Taste of <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
            Haldwani
          </span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
          Where the authentic flavors of Kumaon meet modern culinary art. 
          Experience a symphony of spices in a 3D dining ambience.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <motion.button 
            whileHover={{ scale: 1.05, rotateX: 10 }}
            className="px-8 py-4 bg-orange-600 text-white rounded-lg font-bold text-lg shadow-[0_0_20px_rgba(234,88,12,0.5)] border-b-4 border-orange-800 active:border-b-0 active:translate-y-1 transition-all"
          >
            View Full Menu
          </motion.button>
          <motion.button 
             whileHover={{ scale: 1.05, rotateX: 10 }}
             className="px-8 py-4 bg-transparent border border-white/30 text-white rounded-lg font-bold text-lg backdrop-blur-sm hover:bg-white/10 transition-all"
          >
            Our Story
          </motion.button>
        </div>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-orange-500 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-zinc-900 text-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Image with 3D Tilt Effect */}
          <motion.div 
            initial={{ opacity: 0, x: -50, rotateY: 20 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 relative perspective-1000"
          >
            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/5 transform transition-transform duration-500 hover:scale-[1.02]">
              <img 
                src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=800&q=80" 
                alt="Chef" 
                className="w-full h-auto object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent p-8">
                <div className="flex items-center gap-4">
                  <div className="bg-orange-500 p-3 rounded-full">
                    <ChefHat size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl">Master Chef Rana</h4>
                    <p className="text-sm text-gray-300">20 Years of Experience</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          </motion.div>

          {/* Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full md:w-1/2"
          >
            <span className="text-orange-500 font-bold tracking-widest uppercase mb-2 block">Our Story</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Born in the Hills, <br/>Loved by the City.</h2>
            <p className="text-gray-400 text-lg mb-6 leading-relaxed">
              Haldwani Foods started as a small family kitchen in 2015. Our mission was simple: bring the authentic, robust flavors of the Kumaon region to a wider audience without compromising on quality.
            </p>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Today, we are Haldwani's most loved dining destination. We blend traditional recipes with modern cooking techniques to create dishes that are nostalgic yet exciting.
            </p>
            
            <div className="grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
              <div>
                <h3 className="text-3xl font-bold text-white">50k+</h3>
                <p className="text-sm text-gray-500 mt-1">Happy Guests</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">120+</h3>
                <p className="text-sm text-gray-500 mt-1">Dishes</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">4.8</h3>
                <p className="text-sm text-gray-500 mt-1">Rating</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const CustomSwiper = () => {
  const [index, setIndex] = useState(0);

  const nextSlide = () => setIndex((prev) => (prev + 1) % TOP_FOODS.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + TOP_FOODS.length) % TOP_FOODS.length);

  return (
    <section className="py-24 bg-black relative">
       <div className="container mx-auto px-6 mb-12 flex flex-col items-center text-center">
        <h2 className="text-4xl font-bold text-white mb-4">Our Top Rated Foods</h2>
        <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto h-[500px] flex items-center justify-center perspective-1000 px-4">
        <AnimatePresence mode='wait'>
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8, x: 100, rotateY: 45 }}
            animate={{ opacity: 1, scale: 1, x: 0, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: -100, rotateY: -45 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl w-full max-w-md border border-zinc-800 relative group"
          >
            <div className="relative h-64 overflow-hidden">
              <img src={TOP_FOODS[index].image} alt={TOP_FOODS[index].name} className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-black font-bold px-3 py-1 rounded-full text-sm">
                {TOP_FOODS[index].price}
              </div>
            </div>
            
            <div className="p-8 text-center">
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} className={`${i < Math.floor(TOP_FOODS[index].rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}`} />
                ))}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">{TOP_FOODS[index].name}</h3>
              <p className="text-gray-400 mb-6">{TOP_FOODS[index].desc}</p>
              <button className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl transition-colors">
                Order Now
              </button>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <button onClick={prevSlide} className="absolute left-4 md:-left-12 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all">
          <ChevronLeft size={32} />
        </button>
        <button onClick={nextSlide} className="absolute right-4 md:-right-12 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-all">
          <ChevronRight size={32} />
        </button>
      </div>
    </section>
  );
};

type MenuCategory = keyof typeof MENU_CATEGORIES;

const MenuSection = () => {
  const [activeTab, setActiveTab] = useState<MenuCategory>("Main Course");

  return (
    <section id="menu" className="py-24 bg-zinc-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Discover Our Menu</h2>
          <p className="text-gray-400">Curated specifically for the tastebuds of Haldwani.</p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {(Object.keys(MENU_CATEGORIES) as MenuCategory[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                activeTab === cat 
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30 scale-105' 
                : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <AnimatePresence mode="popLayout">
            {MENU_CATEGORIES[activeTab].map((item, idx) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-black p-6 rounded-2xl border border-zinc-800 hover:border-orange-500/50 transition-colors group"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">{item.name}</h3>
                  <div className="border-b border-dashed border-gray-700 flex-grow mx-4 relative top-[-6px]"></div>
                  <span className="text-orange-500 font-bold text-lg">{item.price}</span>
                </div>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const FeaturesAndHours = () => {
  return (
    <section className="py-20 px-0 sm:px-20 bg-gradient-to-b from-black to-zinc-900 text-white">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-16">
        
        {/* Why Choose Us */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-orange-500">Why Choose Haldwani Foods?</h2>
          <div className="space-y-8">
            {FEATURES.map((feat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.2 }}
                className="flex items-start gap-4"
              >
                <div className="bg-zinc-800 p-3 rounded-lg text-orange-500 shadow-inner">
                  <feat.icon size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">{feat.title}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Opening Hours */}
        <div className="bg-zinc-800/50 p-8 rounded-3xl border border-zinc-700 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="text-orange-500" size={32} />
            <h3 className="text-2xl font-bold">Opening Hours</h3>
          </div>
          <ul className="space-y-4">
            <li className="flex justify-between items-center border-b border-zinc-700 pb-3">
              <span className="text-gray-300">Monday - Friday</span>
              <span className="font-bold text-orange-100">11:00 AM - 10:30 PM</span>
            </li>
            <li className="flex justify-between items-center border-b border-zinc-700 pb-3">
              <span className="text-gray-300">Saturday</span>
              <span className="font-bold text-orange-100">11:00 AM - 11:30 PM</span>
            </li>
            <li className="flex justify-between items-center pb-3">
              <span className="text-gray-300">Sunday</span>
              <span className="font-bold text-orange-400">10:00 AM - 11:30 PM</span>
            </li>
          </ul>
          <div className="mt-8 p-4 bg-orange-500/10 rounded-xl border border-orange-500/20 text-center">
            <p className="text-orange-400 text-sm font-semibold">Happy Hours: 4PM - 7PM (Mon-Thu)</p>
          </div>
        </div>

      </div>
    </section>
  );
};

const Reservation = () => {
  return (
    <section id="reservation" className="py-24 bg-zinc-900 relative overflow-hidden">
       {/* Background Decoration */}
       <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-600 rounded-full filter blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-600 rounded-full filter blur-[80px]" />
       </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto bg-black/50 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-zinc-700 shadow-2xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Book A Table</h2>
            <p className="text-gray-400">Reserve your spot for an unforgettable dining experience.</p>
          </div>

          <form className="grid md:grid-cols-2 gap-6" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input type="text" placeholder="Your Full Name" className="w-full bg-zinc-900 text-white pl-12 pr-4 py-3 rounded-xl border border-zinc-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Phone</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input type="tel" placeholder="+91 98765 43210" className="w-full bg-zinc-900 text-white pl-12 pr-4 py-3 rounded-xl border border-zinc-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input type="date" className="w-full bg-zinc-900 text-white pl-12 pr-4 py-3 rounded-xl border border-zinc-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-400 ml-1">Guests</label>
              <select className="w-full bg-zinc-900 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all appearance-none">
                <option>2 People</option>
                <option>3 People</option>
                <option>4 People</option>
                <option>5+ People</option>
              </select>
            </div>

            <button className="md:col-span-2 w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 text-white font-bold py-4 rounded-xl shadow-lg transform hover:scale-[1.01] transition-all mt-4">
              Confirm Reservation
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

const LocationMap = () => {
  return (
    <section id="location" className="py-20 px-0 sm:px-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-8 rounded-3xl overflow-hidden bg-zinc-900 border border-zinc-800">
           {/* Real Map Embed (Google Maps) */}
           <div className="w-full md:w-2/3 h-80 md:h-auto bg-zinc-800 relative group overflow-hidden">
             <iframe
               title="Haldwani Foods - Map"
               src="https://www.google.com/maps?q=Haldwani%20Foods%20Haldwani&output=embed"
               width="100%"
               height="100%"
               style={{ border: 0, minHeight: 320 }}
               allowFullScreen
               loading="lazy"
               referrerPolicy="no-referrer-when-downgrade"
               className="w-full h-full"
             />
             <div className="absolute bottom-4 right-4 bg-white text-black text-xs px-2 py-1 rounded">Live Map View</div>
           </div>

           <div className="w-full md:w-1/3 p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-white mb-6">Visit Us</h3>
              <address className="not-italic space-y-4 text-gray-400">
                <div className="flex items-start gap-3">
                   <MapPin className="text-orange-500 shrink-0 mt-1" />
                   <span>123, Nainital Road,<br/>Near Walkway Mall,<br/>Haldwani, Uttarakhand</span>
                </div>
                <div className="flex items-center gap-3">
                   <Phone className="text-orange-500 shrink-0" />
                   <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center gap-3">
                   <Instagram className="text-orange-500 shrink-0" />
                   <span>@haldwanifoods</span>
                </div>
              </address>
              <button
                onClick={() => {
                  // open Google Maps in new tab with same query
                  window.open("https://www.google.com/maps/search/?api=1&query=Haldwani+Foods+Haldwani", "_blank");
                }}
                className="mt-8 w-full border border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold py-3 rounded-lg transition-colors"
              >
                 Get Directions
              </button>
           </div>
        </div>
      </div>
    </section>
  );
};


const Footer = () => {
  return (
    <footer className="bg-black text-white py-12 border-t border-zinc-800">
      <div className="container mx-auto px-6 text-center">
         <div className="flex justify-center items-center gap-2 mb-6">
            <Utensils className="text-orange-500" size={24} />
            <span className="text-2xl font-bold">Haldwani<span className="text-orange-500">Foods</span></span>
         </div>
         
         <div className="flex justify-center gap-6 mb-8">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
               <a key={i} href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-orange-600 transition-colors">
                  <Icon size={20} />
               </a>
            ))}
         </div>

         <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Haldwani Foods. All rights reserved. <br/>
            Made with ❤️ in Devbhoomi Uttarakhand.
         </p>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="bg-black text-white font-sans selection:bg-orange-500 selection:text-white overflow-x-hidden">
      <Navbar />
      <Hero3D />
      <AboutSection />
      <CustomSwiper />
      <MenuSection />
      <FeaturesAndHours />
      <Reservation />
      <LocationMap />
      <Footer />
    </div>
  );
}