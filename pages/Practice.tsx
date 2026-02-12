
import React, { useState, useEffect, useMemo } from 'react';
import { ICONS, MASTERY_LABELS } from '../constants';
import { Card, ProgressBar } from '../components/Cards';
import { StorageService } from '../services/storage';
import { PracticeEngine } from '../services/engine';
import { Question, PracticeSession, SessionMode, UserAnswer, Concept } from '../types';
import { CheckCircle2, XCircle, ChevronRight, Calculator, Lightbulb, Clock, ArrowLeft, BookOpen, AlertTriangle, RotateCcw } from 'lucide-react';

interface PracticeProps {
  mode: SessionMode;
  topicId?: string;
  onExit: () => void;
}

export const Practice: React.FC<PracticeProps> = ({ mode, topicId, onExit }) => {
  const [session, setSession] = useState<PracticeSession | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [currentAnswer, setCurrentAnswer] = useState<UserAnswer | null>(null);
  const [isEnded, setIsEnded] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionCount, setSessionCount] = useState(0); // Used to trigger re-initialization

  const user = StorageService.getCurrentUser();
  const allConcepts = useMemo(() => StorageService.getConcepts(), []);

  useEffect(() => {
    if (!user) return;
    
    setIsLoading(true);
    const timeout = setTimeout(() => {
      const newSession = PracticeEngine.createSession(user.id, mode, 10, topicId);
      const qs = PracticeEngine.getSessionQuestions(newSession);
      setSession(newSession);
      setQuestions(qs);
      setCurrentIndex(0);
      setSelectedIds([]);
      setCurrentAnswer(null);
      setIsEnded(false);
      setShowHint(false);
      setTimer(0);
      setIsLoading(false);
    }, 400);

    const interval = setInterval(() => setTimer(t => t + 1), 1000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [mode, topicId, user?.id, sessionCount]);

  const currentQuestion = questions[currentIndex];

  const matchingPool = useMemo(() => {
    if (!currentQuestion || currentQuestion.type !== 'matching') return [];
    return [...currentQuestion.choices].map(c => c.matchingValue).sort(() => Math.random() - 0.5);
  }, [currentQuestion]);

  if (!user) return null;

  const handleRestart = () => {
    setSessionCount(prev => prev + 1);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-40 animate-pulse">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-100 rounded-2xl"></div>
          <div className="absolute inset-0 border-4 border-blue-600 rounded-2xl border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-8 text-slate-500 font-black uppercase tracking-widest text-xs">Calibrating Session...</p>
      </div>
    );
  }

  if (!session || questions.length === 0) {
    return (
      <div className="max-w-md mx-auto py-40 text-center animate-in zoom-in duration-300 px-6">
        <div className="w-20 h-20 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center mx-auto mb-8">
          <AlertTriangle size={40} />
        </div>
        <h3 className="text-2xl font-black text-slate-900 tracking-tight">No Questions Available</h3>
        <p className="text-slate-500 mt-4 font-medium leading-relaxed">
          We couldn't find any questions for the selected {mode === 'topic' ? 'topic' : 'focus area'}. 
          Please try a different topic or the Adaptive Mix.
        </p>
        <button 
          onClick={onExit}
          className="mt-10 w-full px-8 py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2"
        >
          <ArrowLeft size={18} />
          Return to Dashboard
        </button>
      </div>
    );
  }

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, '0')}`;
  };

  if (isEnded) {
    return (
      <div className="max-w-2xl mx-auto py-12 md:py-20 text-center animate-in zoom-in slide-in-from-bottom-8 duration-500 px-6">
        <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[32px] flex items-center justify-center text-white mx-auto mb-10 shadow-2xl shadow-blue-200">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-4xl font-black text-slate-900 tracking-tight">Performance Summary</h2>
        <p className="text-slate-500 mt-3 font-medium">Session recorded. Your mastery levels have been updated.</p>
        
        <div className="grid grid-cols-2 gap-6 mt-12">
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Accuracy</p>
            <p className="text-4xl font-black text-slate-900">{Math.round((session.correctCount / (session.totalAnswered || 1)) * 100)}%</p>
            <p className="text-xs font-bold text-blue-600 mt-2">{session.correctCount} of {session.totalAnswered} Correct</p>
          </div>
          <div className="bg-white p-8 rounded-[32px] border border-slate-100 shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time Invested</p>
            <p className="text-4xl font-black text-slate-900">{formatTime(timer)}</p>
            <p className="text-xs font-bold text-slate-400 mt-2">Focus Mode: ON</p>
          </div>
        </div>
        
        <div className="mt-12 space-y-4">
          <button 
            onClick={onExit}
            className="w-full px-12 py-5 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
          >
            Review Session Trends
            <ChevronRight size={18} />
          </button>
          <button 
            onClick={handleRestart}
            className="w-full px-12 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black hover:bg-slate-50 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <RotateCcw size={18} />
            Start Another Session
          </button>
        </div>
      </div>
    );
  }

  const handleChoiceToggle = (id: string) => {
    if (currentAnswer) return;
    if (currentQuestion.type === 'single') {
      setSelectedIds([id]);
    } else if (currentQuestion.type === 'multi') {
      setSelectedIds(prev => 
        prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
      );
    }
  };

  const handleMatchingChange = (choiceId: string, value: string) => {
    if (currentAnswer) return;
    setSelectedIds(prev => {
      const filtered = prev.filter(p => !p.startsWith(`${choiceId}:`));
      if (!value) return filtered;
      return [...filtered, `${choiceId}:${value}`];
    });
  };

  const handleSubmit = () => {
    if (selectedIds.length === 0 || currentAnswer) return;
    const ans = PracticeEngine.submitAnswer(user.id, session, currentQuestion, selectedIds, 0);
    setCurrentAnswer(ans);
    setShowHint(false);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedIds([]);
      setCurrentAnswer(null);
      setShowHint(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setIsEnded(true);
    }
  };

  const currentConcept = allConcepts.find(c => c.id === currentQuestion.conceptIds[0]);
  const mastery = StorageService.getMastery(user.id).find(m => m.conceptId === currentQuestion.conceptIds[0]);

  return (
    <div className="space-y-6 pb-24 max-w-6xl mx-auto">
      <header className="flex items-center justify-between bg-white/80 backdrop-blur-md p-3 rounded-[20px] border border-slate-100 sticky top-0 md:top-4 z-20 shadow-sm mb-4">
        <div className="flex items-center gap-4 flex-1 pr-4">
          <button onClick={onExit} className="p-2.5 hover:bg-slate-50 rounded-xl transition-all text-slate-400 hover:text-slate-900 active:scale-95 border border-transparent hover:border-slate-100">
            <ArrowLeft size={18} />
          </button>
          <div className="flex-1">
            <ProgressBar 
              value={currentIndex + 1} 
              max={questions.length} 
              label={`Mastery Check: ${currentIndex + 1} of ${questions.length}`} 
              size="sm"
            />
          </div>
        </div>
        <div className="flex items-center gap-3 bg-slate-900 text-white px-4 py-2 rounded-xl shadow-lg shadow-slate-200">
          <Clock size={14} className="text-blue-400" />
          <span className="font-black text-xs font-mono tracking-wider">{formatTime(timer)}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6 animate-in fade-in duration-500">
          <div className="bg-white p-6 md:p-10 rounded-[32px] border border-slate-100 shadow-sm relative overflow-hidden group hover:border-blue-100 transition-colors">
            <div className="absolute top-6 right-8">
               <span className="px-2.5 py-0.5 bg-slate-50 border border-slate-100 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-widest">
                Difficulty Level {currentQuestion.difficulty}
              </span>
            </div>
            <p className="text-lg md:text-xl text-slate-900 font-bold leading-relaxed mt-4">
              {currentQuestion.prompt}
            </p>
          </div>

          <div className="space-y-3">
            {currentQuestion.type === 'fill' ? (
              <div className="space-y-3">
                <input 
                  autoFocus
                  disabled={!!currentAnswer}
                  className="w-full p-5 bg-white border border-slate-200 rounded-[24px] focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none text-lg font-bold shadow-sm transition-all disabled:opacity-70 disabled:bg-slate-50"
                  placeholder="Enter your calculation result..."
                  value={selectedIds[0] || ''}
                  onChange={e => setSelectedIds([e.target.value])}
                />
                {currentAnswer && !currentAnswer.isCorrect && (
                  <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl">
                    <p className="text-xs font-black text-emerald-700 uppercase tracking-widest mb-1">Reference Answer</p>
                    <p className="text-lg font-bold text-emerald-900">{currentQuestion.choices[0]?.text}</p>
                  </div>
                )}
              </div>
            ) : currentQuestion.type === 'matching' ? (
              <div className="space-y-3">
                {currentQuestion.choices.map((choice) => {
                  const currentPair = selectedIds.find(s => s.startsWith(`${choice.id}:`));
                  const currentValue = currentPair ? currentPair.split(':')[1] : '';
                  const hasAnswered = !!currentAnswer;
                  const isMatchCorrect = hasAnswered && currentValue === choice.matchingValue;
                  
                  return (
                    <div key={choice.id} className={`flex flex-col sm:flex-row gap-4 items-center p-4 bg-white border border-slate-100 rounded-[24px] shadow-sm transition-all ${hasAnswered ? (isMatchCorrect ? 'border-emerald-200 bg-emerald-50/30' : 'border-red-200 bg-red-50/30') : 'hover:border-slate-200'}`}>
                      <div className="flex-1 font-bold text-slate-800 text-base px-2">{choice.text}</div>
                      <div className="shrink-0 w-full sm:w-64">
                        <select 
                          disabled={hasAnswered}
                          className={`w-full p-3.5 border rounded-xl font-bold focus:ring-4 outline-none text-sm transition-all appearance-none cursor-pointer ${
                            hasAnswered 
                              ? (isMatchCorrect ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-red-500 bg-red-50 text-red-800')
                              : 'border-slate-200 bg-slate-50 focus:ring-blue-100 focus:bg-white focus:border-blue-600'
                          }`}
                          value={currentValue}
                          onChange={e => handleMatchingChange(choice.id, e.target.value)}
                        >
                          <option value="">Select correct match...</option>
                          {matchingPool.map((m, idx) => (
                            <option key={idx} value={m}>{m}</option>
                          ))}
                        </select>
                      </div>
                      {hasAnswered && !isMatchCorrect && (
                        <div className="text-xs font-black text-emerald-600 uppercase tracking-widest shrink-0 px-4">Key: {choice.matchingValue}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.choices.map((choice) => {
                  const isSelected = selectedIds.includes(choice.id);
                  const isCorrect = choice.isCorrect;
                  const hasAnswered = !!currentAnswer;
                  
                  let cardStyle = "bg-white border-slate-100 text-slate-700 hover:border-slate-300 hover:shadow-md";
                  if (isSelected && !hasAnswered) cardStyle = "bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-100 translate-y-[-1px]";
                  if (hasAnswered) {
                    if (isCorrect) cardStyle = "bg-emerald-500 border-emerald-500 text-white shadow-xl shadow-emerald-100";
                    else if (isSelected) cardStyle = "bg-red-500 border-red-500 text-white shadow-xl shadow-red-100";
                    else cardStyle = "bg-white border-slate-100 text-slate-400 opacity-40 grayscale";
                  }

                  return (
                    <button
                      key={choice.id}
                      disabled={hasAnswered}
                      onClick={() => handleChoiceToggle(choice.id)}
                      className={`w-full flex items-center p-4 md:p-5 rounded-[24px] border text-left transition-all duration-200 group relative ${cardStyle} active:scale-[0.99]`}
                    >
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black mr-4 shrink-0 transition-all ${
                        isSelected || (hasAnswered && isCorrect) 
                          ? 'bg-white/20 text-white' 
                          : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'
                      }`}>
                        {choice.choiceKey}
                      </div>
                      <span className="flex-1 font-bold text-base leading-snug">{choice.text}</span>
                      <div className="shrink-0 ml-4">
                        {hasAnswered && isCorrect && <CheckCircle2 className="text-white" size={24} strokeWidth={3} />}
                        {hasAnswered && !isCorrect && isSelected && <XCircle className="text-white" size={24} strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
            {!currentAnswer ? (
              <button
                disabled={selectedIds.length === 0}
                onClick={handleSubmit}
                className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white rounded-[20px] font-black text-base hover:bg-blue-700 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xl shadow-blue-100 active:scale-95"
              >
                Confirm Selection
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white rounded-[20px] font-black text-base hover:bg-slate-800 transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-2.5 group"
              >
                {currentIndex + 1 === questions.length ? 'Finalize Session' : 'Continue Study'}
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
              </button>
            )}
            
            {!currentAnswer && (
              <button 
                onClick={() => setShowHint(true)}
                className="text-[11px] font-black text-slate-400 hover:text-blue-600 flex items-center gap-2.5 px-5 py-4 rounded-xl hover:bg-white transition-all uppercase tracking-widest border border-transparent hover:border-slate-100"
              >
                <Lightbulb size={18} className="text-amber-500" />
                Unlock Hint
              </button>
            )}
          </div>

          {currentAnswer && (
            <div className={`p-6 md:p-8 rounded-[32px] border-2 animate-in slide-in-from-top-4 duration-500 shadow-sm ${currentAnswer.isCorrect ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-2.5 rounded-xl ${currentAnswer.isCorrect ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                  {currentAnswer.isCorrect ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                </div>
                <div>
                  <h4 className={`text-lg font-black ${currentAnswer.isCorrect ? 'text-emerald-900' : 'text-red-900'}`}>
                    {currentAnswer.isCorrect ? 'Outstanding!' : 'Not quite right.'}
                  </h4>
                  <p className={`text-[10px] font-bold uppercase tracking-widest ${currentAnswer.isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>
                    Concept Breakdown
                  </p>
                </div>
              </div>
              <p className="text-base text-slate-800 leading-relaxed font-medium">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-28 h-fit">
          <Card title="Concept Proficiency" className="bg-white/50 border-white">
            <div className="text-center pb-6 border-b border-slate-100 mb-6">
              <h5 className="text-base font-black text-slate-900 leading-tight mb-3 px-2">{currentConcept?.name || 'Knowledge Unit'}</h5>
              <div className="flex justify-center gap-1.5 mb-3">
                {[1, 2, 3, 4, 5].map(i => (
                  <div 
                    key={i} 
                    className={`h-2 w-8 rounded-full transition-all duration-700 ${i <= (mastery?.masteryLevel || 0) ? 'bg-blue-600 shadow-md shadow-blue-100' : 'bg-slate-100'}`}
                  />
                ))}
              </div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                Level {mastery?.masteryLevel || 0}: {MASTERY_LABELS[mastery?.masteryLevel || 0]}
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                  <BookOpen size={11} className="text-blue-500" />
                  Syllabus Context
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-semibold bg-slate-50/50 p-3.5 rounded-xl border border-slate-100">{currentConcept?.summary}</p>
              </div>
              
              {currentConcept?.formula && (
                <div className="bg-blue-600 p-5 rounded-[20px] shadow-lg shadow-blue-100 transform hover:scale-[1.01] transition-transform">
                  <div className="flex items-center gap-2 mb-2.5">
                    <Calculator size={12} className="text-blue-200" />
                    <span className="text-[9px] font-black text-blue-100 uppercase tracking-widest">Exam Reference Formula</span>
                  </div>
                  <p className="text-base font-mono text-white font-black break-all text-center leading-tight">{currentConcept.formula}</p>
                </div>
              )}
            </div>
          </Card>

          {showHint && (
            <div className="p-6 bg-amber-50 border-2 border-amber-100 rounded-[24px] animate-in zoom-in-95 duration-300 shadow-xl shadow-amber-900/5">
              <div className="flex items-center gap-2.5 mb-3 text-amber-600">
                <Lightbulb size={20} className="animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest">Strategic Insight</span>
              </div>
              <p className="text-sm text-amber-900 italic font-bold leading-relaxed">"{currentQuestion.hint}"</p>
              <button onClick={() => setShowHint(false)} className="mt-4 text-[9px] font-black text-amber-700 uppercase tracking-widest hover:underline">Close Hint</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
