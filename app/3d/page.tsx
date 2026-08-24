"use client";

import ThreeScene from "@/components/ThreeScene";

export default function ThreeDPage() {
  return (
    <main className="min-h-screen bg-[#14181A] px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#7FA39A] font-mono">
            3D Configurator
          </h1>
          <p className="text-gray-400 mt-2">
            Interactive 3D experience — rotate, zoom, and customize the model.
          </p>
        </div>
        
        <ThreeScene />
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
          <div className="bg-[#24423F]/20 p-4 rounded-lg border border-[#7FA39A]/10">
            <span className="text-[#7FA39A] font-bold">✨</span>
            <h4 className="font-semibold text-white mt-1">Real-time</h4>
            <p>Changes apply instantly as you adjust controls</p>
          </div>
          <div className="bg-[#24423F]/20 p-4 rounded-lg border border-[#7FA39A]/10">
            <span className="text-[#7FA39A] font-bold">🔄</span>
            <h4 className="font-semibold text-white mt-1">Interactive</h4>
            <p>Drag to rotate, scroll to zoom on any device</p>
          </div>
          <div className="bg-[#24423F]/20 p-4 rounded-lg border border-[#7FA39A]/10">
            <span className="text-[#7FA39A] font-bold">📱</span>
            <h4 className="font-semibold text-white mt-1">Mobile-ready</h4>
            <p>Touch controls work on phones and tablets</p>
          </div>
        </div>
      </div>
    </main>
  );
}