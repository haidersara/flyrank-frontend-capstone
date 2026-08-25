import Link from "next/link";

export default function MelodiesPage() {
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
          Melodies
          <span className="text-[#7FA39A]">.</span>
        </h1>

        <div className="text-[#7FA39A] text-sm font-mono mb-8">
          Flutter Music App · Cross-Platform · Clean Architecture
        </div>

        {/* Mobile Phone Video Display */}
        <div className="flex justify-center mb-8">
          <div className="relative w-[280px] sm:w-[320px] md:w-[360px] aspect-[9/19] bg-[#0D1A17] rounded-[40px] border-4 border-[#1A2F2B] shadow-2xl shadow-[#7FA39A]/10 overflow-hidden">
            {/* Phone Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#0D1A17] rounded-b-2xl z-10 flex items-center justify-center">
              <div className="w-10 h-4 bg-[#14181A] rounded-full" />
            </div>
            {/* Phone Speaker */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#14181A]/50 rounded-full z-10" />
            
            {/* Video */}
            <video
              src="/videos/melodies-preview.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Description */}
        <div className="bg-[#1A2F2B] rounded-2xl p-6 md:p-8 border border-[#7FA39A]/10 mb-8">
          <h2 className="text-xl font-bold text-[#F7F9FA] mb-4">Project Overview</h2>
          <p className="text-[#F7F9FA]/70 leading-relaxed mb-4">
            Melodies is a full-featured, cross-platform mobile music streaming and community 
            application developed in Flutter using a strict Clean Architecture pattern and 
            Provider state management.
          </p>
          <p className="text-[#F7F9FA]/70 leading-relaxed mb-4">
            The application is designed with a modern, responsive user interface inspired by 
            custom Figma wireframes and includes essential user authentication, local session 
            persistence via SharedPreferences, and cloud-based backend integration using 
            Firebase Auth.
          </p>
          <p className="text-[#F7F9FA]/70 leading-relaxed">
            The project enforces a decoupled design by strictly separating code into 
            Presentation, Domain, and Data layers, ensuring high testability, scalability, 
            and robust error handling across all core modules.
          </p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#1A2F2B] rounded-2xl p-6 border border-[#7FA39A]/10">
            <h3 className="font-bold text-[#F7F9FA] mb-3">Key Features</h3>
            <ul className="space-y-2 text-[#F7F9FA]/70 text-sm">
              <li>✅ Cross-platform (iOS & Android)</li>
              <li>✅ Clean Architecture (Presentation, Domain, Data layers)</li>
              <li>✅ Provider state management</li>
              <li>✅ Firebase Authentication</li>
              <li>✅ Local session persistence (SharedPreferences)</li>
              <li>✅ Real background audio playback</li>
              <li>✅ Modern UI inspired by Figma wireframes</li>
              <li>✅ Scalable and testable codebase</li>
            </ul>
          </div>

          <div className="bg-[#1A2F2B] rounded-2xl p-6 border border-[#7FA39A]/10">
            <h3 className="font-bold text-[#F7F9FA] mb-3">Tech Stack</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#7FA39A]/20 text-[#7FA39A] border border-[#7FA39A]/20">
                Flutter
              </span>
              <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#7FA39A]/20 text-[#7FA39A] border border-[#7FA39A]/20">
                Dart
              </span>
              <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#7FA39A]/20 text-[#7FA39A] border border-[#7FA39A]/20">
                Provider
              </span>
              <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#7FA39A]/20 text-[#7FA39A] border border-[#7FA39A]/20">
                Firebase Auth
              </span>
              <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#7FA39A]/20 text-[#7FA39A] border border-[#7FA39A]/20">
                SharedPreferences
              </span>
            </div>
            <div className="text-[#F7F9FA]/50 text-sm">
              <p>Architecture: Clean Architecture</p>
              <p className="mt-1">State Management: Provider</p>
              <p>Backend: Firebase Auth</p>
            </div>
          </div>
        </div>

        {/* Clean Architecture Section */}
        <div className="bg-[#1A2F2B] rounded-2xl p-6 md:p-8 border border-[#7FA39A]/10">
          <h3 className="text-xl font-bold text-[#F7F9FA] mb-4">Clean Architecture Layers</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#14181A] rounded-xl p-4 border border-[#7FA39A]/10">
              <h4 className="text-[#7FA39A] font-bold text-sm mb-2">🎨 Presentation Layer</h4>
              <p className="text-[#F7F9FA]/50 text-xs">UI components, screens, widgets, and state management using Provider.</p>
            </div>
            <div className="bg-[#14181A] rounded-xl p-4 border border-[#7FA39A]/10">
              <h4 className="text-[#7FA39A] font-bold text-sm mb-2">⚙️ Domain Layer</h4>
              <p className="text-[#F7F9FA]/50 text-xs">Business logic, entities, use cases, and repository interfaces.</p>
            </div>
            <div className="bg-[#14181A] rounded-xl p-4 border border-[#7FA39A]/10">
              <h4 className="text-[#7FA39A] font-bold text-sm mb-2">📦 Data Layer</h4>
              <p className="text-[#F7F9FA]/50 text-xs">Repository implementations, data sources (local & remote), and models.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}