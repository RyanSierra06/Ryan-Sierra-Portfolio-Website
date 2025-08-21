import React, { useMemo, useCallback, useState } from "react";
import { motion } from "framer-motion";

const EducationCard = () => {
    const [tooltip, setTooltip] = useState({ show: false, text: '', x: 0, y: 0 });

    const courseDescriptions = useMemo(() => ({
        'CS251': 'Computer Architecture',
        'CS250': 'Data Structures & Algorithms',
        'CS240': 'Programming in C',
        'CS182': 'Foundations of Computer Science',
        'CS180BLK': 'Programming to Java',
        'CS193': 'CS Tools',
        'Data Mine 101': 'Data Science Fundamentals in R',
        'Data Mine 102': 'Data Science Fundamentals in Python'
    }), []);

    const handleTooltipShow = useCallback((text, event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setTooltip({
            show: true,
            text,
            x: rect.left + rect.width / 2,
            y: rect.top - 15
        });
    }, []);

    const handleTooltipHide = useCallback(() => {
        setTooltip({ show: false, text: '', x: 0, y: 0 });
    }, []);

    const fastTransition = useMemo(() => ({
        type: "tween",
        duration: 0.2,
        ease: "easeOut"
    }), []);

    const springTransition = useMemo(() => ({
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.2
    }), []);

    return (
        <>
            {tooltip.show && (
                <motion.div
                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="fixed z-50 pointer-events-none"
                    style={{
                        left: tooltip.x,
                        top: tooltip.y,
                        transform: 'translateX(-50%) translateY(-100%)'
                    }}
                >
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 backdrop-blur-sm border border-slate-600/50 rounded-lg px-3 py-2 shadow-2xl max-w-xs">
                        <div className="text-white text-sm font-medium leading-relaxed">
                            {tooltip.text}
                        </div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-slate-800"></div>
                    </div>
                </motion.div>
            )}

            <div className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 shadow-2xl h-full">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                    <img src="/Purdue Icon.png" alt="Purdue" className="w-10 h-10 mr-3 object-contain" />
                    Education
                </h2>
                <div className="space-y-6">
                    <div className="border-l-4 border-cyan-400 pl-6">
                        <h3 className="text-xl font-semibold text-cyan-400 mb-2">Bachelor of Science in Computer
                            Science</h3>
                        <p className="text-slate-300 font-medium">Purdue University</p>
                        <p className="text-slate-400 text-sm">Anticipated Graduation: May 2028</p>
                        <p className="text-slate-400 text-sm">Dean's List & Semester Honors: Fall 24 & Spring 25</p>

                        <div className="mt-4">
                            <p className="text-slate-300 text-sm font-semibold mb-2">Tracks:</p>
                            <div className="flex flex-wrap gap-2">
                                <motion.span
                                    className="px-3 py-1 rounded-full text-xs font-mono border border-cyan-500/50 text-cyan-400 bg-cyan-500/10 cursor-pointer"
                                    whileHover={{
                                        scale: 1.1,
                                        rotateZ: 5,
                                        z: 20,
                                        boxShadow: "0 10px 25px rgba(6, 182, 212, 0.3)"
                                    }}
                                    transition={springTransition}
                                >
                                    Software Engineering
                                </motion.span>
                                <motion.span
                                    className="px-3 py-1 rounded-full text-xs font-mono border border-green-500/50 text-green-400 bg-green-500/10 cursor-pointer"
                                    whileHover={{
                                        scale: 1.1,
                                        rotateZ: 5,
                                        z: 20,
                                        boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)"
                                    }}
                                    transition={springTransition}
                                >
                                    Machine Intelligence
                                </motion.span>
                            </div>
                        </div>

                        <div className="mt-4">
                            <p className="text-slate-300 text-sm font-semibold mb-2">Notable Coursework:</p>
                            <div className="flex flex-wrap gap-2">
                                <motion.span
                                    className="px-3 py-1 rounded-full text-xs font-mono border border-pink-500/50 text-pink-400 bg-pink-500/10 cursor-pointer"
                                    whileHover={{
                                        scale: 1.1,
                                        rotateZ: 5,
                                        z: 20,
                                        boxShadow: "0 10px 25px rgba(236, 72, 153, 0.3)"
                                    }}
                                    transition={springTransition}
                                    onMouseEnter={(e) => handleTooltipShow(courseDescriptions['CS251'], e)}
                                    onMouseLeave={handleTooltipHide}
                                >
                                    CS251
                                </motion.span>
                                <motion.span
                                    className="px-3 py-1 rounded-full text-xs font-mono border border-emerald-500/50 text-emerald-400 bg-emerald-500/10 cursor-pointer"
                                    whileHover={{
                                        scale: 1.1,
                                        rotateZ: 5,
                                        z: 20,
                                        boxShadow: "0 10px 25px rgba(16, 185, 129, 0.3)"
                                    }}
                                    transition={springTransition}
                                    onMouseEnter={(e) => handleTooltipShow(courseDescriptions['CS250'], e)}
                                    onMouseLeave={handleTooltipHide}
                                >
                                    CS250
                                </motion.span>
                                <motion.span
                                    className="px-3 py-1 rounded-full text-xs font-mono border border-purple-500/50 text-purple-400 bg-purple-500/10 cursor-pointer"
                                    whileHover={{
                                        scale: 1.1,
                                        rotateZ: 5,
                                        z: 20,
                                        boxShadow: "0 10px 25px rgba(139, 92, 246, 0.3)"
                                    }}
                                    transition={springTransition}
                                    onMouseEnter={(e) => handleTooltipShow(courseDescriptions['CS240'], e)}
                                    onMouseLeave={handleTooltipHide}
                                >
                                    CS240
                                </motion.span>
                                <motion.span
                                    className="px-3 py-1 rounded-full text-xs font-mono border border-blue-500/50 text-blue-400 bg-blue-500/10 cursor-pointer"
                                    whileHover={{
                                        scale: 1.1,
                                        rotateZ: 5,
                                        z: 20,
                                        boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)"
                                    }}
                                    transition={springTransition}
                                    onMouseEnter={(e) => handleTooltipShow(courseDescriptions['CS182'], e)}
                                    onMouseLeave={handleTooltipHide}
                                >
                                    CS182
                                </motion.span>
                                <motion.span
                                    className="px-3 py-1 rounded-full text-xs font-mono border border-yellow-500/50 text-yellow-400 bg-yellow-500/10 cursor-pointer"
                                    whileHover={{
                                        scale: 1.1,
                                        rotateZ: 5,
                                        z: 20,
                                        boxShadow: "0 10px 25px rgba(234, 179, 8, 0.3)"
                                    }}
                                    transition={springTransition}
                                    onMouseEnter={(e) => handleTooltipShow(courseDescriptions['CS180BLK'], e)}
                                    onMouseLeave={handleTooltipHide}
                                >
                                    CS180BLK
                                </motion.span>
                                <motion.span
                                    className="px-3 py-1 rounded-full text-xs font-mono border border-orange-500/50 text-orange-400 bg-orange-500/10 cursor-pointer"
                                    whileHover={{
                                        scale: 1.1,
                                        rotateZ: 5,
                                        z: 20,
                                        boxShadow: "0 10px 25px rgba(249, 115, 22, 0.3)"
                                    }}
                                    transition={springTransition}
                                    onMouseEnter={(e) => handleTooltipShow(courseDescriptions['CS193'], e)}
                                    onMouseLeave={handleTooltipHide}
                                >
                                    CS193
                                </motion.span>
                                <motion.span
                                    className="px-3 py-1 rounded-full text-xs font-mono border border-indigo-500/50 text-indigo-400 bg-indigo-500/10 cursor-pointer"
                                    whileHover={{
                                        scale: 1.1,
                                        rotateZ: 5,
                                        z: 20,
                                        boxShadow: "0 10px 25px rgba(99, 102, 241, 0.3)"
                                    }}
                                    transition={springTransition}
                                    onMouseEnter={(e) => handleTooltipShow(courseDescriptions['Data Mine 101'], e)}
                                    onMouseLeave={handleTooltipHide}
                                >
                                    Data Mine 101
                                </motion.span>
                                <motion.span
                                    className="px-3 py-1 rounded-full text-xs font-mono border border-teal-500/50 text-teal-400 bg-teal-500/10 cursor-pointer"
                                    whileHover={{
                                        scale: 1.1,
                                        rotateZ: 5,
                                        z: 20,
                                        boxShadow: "0 10px 25px rgba(20, 184, 166, 0.3)"
                                    }}
                                    transition={springTransition}
                                    onMouseEnter={(e) => handleTooltipShow(courseDescriptions['Data Mine 102'], e)}
                                    onMouseLeave={handleTooltipHide}
                                >
                                    Data Mine 102
                                </motion.span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EducationCard;