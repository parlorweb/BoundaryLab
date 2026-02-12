
import React, { useState } from 'react';
import { ICONS } from '../constants';
import { Menu, X, History, Bell, Search, Bookmark } from 'lucide-react';
import { StorageService } from '../services/storage';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
  isAdmin?: boolean;
}

const NavLink: React.FC<{ 
  id: string; 
  label: string; 
  icon: React.ReactNode; 
  active: boolean; 
  badge?: string;
  onClick: () => void 
}> = ({ label, icon, active, badge, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group active:scale-[0.98] ${
      active 
        ? 'bg-blue-600 text-white font-semibold shadow-lg shadow-blue-200' 
        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    <div className="flex items-center gap-3">
      <div className={`${active ? 'text-white' : 'text-slate-400 group-hover:text-blue-500'} transition-colors`}>
        {icon}
      </div>
      <span className="text-sm tracking-tight">{label}</span>
    </div>
    {badge && (
      <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full uppercase tracking-tighter ${
        active ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'
      }`}>
        {badge}
      </span>
    )}
  </button>
);

export const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate, isAdmin }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const user = StorageService.getCurrentUser();

  const navigationItems = [
    { id: 'dashboard', label: 'Overview', icon: ICONS.Dashboard },
    { id: 'practice', label: 'Practice', icon: ICONS.Practice },
    { id: 'history', label: 'Session History', icon: <History size={18} /> },
    { id: 'saved', label: 'Saved Questions', icon: <Bookmark size={18} /> },
    { id: 'focus', label: 'Focus Areas', icon: ICONS.Focus },
    { id: 'topics', label: 'Exam Topics', icon: ICONS.Topics },
    { id: 'resources', label: 'Library', icon: ICONS.Resources },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 selection:bg-blue-100 selection:text-blue-900">
      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-40 lg:hidden animate-in fade-in duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 h-screen w-72 bg-white border-r border-slate-200 flex flex-col z-50 transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="p-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black shadow-xl shadow-blue-100 transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer active:scale-95">
              BL
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold text-slate-900 leading-none">BoundaryLab</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">FS Exam Prep</span>
            </div>
          </div>
          <button className="lg:hidden p-2 text-slate-400 hover:bg-slate-50 rounded-lg active:scale-90 transition-transform" onClick={() => setIsSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto mt-4 custom-scrollbar">
          <div className="px-4 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60">Learning</div>
          {navigationItems.map(item => (
            <NavLink 
              key={item.id}
              id={item.id} 
              label={item.label} 
              icon={item.icon} 
              active={activePage === item.id} 
              onClick={() => {
                onNavigate(item.id);
                setIsSidebarOpen(false);
              }} 
            />
          ))}
          
          <div className="pt-8 pb-2 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest opacity-60">Management</div>
          <NavLink id="settings" label="Settings" icon={ICONS.Settings} active={activePage === 'settings'} onClick={() => onNavigate('settings')} />
          {isAdmin && (
            <NavLink id="admin" label="Admin Console" icon={ICONS.Admin} active={activePage === 'admin'} onClick={() => onNavigate('admin')} badge="PRO" />
          )}
        </nav>

        <div className="p-6 border-t border-slate-100">
          <div className="group flex items-center gap-4 p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all cursor-pointer border border-transparent hover:border-slate-200 active:scale-[0.98]">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-lg transition-transform group-hover:scale-105 ${user?.isGuest ? 'bg-slate-400' : 'bg-gradient-to-tr from-blue-600 to-indigo-600 shadow-blue-100'}`}>
              {user?.displayName.substring(0, 2).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">{user?.displayName || 'Surveyor'}</p>
              <p className="text-[10px] text-slate-500 truncate uppercase tracking-tighter">
                {user?.isGuest ? 'Temporary Session' : 'Candidate • Level 12'}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            <button className="lg:hidden p-2 text-slate-600 hover:bg-slate-50 rounded-xl transition-all active:scale-90" onClick={() => setIsSidebarOpen(true)}>
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center gap-3 bg-slate-50 border border-slate-100 px-4 py-2 rounded-2xl w-full max-w-md focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-100 transition-all group">
              <Search size={18} className="text-slate-400 group-focus-within:text-blue-500 transition-colors" />
              <input type="text" placeholder="Search concepts, questions, or topics..." className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400" />
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6">
            <button className="relative p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all active:scale-90 group">
              <Bell size={22} className="group-hover:rotate-12 transition-transform" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white shadow-sm"></span>
            </button>
            <div className="h-8 w-px bg-slate-100 hidden sm:block"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-sm font-bold text-slate-900">Session Mode</span>
                <span className="text-[10px] font-bold text-blue-600 uppercase">Adaptive</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 overflow-y-auto custom-scrollbar">
          <div className="max-w-[1400px] mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Bottom Navigation (Only on mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-xl border-t border-slate-100 flex items-center justify-around px-4 z-40 pb-safe shadow-[0_-8px_30px_rgb(0,0,0,0.04)]">
        {navigationItems.slice(0, 4).map(item => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex flex-col items-center justify-center gap-1.5 w-16 transition-all active:scale-90 ${
              activePage === item.id ? 'text-blue-600 scale-105' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            <div className={`p-2 rounded-xl transition-colors ${activePage === item.id ? 'bg-blue-50 text-blue-600' : 'text-slate-400 group-hover:bg-slate-50'}`}>
              {item.icon}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label.split(' ')[0]}</span>
          </button>
        ))}
      </div>
      
      {/* Padding for mobile bottom nav */}
      <div className="lg:hidden h-20" />
    </div>
  );
};
