import { Link, useLocation } from 'react-router-dom';
import { Home, LayoutDashboard, Network, TerminalSquare } from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/graph', icon: Network, label: 'Relationship Graph' },
  ];

  return (
    <aside className="w-64 glass-panel border-r border-slate-800/80 flex flex-col hidden md:flex relative z-20 shadow-2xl">
      <div className="h-16 flex items-center px-6 border-b border-slate-800/80">
        <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 mr-3 shadow-lg shadow-purple-500/20">
          <Network className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-lg tracking-wide text-slate-100">TraceLens</span>
      </div>
      
      <div className="px-4 py-6">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Navigation</p>
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link 
                key={item.path}
                to={item.path} 
                className={`flex items-center px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 group
                  ${isActive 
                    ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
              >
                <item.icon className={`w-5 h-5 mr-3 transition-colors ${isActive ? 'text-purple-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-4">
        <div className="glass-card rounded-xl p-4 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-purple-500/10 rounded-full blur-xl -mr-8 -mt-8 transition-transform group-hover:scale-150"></div>
          <div className="flex items-center mb-2">
            <TerminalSquare className="w-4 h-4 text-purple-400 mr-2" />
            <p className="font-semibold text-slate-200 text-sm">Demo Environment</p>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Displaying fictional developer data. Locally isolated.
          </p>
        </div>
      </div>
    </aside>
  );
}
