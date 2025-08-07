 import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const MountainRangeBackground = () => {
    const mountRef = useRef(null);

    // Enhanced SimplexNoise for more organic patterns
    class SimplexNoise {
        constructor() {
            this.grad3 = new Float32Array([
                1,1,0,-1,1,0,1,-1,0,-1,-1,0,
                1,0,1,-1,0,1,1,0,-1,-1,0,-1,
                0,1,1,0,-1,1,0,1,-1,0,-1,-1
            ]);
            this.p = new Uint8Array(256);
            for (let i=0; i<256; i++) this.p[i] = i;
            for (let i=255; i>0; i--) {
                let n = Math.floor(Math.random() * (i+1));
                [this.p[i], this.p[n]] = [this.p[n], this.p[i]];
            }
            this.perm = new Uint8Array(512);
            this.permMod12 = new Uint8Array(512);
            for (let i=0; i<512; i++) {
                this.perm[i] = this.p[i & 255];
                this.permMod12[i] = this.perm[i] % 12;
            }
        }
        dot(g, x, y) {
            return g[0]*x + g[1]*y;
        }
        noise(xin, yin) {
            const F2 = 0.5*(Math.sqrt(3)-1);
            const G2 = (3-Math.sqrt(3))/6;
            let n0=0, n1=0, n2=0;
            let s = (xin+yin)*F2;
            let i = Math.floor(xin + s);
            let j = Math.floor(yin + s);
            let t = (i + j)*G2;
            let X0 = i - t;
            let Y0 = j - t;
            let x0 = xin - X0;
            let y0 = yin - Y0;
            let i1, j1;
            if (x0 > y0) {i1=1; j1=0;} else {i1=0; j1=1;}
            let x1 = x0 - i1 + G2;
            let y1 = y0 - j1 + G2;
            let x2 = x0 - 1 + 2*G2;
            let y2 = y0 - 1 + 2*G2;
            let ii = i & 255;
            let jj = j & 255;
            let gi0 = this.permMod12[ii + this.perm[jj]] * 3;
            let gi1 = this.permMod12[ii + i1 + this.perm[jj + j1]] * 3;
            let gi2 = this.permMod12[ii + 1 + this.perm[jj + 1]] * 3;
            let t0 = 0.5 - x0*x0 - y0*y0;
            if(t0>=0) {
                t0 *= t0;
                n0 = t0 * t0 * this.dot(this.grad3.subarray(gi0, gi0+3), x0, y0);
            }
            let t1 = 0.5 - x1*x1 - y1*y1;
            if(t1>=0) {
                t1 *= t1;
                n1 = t1 * t1 * this.dot(this.grad3.subarray(gi1, gi1+3), x1, y1);
            }
            let t2 = 0.5 - x2*x2 - y2*y2;
            if(t2>=0) {
                t2 *= t2;
                n2 = t2 * t2 * this.dot(this.grad3.subarray(gi2, gi2+3), x2, y2);
            }
            return 70 * (n0 + n1 + n2);
        }
    }

    // Pre-compute terrain with efficient generation
    function generateTerrain(width, height) {
        const noise = new SimplexNoise();
        const data = new Float32Array(width * height);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const nx = x / width - 0.5;
                const ny = y / height - 0.5;

                // Balanced noise levels for dramatic but not extreme mountains
                const baseNoise = noise.noise(nx * 3, ny * 3) * 3; // Half of 6
                const detailNoise = noise.noise(nx * 8, ny * 8) * 1; // Half of 2
                const fineNoise = noise.noise(nx * 15, ny * 15) * 0.5; // Half of 1
                const flowPattern = Math.sin(nx * 15) * Math.cos(ny * 12) * 1.5; // Half of 3
                
                // Create balanced peaks and valleys
                const mountainPeaks = Math.max(0, baseNoise - 1) * 4; // Half intensity
                const valleys = Math.min(0, baseNoise + 0.5) * 2; // Half intensity
                
                data[y * width + x] = baseNoise + detailNoise + fineNoise + flowPattern + mountainPeaks + valleys;
            }
        }
        return data;
    }

    useEffect(() => {
        if (!mountRef.current) return;

        // Optimized renderer with no flickering
        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false, // Disable alpha for better performance
            powerPreference: "high-performance",
            stencil: false,
            depth: false // Disable depth buffer since we're using wireframe
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x000000, 1);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.info.autoReset = false; // Prevent info reset for better performance
        mountRef.current.appendChild(renderer.domElement);

        // Scene
        const scene = new THREE.Scene();

        // Static camera - no movement to prevent flickering
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 350; // Further back to see more of the range
        camera.position.y = 120; // Higher up for better horizon view
        camera.position.x = 50;
        camera.lookAt(0, 0, 0); // Look straight ahead at horizon level

        // Pre-compute terrain layers
        const terrainLayers = [];
        const layerCount = 2;
        
        for (let i = 0; i < layerCount; i++) {
            const terrainWidth = 100 + i * 30;
            const terrainHeight = 100 + i * 30;
            
            const heightMap = generateTerrain(terrainWidth, terrainHeight);
            const geometry = new THREE.PlaneGeometry(terrainWidth, terrainHeight, terrainWidth - 1, terrainHeight - 1);
            
            // Apply height map once
            for (let j = 0; j < geometry.attributes.position.count; j++) {
                geometry.attributes.position.setZ(j, heightMap[j] || 0);
            }
            geometry.computeVertexNormals();
            
            const material = new THREE.MeshBasicMaterial({
                color: i === 0 ? 0x00ffff : 0x0080ff,
                wireframe: true,
                transparent: false, // Disable transparency for better performance
                depthTest: false,
                depthWrite: false
            });
            
            const terrain = new THREE.Mesh(geometry, material);
            terrain.position.z = -50 - i * 30;
            terrain.position.y = -40 - i * 20; // Lower positioning for epic scale
            terrain.rotation.x = -Math.PI / 2;
            terrain.rotation.z = Math.PI / 2;
            terrain.scale.set(40 + i * 10, 40 + i * 10, 40 + i * 10); // Much larger scale
            
            terrainLayers.push(terrain);
            scene.add(terrain);
        }

        // Optimized animation loop with no flickering
        let time = 0;
        
        const animate = () => {
            requestAnimationFrame(animate);
            time += 0.01;

            // Simple terrain rotation (no real-time generation)
            terrainLayers.forEach((terrain, index) => {
                terrain.rotation.z += 0.001 + index * 0.0005;
                terrain.rotation.y = Math.sin(time * 0.5 + index) * 0.05; // Reduced movement
            });

            renderer.render(scene, camera);
        };
        animate();

        // Efficient resize handler
        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => {
            window.removeEventListener("resize", handleResize);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <div
            ref={mountRef}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                zIndex: -1,
                pointerEvents: "none"
            }}
        />
    );
};

export default MountainRangeBackground;
