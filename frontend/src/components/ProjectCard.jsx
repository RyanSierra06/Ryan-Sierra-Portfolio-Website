import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Card, CardBody } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

const ProjectCard = React.memo(({ title, description, technologies, numImages, imageFolderPath, imageBaseName, imageExt = "png", icon, link, github, color = "cyan" }) => {
    const [currentIndex, setCurrentIndex] = useState(1);
    const [direction, setDirection] = useState(0);
    const [images, setImages] = useState({});

    const colors = useMemo(() => ({
        cyan: { primary: "#06b6d4", glow: "rgba(6, 182, 212, 0.3)" },
        purple: { primary: "#c084fc", glow: "rgba(192, 132, 252, 0.3)" },
        cream: { primary: "#f5f5dc", glow: "rgba(245, 245, 220, 0.3)" },
        red: { primary: "#f87171", glow: "rgba(248, 113, 113, 0.3)" }
    }), []);

    const selectedColor = colors[color] || colors.cyan;

    useEffect(() => {
        const preload = {};
        for (let i = 1; i <= numImages; i++) {
            const img = new Image();
            const src = `${imageFolderPath}${imageBaseName}${i}.${imageExt}`;
            img.src = src;
            preload[i] = src;
        }
        setImages(preload);
    }, [numImages, imageFolderPath, imageBaseName, imageExt]);

    const handleChange = useCallback((newIndex) => {
        if (newIndex === currentIndex) return;
        setDirection(newIndex > currentIndex ? 1 : -1);
        setCurrentIndex(newIndex);
    }, [currentIndex]);

    const imageVariants = useMemo(() => ({
        enter: (dir) => ({
            x: dir > 0 ? 20 : -20,
            opacity: 0,
        }),
        center: {
            x: 0,
            opacity: 1,
        },
        exit: (dir) => ({
            x: dir < 0 ? 20 : -20,
            opacity: 0,
        }),
    }), []);

    const cardVariants = useMemo(() => ({
        hover: { scale: 1.01 },
        tap: { scale: 0.99 }
    }), []);

    const textVariants = useMemo(() => ({
        hidden: { opacity: 0, x: -5 },
        visible: { opacity: 1, x: 0 }
    }), []);

    const techVariants = useMemo(() => ({
        hidden: { opacity: 0, y: 5 },
        visible: { opacity: 1, y: 0 },
        hover: { 
            scale: 1.05, 
            rotateZ: 2,
            boxShadow: `0 10px 25px ${selectedColor.glow}`
        }
    }), [selectedColor.glow]);

    return (
        <div className="relative group">
            
            <Card
                className="relative border-none bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 max-w-[900px] w-full shadow-2xl group-hover:shadow-2xl group-hover:shadow-cyan-500/25 transition-all duration-200 group-hover:scale-[1.02] group-hover:-translate-y-1"
                shadow="sm"
                style={{ zIndex: 2 }}
            >
                <CardBody className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-4 items-start justify-center">
                        <div className="relative col-span-1 md:col-span-6 flex flex-col items-center">
                            <div className="relative w-full h-[300px] overflow-hidden rounded-xl border border-slate-700">
                                <AnimatePresence custom={direction} mode="wait">
                                    <motion.img
                                        key={currentIndex}
                                        src={images[currentIndex]}
                                        alt={`Image ${currentIndex}`}
                                        className="w-full h-full object-contain rounded-lg"
                                        variants={imageVariants}
                                        custom={direction}
                                        initial="enter"
                                        animate="center"
                                        exit="exit"
                                        transition={{ duration: 0.15, ease: "easeInOut" }}
                                    />
                                </AnimatePresence>
                            </div>

                            <div className="flex justify-center mt-4 space-x-2">
                                {Array.from({length: numImages}, (_, i) => (
                                    <button
                                        key={i}
                                        aria-label={`Show image ${i + 1}`}
                                        onClick={() => handleChange(i + 1)}
                                        className={`w-4 h-4 rounded-full transition-colors duration-300 ${
                                            currentIndex === i + 1
                                                ? ""
                                                : "bg-slate-600 hover:opacity-70"
                                        }`}
                                        style={{
                                            backgroundColor: currentIndex === i + 1 ? selectedColor.primary : undefined
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="col-span-1 md:col-span-6 px-4 flex flex-col justify-start space-y-3">
                            <motion.div
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.05 }}
                            >
                                <h2 className="text-2xl font-bold mb-2 flex items-center" style={{ color: selectedColor.primary }}>
                                    {icon && icon.includes('.png') ? (
                                        link ? (
                                            <a 
                                                href={link} 
                                                target="_blank" 
                                                rel="noopener noreferrer" 
                                                className="mr-3 hover:opacity-80 transition-opacity duration-300"
                                            >
                                                <img 
                                                    src={icon} 
                                                    alt={`${title} icon`}
                                                    className="w-8 h-8 object-contain"
                                                />
                                            </a>
                                        ) : (
                                            <img 
                                                src={icon} 
                                                alt={`${title} icon`}
                                                className="w-8 h-8 mr-3 object-contain"
                                            />
                                        )
                                    ) : (
                                        <span className="mr-3 text-3xl">{icon}</span>
                                    )}
                                    {link ? (
                                        <a href={link} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                            {title}
                                        </a>
                                    ) : (
                                        title
                                    )}
                                </h2>
                            </motion.div>

                            <motion.p 
                                className="text-slate-300 leading-relaxed"
                                variants={textVariants}
                                initial="hidden"
                                animate="visible"
                                transition={{ delay: 0.1 }}
                            >
                                {description}
                            </motion.p>

                            {technologies && (
                                <motion.div 
                                    className="flex flex-wrap gap-2"
                                    variants={techVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 0.15 }}
                                >
                                    {technologies.map((tech, index) => (
                                        <motion.span
                                            key={index}
                                            className="px-3 py-1 rounded-full text-xs font-mono border cursor-pointer"
                                            style={{
                                                borderColor: `${selectedColor.primary}80`,
                                                color: selectedColor.primary,
                                                backgroundColor: `${selectedColor.primary}20`
                                            }}
                                            variants={techVariants}
                                            whileHover="hover"
                                            transition={{ 
                                                type: "spring", 
                                                stiffness: 300, 
                                                damping: 20,
                                                duration: 0.2
                                            }}
                                        >
                                            {tech}
                                        </motion.span>
                                    ))}
                                </motion.div>
                            )}

                            {github && (
                                <motion.div 
                                    className="flex justify-end mt-4"
                                    variants={techVariants}
                                    initial="hidden"
                                    animate="visible"
                                    transition={{ delay: 0.2 }}
                                >
                                    <a 
                                        href={github} 
                                        target="_blank" 
                                        rel="noopener noreferrer" 
                                        className="text-slate-400 hover:text-white transition-colors duration-300 p-2 rounded-lg hover:bg-slate-800/50"
                                        title="View on GitHub"
                                    >
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                        </svg>
                                    </a>
                                </motion.div>
                            )}

                            <motion.div
                                className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                style={{ 
                                    borderColor: selectedColor.primary,
                                    zIndex: -1
                                }}
                            />
                        </div>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
