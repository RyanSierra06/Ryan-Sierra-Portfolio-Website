import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Home, Code, Users, FlaskConical, Mail } from "lucide-react";

const NavBar = React.memo(() => {
    const [activeSection, setActiveSection] = useState("home");
    const [isScrolling, setIsScrolling] = useState(false);

    const sections = useMemo(() => [
        { id: "home", label: "Home", icon: Home },
        { id: "projects", label: "Projects", icon: Code },
        { id: "clubs", label: "Clubs", icon: Users },
        { id: "research", label: "Research", icon: FlaskConical },
        { id: "contact", label: "Contact", icon: Mail }
    ], []);

    const handleScroll = useCallback(() => {
        if (isScrolling) return;
        
        setIsScrolling(true);
        const scrollPosition = window.scrollY;
        const windowHeight = window.innerHeight;
        const navbarHeight = 80; // Approximate navbar height

        const projectsSection = document.getElementById('projects');
        const clubsSection = document.getElementById('clubs');
        const researchSection = document.getElementById('research');
        const contactSection = document.getElementById('contact');

        const projectsPos = projectsSection?.offsetTop - navbarHeight || windowHeight;
        const clubsPos = clubsSection?.offsetTop - navbarHeight || windowHeight * 3;
        const researchPos = researchSection?.offsetTop - navbarHeight || windowHeight * 5;
        const contactPos = contactSection?.offsetTop - navbarHeight || windowHeight * 7;

        const earlyTriggerOffset = windowHeight * 0.25;

        let newActiveSection = "home";
        if (scrollPosition >= contactPos - earlyTriggerOffset) {
            newActiveSection = "contact";
        } else if (scrollPosition >= researchPos - earlyTriggerOffset) {
            newActiveSection = "research";
        } else if (scrollPosition >= clubsPos - earlyTriggerOffset) {
            newActiveSection = "clubs";
        } else if (scrollPosition >= projectsPos - earlyTriggerOffset) {
            newActiveSection = "projects";
        }

        if (newActiveSection !== activeSection) {
            setActiveSection(newActiveSection);
        }

        setTimeout(() => setIsScrolling(false), 100);
    }, [activeSection, isScrolling]);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [handleScroll]);

    const scrollToSection = useCallback((sectionId) => {
        const navbarHeight = 80;
        const section = document.getElementById(sectionId);
        
        if (section) {
            let targetPosition = section.offsetTop - navbarHeight;

            switch(sectionId) {
                case 'projects':
                    targetPosition += 35;
                    break;
                case 'clubs':
                    targetPosition += 85;
                    break;
                case 'research':
                    targetPosition += 70;
                    break;
                case 'contact':
                    targetPosition += -10;
                    break;
            }

            window.history.pushState(null, null, `/#${sectionId}`);

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        }
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);

        if (window.location.hash) {
            window.history.replaceState(null, null, window.location.pathname);
        }

        setActiveSection("home");
    }, []);

    return (
        <nav
            className="fixed top-0 left-0 right-0 z-50 px-6 py-4 bg-black/90 backdrop-blur-xl border-b border-slate-700/50 shadow-lg"
        >
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between">
                    <motion.div
                        className="flex items-center space-x-3 cursor-pointer"
                        onClick={() => scrollToSection("home")}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                            RS
                        </div>
                        <span className="text-white font-bold text-xl hidden sm:block">
                            Ryan Sierra
                        </span>
                    </motion.div>

                    <div className="flex items-center space-x-1 md:space-x-2">
                        {sections.map((section, index) => {
                            const IconComponent = section.icon;
                            return (
                                <motion.button
                                    key={section.id}
                                    className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                                        activeSection === section.id
                                            ? "text-white"
                                            : "text-slate-300 hover:text-white"
                                    }`}
                                    onClick={() => scrollToSection(section.id)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ 
                                        delay: 0.4 + (index * 0.15), 
                                        duration: 0.4,
                                        ease: [0.25, 0.46, 0.45, 0.94]
                                    }}
                                >
                                    <div 
                                        className={`absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/60 transition-all duration-400 ease-in-out ${
                                            activeSection === section.id ? 'opacity-100' : 'opacity-0'
                                        }`}
                                    />

                                    <div className="relative z-10 flex items-center space-x-2">
                                        <IconComponent className="w-5 h-5" />
                                        <span className="hidden md:block">{section.label}</span>
                                    </div>

                                    <div className={`absolute inset-0 rounded-lg opacity-0 transition-opacity duration-150 ${
                                        activeSection === section.id ? 'hover:opacity-100' : 'hover:opacity-100'
                                    }`} style={{
                                        background: `radial-gradient(circle, ${activeSection === section.id ? '#06b6d4' : '#64748b'}20, transparent 70%)`
                                    }} />
                                </motion.button>
                            );
                        })}
                    </div>

                    <motion.button
                        className="md:hidden p-2 rounded-lg text-white hover:bg-slate-800/50 transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </motion.button>
                </div>
            </div>
        </nav>
    );
});

NavBar.displayName = 'NavBar';

export default NavBar;