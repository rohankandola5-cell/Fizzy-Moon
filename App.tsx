/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Ticket, Globe, Zap, Music, MapPin, Menu, X, Calendar, Play, ChevronLeft, ChevronRight, Utensils, Beer, PartyPopper, Trophy, Users, Crown, Wine, Armchair, Briefcase, Star, Flame, ArrowUpRight, Mic2 } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ArtistCard from './components/ArtistCard';
import Bubbles from './components/Bubbles';
import AIChat from './components/AIChat';
import FAQAccordion from './components/FAQAccordion';
import { FeatureItem } from './types';
import AudioPlayer from './components/AudioPlayer';

// MUSIC SCHEDULE DATA 2026
const MUSIC_SCHEDULE = [
  {
    month: 'January',
    events: [
      { date: 'Fri 2nd', act: 'Jack Price' },
      { date: 'Sat 3rd', act: 'Inner City 3', highlight: true },
      { date: 'Fri 9th', act: 'King Kandola', highlight: true },
      { date: 'Sat 10th', act: 'Tovey Brothers', highlight: true },
      { date: 'Fri 16th', act: 'Jack Price' },
      { date: 'Sat 17th', act: "Tiago & The Amigo's", highlight: true },
      { date: 'Fri 23rd', act: 'Jack Price' },
      { date: 'Sat 24th', act: "The MockingJay's", highlight: true },
      { date: 'Fri 30th', act: 'DJ ROSS', special: true },
      { date: 'Sat 31st', act: 'CARL SINCLAIR', special: true },
    ]
  },
  {
    month: 'February',
    events: [
      { date: 'Fri 6th', act: 'Jack Price' },
      { date: 'Sat 7th', act: 'Cover Buoys', highlight: true },
      { date: 'Fri 13th', act: 'King Kandola', highlight: true },
      { date: 'Sat 14th', act: 'QUEST TRIO', special: true },
      { date: 'Fri 20th', act: 'DJ ROSS', special: true },
      { date: 'Sat 21st', act: 'Back Catalogue', highlight: true },
      { date: 'Fri 27th', act: 'Jack Price' },
      { date: 'Sat 28th', act: 'CARL SINCLAIR', special: true },
    ]
  },
  {
    month: 'March',
    events: [
      { date: 'Fri 6th', act: 'Jack Price' },
      { date: 'Sat 7th', act: 'Chasing Deer', highlight: true },
      { date: 'Fri 13th', act: 'King Kandola', highlight: true },
      { date: 'Sat 14th', act: "Tiago & The Amigo's", highlight: true },
      { date: 'Sun 15th', act: 'COLE (2/3pm)', note: 'MOTHERS DAY !!!', special: true },
      { date: 'Fri 20th', act: 'DJ ROSS', special: true },
      { date: 'Sat 21st', act: 'Viva La Diva (Josie)', highlight: true },
      { date: 'Fri 27th', act: 'Jack Price' },
      { date: 'Sat 28th', act: 'Back Catalogue', highlight: true },
    ]
  },
  {
    month: 'April',
    events: [
      { date: 'Fri 3rd', act: 'Jack Price', note: 'GOOD FRIDAY', special: true },
      { date: 'Sat 4th', act: 'IZZY OWEN TRIO', special: true },
      { date: 'Sun 5th', act: 'Thom Kirkpatrick', note: 'EASTER SUNDAY', special: true },
      { date: 'Fri 10th', act: 'King Kandola', special: true },
      { date: 'Sat 11th', act: 'Andy Flynn Trio', highlight: true },
      { date: 'Fri 17th', act: 'DJ ROSS', special: true },
      { date: 'Sat 18th', act: 'CARL SINCLAIR', special: true },
      { date: 'Fri 24th', act: 'Jack Price' },
      { date: 'Sat 25th', act: 'Cover Buoys', highlight: true },
    ]
  }
];

