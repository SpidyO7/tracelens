import { Link } from 'react-router-dom';
import { ArrowRight, Terminal, Shield, Network, Database } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-full flex flex-col relative overflow-hidden">
      {/* Premium Animated Background */}
      <div className="absolute inset-0 bg-slate-950 -z-20"></div>
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow -z-10 pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] mix-blend-screen animate-pulse-slow -z-10 pointer-events-none" style={{animationDelay: '1s'}}></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] [mask-image:linear-gradient(to_bottom,white,transparent)] -z-10 pointer-events-none"></div>

      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-slide-up">
        <div className="mb-8 inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-sm font-medium text-purple-300 backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.15)]">
          <span className="relative flex h-2.5 w-2.5 mr-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          Demo Environment Active
        </div>

        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
          <span className="text-slate-100">Explore the</span><br />
          <span className="text-gradient drop-shadow-sm">Developer Footprint.</span>
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-slate-400 mb-10 leading-relaxed font-light">
          Discover projects, technologies, repositories, and public activity mapped into a single connected knowledge graph.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
          <Link to="/dashboard" className="group relative inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-slate-100 text-slate-900 font-bold transition-all hover:bg-white hover:scale-105 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            Explore Dashboard
            <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
          
          <button className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg glass-card text-white font-medium hover:bg-slate-800/80 transition-all hover:border-slate-600">
            <Terminal className="w-5 h-5 mr-2 text-slate-400" />
            Load Demo Workspace
          </button>
        </div>
      </div>
      
      {/* Feature Highlights Footer */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 max-w-6xl mx-auto w-full border-t border-slate-800/50 bg-slate-950/50 backdrop-blur-sm mt-auto">
        <div className="flex flex-col items-center text-center p-4">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 border border-blue-500/20">
            <Database className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="font-semibold text-slate-200 mb-2">Local Data Only</h3>
          <p className="text-sm text-slate-500">Operates entirely on local PostgreSQL databases without external queries.</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-4 border border-purple-500/20">
            <Network className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="font-semibold text-slate-200 mb-2">Interactive Graphs</h3>
          <p className="text-sm text-slate-500">Visualize complex relationships between projects and technologies.</p>
        </div>
        <div className="flex flex-col items-center text-center p-4">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4 border border-emerald-500/20">
            <Shield className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="font-semibold text-slate-200 mb-2">Privacy First</h3>
          <p className="text-sm text-slate-500">Built to analyze public portfolios securely. Fictional data guaranteed.</p>
        </div>
      </div>
    </div>
  );
}
