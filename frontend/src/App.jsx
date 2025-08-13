import React, { useMemo, useCallback, useEffect, useRef, useState } from "react";
import ProjectCard from "./components/ProjectCard.jsx";
import ClubCard from "./components/ClubCard.jsx";
import ResearchCard from "./components/ResearchCard.jsx";
import NavBar from "./components/NavBar.jsx";
import EducationCard from "./components/EducationCard.jsx";
import AboutMeCard from "./components/AboutMeCard.jsx";
import SplitText from "./components/SplitText.jsx";
import { motion } from "framer-motion";
import emailjs from '@emailjs/browser';
import MountainRangeBackground from "./components/MountainRangeBackground.jsx";

const App = React.memo(() => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const form = useRef(null);

    useEffect(() => {
        console.log('EmailJS configured with public key');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus(null);

        const formData = new FormData(e.target);
        const name = formData.get('user_name');
        const email = formData.get('user_email');
        const message = formData.get('message');
        const time = new Date().toLocaleString();

        e.target.querySelector('input[name="from_name"]').value = name;
        e.target.querySelector('input[name="from_email"]').value = email;
        e.target.querySelector('input[name="time"]').value = time;

        try {
            console.log('Sending email using sendForm...');
            console.log('Form data:', { name, email, message, time });
            
            const result = await emailjs.sendForm(
                'service_pth15tj',
                'template_9qj25ph',
                form.current,
                {
                    publicKey: 'Z8m8bjRU7ho8kuKGF',
                }
            );
            
            console.log('EmailJS Result:', result);
            setSubmitStatus('success');
            e.target.reset();
        } catch (error) {
            console.error('EmailJS Error:', error);
            console.error('Error details:', {
                message: error.message,
                text: error.text,
                status: error.status
            });
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animate-triggered');
                    }
                });
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        const animatedElements = document.querySelectorAll('[class*="scroll-animate"]');
        animatedElements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    const projects = useMemo(() => [
        {
            numImages: 4,
            imageFolderPath: "/Twitch Website Images/",
            imageBaseName: "Twitch-Website-",
            title: "Twitch Weekly Recap Website",
            description: "A full-stack web app delivering personalized recaps of a user’s followed Twitch streamers, " +
                "featuring automated Twitch API data collection, interactive dashboards with highlights and top clips, " +
                "Twitch OAuth authentication, and curated playlists. Aggregates VODs, clips, and analytics into " +
                "comprehensive daily summaries.",
            technologies: ["React", "Node.js", "Tailwind CSS", "Twitch API", "OAuth", "Vercel", "REST API"],
            icon: "/Twitch Website Images/Twitch Website Icon.png",
            link: "https://twitch-weekly-recap.vercel.app/",
            github: "https://github.com/RyanSierra06/Twitch-Weekly-Recap-Website",
            color: "purple"
        },
        {
            numImages: 4,
            imageFolderPath: "/French Horn Website Images/",
            imageBaseName: "French Horn-Website-",
            title: "French Horn Practice Website",
            description: "A 33‑day French horn practice platform for orchestral audition prep, featuring daily curated " +
                "excerpts from Bach, Beethoven, Strauss, etc. Includes integrated sheet music viewer, synchronized " +
                "audio playback, personalized practice calendar, progress tracking, and favorite management, providing " +
                "a structured, goal‑driven path for professional audition readiness.",
            technologies: ["React", "Node.js", "Tailwind CSS", "MongoDB", "Vite", "Vercel", "REST API"],
            icon: "/French Horn Website Images/French Horn Website Icon.png",
            link: "https://33-days-of-french-horn.vercel.app/",
            github: "https://github.com/RyanSierra06/French-Horn-Practice-Website",
            color: "cream"
        },
        {
            numImages: 2,
            imageFolderPath: "/Formula 1 Project Images/",
            imageBaseName: "Formula 1-project-",
            title: "Formula 1 2025 Race Result Prediction Model",
            description: "A machine learning model predicting Formula 1 race results using historical OpenF1 API data. " +
                "Utilizes Random Forest regression with analysis of practice, qualifying, and sprint sessions, " +
                "achieving predictions within ~3 positions. Processes lap times, sector splits, and team comparisons " +
                "to model driver trends and circuit‑specific performance.",
            technologies: ["Python", "Scikit-learn", "Random Forest", "Data Analysis", "Pandas", "OpenF1 API"],
            icon: "Formula 1 logo.png",
            link: "https://github.com/RyanSierra06/Formula-1-2025-Race-Result-Prediction-Model",
            github: "https://github.com/RyanSierra06/Formula-1-2025-Race-Result-Prediction-Model",
            color: "red"
        }
    ], []);

    const clubs = useMemo(() => [
        {
            title: "Purdue CS Undergraduate Student Board",
            description: "Selected from a 5% acceptance rate into Purdue's premier Computer Science organization" +
                ", focused to strengthening student-faculty connections and enhancing the CS student experience through " +
                "community-driven initiatives. Support 700+ first-year students by teaching CS193 (Intro to CS tools), " +
                "while leading mental health initiatives and expanding access to research by connecting students with " +
                "faculty projects and promoting early involvement.",
            role: "CS193 Lead Instructor, Mental Health Initiative Lead, Research Resources Initiative Lead, Member",
            members: "20+",
            achievements: "700+",
            membersLabel: "Members",
            achievementsLabel: "Student Taught",
            logo: "/Club Icons/Purdue USB Icon.png",
            color: "yellow",
            date: "February 2025 - Present"
        },
        {
            title: "Launchpad Purdue",
            description: "Provide a one-on-one, semester-long mentorship program to help first-year CS students acclimate " +
                "to life at Purdue and receive guidance on building their first technical full stack project. " +
                "Host community-building and technical skill development events throughout the semester to equip " +
                "incoming students with the knowledge and connections needed to thrive.",
            role: "Mentor, Member",
            members: "40+",
            achievements: "1 on 1",
            membersLabel: "Members",
            achievementsLabel: "Mentoring",
            logo: "/Club Icons/Launchpad Purdue Icon.png",
            color: "blue",
            date: "March 2025 - Present"
        },
        {
            title: "Purdue Bands And Orchestras",
            description: "Principal Horn of the Purdue Wind Ensemble for 3 consecutive semesters, selected to " +
                "perform at the Kennedy Center and in Spain, awarded the Leath Scholarship " +
                "(1 of 300 recipients), as well as the David Foertsch Memorial Brass Award. Perform with Boiler Brass, " +
                "Purdue's elite basketball pep band, earning the \"Outstanding Audition\" award and supporting " +
                "the team at high-energy home games.",
            role: "Wind Ensemble Principal Horn, Boiler Brass Member",
            members: "1st",
            achievements: "$6,500",
            membersLabel: "chair",
            achievementsLabel: "In Scholarships",
            logo: "/Club Icons/Purdue Bands And Orchestras Icon.png",
            color: "white",
            date: "August 2024 - Present"
        }
    ], []);

    const researchProjects = useMemo(() => [
        {
            title: "GeoML Environmental Prediction Research",
            description: "During the Fall semester last year I collaborated on a project leveraging NASA's satellite data and GEOS-FP atmospheric " +
                "data to predict global concentrations of pollutants like dust, sea salt, organic carbon, " +
                "brown carbon, and sulfates, aiming to extend reliable air quality forecasting to underserved " +
                "and sensor-limited regions. Integrated ground-based monitoring data to refine model accuracy, " +
                "utilized MLflow to visualize performance, and developed tools to detect and correct errors in " +
                "GEOS-FP-generated files.",
            methodology: "Environmental Science, Machine Learning, Python, NASA Data, GEOS-FP Data, MLflow",
            results: "Global Scale",
            publications: "Air Quality",
            field: "Environmental Science",
            status: "ongoing",
            color: "green",
            date: "September 2024 - January 2025"
        }
    ], []);

    const fadeInUp = useMemo(() => ({
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    }), []);

    const projectSlideLeft = useMemo(() => ({
        hidden: { x: "-100px", opacity: 0 },
        visible: { x: "0px", opacity: 1 }
    }), []);

    const projectSlideRight = useMemo(() => ({
        hidden: { x: "100px", opacity: 0 },
        visible: { x: "0px", opacity: 1 }
    }), []);


    const fastTransition = useMemo(() => ({
        type: "tween",
        duration: 0.2,
        ease: "easeOut"
    }), []);

    const springTransition = useMemo(() => ({
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 0.2
    }), []);

    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            <MountainRangeBackground />
            <NavBar />
            <div className="relative w-full min-h-screen flex flex-col items-center justify-center scroll-smooth">
                <section id="home" className="min-h-screen flex flex-col items-center justify-center space-y-10 py-20">
                    <div className="w-full max-w-6xl mx-auto px-4">
                        <motion.div
                            variants={fadeInUp}
                            initial="hidden"
                            animate="visible"
                            transition={fastTransition}
                            className="text-center mb-10"
                        >
                            <div className="relative mb-16">
                                <SplitText
                                    text="Hello, I'm Ryan"
                                    className="text-white text-8xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent pb-1"
                                    delay={80}
                                    duration={0.5}
                                    ease="power3.out"
                                    splitType="chars"
                                    from={{ opacity: 0, y: 60 }}
                                    to={{ opacity: 1, y: 0 }}
                                    threshold={0.1}
                                    rootMargin="-50px"
                                    textAlign="center"
                                />
                                <div className="flex items-center justify-center space-x-4">
                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                    <div className="flex-1 h-1 bg-white rounded-full max-w-4xl"></div>
                                    <div className="w-3 h-3 bg-white rounded-full"></div>
                                </div>
                                <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-60 animate-pulse"></div>
                                <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60 animate-pulse" style={{animationDelay: '0.5s'}}></div>
                                <div className="absolute top-1/2 -right-12 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
                                <div className="absolute top-1/2 -left-12 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1.5s'}}></div>
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                            <motion.div
                                variants={fadeInUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                transition={fastTransition}
                                className="h-full"
                            >
                                <motion.div
                                    variants={fadeInUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                                    className="h-full"
                                >
                                    <EducationCard />
                                </motion.div>
                            </motion.div>

                            <motion.div
                                variants={fadeInUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                transition={fastTransition}
                                className="h-full"
                            >
                                <motion.div
                                    variants={fadeInUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true, amount: 0.3 }}
                                    transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                                    className="h-full"
                                >
                                    <AboutMeCard />
                                </motion.div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section id="projects" className="min-h-screen flex flex-col items-center justify-center space-y-10 py-20 pb-0">
                    <motion.div
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        transition={fastTransition}
                        className="text-center mb-10"
                    >
                        <h2 className="text-6xl font-bold text-white mb-4">Projects</h2>
                        <div className="flex items-center justify-center space-x-4">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                            <div className="flex-1 h-1 bg-white rounded-full max-w-4xl"></div>
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                    </motion.div>

                    <div className="w-full max-w-6xl mx-auto px-4 space-y-8">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                variants={index === 0 || index === 2 ? projectSlideLeft : projectSlideRight}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{
                                    ...springTransition,
                                    delay: index * 0.1
                                }}
                            >
                                <ProjectCard {...project} />
                            </motion.div>
                        ))}
                    </div>
                </section>

                <section id="clubs" className="min-h-screen flex flex-col items-center justify-center space-y-10 py-28 pb-0">
                    <div className="text-center mb-10 opacity-0 translate-y-8 scroll-animate-fade-in-up">
                        <h2 className="text-6xl font-bold text-white mb-4">Clubs & Activities</h2>
                        <div className="flex items-center justify-center space-x-4 mb-6">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                            <div className="flex-1 h-1 bg-white rounded-full max-w-4xl"></div>
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                    </div>

                    <div className="w-full max-w-6xl mx-auto px-4 space-y-8">
                        {clubs.map((club, index) => (
                            <div
                                key={club.title}
                                className="opacity-0 scale-95 scroll-animate-slide-in-from-bottom"
                                style={{ animationDelay: `${index * 0.08}s` }}
                            >
                                <ClubCard {...club} />
                            </div>
                        ))}
                    </div>
                </section>

                <section id="research" className="min-h-screen flex flex-col items-center justify-center space-y-10 py-12">
                    <div className="text-center mb-10 opacity-0 translate-y-8 scroll-animate-fade-in-up">
                        <h2 className="text-6xl font-bold text-white mb-4">Research</h2>
                        <div className="flex items-center justify-center space-x-4 mb-6">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                            <div className="flex-1 h-1 bg-white rounded-full max-w-4xl"></div>
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                    </div>

                    <div className="w-full max-w-6xl mx-auto px-4 space-y-8">
                        {researchProjects.map((project, index) => (
                            <div
                                key={project.title}
                                className="opacity-0 scale-95 scroll-animate-rotate-in-from-side"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <ResearchCard {...project} />
                            </div>
                        ))}
                    </div>
                </section>

                <section id="contact" className="flex flex-col items-center justify-center space-y-10 py-0">
                    <div className="text-center mb-10 opacity-0 translate-y-8 scroll-animate-fade-in-up">
                        <h2 className="text-6xl font-bold text-white mb-4">Contact</h2>
                        <div className="flex items-center justify-center space-x-4">
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                            <div className="flex-1 h-1 bg-white rounded-full max-w-4xl"></div>
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                        </div>
                    </div>

                    <div className="w-full max-w-[2000px] mx-auto px-4">
                        <div className="opacity-0 translate-y-8 scroll-animate-fade-in-up">
                            <div className="w-full max-w-[1800px] mx-auto bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl p-12 border border-slate-700/50 shadow-2xl" style={{width: '45vw', maxWidth: '900px'}}>
                            <form 
                                ref={form}
                                onSubmit={handleSubmit}
                                className="w-full space-y-8"
                            >
                                <div>
                                    <label htmlFor="name" className="block text-slate-300 text-lg font-medium mb-3">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="user_name"
                                        required
                                        className="w-full px-6 py-4 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 text-lg"
                                        placeholder="What's your name?"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-slate-300 text-lg font-medium mb-3">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="user_email"
                                        required
                                        className="w-full px-6 py-4 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 text-lg"
                                        placeholder="What's your email?"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-slate-300 text-lg font-medium mb-3">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows="10"
                                        className="w-full px-6 py-4 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-300 resize-none text-lg"
                                        placeholder="What's your message?"
                                    ></textarea>
                                </div>

                                <input type="hidden" name="from_name" value="" />
                                <input type="hidden" name="from_email" value="" />
                                <input type="hidden" name="time" value="" />
                                <div className="flex justify-center pt-4">
                                    <motion.button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`px-12 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 ${
                                            isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                        }`}
                                        whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                                        whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                                    >
                                        {isSubmitting ? 'Sending...' : 'Send Message'}
                                    </motion.button>
                                </div>

                                {submitStatus && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`text-center p-4 rounded-xl ${
                                            submitStatus === 'success' 
                                                ? 'bg-green-500/20 border border-green-500/40 text-green-300' 
                                                : 'bg-red-500/20 border border-red-500/40 text-red-300'
                                        }`}
                                    >
                                        {submitStatus === 'success' 
                                            ? '✅ Message sent successfully!' 
                                            : '❌ Failed to send message. Please try again.'
                                        }
                                    </motion.div>
                                )}
                            </form>
                        </div>

                        <div className="flex justify-center space-x-6 mt-8 pb-20">
                            <motion.a
                                href="https://linkedin.com/in/ryan-sierra"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 flex items-center space-x-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                </svg>
                                <span>LinkedIn</span>
                            </motion.a>
                            <motion.a
                                href="https://github.com/RyanSierra06"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-300 flex items-center space-x-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                                <span>GitHub</span>
                            </motion.a>
                            <motion.a
                                href="/Ryan Sierra Resume.pdf"
                                download="Ryan Sierra Resume.pdf"
                                className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 flex items-center space-x-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span>Resume</span>
                            </motion.a>
                        </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
});

App.displayName = 'App';

export default App;
