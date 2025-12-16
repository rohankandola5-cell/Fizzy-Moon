/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Ticket, Globe, Zap, Music, MapPin, Menu, X, Calendar, Play, ChevronLeft, ChevronRight, Utensils, Beer, PartyPopper, Trophy, Users, Crown, Wine, Armchair, Briefcase } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ArtistCard from './components/ArtistCard'; // Keeping component name, but logic is FeatureCard
import AIChat from './components/AIChat';
import Bubbles from './components/Bubbles';
import { FeatureItem } from './types';

// Fizzy Moon Data
const FEATURES: FeatureItem[] = [
  { 
    id: '1', 
    name: 'Fizzy Burger', 
    category: 'Signature Grill', 
    tag: 'FOOD', 
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop',
    description: 'Our legendary house burger. Double smashed beef patty, smoked bacon, american cheese, and our secret Fizzy sauce. Served with rosemary fries.'
  },
  { 
    id: '2', 
    name: 'Our Home Brews', 
    category: 'Craft Ales', 
    tag: 'DRINK', 
    image: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?q=80&w=1000&auto=format&fit=crop',
    description: 'Taste our exclusive home brews. From hoppy IPAs to smooth Stouts, our rotation changes weekly.'
  },
  { 
    id: '3', 
    name: 'Sunday Roast', 
    category: 'Weekly Tradition', 
    tag: 'SUNDAY', 
    image: 'https://images.unsplash.com/photo-1606850780554-b55eaefa84cb?q=80&w=1000&auto=format&fit=crop',
    description: 'A proper Sunday Feast. Slow-roasted meats, giant yorkshire puddings, roast potatoes and seasonal veg. Served all day Sunday until sold out.'
  },
  { 
    id: '4', 
    name: 'Live Music', 
    category: 'Entertainment', 
    tag: 'FRI / SAT', 
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop',
    description: 'The best local bands and DJs spinning tracks until late. Get your dancing shoes on and enjoy the best atmosphere in town.'
  },
  { 
    id: '6', 
    name: 'Heated Marquee', 
    category: 'Al Fresco', 
    tag: 'OUTDOORS', 
    image: 'https://images.unsplash.com/photo-1572569722368-2c938c4b1257?q=80&w=1000&auto=format&fit=crop',
    description: 'Enjoy our large, heated outdoor terrace all year round. The perfect spot for summer drinks or cosy winter evenings under the stars.'
  },
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  // Parallax setup for Experience Section
  const experienceRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: experienceScrollProgress } = useScroll({
    target: experienceRef,
    offset: ["start end", "end start"]
  });
  const experienceParallax = useTransform(experienceScrollProgress, [0, 1], ["-10%", "10%"]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<FeatureItem | null>(null);
  
  const [bookingIndex, setBookingIndex] = useState<number | null>(null);
  const [bookedIndex, setBookedIndex] = useState<number | null>(null);

  // Handle keyboard navigation for modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedFeature) return;
      if (e.key === 'ArrowLeft') navigateFeature('prev');
      if (e.key === 'ArrowRight') navigateFeature('next');
      if (e.key === 'Escape') setSelectedFeature(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedFeature]);

  const handleBooking = (index: number) => {
    setBookingIndex(index);
    setTimeout(() => {
      setBookingIndex(null);
      setBookedIndex(index);
    }, 2000);
  };

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navigateFeature = (direction: 'next' | 'prev') => {
    if (!selectedFeature) return;
    const currentIndex = FEATURES.findIndex(a => a.id === selectedFeature.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % FEATURES.length;
    } else {
      nextIndex = (currentIndex - 1 + FEATURES.length) % FEATURES.length;
    }
    setSelectedFeature(FEATURES[nextIndex]);
  };
  
  return (
    <div className="relative min-h-screen text-white selection:bg-[#f59e0b] selection:text-black cursor-auto md:cursor-none overflow-x-hidden font-sans">
      <CustomCursor />
      <FluidBackground />
      <AIChat />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-center px-6 md:px-8 py-6 pointer-events-none">
        <div className="absolute left-6 md:left-8 z-50 pointer-events-auto">
          {/* Replaced text with Image Logo Placeholder */}
          <img 
            src="https://static.wixstatic.com/media/b6f2c5_80f0668f46994301aa5a8bbf075ccbca~mv2.png/v1/fill/w_232,h_306,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/FIZZY%20MOON%20WHITE.png" 
            alt="Fizzy Moon" 
            className="h-12 md:h-16 w-auto object-contain"
          />
        </div>
        
        {/* Desktop Menu - Glass Style */}
        <div className="hidden md:flex pointer-events-auto bg-black/30 backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] gap-1 z-50 transform translate-y-2 ring-1 ring-white/5">
          {['What\'s On', 'Bookings', 'Contact Us'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item === "What's On" ? 'eat-drink' : item === 'Contact Us' ? 'contact' : item.toLowerCase())}
              className="px-6 py-2.5 rounded-full text-white/90 font-medium text-xs font-heading uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all duration-300 border border-transparent hover:border-white/10 active:scale-95 relative overflow-hidden group"
              data-hover="true"
            >
              <span className="relative z-10">{item}</span>
            </button>
          ))}
        </div>

        {/* Desktop Book Now Button */}
        <button
          onClick={() => scrollToSection('bookings')}
          className="hidden md:flex absolute right-6 md:right-8 pointer-events-auto items-center gap-2 bg-[#f59e0b] text-black px-6 py-3 rounded-full font-bold font-heading text-xs tracking-widest hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(245,158,11,0.4)] z-50 border border-[#f59e0b]"
          data-hover="true"
        >
           <Calendar className="w-4 h-4" />
           <span>BOOK NOW</span>
        </button>

        {/* Mobile Book Now Button */}
        <button
          onClick={() => scrollToSection('bookings')}
          className="md:hidden absolute right-20 pointer-events-auto flex items-center gap-2 bg-[#f59e0b] text-black px-4 py-2 rounded-full font-bold font-heading text-[10px] tracking-widest shadow-[0_0_15px_rgba(245,158,11,0.3)] z-50 border border-[#f59e0b] active:scale-95 transition-transform"
          data-hover="true"
        >
           <Calendar className="w-3 h-3" />
           <span>BOOK</span>
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className="absolute right-6 md:hidden text-white z-50 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 pointer-events-auto shadow-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['What\'s On', 'Bookings', 'Contact Us'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item === "What's On" ? 'eat-drink' : item === 'Contact Us' ? 'contact' : item.toLowerCase())}
                className="text-4xl font-heading font-bold text-white hover:text-[#f59e0b] transition-colors uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
            
            <div className="absolute bottom-10 flex gap-6">
               <a href="#" className="text-white/50 hover:text-white transition-colors">Instagram</a>
               <a href="#" className="text-white/50 hover:text-white transition-colors">Facebook</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden px-4">
        <Bubbles />
        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-6xl pb-24 md:pb-20"
        >
           {/* Date / Location */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex items-center gap-3 md:gap-6 text-xs md:text-base font-mono text-[#f59e0b] tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 bg-black/40 px-6 py-2 rounded-full backdrop-blur-md border border-white/10"
          >
            <span>Leamington Spa</span>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-[#ec4899] rounded-full animate-pulse"/>
            <span>Open Daily</span>
          </motion.div>

          {/* Main Title */}
          <div className="relative w-full flex justify-center items-center flex-col">
            <GradientText 
              text="FIZZY" 
              as="h1" 
              className="text-[15vw] md:text-[14vw] leading-[0.8] font-black tracking-tighter text-center" 
            />
            <GradientText 
              text="MOON" 
              as="h1" 
              className="text-[15vw] md:text-[14vw] leading-[0.8] font-black tracking-tighter text-center" 
            />
            {/* Optimized Orb - Moon like */}
            <motion.div 
               className="absolute -z-20 w-[60vw] h-[60vw] bg-white/5 blur-[60px] rounded-full pointer-events-none will-change-transform"
               animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.2, 0.4, 0.2] }}
               transition={{ duration: 8, repeat: Infinity }}
               style={{ transform: 'translateZ(0)' }}
            />
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-[#f59e0b]/50 to-transparent mt-4 md:mt-8 mb-6 md:mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-base md:text-2xl font-light max-w-xl mx-auto text-white/90 leading-relaxed drop-shadow-lg px-4 uppercase tracking-widest"
          >
            Home Brews • Grill • Live Music
          </motion.p>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-3 text-sm md:text-lg font-mono text-[#22d3ee] tracking-[0.15em] uppercase italic opacity-90"
          >
            Where bubbles never stop flowing
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mt-6 md:mt-8 flex items-center gap-2 text-[#f59e0b]"
          >
            <Trophy className="w-4 h-4 md:w-5 md:h-5" />
            <span className="font-heading font-bold text-xs md:text-sm tracking-[0.2em] uppercase text-white border border-[#f59e0b]/50 px-4 py-2 rounded-full bg-[#f59e0b]/10 backdrop-blur-sm">Multi-Award Winning Bar</span>
            <Trophy className="w-4 h-4 md:w-5 md:h-5" />
          </motion.div>
        </motion.div>

        {/* MARQUEE */}
        <div className="absolute bottom-12 md:bottom-16 left-0 w-full py-4 md:py-6 bg-[#f59e0b] text-black z-20 overflow-hidden border-y-4 border-black shadow-[0_0_40px_rgba(245,158,11,0.2)]">
          <motion.div 
            className="flex w-fit will-change-transform"
            animate={{ x: "-50%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {/* Duplicate content for seamless loop */}
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-3xl md:text-5xl font-heading font-black px-8 flex items-center gap-4">
                    CRAFT BEER <span className="text-white text-2xl md:text-4xl">●</span> 
                    COCKTAILS <span className="text-white text-2xl md:text-4xl">●</span> 
                    SUNDAY ROAST <span className="text-white text-2xl md:text-4xl">●</span>
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* HIGHLIGHTS SECTION (Was Lineup) */}
      <section id="eat-drink" className="relative z-10 py-20 md:py-32">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 px-4">
             <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase leading-[0.9] drop-shadow-lg break-words w-full md:w-auto">
              Taste <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f59e0b] to-[#ec4899]">Makers</span>
            </h2>
            <p className="md:max-w-md text-right text-gray-300 mt-4 md:mt-0">
              From our home brews to our grill, we take flavour seriously.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-l border-white/10 bg-black/20 backdrop-blur-sm">
            {FEATURES.map((feature) => (
              <ArtistCard key={feature.id} artist={feature} onClick={() => setSelectedFeature(feature)} />
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="the-vibe" className="relative z-10 py-20 md:py-32 bg-black/20 backdrop-blur-sm border-t border-white/10 overflow-hidden">
        {/* Decorative blurred circle */}
        <div className="absolute top-1/2 right-[-20%] w-[50vw] h-[50vw] bg-[#ec4899]/20 rounded-full blur-[40px] pointer-events-none will-change-transform" style={{ transform: 'translateZ(0)' }} />

        <div className="max-w-7xl mx-auto px-4 md:px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1">
              <h2 className="text-4xl md:text-7xl font-heading font-bold mb-6 md:mb-8 leading-tight">
                THE <br/> <GradientText text="ATMOSPHERE" className="text-5xl md:text-8xl" />
              </h2>
              <p className="text-lg md:text-xl text-gray-200 mb-8 md:mb-12 font-light leading-relaxed drop-shadow-md">
                Fizzy Moon isn't just a pub; it's a destination. Whether you're here for the freshly brewed ale, the sizzling steaks, or the late-night beats, we bring the energy.
              </p>
              
              <div className="space-y-6 md:space-y-8">
                {[
                  { icon: Beer, title: 'Our Home Brews', desc: 'Enjoy our exclusive selection of home brewed ales.' },
                  { icon: Utensils, title: 'Gastropub Grill', desc: 'Locally sourced meats cooked on the grill.' },
                  { icon: Music, title: 'Live Entertainment', desc: 'Acoustic sessions and DJ sets every weekend.' },
                ].map((feature, i) => (
                  <div
                    key={i} 
                    className="flex items-start gap-6"
                  >
                    <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/5">
                      <feature.icon className="w-6 h-6 text-[#f59e0b]" />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2 font-heading">{feature.title}</h4>
                      <p className="text-sm text-gray-300">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 relative h-[400px] md:h-[700px] w-full order-1 lg:order-2">
              <div className="absolute inset-0 bg-gradient-to-br from-[#f59e0b] to-[#ec4899] rounded-3xl rotate-3 opacity-30 blur-xl" />
              <div ref={experienceRef} className="relative h-full w-full rounded-3xl overflow-hidden border border-white/10 group shadow-2xl">
                <motion.img 
                  src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1000&auto=format&fit=crop" 
                  alt="Bar Interior" 
                  className="h-[140%] w-full object-cover -mt-[20%]"
                  style={{ y: experienceParallax }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 pointer-events-none" />
                
                <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 pointer-events-none">
                  <div className="text-5xl md:text-8xl font-heading font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/0 opacity-50">
                    EST.
                  </div>
                  <div className="text-lg md:text-xl font-bold tracking-widest uppercase mt-2 text-white">
                    Leamington Spa
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BOOKINGS SECTION (Was Tickets) */}
      <section id="bookings" className="relative z-10 py-20 md:py-32 px-4 md:px-6 bg-black/30 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 md:mb-20">
             <h2 className="text-5xl md:text-9xl font-heading font-bold opacity-20 text-white">
               BOOK
             </h2>
             <p className="text-[#f59e0b] font-mono uppercase tracking-widest -mt-3 md:-mt-8 relative z-10 text-sm md:text-base">
               Reserve your spot
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {[
              { 
                name: 'Table Booking', 
                price: 'Standard', 
                color: 'cyan', 
                accent: 'bg-[#06b6d4]/10 border-[#06b6d4]/50', 
                desc: 'Reserve a table in our main bar, restaurant or garden. Perfect for casual drinks, dinner, or Sunday Roast.',
                features: [
                  { icon: Users, text: 'Any Group Size' },
                  { icon: Utensils, text: 'Full Menu & Drinks' },
                  { icon: Calendar, text: 'Instant Confirmation' }
                ]
              },
              { 
                name: 'VIP Hut', 
                price: 'Exclusive', 
                color: 'white', 
                accent: 'bg-white/5', 
                desc: 'The most exclusive experience at Fizzy Moon. Fully sheltered and heated luxury marquee.',
                features: [
                  { icon: Users, text: 'Groups of 4-8 people' },
                  { icon: MapPin, text: 'Sheltered & Heated' },
                  { icon: PartyPopper, text: 'Perfect for Occasions' }
                ]
              },
              { 
                name: 'Luxe Lounge', 
                price: '£50pp', 
                color: 'pink', 
                accent: 'bg-[#ec4899]/10 border-[#ec4899]/50', 
                desc: 'Step into your own VIP hideaway. No hire fee, just a minimum spend across food & drinks.',
                features: [
                  { icon: Users, text: 'Minimum 10 guests' },
                  { icon: Wine, text: 'Dedicated Waitress' },
                  { icon: Crown, text: 'Exclusive Area' }
                ]
              },
              { 
                name: 'Private Hire', 
                price: 'Enquire', 
                color: 'gold', 
                accent: 'bg-[#f59e0b]/10 border-[#f59e0b]/50', 
                desc: 'Tailored for corporate events, product launches, and birthdays. Available for full marquee or venue hire.',
                features: [
                  { icon: Briefcase, text: 'Corporate & Launches' },
                  { icon: Crown, text: 'Full Venue / Marquee' },
                  { icon: PartyPopper, text: 'Birthdays & Parties' }
                ]
              },
            ].map((ticket, i) => {
              const isPurchasing = bookingIndex === i;
              const isPurchased = bookedIndex === i;
              const isDisabled = (bookingIndex !== null) || (bookedIndex !== null);

              return (
                <motion.div
                  key={i}
                  whileHover={isDisabled ? {} : { y: -20 }}
                  className={`relative p-8 md:p-10 border border-white/10 backdrop-blur-md flex flex-col min-h-[450px] md:min-h-[500px] transition-colors duration-300 ${ticket.accent} ${isDisabled && !isPurchased ? 'opacity-50 grayscale' : ''} will-change-transform`}
                  data-hover={!isDisabled}
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  <div className="flex-1">
                    <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 text-white">{ticket.name}</h3>
                    <p className="text-gray-300 mb-6">{ticket.desc}</p>
                    <ul className="space-y-4 md:space-y-6 text-sm text-gray-200">
                      {ticket.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <feature.icon className={`w-5 h-5 ${ticket.color === 'gold' && idx === 2 ? 'text-[#f59e0b]' : 'text-gray-400'}`} /> 
                          {feature.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button 
                    onClick={() => handleBooking(i)}
                    disabled={isDisabled}
                    className={`w-full py-4 text-sm font-bold uppercase tracking-[0.2em] border border-white/20 transition-all duration-300 mt-8 group overflow-hidden relative 
                      ${isPurchased 
                        ? 'bg-[#f59e0b] text-black border-[#f59e0b] cursor-default' 
                        : isPurchasing 
                          ? 'bg-white/20 text-white cursor-wait'
                          : isDisabled 
                            ? 'cursor-not-allowed opacity-50' 
                            : 'text-white cursor-pointer hover:bg-white hover:text-black hover:scale-105 active:scale-95 shadow-lg hover:shadow-white/20'
                      }`}
                  >
                    <span className="relative z-10">
                      {isPurchasing ? 'Processing...' : isPurchased ? 'Confirmed' : 'Book Now'}
                    </span>
                    {/* Only show hover effect if actionable */}
                    {!isDisabled && !isPurchased && !isPurchasing && (
                      <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out -z-0" />
                    )}
                  </button>
                  
                  {isPurchased && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-center mt-3 text-white/40 font-mono"
                    >
                      Demo site: no booking made
                    </motion.p>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* QUICK LINKS SECTION */}
      <section className="relative z-10 py-20 px-4 md:px-6 bg-[#111] border-t border-white/10">
          <div className="max-w-7xl mx-auto">
             {/* Container matching the glass style */}
            <div className="bg-white/5 backdrop-blur-md p-4 md:p-6 rounded-[3rem] border border-white/10 shadow-2xl relative overflow-hidden">
               {/* Background shine effect */}
               <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
                {['FAQ\'S', 'MENUS', 'GIFT CARDS', 'CONTACT US'].map((item) => (
                  <motion.button
                    key={item}
                    onClick={() => item === 'CONTACT US' ? scrollToSection('contact') : null}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-6 md:py-8 rounded-full bg-white/5 text-white text-lg md:text-xl font-bold font-heading tracking-widest uppercase hover:bg-white/15 transition-all duration-300 shadow-lg border border-white/10 backdrop-blur-sm group hover:border-white/20"
                  >
                    {item}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
      </section>

      <footer id="contact" className="relative z-10 border-t border-white/10 py-12 md:py-16 bg-black/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
          <div>
             <div className="font-heading text-3xl md:text-4xl font-bold tracking-tighter mb-4 text-white">FIZZY MOON</div>
             <div className="flex gap-2 text-xs font-mono text-gray-400">
               <span>35 Regent St, Leamington Spa CV32 5EE</span>
             </div>
          </div>
          
          <div className="flex gap-6 md:gap-8 flex-wrap">
            <a href="#" className="text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-white font-bold uppercase text-xs tracking-widest transition-colors cursor-pointer" data-hover="true">
              Facebook
            </a>
          </div>
        </div>
      </footer>

      {/* Feature Detail Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedFeature(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-md cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-5xl bg-[#1a1a1a] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-[#f59e0b]/10 group/modal"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
                data-hover="true"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => { e.stopPropagation(); navigateFeature('prev'); }}
                className="absolute left-4 bottom-4 translate-y-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm"
                data-hover="true"
                aria-label="Previous Feature"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); navigateFeature('next'); }}
                className="absolute right-4 bottom-4 translate-y-0 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm md:right-8"
                data-hover="true"
                aria-label="Next Feature"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Image Side */}
              <div className="w-full md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={selectedFeature.id}
                    src={selectedFeature.image} 
                    alt={selectedFeature.name} 
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-transparent to-transparent md:bg-gradient-to-r" />
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 pb-24 md:p-12 flex flex-col justify-center relative">
                <motion.div
                  key={selectedFeature.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  <div className="flex items-center gap-3 text-[#f59e0b] mb-4">
                     <Calendar className="w-4 h-4" />
                     <span className="font-mono text-sm tracking-widest uppercase">{selectedFeature.tag}</span>
                  </div>
                  
                  <h3 className="text-4xl md:text-6xl font-heading font-bold uppercase leading-none mb-2 text-white">
                    {selectedFeature.name}
                  </h3>
                  
                  <p className="text-lg text-[#ec4899] font-medium tracking-widest uppercase mb-6">
                    {selectedFeature.category}
                  </p>
                  
                  <div className="h-px w-20 bg-white/20 mb-6" />
                  
                  <p className="text-gray-300 leading-relaxed text-lg font-light mb-8">
                    {selectedFeature.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;