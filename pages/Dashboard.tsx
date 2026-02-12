
import React, { useEffect, useState } from 'react';
import { Card, ProgressBar } from '../components/Cards';
import { ICONS, TIPS, MASTERY_LABELS } from '../constants';
import { StorageService } from '../services/storage';
import { Topic, Concept, PracticeSession, ConceptMastery } from '../types';
import { TrendingUp, Award, Zap, BookOpen, Clock } from 'lucide-react';

interface DashboardProps {
  onStartPractice: (mode: string) => void;
  onNavigate: (page: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ onStartPractice, onNavigate }) => {
  const user = StorageService.getCurrentUser();
  const topics = StorageService.getTopics();
  const mastery = StorageService.getMastery(user?.id || '');
  const queue = StorageService.getReviewQueue(user?.id || '');
  const sessions = StorageService.getSessions(user?.id || '');
  const concepts = StorageService.getConcepts();

  const dueCount = queue.filter(q => new Date(q.dueAt) <= new Date()).length;
  
  const weakMasteryItems = mastery
    .filter(m => m.masteryLevel <= 1)
    .sort((a, b) => a.masteryLevel - b.masteryLevel || b.lifetimeAttempts - a.lifetimeAttempts);

  const tipIndex = new Date().getDate() % TIPS.length;
  const dailyTip = TIPS[tipIndex];

  if (!user) return null;

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero / Greeting */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Hey, {user.displayName.split(' ')[0]} 👋</h2>
          <p className="text-slate-500 font-medium">Here's your study roadmap for today.</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-[20px] border border-slate-100 shadow-sm">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <TrendingUp size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Streak</p>
              <p className="text-sm font-bold text-slate-900">12 Days</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-[20px] border border-slate-100 shadow-sm">
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Award size={18} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase leading-none">Rank</p>
              <p className="text-sm font-bold text-slate-900">Surveyor II</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Practice & Stats */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main CTA Card */}
          <div className="relative overflow-hidden bg-slate-900 rounded-[32px] p-10 text-white shadow-2xl shadow-blue-100 group">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
              <div className="flex-1 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 rounded-full border border-blue-500/30">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-blue-100">Recommended Session</span>
                </div>
                <div>
                  <h3 className="text-3xl font-black tracking-tight leading-tight">Master Boundary Law & Trig Functions</h3>
                  <p className="text-slate-400 mt-2 font-medium max-w-sm">We've selected 15 high-yield questions to boost your readiness score today.</p>
                </div>
                <button 
                  onClick={() => onStartPractice('adaptive')}
                  className="w-full md:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black transition-all shadow-xl shadow-blue-900/40 flex items-center justify-center gap-3 active:scale-95"
                >
                  <Zap size={20} className="fill-current" />
                  Start Mastery Session
                </button>
              </div>
              
              <div className="flex flex-col items-center gap-4 bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[32px]">
                <div className="relative w-28 h-28 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 112 112">
                    <circle cx="56" cy="56" r="48" fill="none" stroke="currentColor" strokeWidth="8" className="text-white/10" />
                    <circle 
                      cx="56" cy="56" r="48" 
                      fill="none" stroke="currentColor" strokeWidth="8" 
                      strokeDasharray={301.6} strokeDashoffset={301.6 * (1 - user.readinessScore / 100)} 
                      className="text-blue-500 transition-all duration-1000 ease-out" 
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute text-3xl font-black">{user.readinessScore}</span>
                </div>
                <div className="text-center">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-400">Readiness</p>
                  <p className="text-[10px] font-medium text-slate-500 mt-1 italic">Exam-Ready Goal: 85+</p>
                </div>
              </div>
            </div>
          </div>

          {/* Topic Progress */}
          <Card title="Concept Proficiency Matrix" headerAction={
            <button onClick={() => onNavigate('topics')} className="text-xs font-bold text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">See Detailed Syllabus</button>
          }>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              {topics.map(topic => {
                const topicMastery = mastery.filter(m => {
                  const concept = concepts.find(c => c.id === m.conceptId);
                  return concept?.topicId === topic.id;
                });
                const totalMastery = topicMastery.reduce((acc, curr) => acc + curr.masteryLevel, 0);
                const maxMastery = Math.max(5, topicMastery.length * 5);
                return (
                  <ProgressBar 
                    key={topic.id}
                    label={topic.name}
                    value={totalMastery}
                    max={maxMastery}
                    size="md"
                    color={totalMastery / maxMastery > 0.8 ? 'bg-emerald-500' : 'bg-blue-600'}
                  />
                );
              })}
            </div>
          </Card>

          {/* Activity Chart Placeholder Style */}
          <Card title="Performance Analytics (Last 7 Days)">
            <div className="h-56 flex items-end justify-between gap-4 px-2">
              {sessions.slice(-14).map((s, i) => {
                const accuracy = (s.correctCount / (s.totalAnswered || 1)) * 100;
                return (
                  <div key={s.id} className="flex-1 flex flex-col items-center gap-3 group relative">
                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded mb-2 whitespace-nowrap z-10 shadow-lg">
                      {Math.round(accuracy)}% Acc.
                    </div>
                    <div className="w-full bg-slate-50 rounded-2xl relative h-40 overflow-hidden border border-slate-100">
                      <div 
                        className={`absolute bottom-0 w-full transition-all duration-700 rounded-t-lg shadow-sm ${
                          accuracy > 80 ? 'bg-emerald-500' : accuracy > 50 ? 'bg-blue-500' : 'bg-slate-300'
                        }`}
                        style={{ height: `${accuracy}%` }}
                      />
                    </div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter">S{i + 1}</span>
                  </div>
                );
              })}
              {sessions.length === 0 && (
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 text-sm font-medium py-8 gap-3">
                  <div className="p-4 bg-slate-50 rounded-3xl"><TrendingUp size={32} className="opacity-20" /></div>
                  <p>Complete sessions to unlock trend insights</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Widgets */}
        <div className="lg:col-span-4 space-y-8">
          {/* Spaced Repetition Widget */}
          <Card className="bg-gradient-to-br from-white to-orange-50/20 border-orange-100">
             <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center shadow-inner border border-white">
                <Clock size={24} strokeWidth={2.5} />
              </div>
              <div>
                <h4 className="font-black text-slate-900 leading-none">Review Queue</h4>
                <p className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mt-1">Spaced Repetition</p>
              </div>
            </div>
            <div className="p-6 bg-white rounded-3xl border border-orange-100 shadow-sm text-center">
              <p className="text-4xl font-black text-slate-900">{dueCount}</p>
              <p className="text-xs font-bold text-slate-400 mt-1">Concepts Due Today</p>
              <button 
                disabled={dueCount === 0}
                className="w-full mt-6 py-3 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-800 disabled:opacity-20 transition-all shadow-lg active:scale-95"
              >
                Clear Queue
              </button>
            </div>
          </Card>

          {/* Focus Needed */}
          <Card title="Focus Needed">
            {weakMasteryItems.length > 0 ? (
              <div className="space-y-6">
                {weakMasteryItems.slice(0, 5).map(m => {
                  const c = concepts.find(concept => concept.id === m.conceptId);
                  if (!c) return null;
                  return (
                    <div key={m.conceptId} className="flex items-start gap-4 group cursor-pointer">
                      <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${m.masteryLevel === 0 ? 'bg-red-400 animate-pulse' : 'bg-orange-400'}`} />
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between items-start">
                          <p className="text-sm font-bold text-slate-800 truncate group-hover:text-blue-600 transition-colors">{c.name}</p>
                          <span className="text-[10px] font-black text-slate-400 ml-2">{Math.round((m.lifetimeCorrect/m.lifetimeAttempts)*100)}%</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[9px] font-bold text-slate-400 uppercase">{MASTERY_LABELS[m.masteryLevel]}</span>
                          <div className="flex-1 h-1 bg-slate-50 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(m.masteryLevel / 5) * 100}%` }} />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <button 
                  onClick={() => onStartPractice('focus')}
                  className="w-full py-4 text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-2xl transition-all border border-blue-100 shadow-sm"
                >
                  Start Intensive Drill
                </button>
              </div>
            ) : (
              <div className="text-center py-6 px-4">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award size={24} />
                </div>
                <p className="text-sm font-bold text-slate-900">Consistency pays off!</p>
                <p className="text-xs text-slate-400 mt-1">No critical weak points detected.</p>
              </div>
            )}
          </Card>

          {/* Study Tip */}
          <div className="bg-gradient-to-tr from-blue-600 to-indigo-700 rounded-[32px] p-8 text-white shadow-xl shadow-blue-200 relative overflow-hidden group">
            <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform">
              <BookOpen size={120} />
            </div>
            <div className="relative z-10 space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-white/20 rounded-lg text-[9px] font-black uppercase tracking-widest">
                  Study Pro-Tip: {dailyTip.category}
                </span>
              </div>
              <p className="text-sm font-bold leading-relaxed italic opacity-90">
                "{dailyTip.text}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
