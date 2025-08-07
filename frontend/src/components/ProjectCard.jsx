import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@heroui/react";
import { motion, useAnimation } from "framer-motion";

export default function CardUsage({ numImages, imageFolderPath, imageBaseName, imageExt = "png" }) {
    const [currentIndex, setCurrentIndex] = useState(1);
    const controls = useAnimation();

    useEffect(() => {
        controls.start({
            x: -(currentIndex - 1) * 100 + "%", // Slide in percentages for responsiveness
            transition: { duration: 0.3, ease: "easeInOut" },
        });
    }, [currentIndex, controls]);

    // Generate image URLs
    const images = Array.from({ length: numImages }, (_, i) => `${imageFolderPath}${imageBaseName}${i + 1}.${imageExt}`);

    return (
        <Card
            isBlurred
            className="border-none bg-background/60 dark:bg-default-100/50 max-w-[900px]"
            shadow="sm"
        >
            <CardBody>
                <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-4 items-center justify-center">
                    <div className="relative col-span-6 md:col-span-4 overflow-hidden w-full h-[400px]">
                        <motion.div
                            animate={controls}
                            className="flex flex-row"
                            style={{ width: `${100 * numImages}%`, height: "100%" }}
                        >
                            {images.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    alt={`Image ${i + 1}`}
                                    className="object-contain w-[calc(100% / var(--numImages))] h-full flex-shrink-0"
                                    style={{ "--numImages": numImages }}
                                    draggable={false}
                                />
                            ))}
                        </motion.div>

                        {/* Bubbles */}
                        <div className="flex justify-center mt-4 space-x-2">
                            {images.map((_, i) => (
                                <button
                                    key={i}
                                    aria-label={`Show image ${i + 1}`}
                                    onClick={() => setCurrentIndex(i + 1)}
                                    className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                                        currentIndex === i + 1
                                            ? "bg-foreground"
                                            : "bg-foreground/40 hover:bg-foreground/70"
                                    }`}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Right side text content */}
                    <div className="flex flex-col col-span-6 md:col-span-8">
                        <div className="flex justify-between items-start">
                            <div className="flex flex-col gap-0">
                                <h3 className="font-semibold text-foreground/90">Daily Mix</h3>
                                <p className="text-small text-foreground/80">12 Tracks</p>
                                <h1 className="text-large font-medium mt-2">Frontend Radio</h1>
                            </div>
                        </div>

                        <div className="flex flex-col mt-3 gap-1">
                            <div className="flex justify-between">
                                <p className="text-small">1:23</p>
                                <p className="text-small text-foreground/50">4:32</p>
                            </div>
                        </div>

                        <div className="flex w-full items-center justify-center"></div>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
}