// DATA SEPARATION
const EVENTS: FeatureItem[] = [
  { 
    id: 'e1', 
    name: 'Live Music Weekends', 
    category: '2026 Lineup', 
    tag: 'MUSIC', 
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1000&auto=format&fit=crop',
    description: 'The best local bands and DJs spinning tracks until late. Check out our 2026 schedule below.'
  },
  { 
    id: 'e2', 
    name: 'Sunday Roast', 
    category: 'Weekly Tradition', 
    tag: 'FOOD EVENT', 
    image: 'https://images.unsplash.com/photo-1606850780554-b55eaefa84cb?q=80&w=1000&auto=format&fit=crop',
    description: 'A proper Sunday Feast. Slow-roasted meats, giant yorkshire puddings, roast potatoes and seasonal veg. Served all day Sunday until sold out.'
  },
  { 
    id: 'e3', 
    name: 'Fizzy Quizzy', 
    category: 'Thursday Nights', 
    tag: 'TRIVIA', 
    image: 'https://images.unsplash.com/photo-1632211910609-02ae6a746532?q=80&w=1000&auto=format&fit=crop',
    description: 'Test your knowledge and win big prizes. Our weekly quiz night is the perfect excuse for a midweek pint.'
  }
];

const FOOD_DRINK: FeatureItem[] = [
  { 
    id: 'f1', 
    name: 'Fizzy Burger', 
    category: 'Signature Grill', 
    tag: 'FOOD', 
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop',
    description: 'Our legendary house burger. Double smashed beef patty, smoked bacon, american cheese, and our secret Fizzy sauce. Served with rosemary fries.'
  },
  { 
    id: 'f2', 
    name: 'Home Brews', 
    category: 'Craft Ales', 
    tag: 'DRINK', 
    image: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?q=80&w=1000&auto=format&fit=crop',
    description: 'Taste our exclusive home brews. From hoppy IPAs to smooth Stouts, our rotation changes weekly. Brewed right here.'
  },
  { 
    id: 'f3', 
    name: 'Steak Night', 
    category: 'Butchers Block', 
    tag: 'GRILL', 
    image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?q=80&w=1000&auto=format&fit=crop',
    description: 'Locally sourced cuts, cooked over open flame. Served with all the trimmings. Perfect for date night.'
  }
];

