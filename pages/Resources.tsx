
import React from 'react';
import { Card } from '../components/Cards';
import { StorageService } from '../services/storage';
import { BookOpen, ExternalLink, Calculator, ArrowRight } from 'lucide-react';
import { TutorialTopic } from '../components/TutorialPage';

interface ResourcesProps {
  onNavigateTutorial: (id: TutorialTopic) => void;
}

export const Resources: React.FC<ResourcesProps> = ({ onNavigateTutorial }) => {
  const resources = StorageService.getResources();
  const categories = Array.from(new Set(resources.map(r => r.category)));

  const tutorials: { id: TutorialTopic; title: string; desc: string; color: string }[] = [
    { 
      id: 'compass-rule', 
      title: 'Compass Rule Adjustment', 
      desc: 'Master proportional traverse closure and sign conventions.',
      color: 'from-blue-600 to-indigo-700'
    },
    { 
      id: 'relative-error', 
      title: 'Relative Error of Closure', 
      desc: 'Calculate precision ratios (1:X) from raw closure data.',
      color: 'from-emerald-600 to-emerald-800'
    },
    { 
      id: 'law-sines', 
      title: 'Law of Sines Mastery', 
      desc: 'Solve non-right triangles using the sine rule in RPN mode.',
      color: 'from-purple-600 to-purple-800'
    },
    { 
      id: 'level-loop', 
      title: 'Level Loop Tolerance', 
      desc: 'Quickly calculate k√M allowable misclose standards.',
      color: 'from-amber-600 to-amber-800'
    },
    { 
      id: 'azimuth-bearing', 
      title: 'Azimuth to Bearing', 
      desc: 'Never miss a quadrant conversion again with these logic steps.',
      color: 'from-slate-800 to-slate-900'
    },
    { 
      id: 'lat-dep', 
      title: 'Latitude & Departure', 
      desc: 'The foundation of COGO. Convert polar vectors to coordinates.',
      color: 'from-blue-700 to-blue-900'
    }
  ];

  return (
    <div className="space-y-12 animate-in fade-in duration-500 pb-20">
      <header>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Resource Center</h2>
        <p className="text-slate-500 font-medium mt-1">Foundational references and custom tutorials for FS mastery.</p>
      </header>

      <section className="space-y-6">
        <div className="flex items-center gap-2 px-2">
          <BookOpen size={18} className="text-blue-600" />
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">BoundaryLab Learning Hub</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutorials.map(tutorial => (
            <button 
              key={tutorial.id}
              onClick={() => onNavigateTutorial(tutorial.id)}
              className={`group text-left bg-gradient-to-br ${tutorial.color} rounded-[32px] p-8 text-white shadow-xl shadow-blue-100 transition-all hover:scale-[1.02] hover:shadow-2xl relative overflow-hidden h-full flex flex-col`}
            >
              <div className="absolute -bottom-10 -right-10 opacity-10 group-hover:scale-110 transition-transform">
                <Calculator size={140} />
              </div>
              <div className="relative z-10 space-y-4 flex-1">
                <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-black uppercase tracking-widest">HP-35s Series</span>
                <h4 className="text-lg font-black leading-tight">{tutorial.title}</h4>
                <p className="text-blue-100 text-[10px] font-medium opacity-90">{tutorial.desc}</p>
              </div>
              <div className="relative z-10 flex items-center gap-2 pt-6 font-black text-[10px] uppercase tracking-widest text-white/80 group-hover:text-white transition-colors">
                Begin Tutorial <ArrowRight size={14} />
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="space-y-10">
        {categories.map(cat => (
          <div key={cat} className="space-y-6">
            <div className="flex items-center gap-2 px-2">
              <ExternalLink size={16} className="text-slate-400" />
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">{cat} References</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.filter(r => r.category === cat).map(r => (
                <Card key={r.id} className="h-full flex flex-col hover:border-blue-100 transition-all">
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 mb-2">{r.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed font-medium">
                      {r.description}
                    </p>
                  </div>
                  <a 
                    href={r.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-black text-blue-600 hover:text-blue-700 uppercase tracking-widest"
                  >
                    Launch Link
                    <ExternalLink size={14} />
                  </a>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
