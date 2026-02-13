
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { MASTERY_LABELS } from '../constants';
import { Card, ProgressBar } from '../components/Cards';
import { StorageService } from '../services/storage';
import { PracticeEngine } from '../services/engine';
import { Question, PracticeSession, SessionMode, UserAnswer } from '../types';
import { CheckCircle2, XCircle, ChevronRight, Calculator, Lightbulb, Clock, ArrowLeft, AlertTriangle, Bookmark, Flag, X } from 'lucide-react';

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
  const [sessionCount, setSessionCount] = useState(0); 
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportReason, setReportReason] = useState('');
  const [isSaved, setIsSaved] = useState(false);

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

  useEffect(() => {
    if (user && questions[currentIndex]) {
      setIsSaved(StorageService.isQuestionSaved(user.id, questions[currentIndex].id));
    }
  }, [currentIndex, questions, user]);

  const currentQuestion = questions[currentIndex];

  if (!user) return null;

  const handleRestart = () => {
    setSessionCount(prev => prev + 1);
  };

  const handleToggleSave = () => {
    if (!user || !currentQuestion) return;
    StorageService.toggleSavedQuestion(user.id, currentQuestion.id);
    setIsSaved(!isSaved);
  };

  const handleReport = () => {
    if (!user || !currentQuestion || !reportReason) return;
    StorageService.reportQuestion(user.id, currentQuestion.id, reportReason);
    setShowReportModal(false);
    setReportReason('');
    handleNext();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-pulse">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 border-4 border-blue-100 rounded-2xl"></div>
          <div className="absolute inset-0 border-4 border-blue-600 rounded-2xl border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-6 text-slate-500 font-black uppercase tracking-widest text-[10px]">Calibrating...</p>
      </div>
    );
  }

  if (!session || questions.length === 0) {
    return (
      <div className="max-w-md mx-auto py-20 text-center animate-in zoom-in duration-300 px-6">
        <div className="w-16 h-16 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <AlertTriangle size={32} />
        </div>
        <h3 className="text-xl font-black text-slate-900 tracking-tight">No Questions Found</h3>
        <p className="text-slate-500 mt-2 text-sm font-medium leading-relaxed">
          Try a different topic or the Adaptive Mix.
        </p>
        <button 
          onClick={onExit}
          className="mt-8 w-full px-6 py-3.5 bg-slate-900 text-white rounded-xl font-black hover:bg-slate-800 transition-all active:scale-95 flex items-center justify-center gap-2 text-sm shadow-lg hover:shadow-xl"
        >
          <ArrowLeft size={16} />
          Back to Dashboard
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
      <div className="max-w-xl mx-auto py-12 text-center animate-in zoom-in slide-in-from-bottom-8 duration-500 px-6">
        <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-[28px] flex items-center justify-center text-white mx-auto mb-8 shadow-xl shadow-blue-100 hover:scale-105 transition-transform">
          <CheckCircle2 size={40} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Session Complete</h2>
        
        <div className="grid grid-cols-2 gap-4 mt-10">
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Accuracy</p>
            <p className="text-3xl font-black text-slate-900">{Math.round((session.correctCount / (session.totalAnswered || 1)) * 100)}%</p>
          </div>
          <div className="bg-white p-6 rounded-[24px] border border-slate-100 shadow-sm transition-all hover:shadow-md hover:-translate-y-1">
            <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Time</p>
            <p className="text-3xl font-black text-slate-900">{formatTime(timer)}</p>
          </div>
        </div>
        
        <div className="mt-10 space-y-3">
          <button onClick={onExit} className="w-full px-10 py-4 bg-slate-900 text-white rounded-xl font-black hover:bg-slate-800 hover:shadow-xl transition-all active:scale-[0.98] text-sm">Dashboard Overview</button>
          <button onClick={handleRestart} className="w-full px-10 py-4 bg-white border border-slate-200 text-slate-900 rounded-xl font-black hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98] text-sm shadow-sm">Start New Quiz</button>
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

  const currentConcepts = allConcepts.filter(c => currentQuestion.conceptIds.includes(c.id));
  const masteryData = StorageService.getMastery(user.id);

  return (
    <div className="space-y-4 pb-16 max-w-5xl mx-auto">
      <header className="flex items-center justify-between bg-white/90 backdrop-blur-sm p-2.5 rounded-[16px] border border-slate-100 sticky top-0 md:top-2 z-20 shadow-sm mb-2">
        <div className="flex items-center gap-3 flex-1 pr-3">
          <button onClick={onExit} className="p-2 hover:bg-slate-50 rounded-lg transition-all text-slate-400 hover:text-slate-900 active:scale-95">
            <ArrowLeft size={16} />
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
        <div className="flex items-center gap-2">
          <button 
            onClick={handleToggleSave}
            className={`p-2 rounded-lg transition-all active:scale-95 ${isSaved ? 'text-blue-600 bg-blue-50' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-900'}`}
            title={isSaved ? "Saved to reviews" : "Save for later"}
          >
            <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={() => setShowReportModal(true)}
            className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all active:scale-95"
            title="Report an error"
          >
            <Flag size={18} />
          </button>
          <div className="flex items-center gap-2 bg-slate-900 text-white px-3 py-1.5 rounded-lg shadow-sm ml-2">
            <Clock size={12} className="text-blue-400" />
            <span className="font-black text-[10px] font-mono tracking-wider">{formatTime(timer)}</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="lg:col-span-8 space-y-4 animate-in fade-in duration-300">
          <div className="bg-white p-5 md:p-8 rounded-[24px] border border-slate-100 shadow-sm relative overflow-hidden group hover:border-blue-100 transition-colors">
            <div className="absolute top-4 right-6">
               <span className="px-2 py-0.5 bg-slate-50 border border-slate-100 rounded-full text-[8px] font-black text-slate-400 uppercase tracking-widest">
                Difficulty Level {currentQuestion.difficulty}
              </span>
            </div>
            <p className="text-base md:text-lg text-slate-900 font-bold leading-relaxed mt-2">
              {currentQuestion.prompt}
            </p>
          </div>

          <div className="space-y-2">
            {currentQuestion.type === 'fill' ? (
              <div className="space-y-2">
                <input 
                  autoFocus
                  disabled={!!currentAnswer}
                  className="w-full p-4 bg-white border border-slate-200 rounded-[16px] focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none text-base font-bold shadow-sm transition-all"
                  placeholder="Enter value..."
                  value={selectedIds[0] || ''}
                  onChange={e => setSelectedIds([e.target.value])}
                />
                {currentAnswer && !currentAnswer.isCorrect && (
                  <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl animate-in slide-in-from-top-2">
                    <p className="text-[9px] font-black text-emerald-700 uppercase mb-1">Correct Answer</p>
                    <p className="text-base font-bold text-emerald-900">{currentQuestion.choices[0]?.text}</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2">
                {currentQuestion.choices.map((choice) => {
                  const isSelected = selectedIds.includes(choice.id);
                  const isCorrect = choice.isCorrect;
                  const hasAnswered = !!currentAnswer;
                  
                  let cardStyle = "bg-white border-slate-100 text-slate-700 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5";
                  if (isSelected && !hasAnswered) cardStyle = "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-50 hover:bg-blue-700 hover:-translate-y-1";
                  if (hasAnswered) {
                    if (isCorrect) cardStyle = "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-50";
                    else if (isSelected) cardStyle = "bg-red-500 border-red-500 text-white shadow-lg shadow-red-50";
                    else cardStyle = "bg-white border-slate-100 text-slate-400 opacity-50 pointer-events-none";
                  }

                  return (
                    <button
                      key={choice.id}
                      disabled={hasAnswered}
                      onClick={() => handleChoiceToggle(choice.id)}
                      className={`w-full flex items-center p-3.5 md:p-4 rounded-[16px] border text-left transition-all group ${cardStyle} active:scale-[0.99]`}
                    >
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-black mr-3 shrink-0 transition-all ${
                        isSelected || (hasAnswered && isCorrect) 
                          ? 'bg-white/20 text-white' 
                          : 'bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'
                      }`}>
                        {choice.choiceKey}
                      </div>
                      <span className="flex-1 font-bold text-sm leading-snug">{choice.text}</span>
                      <div className="shrink-0 ml-3">
                        {hasAnswered && isCorrect && <CheckCircle2 className="text-white animate-in zoom-in duration-300" size={20} strokeWidth={3} />}
                        {hasAnswered && !isCorrect && isSelected && <XCircle className="text-white animate-in shake duration-300" size={20} strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            {!currentAnswer ? (
              <button
                disabled={selectedIds.length === 0}
                onClick={handleSubmit}
                className="w-full sm:w-auto px-8 py-3.5 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 hover:shadow-xl hover:-translate-y-0.5 disabled:opacity-30 disabled:pointer-events-none transition-all shadow-lg active:scale-95"
              >
                Confirm Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full sm:w-auto px-8 py-3.5 bg-slate-900 text-white rounded-xl font-black text-sm hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2 group"
              >
                {currentIndex + 1 === questions.length ? 'Finish Session' : 'Next Question'}
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" strokeWidth={3} />
              </button>
            )}
            
            {!currentAnswer && (
              <button 
                onClick={() => setShowHint(true)}
                className="text-[10px] font-black text-slate-400 hover:text-blue-600 flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-white transition-all uppercase tracking-widest active:scale-95"
              >
                <Lightbulb size={16} className="text-amber-500" />
                Hint
              </button>
            )}
          </div>

          {currentAnswer && (
            <div className={`p-5 md:p-6 rounded-[24px] border-2 animate-in slide-in-from-top-4 duration-300 shadow-sm ${currentAnswer.isCorrect ? 'bg-emerald-50 border-emerald-100' : 'bg-red-50 border-red-100'}`}>
              <div className="flex items-center gap-2 mb-3">
                <div className={`p-2 rounded-lg transition-transform hover:scale-110 ${currentAnswer.isCorrect ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                  {currentAnswer.isCorrect ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
                </div>
                <div>
                  <h4 className={`text-sm font-black ${currentAnswer.isCorrect ? 'text-emerald-900' : 'text-red-900'}`}>
                    {currentAnswer.isCorrect ? 'Correct!' : 'Incorrect.'}
                  </h4>
                </div>
              </div>
              <p className="text-sm text-slate-800 leading-relaxed font-medium">
                {currentQuestion.explanation}
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-4 lg:sticky lg:top-24 h-fit">
          <Card title="Concept Mastery" className="bg-white/50 border-white hover:-translate-y-0.5">
            <div className="space-y-6">
              {currentConcepts.map(concept => {
                const mastery = masteryData.find(m => m.conceptId === concept.id);
                return (
                  <div key={concept.id} className="pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                    <div className="text-center mb-4">
                      <h5 className="text-sm font-black text-slate-900 leading-tight mb-2 px-1">{concept.name}</h5>
                      <div className="flex justify-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map(i => (
                          <div 
                            key={i} 
                            className={`h-1.5 w-6 rounded-full transition-all duration-700 ${i <= (mastery?.masteryLevel || 0) ? 'bg-blue-600 shadow-sm shadow-blue-50' : 'bg-slate-100'}`}
                          />
                        ))}
                      </div>
                      <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
                        {MASTERY_LABELS[mastery?.masteryLevel || 0]}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                          <Clock size={10} className="text-blue-500" />
                          Syllabus
                        </div>
                        <p className="text-[11px] text-slate-600 leading-relaxed font-semibold bg-slate-50/50 p-2.5 rounded-lg border border-slate-100">{concept.summary}</p>
                      </div>
                      
                      {concept.formula && (
                        <div className="bg-blue-600 p-3.5 rounded-[16px] shadow-md shadow-blue-50 hover:bg-blue-700 transition-colors cursor-help group">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <Calculator size={10} className="text-blue-200 transition-transform group-hover:rotate-12" />
                            <span className="text-[8px] font-black text-blue-100 uppercase tracking-widest">Formula</span>
                          </div>
                          <p className="text-xs font-mono text-white font-black break-all text-center leading-tight">{concept.formula}</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {showHint && (
            <div className="p-4 bg-amber-50 border-2 border-amber-100 rounded-[20px] animate-in zoom-in-95 duration-200 shadow-lg shadow-amber-900/5">
              <div className="flex items-center gap-2 mb-2 text-amber-600">
                <Lightbulb size={16} className="animate-pulse" />
                <span className="text-[8px] font-black uppercase tracking-widest">Hint</span>
              </div>
              <p className="text-xs text-amber-900 italic font-bold leading-relaxed">"{currentQuestion.hint}"</p>
              <button onClick={() => setShowHint(false)} className="mt-3 text-[8px] font-black text-amber-700 uppercase tracking-widest hover:underline active:scale-95">Close</button>
            </div>
          )}
        </div>
      </div>

      {showReportModal && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[100] p-6">
          <div className="bg-white rounded-[32px] w-full max-w-lg p-8 shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-slate-900 tracking-tight">Report Question</h3>
              <button onClick={() => setShowReportModal(false)} className="p-2 hover:bg-slate-50 rounded-lg text-slate-400"><X size={20} /></button>
            </div>
            <p className="text-sm text-slate-500 mb-6">Help us maintain accuracy. What's wrong with this question?</p>
            <div className="space-y-3 mb-8">
              {['Incorrect answer', 'Typo or wording error', 'Broken formula/image', 'Missing concept mapping', 'Other'].map(r => (
                <button 
                  key={r}
                  onClick={() => setReportReason(r)}
                  className={`w-full text-left p-4 rounded-xl border text-sm font-bold transition-all ${reportReason === r ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-700 hover:border-slate-200'}`}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={() => setShowReportModal(false)} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-black text-xs uppercase tracking-widest transition-all">Cancel</button>
              <button 
                onClick={handleReport}
                disabled={!reportReason}
                className="flex-1 py-4 bg-red-500 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-xl shadow-red-100 disabled:opacity-30 transition-all active:scale-95"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
