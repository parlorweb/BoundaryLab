
import React, { useMemo } from 'react';
import { Card } from '../components/Cards';
import { StorageService } from '../services/storage';
import { ICONS } from '../constants';
import { Calendar, Clock, Award, Book } from 'lucide-react';

export const SessionHistory: React.FC = () => {
  const user = StorageService.getCurrentUser();
  const sessions = useMemo(() => {
    if (!user) return [];
    return [...StorageService.getSessions(user.id)].sort((a, b) => 
      new Date(b.startedAt).getTime() - new Date(a.startedAt).getTime()
    );
  }, [user]);

  const questions = StorageService.getQuestions();
  const concepts = StorageService.getConcepts();
  const topics = StorageService.getTopics();

  // Helper to find concepts covered in a session
  const getSessionDetails = (sessionId: string) => {
    const answers = (JSON.parse(localStorage.getItem('bl_answers') || '[]')) as any[];
    const sessionAnswers = answers.filter(a => a.sessionId === sessionId);
    
    const coveredConceptIds = new Set<string>();
    sessionAnswers.forEach(a => {
      const q = questions.find(question => question.id === a.questionId);
      if (q) q.conceptIds.forEach(cid => coveredConceptIds.add(cid));
    });

    const coveredConcepts = Array.from(coveredConceptIds)
      .map(cid => concepts.find(c => c.id === cid))
      .filter(Boolean);

    return { coveredConcepts };
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateDuration = (start: string, end?: string) => {
    if (!end) return 'Incomplete';
    const s = new Date(start).getTime();
    const e = new Date(end).getTime();
    const diff = Math.floor((e - s) / 1000);
    const m = Math.floor(diff / 60);
    const sec = diff % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  if (!user) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-20">
      <header>
        <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Session History</h2>
        <p className="text-slate-500 text-sm mt-1">Review your past performance and growth trends.</p>
      </header>

      <div className="space-y-4">
        {sessions.length > 0 ? (
          sessions.map(session => {
            const { coveredConcepts } = getSessionDetails(session.id);
            const accuracy = Math.round((session.correctCount / (session.totalAnswered || 1)) * 100);
            const topic = session.topicId ? topics.find(t => t.id === session.topicId) : null;

            return (
              <Card key={session.id} className="hover:border-slate-300 transition-colors">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1 space-y-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${
                        session.mode === 'adaptive' ? 'bg-blue-50 text-blue-600' :
                        session.mode === 'focus' ? 'bg-red-50 text-red-600' :
                        'bg-purple-50 text-purple-600'
                      }`}>
                        {session.mode} Session
                      </span>
                      {topic && (
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                          {topic.name}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="flex items-center gap-2 text-slate-500">
                        <Calendar size={14} className="shrink-0" />
                        <span className="text-xs font-medium truncate">{formatDate(session.startedAt)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <Clock size={14} className="shrink-0" />
                        <span className="text-xs font-medium">{calculateDuration(session.startedAt, session.endedAt)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500">
                        <Award size={14} className="shrink-0" />
                        <span className="text-xs font-bold text-slate-700">{session.correctCount} / {session.totalAnswered} Correct</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`text-xs font-bold ${accuracy >= 80 ? 'text-emerald-600' : accuracy >= 50 ? 'text-blue-600' : 'text-slate-400'}`}>
                          {accuracy}% Accuracy
                        </div>
                      </div>
                    </div>

                    {coveredConcepts.length > 0 && (
                      <div className="pt-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Book size={12} className="text-slate-400" />
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Concepts Explored</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {coveredConcepts.map(c => (
                            <span key={c?.id} className="px-2 py-0.5 bg-slate-50 border border-slate-100 text-slate-500 rounded text-[10px] font-medium">
                              {c?.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="shrink-0 flex items-center justify-center md:border-l border-slate-100 md:pl-6">
                    <div className="relative w-16 h-16 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                        <circle
                          cx="32" cy="32" r="28"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          className="text-slate-100"
                        />
                        <circle
                          cx="32" cy="32" r="28"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="4"
                          strokeDasharray={175.9}
                          strokeDashoffset={175.9 * (1 - accuracy / 100)}
                          className={accuracy >= 80 ? 'text-emerald-500' : accuracy >= 50 ? 'text-blue-500' : 'text-slate-300'}
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="absolute text-xs font-bold text-slate-700">{accuracy}%</span>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center">
            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={32} />
            </div>
            <h3 className="text-lg font-bold text-slate-900">No session history yet</h3>
            <p className="text-slate-500 mt-2 max-w-sm mx-auto">
              Your completed practice sessions will appear here with detailed performance metrics.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