const ALL_FEATURES = [...EVENTS, ...FOOD_DRINK];

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
    const currentIndex = ALL_FEATURES.findIndex(a => a.id === selectedFeature.id);
    let nextIndex;
    if (direction === 'next') {
      nextIndex = (currentIndex + 1) % ALL_FEATURES.length;
    } else {
      nextIndex = (currentIndex - 1 + ALL_FEATURES.length) % ALL_FEATURES.length;
    }
    setSelectedFeature(ALL_FEATURES[nextIndex]);
  };
  
  const navItems = ['What\'s On', 'Contact Us', 'FAQs', 'Menus & Gift Cards'];
  const getSectionId = (item: string) => {
    switch (item) {
      case 'What\'s On': return 'whats-on';
      case 'Contact Us': return 'contact';
      case 'FAQs': return 'faq';
      case 'Menus & Gift Cards': return 'eat-drink';
      default: return 'hero';
    }
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-orange-500 selection:text-black cursor-auto md:cursor-none overflow-x-hidden font-sans">
      <CustomCursor />
      <AIChat />
      <AudioPlayer />
      <FluidBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-center px-6 md:px-8 py-6 pointer-events-none">
        <div className="absolute left-6 md:left-8 z-50 pointer-events-auto">
          <img 
            src="https://static.wixstatic.com/media/b6f2c5_80f0668f46994301aa5a8bbf075ccbca~mv2.png/v1/fill/w_232,h_306,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/FIZZY%20MOON%20WHITE.png" 
            alt="Fizzy Moon" 
            className="h-12 md:h-16 w-auto object-contain cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex pointer-events-auto bg-black/30 backdrop-blur-xl border border-white/10 p-1.5 rounded-full shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] gap-1 z-50 transform translate-y-2 ring-1 ring-white/5">
          {navItems.map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(getSectionId(item))}
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
          className="hidden md:flex absolute right-6 md:right-8 pointer-events-auto items-center gap-2 bg-orange-500 text-black px-6 py-3 rounded-full font-bold font-heading text-xs tracking-widest hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.4)] z-50 border border-orange-500"
          data-hover="true"
        >
           <Calendar className="w-4 h-4" />
           <span>BOOK NOW</span>
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className="absolute right-6 md:hidden text-white z-50 w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-md rounded-full border border-white/20 pointer-events-auto shadow-lg"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-[#1a1a1a]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(getSectionId(item))}
                className="text-3xl font-heading font-bold text-white hover:text-orange-500 transition-colors uppercase bg-transparent border-none text-center px-4"
              >
                {item}
              </button>
            ))}
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
            className="flex items-center gap-3 md:gap-6 text-xs md:text-base font-mono text-orange-500 tracking-[0.2em] md:tracking-[0.3em] uppercase mb-4 bg-black/40 px-6 py-2 rounded-full backdrop-blur-md border border-white/10"
          >
            <span>Leamington Spa</span>
            <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-500 rounded-full animate-pulse"/>
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
            {/* Optimized Orb - Moon like - Warm Orange Glow */}
            <motion.div 
               className="absolute -z-20 w-[60vw] h-[60vw] bg-orange-600/10 blur-[60px] rounded-full pointer-events-none will-change-transform"
               animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.2, 0.4, 0.2] }}
               transition={{ duration: 8, repeat: Infinity }}
               style={{ transform: 'translateZ(0)' }}
            />
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
             className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent mt-4 md:mt-8 mb-6 md:mb-8"
          />

          <motion.button
            onClick={() => scrollToSection('whats-on')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="relative group px-8 py-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/20 text-white font-medium tracking-widest uppercase hover:bg-white/10 transition-all duration-300 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative z-10 drop-shadow-md">What's ON at Fizzy</span>
          </motion.button>
        </motion.div>

        {/* MARQUEE */}
        <div className="absolute bottom-12 md:bottom-16 left-0 w-full py-4 md:py-6 bg-orange-500 text-black z-20 overflow-hidden border-y-4 border-black shadow-[0_0_40px_rgba(249,115,22,0.2)]">
          <motion.div 
            className="flex w-fit will-change-transform"
            animate={{ x: "-50%" }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          >
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(4)].map((_, i) => (
                  <span key={i} className="text-3xl md:text-5xl font-heading font-black px-8 flex items-center gap-4">
                    CRAFT BEER <span className="text-white text-2xl md:text-4xl">●</span> 
                    COCKTAILS <span className="text-white text-2xl md:text-4xl">●</span> 
                    LIVE MUSIC <span className="text-white text-2xl md:text-4xl">●</span> 
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* BOOKINGS SECTION (Moved to Top) */}
      <section id="bookings" className="relative z-10 py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-[#111] to-[#1a1a1a] border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
             <h2 className="text-5xl md:text-9xl font-heading font-bold opacity-10 text-white leading-none">
               RESERVE
             </h2>
             <div className="relative -mt-6 md:-mt-16 z-10">
               <p className="text-3xl md:text-5xl font-elegant italic text-white mb-2">Secure your spot</p>
               <p className="text-orange-500 font-mono uppercase tracking-widest text-sm md:text-base">
                 Choose your experience
               </p>
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                name: 'Standard Booking', 
                subtitle: 'Main Bar & Garden',
                price: 'Free', 
                color: 'cyan', 
                accent: 'bg-cyan-500/5 border-cyan-500/30 hover:border-cyan-500', 
                desc: 'Soak up the vibe in our main bar or heated garden marquee. Casual, lively, and perfect for getting together.',
                features: [
                  { icon: Users, text: 'Groups of 2 - Large Parties' },
                  { icon: Utensils, text: 'Full Menu Available' },
                ]
              },
              { 
                name: 'The VIP Hut', 
                subtitle: 'Celebration Central',
                price: 'Book Now', 
                color: 'gold', 
                accent: 'bg-gradient-to-br from-orange-500/20 to-black border-orange-500/60 hover:border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.1)]', 
                desc: 'The best seat in the house. Located centrally in our heated marquee. Perfect for birthdays and those who want to be seen.',
                features: [
                  { icon: Crown, text: 'Center of Action' },
                  { icon: Flame, text: 'Heated & Covered' },
                  { icon: PartyPopper, text: 'Perfect for Birthdays' }
                ]
              },
              { 
                name: 'The Luxe Lounge', 
                subtitle: 'Ultra Exclusive',
                price: 'Private Hire', 
                color: 'pink', 
                accent: 'bg-red-500/5 border-red-500/30 hover:border-red-500', 
                desc: 'Your private sanctuary. Host up to 25 guests in our most exclusive hidden area. Perfect for private parties.',
                features: [
                  { icon: Users, text: 'Up to 25 Guests' },
                  { icon: Star, text: 'Private Area' },
                  { icon: Wine, text: 'Bottle Service Avail.' }
                ]
              },
            ].map((ticket, i) => {
              const isPurchasing = bookingIndex === i;
              const isPurchased = bookedIndex === i;
              const isDisabled = (bookingIndex !== null) || (bookedIndex !== null);

              return (
                <motion.div
                  key={i}
                  whileHover={isDisabled ? {} : { y: -15 }}
                  className={`relative p-8 md:p-10 border backdrop-blur-md flex flex-col min-h-[500px] transition-all duration-300 ${ticket.accent} ${isDisabled && !isPurchased ? 'opacity-50 grayscale' : ''} rounded-2xl group`}
                >
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                       <h3 className="text-2xl md:text-3xl font-heading font-bold text-white leading-none">{ticket.name}</h3>
                       {ticket.color === 'gold' && <Crown className="text-orange-500 w-6 h-6 animate-pulse" />}
                    </div>
                    <p className={`text-sm font-bold uppercase tracking-widest mb-6 ${ticket.color === 'gold' ? 'text-orange-500' : ticket.color === 'pink' ? 'text-red-500' : 'text-cyan-500'}`}>
                      {ticket.subtitle}
                    </p>
                    
                    <p className="text-gray-300 mb-8 leading-relaxed font-light text-lg">{ticket.desc}</p>
                    
                    <div className="h-px w-full bg-white/10 mb-8" />

                    <ul className="space-y-5 text-sm text-gray-200">
                      {ticket.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-4">
                          <div className={`p-2 rounded-full bg-white/5`}>
                             <feature.icon className={`w-4 h-4 ${ticket.color === 'gold' ? 'text-orange-500' : ticket.color === 'pink' ? 'text-red-500' : 'text-cyan-500'}`} /> 
                          </div>
                          {feature.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button 
                    onClick={() => handleBooking(i)}
                    disabled={isDisabled}
                    className={`w-full py-4 text-sm font-bold uppercase tracking-[0.2em] border transition-all duration-300 mt-8 rounded-xl
                      ${ticket.color === 'gold' ? 'bg-orange-500 text-black border-orange-500 hover:bg-white hover:border-white' : 'border-white/20 text-white hover:bg-white hover:text-black'}
                      ${isPurchased ? '!bg-green-500 !text-white !border-green-500' : ''}
                      ${isPurchasing ? 'opacity-70 cursor-wait' : ''}
                    `}
                  >
                    {isPurchasing ? 'Processing...' : isPurchased ? 'Confirmed' : ticket.price}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* WHAT'S ON SECTION (Events) */}
      <section id="whats-on" className="relative z-10 py-20 md:py-32 bg-[#1a1a1a] border-t border-white/5">
         <div className="max-w-[1600px] mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center mb-16">
              <span className="text-orange-500 font-mono text-sm tracking-[0.3em] uppercase mb-4">Live & Loud</span>
              <h2 className="text-5xl md:text-8xl font-heading font-bold uppercase text-center">
                What's <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">On</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-white/10 bg-black/20 backdrop-blur-sm">
              {EVENTS.map((feature) => (
                <ArtistCard key={feature.id} artist={feature} onClick={() => setSelectedFeature(feature)} />
              ))}
            </div>
         </div>
      </section>

      {/* MERGED SECTION: MORE THAN A PUB + TASTE MAKERS */}
      <section id="eat-drink" className="relative z-10 py-24 md:py-32 bg-[#111] border-t border-white/10">
        <div className="max-w-[1600px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end mb-16 px-4">
             <div>
               <div className="flex items-center gap-4 mb-6">
                  <span className="text-orange-500 font-mono text-sm tracking-[0.3em] uppercase">Taste Makers</span>
                  <div className="h-px w-12 bg-orange-500/50" />
               </div>
               <h2 className="text-5xl md:text-7xl font-heading font-bold uppercase leading-none mb-6">
                 More Than <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">A Pub</span>
               </h2>
               <p className="text-lg text-gray-300 font-light leading-relaxed max-w-xl mb-8">
                 Fizzy Moon is an extension of your night out. A place where the drinks are crafted in-house, the food is fire-kissed, and the music never stops.
               </p>
               
               {/* Feature Icons */}
               <div className="flex flex-wrap gap-8 border-t border-white/10 pt-6">
                  {[
                    { icon: Beer, label: "Home Brews" },
                    { icon: Flame, label: "Fire Grill" },
                    { icon: Music, label: "Live Music" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/80 group">
                      <div className="p-2 rounded-full bg-white/5 group-hover:bg-orange-500 transition-colors duration-300">
                        <item.icon className="w-4 h-4 text-orange-500 group-hover:text-black transition-colors duration-300" />
                      </div>
                      <span className="font-bold uppercase text-xs tracking-widest">{item.label}</span>
                    </div>
                  ))}
               </div>
             </div>

             <div className="flex justify-start lg:justify-end pb-2">
                <button 
                  onClick={() => scrollToSection('bookings')}
                  className="group relative px-8 py-4 bg-white/5 border border-white/20 text-white font-bold tracking-[0.2em] uppercase transition-all duration-300 hover:bg-orange-500 hover:border-orange-500 hover:text-black overflow-hidden rounded-full"
                  data-hover="true"
                >
                   <span className="relative z-10 flex items-center gap-2">
                     View Full Menu <ArrowUpRight className="w-4 h-4" />
                   </span>
                </button>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-white/10 bg-white/5 backdrop-blur-sm">
            {FOOD_DRINK.map((feature) => (
              <ArtistCard key={feature.id} artist={feature} onClick={() => setSelectedFeature(feature)} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="relative z-10 py-24 bg-[#0a0a0a] border-t border-white/10">
          <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-16">
                  <h2 className="text-4xl md:text-6xl font-heading font-bold uppercase mb-4">
                      Common <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">Questions</span>
                  </h2>
                  <p className="text-gray-400">Everything you need to know before you go.</p>
              </div>
              <FAQAccordion />
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
            className="fixed inset-0 z-[60] flex items-center justify-center p-0 md:p-4 bg-black/80 backdrop-blur-md cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-[#1a1a1a] border-t md:border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-orange-500/10 group/modal h-[100dvh] md:h-[85vh] rounded-none md:rounded-2xl"
            >
              <button
                onClick={() => setSelectedFeature(null)}
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors"
                data-hover="true"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="w-full md:w-1/2 h-56 md:h-full relative overflow-hidden shrink-0 group/image">
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

                {/* Mobile Navigation Controls - Moved here to clear text area */}
                <div className="absolute bottom-4 left-4 right-4 flex justify-between md:hidden z-20">
                     <button
                        onClick={(e) => { e.stopPropagation(); navigateFeature('prev'); }}
                        className="p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm"
                        aria-label="Previous Feature"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); navigateFeature('next'); }}
                        className="p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm"
                        aria-label="Next Feature"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                </div>
              </div>

              {/* Desktop Navigation Controls */}
              <button
                onClick={(e) => { e.stopPropagation(); navigateFeature('prev'); }}
                className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm"
                data-hover="true"
                aria-label="Previous Feature"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); navigateFeature('next'); }}
                className="hidden md:block absolute right-4 md:right-8 bottom-8 md:top-1/2 md:bottom-auto md:-translate-y-1/2 z-20 p-3 rounded-full bg-black/50 text-white hover:bg-white hover:text-black transition-colors border border-white/10 backdrop-blur-sm"
                data-hover="true"
                aria-label="Next Feature"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              <div className="w-full md:w-1/2 flex flex-col relative h-full min-h-0 bg-[#1a1a1a]">
                <motion.div
                  key={selectedFeature.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="flex flex-col h-full w-full p-4 md:p-12"
                >
                  <div className="flex items-center gap-3 text-orange-500 mb-2 md:mb-4 shrink-0">
                     <Calendar className="w-4 h-4" />
                     <span className="font-mono text-xs md:text-sm tracking-widest uppercase">{selectedFeature.tag}</span>
                  </div>
                  
                  <h3 className="text-3xl md:text-5xl font-heading font-bold uppercase leading-none mb-2 text-white shrink-0">
                    {selectedFeature.name}
                  </h3>
                  
                  <p className="text-base md:text-lg text-amber-500 font-medium tracking-widest uppercase mb-6 shrink-0">
                    {selectedFeature.category}
                  </p>
                  
                  <div className="h-px w-20 bg-white/20 mb-6 shrink-0" />
                  
                  {/* Conditional Rendering: Schedule for Music Event, Text for others */}
                  {selectedFeature.id === 'e1' ? (
                     <div className="flex-1 overflow-y-auto pr-2 -mr-2 overscroll-contain pb-safe" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.2) transparent' }}>
                        <p className="text-gray-300 leading-relaxed text-sm font-light mb-8">
                          {selectedFeature.description}
                        </p>
                        
                        <h4 className="text-lg md:text-xl font-heading font-bold text-white sticky top-0 bg-[#1a1a1a] py-3 z-20 border-b border-white/10 shadow-xl flex items-center gap-2">
                          <Music className="w-4 h-4 md:w-5 md:h-5 text-orange-500" />
                          2026 LINEUP
                        </h4>
                        
                        <div className="space-y-1 pb-24">
                          {MUSIC_SCHEDULE.map((month, idx) => (
                             <div key={idx} className="relative">
                               <div className="sticky top-[3.25rem] z-10 bg-[#1a1a1a] py-2 md:py-3 border-b border-white/5 flex items-center">
                                 <div className="w-2 h-2 rounded-full bg-orange-500 mr-2"></div>
                                 <h5 className="text-orange-500 font-mono font-bold uppercase tracking-widest text-xs md:text-sm">
                                   {month.month}
                                 </h5>
                               </div>
                               <div className="pt-2 pb-4 space-y-2">
                                 {month.events.map((event, i) => (
                                   <div key={i} className={`flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-lg border ${event.special ? 'bg-orange-500/5 border-orange-500/30' : 'bg-white/5 border-transparent'} hover:bg-white/10 transition-colors group/item`}>
                                      <div className="w-16 md:w-20 shrink-0 flex flex-col justify-center border-r border-white/10 pr-3 md:pr-4">
                                        <span className="font-heading font-bold text-white/90 text-xs md:text-sm leading-tight">{event.date.split(' ')[0]}</span>
                                        <span className="font-mono text-xl md:text-2xl font-bold text-white leading-none">{event.date.split(' ')[1]}</span>
                                      </div>
                                      <div className="flex-1">
                                        <div className={`font-bold uppercase tracking-wide text-base md:text-lg leading-tight ${event.special ? 'text-orange-500' : event.highlight ? 'text-white' : 'text-gray-300 group-hover/item:text-white'}`}>
                                          {event.act}
                                        </div>
                                        {event.note && (
                                          <div className="text-[10px] md:text-xs text-amber-500 font-bold uppercase mt-1 tracking-wider">{event.note}</div>
                                        )}
                                      </div>
                                   </div>
                                 ))}
                               </div>
                             </div>
                          ))}
                        </div>
                     </div>
                  ) : (
                    <div className="overflow-y-auto pr-2 -mr-2 pb-12" style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.2) transparent' }}>
                      <p className="text-gray-300 leading-relaxed text-base md:text-lg font-light mb-8">
                        {selectedFeature.description}
                      </p>
                    </div>
                  )}

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