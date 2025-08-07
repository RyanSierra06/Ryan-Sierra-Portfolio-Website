import React from "react";
import { motion } from "framer-motion";
import MountainRangeBackground from "./MountainRangeBackground.jsx";
import NavBar from "./NavBar.jsx";

const NotFound = () => {
    return (
        <div className="relative w-full min-h-screen overflow-hidden">
            <MountainRangeBackground />
            <NavBar />
            
            <div className="relative w-full min-h-screen flex flex-col items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl p-12 border border-slate-700/50 shadow-2xl max-w-md mx-4"
                >
                    <div className="text-center space-y-6">
                        {/* 404 Number */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                        >
                            <h1 className="text-8xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-green-500 bg-clip-text text-transparent">
                                404
                            </h1>
                        </motion.div>

                        {/* Error Message */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                            className="space-y-4"
                        >
                            <h2 className="text-2xl font-bold text-white mb-2">
                                Page Not Found
                            </h2>
                            <p className="text-slate-300 leading-relaxed">
                                The page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
                            </p>
                        </motion.div>

                        {/* Action Button */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                            className="flex justify-center"
                        >
                            <motion.button
                                onClick={() => window.location.href = '/'}
                                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Go Home
                            </motion.button>
                        </motion.div>

                        {/* Decorative Elements */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                            className="flex justify-center space-x-2 mt-6"
                        >
                            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound; 