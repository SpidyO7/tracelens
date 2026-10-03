import { useEffect, useState } from 'react';
import { BookMarked, Code2, Layers, Activity, Star, GitFork, UserCircle, Download, ExternalLink, Calendar, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface DashboardStats {
  projects: number;
  repositories: number;
  technologies: number;
  activities: number;
  organizations: number;
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  const fallbackStats = {
    projects: 4,
    repositories: 12,
    technologies: 8,
    activities: 27,
    organizations: 2
  };

  const techData = [
    { name: 'Java', value: 42, color: '#8b5cf6' },
    { name: 'TypeScript', value: 28, color: '#6366f1' },
    { name: 'Python', value: 18, color: '#ec4899' },
    { name: 'React', value: 12, color: '#14b8a6' },
  ];

  const repos = [
    { name: 'SmartCampus', desc: 'Campus management backend API framework for educational institutions.', lang: 'Java', stars: 42, forks: 12, date: 'Updated 2d ago' },
    { name: 'TaskFlow', desc: 'Collaborative productivity application with real-time syncing.', lang: 'TypeScript', stars: 31, forks: 8, date: 'Updated 1w ago' },
    { name: 'WeatherAPI', desc: 'High-throughput weather data aggregation service.', lang: 'Python', stars: 89, forks: 25, date: 'Updated 1mo ago' },
    { name: 'CodeShare', desc: 'Snippet sharing platform for developer teams.', lang: 'React', stars: 15, forks: 2, date: 'Updated 3mo ago' }
  ];

  const timeline = [
    { year: '2026', title: 'Released WeatherAPI v2.0', desc: 'Major architectural rewrite' },
    { year: '2025', title: 'Added PostgreSQL integration', desc: 'Migrated SmartCampus from MySQL' },
    { year: '2024', title: 'Released TaskFlow', desc: 'Initial public beta launch' },
    { year: '2023', title: 'Created SmartCampus', desc: 'First open source contribution' },
  ];

  useEffect(() => {
    // Simulate slight network delay for loader
    const timer = setTimeout(() => {
      fetch('http://localhost:5000/api/dashboard/1')
        .then(res => res.json())
        .then(data => {
          if (!data.error) setStats(data);
          else setStats(fallbackStats);
          setLoading(false);
        })
        .catch(() => {
          setStats(fallbackStats);
          setLoading(false);
        });
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto animate-fade-in relative z-10">
      
      {/* Top Header */}
      <header className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2 text-sm">
            <span className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-400 font-semibold uppercase tracking-wider flex items-center shadow-inner">
              <UserCircle className="w-4 h-4 mr-1.5" />
              Demo Profile
            </span>
            <span className="text-slate-500 font-mono">ID: TL-1024</span>
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight">alexmorgan-dev</h1>
          <p className="text-slate-400 mt-2 max-w-xl text-sm leading-relaxed">
            Full-stack developer building tools for education and productivity. Fictional data mapping visualization.
          </p>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search local projects..." 
              className="w-full bg-slate-900/50 border border-slate-700/80 rounded-lg pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all text-slate-200 placeholder:text-slate-500"
            />
          </div>
          <button className="flex items-center justify-center bg-slate-100 hover:bg-white text-slate-900 px-4 py-2.5 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            <Download className="w-4 h-4 mr-2" />
            Export
          </button>
        </div>
      </header>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
        {[
          { label: 'Projects', value: stats?.projects, icon: Layers, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Repositories', value: stats?.repositories, icon: BookMarked, color: 'text-purple-400', bg: 'bg-purple-500/10' },
          { label: 'Technologies', value: stats?.technologies, icon: Code2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Organizations', value: stats?.organizations, icon: Activity, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Public Activities', value: stats?.activities, icon: Calendar, color: 'text-pink-400', bg: 'bg-pink-500/10' },
        ].map((stat, i) => (
          <div key={i} className="glass-card rounded-xl p-5 hover-glow group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors">{stat.label}</span>
              <div className={`p-2 rounded-lg ${stat.bg}`}>
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
              </div>
            </div>
            {loading ? (
              <div className="h-9 w-16 bg-slate-800 animate-pulse rounded-md"></div>
            ) : (
              <div className="text-3xl font-extrabold text-slate-100">{stat.value}</div>
            )}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column - Repositories */}
        <div className="xl:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center">
              <BookMarked className="w-5 h-5 mr-2 text-purple-400" />
              Featured Repositories
            </h2>
            <button className="text-sm text-purple-400 hover:text-purple-300 font-medium">View all →</button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loading ? Array(4).fill(0).map((_, i) => (
              <div key={i} className="glass-card rounded-xl p-6 h-[180px] animate-pulse">
                <div className="w-1/2 h-5 bg-slate-800 rounded mb-4"></div>
                <div className="w-full h-4 bg-slate-800 rounded mb-2"></div>
                <div className="w-2/3 h-4 bg-slate-800 rounded mb-8"></div>
                <div className="flex gap-4">
                  <div className="w-12 h-4 bg-slate-800 rounded"></div>
                  <div className="w-12 h-4 bg-slate-800 rounded"></div>
                </div>
              </div>
            )) : repos.map((repo, i) => (
              <div key={i} className="glass-card rounded-xl p-6 hover-glow group cursor-pointer relative overflow-hidden flex flex-col justify-between h-full">
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="w-4 h-4 text-slate-400 hover:text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-purple-400 transition-colors">{repo.name}</h3>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed line-clamp-2">{repo.desc}</p>
                </div>
                <div className="flex items-center justify-between text-xs font-medium text-slate-500 pt-4 border-t border-slate-800/60">
                  <div className="flex gap-4">
                    <span className="flex items-center">
                      <span className={`w-2 h-2 rounded-full mr-1.5 ${repo.lang === 'Java' ? 'bg-orange-500' : repo.lang === 'TypeScript' ? 'bg-blue-500' : repo.lang === 'Python' ? 'bg-yellow-400' : 'bg-cyan-400'}`}></span>
                      {repo.lang}
                    </span>
                    <span className="flex items-center hover:text-slate-300"><Star className="w-3.5 h-3.5 mr-1" />{repo.stars}</span>
                    <span className="flex items-center hover:text-slate-300"><GitFork className="w-3.5 h-3.5 mr-1" />{repo.forks}</span>
                  </div>
                  <span className="text-slate-600">{repo.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Tech & Activity */}
        <div className="space-y-6">
          <div className="glass-card rounded-xl p-6">
            <h2 className="text-lg font-bold mb-6 flex items-center">
              <Code2 className="w-5 h-5 mr-2 text-emerald-400" />
              Technology Distribution
            </h2>
            <div className="h-[220px]">
              {loading ? (
                <div className="w-full h-full bg-slate-800/50 animate-pulse rounded-lg"></div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={techData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={100} stroke="#94a3b8" fontSize={13} tickLine={false} axisLine={false} />
                    <Tooltip 
                      cursor={{ fill: 'rgba(30, 41, 59, 0.5)' }} 
                      contentStyle={{ backgroundColor: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(51, 65, 85, 0.5)', borderRadius: '8px', backdropFilter: 'blur(8px)', color: '#fff' }} 
                      itemStyle={{ color: '#e2e8f0', fontWeight: 'bold' }}
                    />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={24}>
                      {techData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} className="hover:fill-opacity-100 transition-all duration-300" />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          <div className="glass-card rounded-xl p-6">
            <h2 className="text-lg font-bold mb-6 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-pink-400" />
              Activity Timeline
            </h2>
            <div className="space-y-0">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="flex gap-4 mb-4">
                    <div className="w-2 h-2 bg-slate-800 rounded-full mt-2 animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="w-16 h-3 bg-slate-800 rounded animate-pulse"></div>
                      <div className="w-full h-4 bg-slate-800 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))
              ) : timeline.map((item, i) => (
                <div key={i} className="relative pl-8 pb-6 last:pb-0">
                  {/* Line connecting nodes */}
                  {i !== timeline.length - 1 && (
                    <div className="absolute left-[5px] top-[14px] bottom-0 w-[2px] bg-gradient-to-b from-slate-700 to-slate-800"></div>
                  )}
                  {/* Node */}
                  <div className={`absolute w-3 h-3 rounded-full left-0 top-1.5 border-2 border-slate-900 ${i === 0 ? 'bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]' : 'bg-slate-600'}`}></div>
                  
                  <div className="text-xs font-bold text-slate-500 mb-1">{item.year}</div>
                  <div className="font-semibold text-slate-200">{item.title}</div>
                  <div className="text-sm text-slate-400 mt-1">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
