"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Center } from "@react-three/drei";
import { Suspense, useState, useEffect, useRef } from "react";

function Robot() {
  return (
    <group>
      {/* Body */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[1.2, 1.6, 0.8]} />
        <meshStandardMaterial color="#7FA39A" metalness={0.3} roughness={0.4} />
      </mesh>
      
      {/* Head */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial color="#7FA39A" metalness={0.3} roughness={0.4} />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[-0.25, 1.9, 0.45]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0.25, 1.9, 0.45]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshStandardMaterial color="#00FFFF" emissive="#00FFFF" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Left Arm */}
      <mesh position={[-0.9, 1.0, 0]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#7FA39A" metalness={0.3} roughness={0.4} />
      </mesh>
      
      {/* Right Arm */}
      <mesh position={[0.9, 1.0, 0]}>
        <boxGeometry args={[0.3, 1.2, 0.3]} />
        <meshStandardMaterial color="#7FA39A" metalness={0.3} roughness={0.4} />
      </mesh>
      
      {/* Left Leg */}
      <mesh position={[-0.4, -0.1, 0]}>
        <boxGeometry args={[0.4, 0.8, 0.4]} />
        <meshStandardMaterial color="#7FA39A" metalness={0.3} roughness={0.4} />
      </mesh>
      
      {/* Right Leg */}
      <mesh position={[0.4, -0.1, 0]}>
        <boxGeometry args={[0.4, 0.8, 0.4]} />
        <meshStandardMaterial color="#7FA39A" metalness={0.3} roughness={0.4} />
      </mesh>
      
      {/* Antenna */}
      <mesh position={[0, 2.3, 0]}>
        <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
        <meshStandardMaterial color="#FF6B6B" emissive="#FF6B6B" emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0, 2.5, 0]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshStandardMaterial color="#FF6B6B" emissive="#FF6B6B" emissiveIntensity={0.5} />
      </mesh>
    </group>
  );
}

export default function ThreeScene() {
  const [color, setColor] = useState("#7FA39A");
  const [metalness, setMetalness] = useState(0.3);
  const [roughness, setRoughness] = useState(0.4);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="w-full h-[500px] bg-[#14181A] rounded-xl flex items-center justify-center">
        <div className="text-white/70">Loading 3D scene...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] relative bg-[#14181A] rounded-xl overflow-hidden">
      <div className="absolute top-4 right-4 z-10 bg-[#24423F]/90 backdrop-blur p-4 rounded-lg text-white space-y-3 min-w-[160px] border border-[#7FA39A]/20">
        <h3 className="text-sm font-bold text-[#7FA39A] uppercase tracking-wider">
          CONFIGURATOR
        </h3>
        
        <div>
          <label className="text-xs block mb-1 text-gray-300">Color</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full h-8 rounded cursor-pointer bg-transparent"
          />
        </div>

        <div>
          <label className="text-xs block mb-1 text-gray-300">
            Metalness: {metalness.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={metalness}
            onChange={(e) => setMetalness(parseFloat(e.target.value))}
            className="w-full accent-[#7FA39A]"
          />
        </div>

        <div>
          <label className="text-xs block mb-1 text-gray-300">
            Roughness: {roughness.toFixed(2)}
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={roughness}
            onChange={(e) => setRoughness(parseFloat(e.target.value))}
            className="w-full accent-[#7FA39A]"
          />
        </div>

        <label className="text-xs flex items-center gap-2 cursor-pointer text-gray-300">
          <input
            type="checkbox"
            checked={autoRotate}
            onChange={(e) => setAutoRotate(e.target.checked)}
            className="accent-[#7FA39A]"
          />
          Auto-rotate
        </label>
      </div>

      <div className="absolute bottom-4 left-4 z-10 text-white/50 text-xs">
        🖱️ Drag to rotate · Scroll to zoom
      </div>

      <Canvas
        camera={{ position: [3, 2, 5], fov: 45 }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <directionalLight position={[-10, -10, -5]} intensity={0.3} />
          
          <Environment preset="studio" />
          
          <Center>
            <Robot />
          </Center>
          
          <OrbitControls
            autoRotate={autoRotate}
            autoRotateSpeed={2}
            enableZoom={true}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}