import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const MountainRangeBackground = () => {
    const mountRef = useRef(null);

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

    function generateTerrain(width, height) {
        const noise = new SimplexNoise();
        const data = new Float32Array(width * height);

        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                const nx = x / width - 0.5;
                const ny = y / height - 0.5;

                const baseNoise = noise.noise(nx * 3, ny * 3) * 3;
                const detailNoise = noise.noise(nx * 8, ny * 8) * 1;
                const fineNoise = noise.noise(nx * 15, ny * 15) * 0.5;
                const flowPattern = Math.sin(nx * 15) * Math.cos(ny * 12) * 1.5;

                const mountainPeaks = Math.max(0, baseNoise - 1) * 4;
                const valleys = Math.min(0, baseNoise + 0.5) * 2;
                
                data[y * width + x] = baseNoise + detailNoise + fineNoise + flowPattern + mountainPeaks + valleys;
            }
        }
        return data;
    }

    useEffect(() => {
        if (!mountRef.current) return;

        const renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: false,
            preserveDrawingBuffer: false,
            failIfMajorPerformanceCaveat: false
        });

        const initialWidth = Math.max(window.innerWidth, 1920);
        const initialHeight = Math.max(window.innerHeight, 1080);
        renderer.setSize(initialWidth, initialHeight);
        renderer.setClearColor(0x000000, 1);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.info.autoReset = false;
        renderer.shadowMap.enabled = false;
        mountRef.current.appendChild(renderer.domElement);

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(75, initialWidth / initialHeight, 0.1, 1000);
        camera.position.z = 280;
        camera.position.y = 100;
        camera.position.x = 40;
        camera.lookAt(0, 0, 0);


        const terrainLayers = [];
        const layerCount = 2;
        
        for (let i = 0; i < layerCount; i++) {
            const terrainWidth = 80 + i * 25;
            const terrainHeight = 80 + i * 25;
            
            const heightMap = generateTerrain(terrainWidth, terrainHeight);
            const geometry = new THREE.PlaneGeometry(terrainWidth, terrainHeight, terrainWidth - 1, terrainHeight - 1);

            for (let j = 0; j < geometry.attributes.position.count; j++) {
                geometry.attributes.position.setZ(j, heightMap[j] || 0);
            }
            geometry.computeVertexNormals();
            
            const material = new THREE.MeshBasicMaterial({
                color: i === 0 ? 0x00ffff : 0x0080ff,
                wireframe: true,
                transparent: false,
                depthTest: false,
                depthWrite: false
            });
            
            const terrain = new THREE.Mesh(geometry, material);
            terrain.position.z = -50 - i * 30;
            terrain.position.y = -40 - i * 20;
            terrain.rotation.x = -Math.PI / 2;
            terrain.rotation.z = Math.PI / 2;
            terrain.scale.set(30 + i * 8, 30 + i * 8, 30 + i * 8);
            
            terrainLayers.push(terrain);
            scene.add(terrain);
        }

        let time = 0;
        let lastFrameTime = 0;
        const targetFrameTime = 1000 / 60;
        
        const animate = (currentTime) => {
            if (currentTime - lastFrameTime >= targetFrameTime) {
                time += 0.01;
                lastFrameTime = currentTime;

                terrainLayers.forEach((terrain, index) => {
                    terrain.rotation.z += 0.001 + index * 0.0005;
                    terrain.rotation.y = Math.sin(time * 0.5 + index) * 0.05;
                });

                renderer.render(scene, camera);
            }
            
            requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);

        const handleResize = () => {
            const newWidth = Math.max(window.innerWidth, 1920);
            const newHeight = Math.max(window.innerHeight, 1080);
            
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };
        window.addEventListener("resize", handleResize);

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
                pointerEvents: "none",
                overflow: "hidden",
                backgroundColor: "#000000"
            }}
        />
    );
};

export default MountainRangeBackground;
