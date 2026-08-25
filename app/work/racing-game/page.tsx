import Link from "next/link";

export default function RacingGamePage() {
  return (
    <main className="min-h-screen bg-[#14181A] px-4 py-12 md:px-8 md:py-20">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/work"
          className="text-[#7FA39A] hover:text-[#6B8B82] transition-colors mb-8 inline-block"
        >
          ← Back to Work
        </Link>

        <h1 className="text-4xl md:text-5xl font-mono font-bold text-[#F7F9FA] mb-4">
          Car Racing Game
          <span className="text-[#7FA39A]">.</span>
        </h1>

        <div className="text-[#7FA39A] text-sm font-mono mb-8">
          x86 Assembly · EMU8086 · Low-Level Game Development
        </div>

        <div className="relative aspect-video bg-[#0D1A17] rounded-2xl overflow-hidden mb-8 border border-[#7FA39A]/20">
          <video
            src="/videos/racing-game-preview.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        <div className="bg-[#1A2F2B] rounded-2xl p-6 md:p-8 border border-[#7FA39A]/10 mb-8">
          <h2 className="text-xl font-bold text-[#F7F9FA] mb-4">Project Overview</h2>
          <p className="text-[#F7F9FA]/70 leading-relaxed mb-4">
            A real-time racing game built in x86 Assembly language for the EMU8086 environment.
            The game features player-controlled car movement, two enemy vehicles, collision
            detection, scoring system, and progressive difficulty scaling.
          </p>
          <p className="text-[#F7F9FA]/70 leading-relaxed">
            This project demonstrates mastery of low-level programming concepts including
            register manipulation, hardware interrupts, stack operations, and conditional branching.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#1A2F2B] rounded-2xl p-6 border border-[#7FA39A]/10">
            <h3 className="font-bold text-[#F7F9FA] mb-3">Game Features</h3>
            <ul className="space-y-2 text-[#F7F9FA]/70 text-sm">
              <li>✅ Player movement (A/D keys)</li>
              <li>✅ Two enemy cars with independent movement</li>
              <li>✅ Collision detection with lives system</li>
              <li>✅ Score tracking (points for passing enemies)</li>
              <li>✅ Progressive difficulty (speed increases every 5 points)</li>
              <li>✅ Start menu / Game Over menu</li>
              <li>✅ Restart functionality (R key)</li>
              <li>✅ Quit functionality (Q/X keys)</li>
            </ul>
          </div>

          <div className="bg-[#1A2F2B] rounded-2xl p-6 border border-[#7FA39A]/10">
            <h3 className="font-bold text-[#F7F9FA] mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#7FA39A]/20 text-[#7FA39A] border border-[#7FA39A]/20">
                x86 Assembly
              </span>
              <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#7FA39A]/20 text-[#7FA39A] border border-[#7FA39A]/20">
                EMU8086
              </span>
              <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#7FA39A]/20 text-[#7FA39A] border border-[#7FA39A]/20">
                DOS Emulator
              </span>
            </div>
            <div className="text-[#F7F9FA]/50 text-sm">
              <p>Interrupts Used: INT 10h, 16h, 1Ah, 21h</p>
              <p className="mt-1">Total Code: ~450 lines</p>
              <p>Memory Footprint: ~2 KB</p>
            </div>
          </div>
        </div>

        <a
          href="/PROJECT%20REPORT%20(2).pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-[#7FA39A] text-[#14181A] rounded-lg font-medium hover:bg-[#6B8B82] transition-colors"
        >
          📄 View Full Project Report
        </a>
      </div>
    </main>
  );
}