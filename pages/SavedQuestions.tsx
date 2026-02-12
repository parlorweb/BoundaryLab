
import React, { useMemo, useState, useEffect } from 'react';
import { Card } from '../components/Cards';
import { StorageService } from '../services/storage';
import { Bookmark, ChevronRight, Trash2, ArrowLeft, BookOpen, Calculator, Search } from 'lucide-react';
import { Question } from '../types';

interface SavedQuestionsProps {
  onStartSavedPractice: () => void;
}

export const SavedQuestions: React.FC<SavedQuestionsProps> = ({ onStartSavedPractice }) => {
  const user = StorageService.getCurrentUser();
  const allQuestions = StorageService.getQuestions();
  const topics = StorageService.getTopics();
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshToggle, setRefreshToggle] = useState(false);

  useEffect(() => {
    const handleStorageUpdate = () => setRefreshToggle(prev => !prev);
    window.addEventListener('storage', handleStorageUpdate);
    return () => window.removeEventListener('storage', handleStorageUpdate);
  }, []);

  const savedList = useMemo(() => {
    if (!user) return [];
    const saved = StorageService.getSavedQuestions(user.id);
    return saved
      .map(s => allQuestions.find(q => q.id === s.questionId))
      .filter((q): q is Question => !!q)
      .filter(q => q.prompt.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [user, allQuestions, searchTerm, refreshToggle]);

  const handleUnsave = (id: string) => {
    if (!user) return;
    StorageService.toggleSavedQuestion(user.id, id);
    window.dispatchEvent(new Event('storage')); // Trigger update for this component
  };

  if (!user) return null;

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-20">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Saved for Review</h2>
          <p className="text-slate-500 font-medium mt-1">Access bookmarked questions for deep-dive study sessions.</p>
        </div>
        <div className="flex-1 max-w-md relative group">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search saved prompts..." 
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all"
          />
        </div>
      </header>

      {savedList.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {savedList.map(q => {
            const topic = topics.find(t => t.id === q.topicId);
            return (
              <Card key={q.id} className="hover:border-blue-200">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 bg-blue-50 text-[10px] font-black text-blue-600 rounded-lg uppercase tracking-widest">
                        {topic?.name || 'Knowledge Unit'}
                      </span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                        Difficulty: {q.difficulty}
                      </span>
                    </div>
                    <p className="text-lg font-bold text-slate-900 leading-relaxed">
                      {q.prompt}
                    </p>
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                        <Calculator size={14} className="text-slate-400" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Explanation Snapshot</span>
                      </div>
                      <p className="text-sm font-medium text-slate-600 leading-relaxed truncate">{q.explanation}</p>
                    </div>
                  </div>
                  <div className="flex md:flex-col gap-2 shrink-0 justify-center">
                    <button 
                      onClick={() => handleUnsave(q.id)}
                      className="p-3 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                      title="Remove from saved"
                    >
                      <Trash2 size={20} />
                    </button>
                    <button 
                      onClick={onStartSavedPractice}
                      className="px-6 py-4 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                    >
                      Review Now <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-[32px] p-20 text-center">
          <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
            <Bookmark size={32} />
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">No Bookmarks Yet</h3>
          <p className="text-slate-500 mt-2 max-w-sm mx-auto">
            Click the bookmark icon during a practice session to save challenging questions for later review.
          </p>
        </div>
      )}
    </div>
  );
};
