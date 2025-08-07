import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";

const ResearchCard = React.memo(({ title, description, methodology, results, publications, field, status = "active", color = "green", date }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [currentData, setCurrentData] = useState(0);
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const dataPointsRef = useRef([]);

    const colors = useMemo(() => ({
        green: { primary: "#10b981", secondary: "#34d399", glow: "rgba(16, 185, 129, 0.3)" },
        blue: { primary: "#3b82f6", secondary: "#60a5fa", glow: "rgba(59, 130, 246, 0.3)" },
        orange: { primary: "#f59e0b", secondary: "#fbbf24", glow: "rgba(245, 158, 11, 0.3)" },
        purple: { primary: "#8b5cf6", secondary: "#a78bfa", glow: "rgba(139, 92, 246, 0.3)" },
        pink: { primary: "#ec4899", secondary: "#f472b6", glow: "rgba(236, 72, 153, 0.3)" },
        yellow: { primary: "#eab308", secondary: "#facc15", glow: "rgba(234, 179, 8, 0.3)" }
    }), []);

    const selectedColor = colors[color] || colors.green;

    const techVariants = useMemo(() => ({
        hidden: { opacity: 0, y: 5 },
        visible: { opacity: 1, y: 0 },
        hover: { 
            scale: 1.05, 
            rotateZ: 2,
            boxShadow: `0 10px 25px ${selectedColor.glow}`
        }
    }), [selectedColor.glow]);

    const initDataPoints = useCallback((canvas) => {
        const ctx = canvas.getContext('2d');
        const dataPoints = [];
        const pointCount = 6;

        for (let i = 0; i < pointCount; i++) {
            dataPoints.push({
                x: (i / (pointCount - 1)) * canvas.width,
                y: canvas.height * 0.5 + Math.sin(i * 0.5) * 15,
                size: Math.random() * 1.5 + 1
            });
        }
        
        dataPointsRef.current = dataPoints;
        return ctx;
    }, []);

    useEffect(() => {
        if (!canvasRef.current || !isHovered) return;

        const canvas = canvasRef.current;
        const ctx = initDataPoints(canvas);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            ctx.strokeStyle = selectedColor.primary;
            ctx.lineWidth = 1; // Reduced line width
            ctx.beginPath();
            ctx.moveTo(dataPointsRef.current[0].x, dataPointsRef.current[0].y);
            
            for (let i = 1; i < dataPointsRef.current.length; i++) {
                ctx.lineTo(dataPointsRef.current[i].x, dataPointsRef.current[i].y);
            }
            ctx.stroke();

            dataPointsRef.current.forEach((point, index) => {
                ctx.beginPath();
                ctx.arc(point.x, point.y, point.size, 0, Math.PI * 2);
                ctx.fillStyle = selectedColor.secondary;
                ctx.fill();

                if (index === currentData) {
                    ctx.beginPath();
                    ctx.arc(point.x, point.y, point.size + 2, 0, Math.PI * 2);
                    ctx.strokeStyle = selectedColor.primary;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isHovered, selectedColor, currentData, initDataPoints]);

    useEffect(() => {
        if (isHovered) {
            const interval = setInterval(() => {
                setCurrentData(prev => (prev + 1) % 6);
            }, 400); // Slower interval
            return () => clearInterval(interval);
        }
    }, [isHovered]);



    return (
        <div
            className="relative group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <canvas
                ref={canvasRef}
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"
                style={{ zIndex: 1 }}
            />

            <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-200"
                style={{
                    backgroundImage: `
                        linear-gradient(${selectedColor.primary}20 1px, transparent 1px),
                        linear-gradient(90deg, ${selectedColor.primary}20 1px, transparent 1px)
                    `,
                    backgroundSize: '20px 20px'
                }}
            />

            <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ 
                    background: `radial-gradient(circle, ${selectedColor.glow}, transparent 70%)`,
                    zIndex: 0
                }}
            />
            
            <Card
                className="relative border-none bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 max-w-[900px] w-full shadow-2xl group-hover:shadow-2xl group-hover:shadow-green-500/25 transition-all duration-200 group-hover:scale-[1.02] group-hover:-translate-y-1"
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
                    <div className="space-y-6">
                        <div
                            className="flex items-start justify-between"
                        >
                            <div className="flex-1">
                                <h2 
                                    className="text-2xl font-bold mb-2"
                                    style={{ color: selectedColor.primary }}
                                >
                                    {title}
                                </h2>
                                
                                <div className="flex flex-wrap gap-2">
                                    {methodology.split(', ').map((tech, index) => (
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
                                            {tech.trim()}
                                        </motion.span>
                                    ))}
                                </div>
                            </div>


                        </div>

                        <p 
                            className="text-slate-300 leading-relaxed"
                        >
                            {description}
                        </p>

                        <div>
                            <h3 className="text-lg font-semibold mb-2" style={{ color: selectedColor.primary }}>
                                Research Focus
                            </h3>
                            <p className="text-slate-300 leading-relaxed">
                                Leveraging NASA satellite data and GEOS-FP atmospheric models to predict global air quality patterns, with a focus on underserved regions lacking traditional monitoring infrastructure.
                            </p>
                        </div>

                        <div 
                            className="grid grid-cols-1 md:grid-cols-3 gap-4"
                        >
                            <div className="text-center p-4 rounded-lg border border-slate-700 bg-slate-800/50">
                                <div className="text-2xl font-bold" style={{ color: selectedColor.primary }}>
                                    NASA
                                </div>
                                <div className="text-xs text-slate-400">Satellite Data</div>
                            </div>
                            
                            <div className="text-center p-4 rounded-lg border border-slate-700 bg-slate-800/50">
                                <div className="text-2xl font-bold" style={{ color: selectedColor.primary }}>
                                    Air Quality
                                </div>
                                <div className="text-xs text-slate-400">Prediction Focus</div>
                            </div>

                            <div className="text-center p-4 rounded-lg border border-slate-700 bg-slate-800/50">
                                <div className="text-2xl font-bold" style={{ color: selectedColor.primary }}>
                                    ML Research
                                </div>
                                <div className="text-xs text-slate-400">Deep Learning</div>
                            </div>
                        </div>

                        <div
                            className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            style={{ 
                                borderColor: selectedColor.primary,
                                zIndex: -1
                            }}
                        />
                    </div>
                </CardBody>
            </Card>
        </div>
    );
});

ResearchCard.displayName = 'ResearchCard';

export default ResearchCard; 