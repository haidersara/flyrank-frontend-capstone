"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";

// --- VERTEX SHADER ---
// Passes UV coordinates from vertices to fragment shader
const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

// --- FRAGMENT SHADER ---
// The visual magic — calculates color for every pixel
const fragmentShader = `
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_reducedMotion;

varying vec2 vUv;

// --- COLOR PALETTE: Sara's brand colors ---
// #14181A (near-black), #24423F (teal), #7FA39A (sage), #F7F9FA (off-white)
vec3 palette(float t) {
  vec3 color1 = vec3(0.079, 0.094, 0.102); // #14181A
  vec3 color2 = vec3(0.141, 0.259, 0.247); // #24423F
  vec3 color3 = vec3(0.498, 0.639, 0.604); // #7FA39A
  vec3 color4 = vec3(0.969, 0.976, 0.980); // #F7F9FA

  // Smooth transitions between colors
  if (t < 0.33) return mix(color1, color2, t / 0.33);
  if (t < 0.66) return mix(color2, color3, (t - 0.33) / 0.33);
  return mix(color3, color4, (t - 0.34) / 0.34);
}

void main() {
  // Normalize coordinates to [0,1]
  vec2 uv = vUv;
  
  // Fix aspect ratio so circles aren't stretched
  float aspect = u_resolution.x / u_resolution.y;
  vec2 pos = uv * 2.0 - 1.0;
  pos.x *= aspect;

  // --- MOUSE INFLUENCE ---
  // Convert mouse from [0,1] to [-1,1] and fix aspect
  vec2 mouse = (u_mouse / u_resolution) * 2.0 - 1.0;
  mouse.x *= aspect;
  
  // Smooth mouse influence (ease toward cursor)
  vec2 mouseInfluence = mix(vec2(0.0), mouse * 0.3, 0.5);
  
  // --- TIME-BASED FLOW ---
  float time = u_time * 0.05;
  if (u_reducedMotion > 0.5) {
    time = 0.0; // Static for reduced motion
  }
  
  // Create organic aurora-like flow field
  float flow1 = sin(pos.x * 3.0 + time + pos.y * 2.0) * 0.5 + 0.5;
  float flow2 = cos(pos.y * 3.0 - time * 0.7 + pos.x * 1.5) * 0.5 + 0.5;
  float flow3 = sin((pos.x + pos.y) * 2.5 + time * 0.3) * 0.5 + 0.5;
  
  // Apply mouse influence — flow leans toward cursor
  float mouseEffect = length(pos - mouseInfluence) * 0.5;
  float combinedFlow = mix(flow1 * flow2, flow3, mouseEffect);
  
  // Create aurora bands
  float bands = sin(pos.y * 8.0 - combinedFlow * 3.0 + time) * 0.5 + 0.5;
  bands = pow(bands, 1.5);
  
  // --- GRADIENT ---
  float gradient = pos.y * 0.5 + 0.5;
  gradient = gradient * 0.8 + bands * 0.4;
  gradient = clamp(gradient, 0.0, 1.0);
  
  // --- VIGNETTE (dark edges draw focus to center) ---
  float vignette = 1.0 - length(pos) * 0.6;
  vignette = clamp(vignette, 0.0, 1.0);
  vignette = pow(vignette, 1.2);
  
  // --- GRAIN (film-like texture) ---
  float grain = fract(sin(dot(pos * 100.0, vec2(12.9898, 78.233))) * 43758.5453);
  grain = mix(0.0, 0.15, grain * 0.5);
  
  // --- FINAL COLOR ---
  vec3 color = palette(gradient);
  color *= vignette;
  color += grain;
  color = clamp(color, 0.0, 1.0);
  
  gl_FragColor = vec4(color, 1.0);
}
`;

// --- 3D COMPONENT THAT RENDERS THE SHADER ---
function ShaderMesh() {
  const meshRef = useRef<any>();
  const { viewport } = useThree();
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Track mouse position
  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: window.innerHeight - e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  // Animation loop — updates uniforms every frame
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

// --- MAIN COMPONENT ---
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

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Shader Canvas - Fullscreen background */}
      <Canvas
        className="absolute inset-0 w-full h-full"
        dpr={Math.min(window.devicePixelRatio, 2)} // Cap pixel ratio for performance
        gl={{
          powerPreference: "high-performance",
          antialias: false,
          alpha: false,
        }}
      >
        <ShaderMesh />
      </Canvas>

      {/* Content on top of shader */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-mono font-bold text-[#F7F9FA] drop-shadow-lg mb-4">
          Sara Haider
        </h1>
        <p className="text-lg md:text-xl text-[#7FA39A] font-light max-w-2xl drop-shadow">
          I build functional, working Flutter mobile apps.
        </p>
        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <a
            href="/work"
            className="px-6 py-3 bg-[#7FA39A] text-[#14181A] rounded-lg font-medium hover:bg-[#6B8B82] transition-colors"
          >
            See my work
          </a>
          <a
            href="/contact"
            className="px-6 py-3 border border-[#7FA39A] text-[#F7F9FA] rounded-lg font-medium hover:bg-[#7FA39A]/10 transition-colors"
          >
            Contact
          </a>
        </div>
      </div>

      {/* Performance and accessibility info */}
      <div className="absolute bottom-4 left-4 z-20 text-[#7FA39A]/50 text-xs">
        {typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "♿ Reduced motion mode active"
          : "🎨 Interactive aurora shader · Move mouse to influence flow"}
      </div>
    </div>
  );
}