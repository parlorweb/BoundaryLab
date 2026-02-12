
import React, { useState } from 'react';
import { StorageService } from '../services/storage';
import { User } from '../types';

interface LoginProps {
  onLogin: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'temp' && password === 'temp') {
      StorageService.login({
        id: 'user-temp',
        email: 'temp@boundarylab.com',
        displayName: 'Temp Surveyor',
        isAdmin: true,
        readinessScore: 50
      });
      onLogin();
    } else {
      setError('Invalid username or password (hint: temp/temp)');
    }
  };

  const handleGuestLogin = () => {
    const expiration = Date.now() + 20 * 60 * 1000; // 20 minutes
    const guestUser: User = {
      id: 'guest-' + Math.random().toString(36).substring(7),
      email: 'guest@boundarylab.com',
      displayName: 'Guest Surveyor',
      isAdmin: false,
      readinessScore: 0,
      isGuest: true,
      guestExpiresAt: expiration
    };
    StorageService.login(guestUser);
    onLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6 selection:bg-blue-100">
      <div className="max-w-md w-full animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="text-center mb-10 group">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black mx-auto mb-4 shadow-xl shadow-blue-200 transform -rotate-3 transition-transform group-hover:rotate-0 active:scale-95">BL</div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">BoundaryLab</h1>
          <p className="text-slate-500 mt-2 font-medium">Professional FS Exam Mastery</p>
        </div>

        <div className="bg-white p-10 rounded-[32px] shadow-sm border border-slate-200 transition-all hover:shadow-xl hover:border-slate-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all font-bold placeholder:text-slate-300 focus:bg-white"
                placeholder="temp"
              />
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-600 transition-all font-bold placeholder:text-slate-300 focus:bg-white"
                placeholder="temp"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-center animate-in shake duration-300">
                <p className="text-xs font-bold text-red-500">{error}</p>
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-800 transition-all shadow-xl active:scale-[0.98] hover:shadow-2xl"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-8 flex flex-col gap-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-3 text-slate-300 font-black tracking-widest">or</span></div>
            </div>

            <button 
              onClick={handleGuestLogin}
              className="w-full py-4 bg-white border-2 border-slate-100 text-slate-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 hover:border-slate-300 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              Try Guest Mode
            </button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-loose">
              For testing use: <span className="text-blue-600 hover:underline cursor-pointer">temp</span> / <span className="text-blue-600 hover:underline cursor-pointer">temp</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
