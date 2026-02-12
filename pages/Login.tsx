
import React, { useState } from 'react';
import { StorageService } from '../services/storage';

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

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg">BL</div>
          <h1 className="text-3xl font-bold text-slate-900">BoundaryLab</h1>
          <p className="text-slate-500 mt-2">FS Exam Preparation Training Center</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="temp"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="temp"
              />
            </div>

            {error && <p className="text-xs font-medium text-red-500 text-center">{error}</p>}

            <button 
              type="submit"
              className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all shadow-md active:scale-95"
            >
              Sign In
            </button>
          </form>
          
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              For evaluation, use <span className="font-bold text-slate-600">temp</span> / <span className="font-bold text-slate-600">temp</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
