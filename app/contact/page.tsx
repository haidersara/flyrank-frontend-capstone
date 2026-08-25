import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#F7F9FA] px-4 py-16 md:px-8 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-mono font-bold text-[#14181A]">
            Contact<span className="text-[#7FA39A]">.</span>
          </h1>
          <p className="text-[#14181A]/60 text-lg mt-2">
            Let's build something together.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Email */}
          <a
            href="mailto:haidersara456@gmail.com"
            className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E4E7E6] hover:border-[#7FA39A] hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#7FA39A]/10 flex items-center justify-center group-hover:bg-[#7FA39A]/20 transition-colors">
                <svg className="w-5 h-5 text-[#7FA39A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-[#14181A]">Email</h3>
                <p className="text-[#14181A]/60 text-sm">haidersara456@gmail.com</p>
              </div>
            </div>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/haidersara"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E4E7E6] hover:border-[#7FA39A] hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#7FA39A]/10 flex items-center justify-center group-hover:bg-[#7FA39A]/20 transition-colors">
                <svg className="w-5 h-5 text-[#7FA39A]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.15 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.62.24 2.85.12 3.15.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-[#14181A]">GitHub</h3>
                <p className="text-[#14181A]/60 text-sm">@haidersara</p>
              </div>
            </div>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/sara-haider-125573372"
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-[#E4E7E6] hover:border-[#7FA39A] hover:-translate-y-1"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#7FA39A]/10 flex items-center justify-center group-hover:bg-[#7FA39A]/20 transition-colors">
                <svg className="w-5 h-5 text-[#7FA39A]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-[#14181A]">LinkedIn</h3>
                <p className="text-[#14181A]/60 text-sm">Sara Haider</p>
              </div>
            </div>
          </a>

          {/* Location */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E4E7E6]">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#7FA39A]/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-[#7FA39A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-[#14181A]">Location</h3>
                <p className="text-[#14181A]/60 text-sm">Lahore, Pakistan</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#24423F] rounded-2xl p-8 md:p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#F7F9FA] mb-3">
            Let's build something together.
          </h2>
          <p className="text-[#F7F9FA]/70 max-w-2xl mx-auto">
            Open to Flutter mobile roles, contracts, and technical projects.
          </p>
          <div className="mt-6 flex flex-wrap gap-4 justify-center">
            <a
              href="mailto:haidersara456@gmail.com"
              className="px-6 py-2 bg-[#7FA39A] text-[#14181A] rounded-lg font-medium hover:bg-[#6B8B82] transition-colors"
            >
              Email Me
            </a>
            <a
              href="/Sara Haider CV.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 border border-[#7FA39A] text-[#F7F9FA] rounded-lg font-medium hover:bg-[#7FA39A]/10 transition-colors"
            >
              Download CV
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}