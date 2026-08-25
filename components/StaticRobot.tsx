"use client";

export default function StaticRobot() {
  return (
    <div className="relative w-20 h-20">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          {/* Robot Head - Original Face */}
          <div className="w-16 h-16 rounded-full bg-[#7FA39A] shadow-lg flex items-center justify-center border-2 border-[#24423F]">
            {/* Eyes - Original style */}
            <div className="flex gap-3">
              <div className="w-3 h-3 rounded-full bg-[#14181A] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
              <div className="w-3 h-3 rounded-full bg-[#14181A] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-white" />
              </div>
            </div>
            {/* Blush */}
            <div className="absolute -bottom-1 left-2 w-3 h-1.5 rounded-full bg-pink-400/30" />
            <div className="absolute -bottom-1 right-2 w-3 h-1.5 rounded-full bg-pink-400/30" />
          </div>
          {/* Antenna */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-3 bg-[#24423F]" />
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#7FA39A] border border-[#24423F]">
            <div className="w-1 h-1 rounded-full bg-white/50 animate-pulse mx-auto mt-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}