
import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { 
  HomeIcon, 
  MagnifyingGlassIcon, 
  BookmarkIcon, 
  UserIcon,
  Bars3Icon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSidebarOpen(false);
    }
  };

  const navItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Search', path: '/search', icon: MagnifyingGlassIcon },
    { name: 'My List', path: '/library', icon: BookmarkIcon },
    { name: 'Profile', path: '/profile', icon: UserIcon },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-zinc-950 text-zinc-100">
      {/* Mobile Top Nav */}
      <header className="md:hidden flex items-center justify-between p-4 sticky top-0 z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-rose-600 rounded-lg flex items-center justify-center font-bold text-white italic">K</div>
          <span className="font-bold text-lg tracking-tight">Keith <span className="text-rose-600">DramaBox</span></span>
        </Link>
        <button onClick={() => setSidebarOpen(true)} className="p-2">
          <Bars3Icon className="w-6 h-6" />
        </button>
      </header>

      {/* Sidebar / Desktop Nav */}
      <aside className={`
        fixed inset-0 z-[60] bg-zinc-950 md:relative md:flex md:flex-col md:w-64 md:h-screen md:sticky md:top-0
        transition-transform duration-300 md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full p-6">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center gap-2" onClick={() => setSidebarOpen(false)}>
              <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center font-bold text-white text-xl italic">K</div>
              <span className="font-bold text-xl tracking-tight">Keith <span className="text-rose-600">DramaBox</span></span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="md:hidden p-2 text-zinc-400">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          <form onSubmit={handleSearch} className="mb-8 relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search dramas..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-rose-600 transition-all text-sm"
            />
          </form>

          <nav className="flex-1 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                    isActive 
                      ? 'bg-rose-600/10 text-rose-500 font-medium' 
                      : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-100'
                  }`}
                >
                  <item.icon className="w-6 h-6" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-zinc-900">
            <p className="text-xs text-zinc-600">© 2024 Keithkeizzah</p>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 md:p-8 p-4 overflow-y-auto">
        {children}
      </main>

      {/* Mobile Bottom Nav */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/80 backdrop-blur-xl border-t border-zinc-800 flex justify-around p-2">
         {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                    isActive ? 'text-rose-500' : 'text-zinc-500'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-[10px]">{item.name}</span>
                </Link>
              );
            })}
      </div>
    </div>
  );
};

export default Layout;
