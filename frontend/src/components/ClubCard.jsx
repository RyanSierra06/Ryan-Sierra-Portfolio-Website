import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";

const ClubCard = React.memo(({ title, description, role, members, achievements, membersLabel = "Members", achievementsLabel = "Achievements", logo, color = "pink", date }) => {

    const colors = useMemo(() => ({
        pink: { primary: "#ec4899", secondary: "#f472b6", glow: "rgba(236, 72, 153, 0.3)" },
        purple: { primary: "#a855f7", secondary: "#c084fc", glow: "rgba(168, 85, 247, 0.3)" },
        green: { primary: "#10b981", secondary: "#34d399", glow: "rgba(16, 185, 129, 0.3)" },
        blue: { primary: "#3b82f6", secondary: "#60a5fa", glow: "rgba(59, 130, 246, 0.3)" },
        yellow: { primary: "#eab308", secondary: "#facc15", glow: "rgba(234, 179, 8, 0.3)" },
        orange: { primary: "#f97316", secondary: "#fb923c", glow: "rgba(249, 115, 22, 0.3)" },
        white: { primary: "#f8fafc", secondary: "#e2e8f0", glow: "rgba(248, 250, 252, 0.3)" }
    }), []);

    const selectedColor = colors[color] || colors.pink;

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
                className="relative border-none bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 max-w-[900px] w-full shadow-2xl group-hover:shadow-2xl group-hover:shadow-yellow-500/25 transition-all duration-200 group-hover:scale-[1.02] group-hover:-translate-y-1"
                shadow="sm"
                style={{ zIndex: 2 }}
            >
                <CardBody className="p-6">
                    {date && (
                        <div className="absolute top-4 right-4">
                            <span className="text-base font-medium"
                                style={{ color: selectedColor.primary }}
                            >
                                {date}
                            </span>
                        </div>
                    )}
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex-shrink-0">
                            <div 
                                className="w-24 h-24 rounded-2xl border-2 flex items-center justify-center text-3xl font-bold overflow-hidden hover:rotate-1 hover:scale-105 transition-all duration-150"
                                style={{ 
                                    borderColor: selectedColor.primary,
                                    background: `linear-gradient(135deg, ${selectedColor.primary}20, ${selectedColor.secondary}20)`
                                }}
                            >
                                {logo && logo.includes('.png') ? (
                                    <img 
                                        src={logo} 
                                        alt={`${title} logo`}
                                        className="w-16 h-16 object-contain"
                                    />
                                ) : (
                                    <span>{logo || "🏛️"}</span>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 space-y-4">
                            <div>
                                <h2 
                                    className="text-2xl font-bold mb-2"
                                    style={{ color: selectedColor.primary }}
                                >
                                    {title}
                                </h2>
                                
                                {role && (
                                    <div className="flex flex-wrap gap-2">
                                        {role.split(', ').map((roleItem, index) => (
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
                                                {roleItem.trim()}
                                            </motion.span>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <p 
                                className="text-slate-300 leading-relaxed"
                            >
                                {description}
                            </p>

                            <div 
                                className="grid grid-cols-2 gap-4"
                            >
                                {members && (
                                    <div className="text-center p-3 rounded-lg border border-slate-700">
                                        <div className="text-2xl font-bold" style={{ color: selectedColor.primary }}>
                                            {members}
                                        </div>
                                        <div className="text-xs text-slate-400">{membersLabel}</div>
                                    </div>
                                )}
                                
                                {achievements && (
                                    <div className="text-center p-3 rounded-lg border border-slate-700">
                                        <div className="text-2xl font-bold" style={{ color: selectedColor.secondary }}>
                                            {achievements}
                                        </div>
                                        <div className="text-xs text-slate-400">{achievementsLabel}</div>
                                    </div>
                                )}
                            </div>

                            <div
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

ClubCard.displayName = 'ClubCard';

export default ClubCard; 