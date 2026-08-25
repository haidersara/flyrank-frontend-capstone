"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { motion } from "framer-motion"; // ← Added this import!

// --- VERTEX SHADER ---
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// --- FRAGMENT SHADER ---
const fragmentShader = `
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_reducedMotion;

varying vec2 vUv;

// Sara's color palette: #14181A, #24423F, #7FA39A, #F7F9FA
vec3 palette(float t) {
  vec3 color1 = vec3(0.079, 0.094, 0.102); // #14181A
  vec3 color2 = vec3(0.141, 0.259, 0.247); // #24423F
  vec3 color3 = vec3(0.498, 0.639, 0.604); // #7FA39A
  vec3 color4 = vec3(0.969, 0.976, 0.980); // #F7F9FA

  if (t < 0.33) return mix(color1, color2, t / 0.33);
  if (t < 0.66) return mix(color2, color3, (t - 0.33) / 0.33);
  return mix(color3, color4, (t - 0.34) / 0.34);
}

void main() {
  vec2 uv = vUv;
  float aspect = u_resolution.x / u_resolution.y;
  vec2 pos = uv * 2.0 - 1.0;
  pos.x *= aspect;

  // Mouse influence
  vec2 mouse = (u_mouse / u_resolution) * 2.0 - 1.0;
  mouse.x *= aspect;
  vec2 mouseInfluence = mix(vec2(0.0), mouse * 0.3, 0.5);

  // Time-based flow
  float time = u_time * 0.05;
  if (u_reducedMotion > 0.5) time = 0.0;

  // Aurora flow field
  float flow1 = sin(pos.x * 3.0 + time + pos.y * 2.0) * 0.5 + 0.5;
  float flow2 = cos(pos.y * 3.0 - time * 0.7 + pos.x * 1.5) * 0.5 + 0.5;
  float flow3 = sin((pos.x + pos.y) * 2.5 + time * 0.3) * 0.5 + 0.5;

  float mouseEffect = length(pos - mouseInfluence) * 0.5;
  float combinedFlow = mix(flow1 * flow2, flow3, mouseEffect);

  // Aurora bands
  float bands = sin(pos.y * 8.0 - combinedFlow * 3.0 + time) * 0.5 + 0.5;
  bands = pow(bands, 1.5);

  // Gradient
  float gradient = pos.y * 0.5 + 0.5;
  gradient = gradient * 0.8 + bands * 0.4;
  gradient = clamp(gradient, 0.0, 1.0);

  // Vignette
  float vignette = 1.0 - length(pos) * 0.6;
  vignette = clamp(vignette, 0.0, 1.0);
  vignette = pow(vignette, 1.2);

  // Grain
  float grain = fract(sin(dot(pos * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
  grain = mix(0.0, 0.15, grain * 0.5);

  // Final color
  vec3 color = palette(gradient);
  color *= vignette;
  color += grain;
  color = clamp(color, 0.0, 1.0);

  gl_FragColor = vec4(color, 1.0);
}
`;

function ShaderMesh() {
  const meshRef = useRef<any>();
  const { viewport } = useThree();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: window.innerHeight - e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.u_time.value = state.clock.elapsedTime;
      meshRef.current.material.uniforms.u_mouse.value = [mouse.x, mouse.y];
      meshRef.current.material.uniforms.u_resolution.value = [
        window.innerWidth,
        window.innerHeight,
      ];
      meshRef.current.material.uniforms.u_reducedMotion.value = reducedMotion ? 1.0 : 0.0;
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={{
          u_time: { value: 0 },
          u_resolution: { value: [window.innerWidth, window.innerHeight] },
          u_mouse: { value: [0, 0] },
          u_reducedMotion: { value: reducedMotion ? 1.0 : 0.0 },
        }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent={false}
      />
    </mesh>
  );
}

export default function ShaderHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-screen bg-[#14181A] flex items-center justify-center">
        <div className="text-[#7FA39A] text-xl">Loading...</div>
      </div>
    );
  }

  // Scroll to timeline function
  const scrollToTimeline = () => {
    const timeline = document.getElementById("timeline");
    if (timeline) {
      timeline.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Shader Canvas */}
      <Canvas
        className="absolute inset-0 w-full h-full"
        dpr={Math.min(window.devicePixelRatio, 2)}
        gl={{
          powerPreference: "high-performance",
          antialias: false,
          alpha: false,
        }}
      >
        <ShaderMesh />
      </Canvas>

      {/* Bigger Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-mono font-bold text-[#F7F9FA] drop-shadow-2xl mb-4 tracking-tight">
            Sara Haider
          </h1>
          <p className="text-xl md:text-3xl text-[#7FA39A] font-light drop-shadow-lg max-w-2xl mx-auto">
            I build functional, working Flutter mobile apps.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <button
              onClick={scrollToTimeline}
              className="px-8 py-4 bg-[#7FA39A] text-[#14181A] rounded-xl font-medium hover:bg-[#6B8B82] transition-all hover:scale-105 shadow-xl text-lg"
            >
              View My Work ↓
            </button>
            <a
              href="/contact"
              className="px-8 py-4 border-2 border-[#7FA39A] text-[#F7F9FA] rounded-xl font-medium hover:bg-[#7FA39A]/10 transition-all hover:scale-105 text-lg"
            >
              Contact Me
            </a>
          </div>
        </motion.div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-[#7FA39A]/40 text-xs tracking-widest uppercase">
        {typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "♿ Reduced motion mode active"
          : "✦ Move mouse to influence the flow"}
      </div>
    </div>
  );
}