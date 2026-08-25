import Link from "next/link";

export default function PBLPage() {
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
          PBL Management System
          <span className="text-[#7FA39A]">.</span>
        </h1>

        <div className="text-[#7FA39A] text-sm font-mono mb-8">
          ERP System · Role-Based Access Control · In Progress
        </div>

        {/* Video */}
        <div className="relative aspect-video bg-[#0D1A17] rounded-2xl overflow-hidden mb-8 border border-[#7FA39A]/20">
          <video
            src="/videos/PBL-preview.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Description */}
        <div className="bg-[#1A2F2B] rounded-2xl p-6 md:p-8 border border-[#7FA39A]/10 mb-8">
          <h2 className="text-xl font-bold text-[#F7F9FA] mb-4">Project Overview</h2>
          <p className="text-[#F7F9FA]/70 leading-relaxed mb-4">
            A comprehensive Project-Based Learning (PBL) Management System built with Flask 
            and MongoDB. This ERP-style application streamlines student management, department 
            coordination, and academic administration with role-based access control.
          </p>
          <p className="text-[#F7F9FA]/70 leading-relaxed">
            The system is currently in active development, with core features including 
            student management, announcements, dashboard analytics, and role-based 
            authentication. Built with a clean separation of concerns following the 
            Service-Repository pattern.
          </p>
        </div>

        {/* Status Badge */}
        <div className="bg-[#1A2F2B] rounded-2xl p-4 border border-[#7FA39A]/10 mb-8 flex items-center gap-4">
          <span className="px-4 py-2 text-sm font-mono rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/20">
            🚧 In Progress
          </span>
          <span className="text-[#F7F9FA]/60 text-sm">
            Active development · Core features complete
          </span>
        </div>

        {/* Architecture Section */}
        <div className="bg-[#1A2F2B] rounded-2xl p-6 md:p-8 border border-[#7FA39A]/10 mb-8">
          <h3 className="text-xl font-bold text-[#F7F9FA] mb-4">Architecture Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#14181A] rounded-xl p-4 border border-[#7FA39A]/10">
              <h4 className="text-[#7FA39A] font-bold text-sm mb-2">📦 Models</h4>
              <p className="text-[#F7F9FA]/50 text-xs">Student, Department, Course, Announcement, User field constants with Role class</p>
            </div>
            <div className="bg-[#14181A] rounded-xl p-4 border border-[#7FA39A]/10">
              <h4 className="text-[#7FA39A] font-bold text-sm mb-2">✅ Schemas</h4>
              <p className="text-[#F7F9FA]/50 text-xs">Student and Department data validation using Pydantic</p>
            </div>
            <div className="bg-[#14181A] rounded-xl p-4 border border-[#7FA39A]/10">
              <h4 className="text-[#7FA39A] font-bold text-sm mb-2">⚙️ Services</h4>
              <p className="text-[#F7F9FA]/50 text-xs">Student CRUD and Announcement CRUD operations</p>
            </div>
            <div className="bg-[#14181A] rounded-xl p-4 border border-[#7FA39A]/10">
              <h4 className="text-[#7FA39A] font-bold text-sm mb-2">🔌 API Routes</h4>
              <p className="text-[#F7F9FA]/50 text-xs">Dashboard, Announcements, Students CRUD endpoints</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#1A2F2B] rounded-2xl p-6 border border-[#7FA39A]/10">
            <h3 className="font-bold text-[#F7F9FA] mb-3">✅ Completed Features</h3>
            <ul className="space-y-2 text-[#F7F9FA]/70 text-sm">
              <li>✅ Student CRUD (POST, GET, PUT, DELETE, Restore, Permanent Delete)</li>
              <li>✅ Dashboard API with analytics</li>
              <li>✅ Announcements CRUD (POST, GET, PUT, DELETE)</li>
              <li>✅ Role-Based Access Control</li>
              <li>✅ JWT Authentication</li>
              <li>✅ Audit Logging</li>
              <li>✅ Swagger/OpenAPI Documentation</li>
              <li>✅ Soft Delete & Restore functionality</li>
            </ul>
          </div>

          <div className="bg-[#1A2F2B] rounded-2xl p-6 border border-[#7FA39A]/10">
            <h3 className="font-bold text-[#F7F9FA] mb-3">🚧 In Progress</h3>
            <ul className="space-y-2 text-[#F7F9FA]/70 text-sm">
              <li>⏳ Group Management</li>
              <li>⏳ Evaluator Assignment</li>
              <li>⏳ Student-Project Matching</li>
              <li>⏳ Advanced Reporting</li>
              <li>⏳ Email Notifications</li>
              <li>⏳ Frontend Dashboard UI</li>
            </ul>
          </div>
        </div>

        {/* APIs Created */}
        <div className="bg-[#1A2F2B] rounded-2xl p-6 md:p-8 border border-[#7FA39A]/10 mb-8">
          <h3 className="text-xl font-bold text-[#F7F9FA] mb-4">📡 APIs Created</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#7FA39A]/20">
                  <th className="text-left text-[#7FA39A] font-medium py-2 px-3">API</th>
                  <th className="text-left text-[#7FA39A] font-medium py-2 px-3">Method</th>
                  <th className="text-left text-[#7FA39A] font-medium py-2 px-3">Path</th>
                  <th className="text-left text-[#7FA39A] font-medium py-2 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-[#F7F9FA]/70">
                <tr className="border-b border-[#7FA39A]/10">
                  <td className="py-2 px-3">Login</td>
                  <td className="py-2 px-3">POST</td>
                  <td className="py-2 px-3 font-mono text-xs">/api/auth/login</td>
                  <td className="py-2 px-3 text-green-400">✅ Working</td>
                </tr>
                <tr className="border-b border-[#7FA39A]/10">
                  <td className="py-2 px-3">Get Current User</td>
                  <td className="py-2 px-3">GET</td>
                  <td className="py-2 px-3 font-mono text-xs">/api/auth/me</td>
                  <td className="py-2 px-3 text-green-400">✅ Working</td>
                </tr>
                <tr className="border-b border-[#7FA39A]/10">
                  <td className="py-2 px-3">Dashboard</td>
                  <td className="py-2 px-3">GET</td>
                  <td className="py-2 px-3 font-mono text-xs">/api/manager/dashboard</td>
                  <td className="py-2 px-3 text-green-400">✅ Working</td>
                </tr>
                <tr className="border-b border-[#7FA39A]/10">
                  <td className="py-2 px-3">List Students</td>
                  <td className="py-2 px-3">GET</td>
                  <td className="py-2 px-3 font-mono text-xs">/api/manager/students</td>
                  <td className="py-2 px-3 text-green-400">✅ Working</td>
                </tr>
                <tr className="border-b border-[#7FA39A]/10">
                  <td className="py-2 px-3">Add Student</td>
                  <td className="py-2 px-3">POST</td>
                  <td className="py-2 px-3 font-mono text-xs">/api/manager/students</td>
                  <td className="py-2 px-3 text-green-400">✅ Working</td>
                </tr>
                <tr className="border-b border-[#7FA39A]/10">
                  <td className="py-2 px-3">Get Student</td>
                  <td className="py-2 px-3">GET</td>
                  <td className="py-2 px-3 font-mono text-xs">/api/manager/students/{'{id}'}</td>
                  <td className="py-2 px-3 text-green-400">✅ Working</td>
                </tr>
                <tr className="border-b border-[#7FA39A]/10">
                  <td className="py-2 px-3">Update Student</td>
                  <td className="py-2 px-3">PUT</td>
                  <td className="py-2 px-3 font-mono text-xs">/api/manager/students/{'{id}'}</td>
                  <td className="py-2 px-3 text-green-400">✅ Working</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">Announcements</td>
                  <td className="py-2 px-3">POST/GET/PUT/DELETE</td>
                  <td className="py-2 px-3 font-mono text-xs">/api/manager/announcements</td>
                  <td className="py-2 px-3 text-green-400">✅ Working</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-[#1A2F2B] rounded-2xl p-6 md:p-8 border border-[#7FA39A]/10">
          <h3 className="text-xl font-bold text-[#F7F9FA] mb-4">Tech Stack</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#7FA39A]/20 text-[#7FA39A] border border-[#7FA39A]/20">
              Python
            </span>
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#7FA39A]/20 text-[#7FA39A] border border-[#7FA39A]/20">
              Flask
            </span>
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#7FA39A]/20 text-[#7FA39A] border border-[#7FA39A]/20">
              MongoDB
            </span>
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#7FA39A]/20 text-[#7FA39A] border border-[#7FA39A]/20">
              JWT
            </span>
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#7FA39A]/20 text-[#7FA39A] border border-[#7FA39A]/20">
              Docker
            </span>
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#7FA39A]/20 text-[#7FA39A] border border-[#7FA39A]/20">
              Swagger
            </span>
            <span className="px-3 py-1 text-xs font-mono rounded-full bg-[#7FA39A]/20 text-[#7FA39A] border border-[#7FA39A]/20">
              Flask-RESTX
            </span>
          </div>
          <div className="text-[#F7F9FA]/50 text-sm">
            <p>Architecture: Service-Repository Pattern · Clean Separation of Concerns</p>
            <p className="mt-1">Deployment: Dockerized · CI/CD Ready</p>
          </div>
        </div>
      </div>
    </main>
  );
}