
import React, { useState } from 'react';
import { Card } from '../components/Cards';
import { StorageService } from '../services/storage';
import { Question, Difficulty, QuestionType, Topic, Concept, Choice } from '../types';
import { ICONS } from '../constants';
import { Database, BookOpen, Lightbulb, Library, Trash2, Edit3, Plus, FileJson, Calculator, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

const MetricCard: React.FC<{ 
  label: string; 
  value: number; 
  icon: React.ReactNode; 
  color: string 
}> = ({ label, value, icon, color }) => (
  <div className="bg-white border border-slate-100 rounded-[24px] p-8 shadow-sm flex items-center gap-6 transition-all hover:shadow-lg hover:-translate-y-1">
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-inner ${color}`}>
      {icon}
    </div>
    <div>
      <p className="text-3xl font-black text-slate-900 leading-none tracking-tight">{value}</p>
      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{label}</p>
    </div>
  </div>
);

type AdminSection = 'questions' | 'concepts';

export const Admin: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AdminSection>('questions');
  
  // Data State
  const topics = StorageService.getTopics();
  const resources = StorageService.getResources();
  const [questions, setQuestions] = useState<Question[]>(StorageService.getQuestions());
  const [concepts, setConcepts] = useState<Concept[]>(StorageService.getConcepts());
  
  // Form State
  const [editingQuestion, setEditingQuestion] = useState<Partial<Question> | null>(null);
  const [editingConcept, setEditingConcept] = useState<Partial<Concept> | null>(null);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [showConceptForm, setShowConceptForm] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDeleteQuestion = (id: string) => {
    if (confirm('Permanently remove this question from the repository?')) {
      StorageService.deleteQuestion(id);
      setQuestions(StorageService.getQuestions());
    }
  };

  const handleSaveQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingQuestion) return;

    const qType = editingQuestion.type || 'single';
    const fullQuestion: Question = {
      id: editingQuestion.id || Math.random().toString(36).substring(7),
      topicId: editingQuestion.topicId || topics[0].id,
      difficulty: editingQuestion.difficulty || 3,
      type: qType,
      prompt: editingQuestion.prompt || '',
      explanation: editingQuestion.explanation || '',
      hint: editingQuestion.hint || '',
      source: editingQuestion.source || 'Admin Console',
      choices: editingQuestion.choices || (qType === 'fill' ? [
        { id: 'c1', choiceKey: 'Ans', text: '', isCorrect: true }
      ] : [
        { id: 'c1', choiceKey: 'A', text: '', isCorrect: true },
        { id: 'c2', choiceKey: 'B', text: '', isCorrect: false },
        { id: 'c3', choiceKey: 'C', text: '', isCorrect: false },
        { id: 'c4', choiceKey: 'D', text: '', isCorrect: false },
      ]),
      conceptIds: editingQuestion.conceptIds || []
    };

    StorageService.saveQuestion(fullQuestion);
    setQuestions(StorageService.getQuestions());
    setShowQuestionForm(false);
    setEditingQuestion(null);
  };

  const handleSaveConcept = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingConcept) return;

    const fullConcept: Concept = {
      id: editingConcept.id || Math.random().toString(36).substring(7),
      topicId: editingConcept.topicId || topics[0].id,
      slug: editingConcept.slug || (editingConcept.name?.toLowerCase().replace(/\s+/g, '-') || 'new-concept'),
      name: editingConcept.name || '',
      summary: editingConcept.summary || '',
      formula: editingConcept.formula || '',
      isActive: true
    };

    StorageService.saveConcept(fullConcept);
    setConcepts(StorageService.getConcepts());
    setShowConceptForm(false);
    setEditingConcept(null);
  };

  const handleAiSuggest = async () => {
    if (!editingConcept?.name) {
      alert("Identify the concept name first.");
      return;
    }

    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Expert FS exam instructor. Concept: "${editingConcept.name}". 2-sentence summary. Plain math formula. JSON format.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              summary: { type: Type.STRING },
              formula: { type: Type.STRING }
            },
            required: ["summary", "formula"]
          }
        }
      });

      const text = response.text;
      if (text) {
        const result = JSON.parse(text);
        setEditingConcept({ ...editingConcept, summary: result.summary, formula: result.formula });
      }
    } catch (err) {
      alert("AI Assistant unavailable. Proceed manually.");
    } finally { setIsGenerating(false); }
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-500 pb-32">
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Curriculum Control</h2>
          <p className="text-slate-500 font-medium mt-1">Configure the core educational engine and question bank.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button onClick={() => {}} className="flex-1 md:flex-none px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
            <FileJson size={18} className="text-slate-400" />
            Bulk Sync
          </button>
          <button 
            onClick={() => {
              if (activeSection === 'questions') { setEditingQuestion({ type: 'single' }); setShowQuestionForm(true); }
              else { setEditingConcept({}); setShowConceptForm(true); }
            }}
            className="flex-1 md:flex-none px-8 py-4 bg-blue-600 text-white rounded-[20px] text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-100"
          >
            <Plus size={18} strokeWidth={3} />
            Create {activeSection === 'questions' ? 'Question' : 'Concept'}
          </button>
        </div>
      </header>

      {/* Metrics Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard label="Live Questions" value={questions.length} icon={<Database size={24} />} color="bg-blue-50 text-blue-600" />
        <MetricCard label="Active Topics" value={topics.length} icon={<BookOpen size={24} />} color="bg-indigo-50 text-indigo-600" />
        <MetricCard label="Core Concepts" value={concepts.length} icon={<Lightbulb size={24} />} color="bg-amber-50 text-amber-600" />
        <MetricCard label="Library Items" value={resources.length} icon={<Library size={24} />} color="bg-emerald-50 text-emerald-600" />
      </section>

      {/* Navigation Tabs */}
      <div className="flex gap-2 p-1.5 bg-slate-100/50 w-fit rounded-2xl border border-slate-100">
        <button 
          onClick={() => setActiveSection('questions')}
          className={`px-8 py-3 text-xs font-black uppercase tracking-widest transition-all rounded-xl ${activeSection === 'questions' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Question Bank
        </button>
        <button 
          onClick={() => setActiveSection('concepts')}
          className={`px-8 py-3 text-xs font-black uppercase tracking-widest transition-all rounded-xl ${activeSection === 'concepts' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
        >
          Concept Logic
        </button>
      </div>

      {activeSection === 'questions' ? (
        <Card noPadding className="border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Educational Prompt</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Difficulty</th>
                  <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {questions.map(q => (
                  <tr key={q.id} className="group hover:bg-slate-50/30 transition-all">
                    <td className="px-8 py-6">
                      <span className="px-2.5 py-1 bg-blue-50 text-[9px] font-black text-blue-600 rounded-lg uppercase tracking-widest">{q.type}</span>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-slate-900 truncate max-w-md" title={q.prompt}>{q.prompt}</p>
                      <p className="text-[10px] font-medium text-slate-400 mt-1 uppercase tracking-tight">Topic: {topics.find(t => t.id === q.topicId)?.name || 'Unknown'}</p>
                    </td>
                    <td className="px-8 py-6 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {[1, 2, 3, 4, 5].map(lv => (
                          <div key={lv} className={`h-1.5 w-3 rounded-full ${lv <= q.difficulty ? 'bg-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.3)]' : 'bg-slate-100'}`} />
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setEditingQuestion(q); setShowQuestionForm(true); }} className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit3 size={16} /></button>
                        <button onClick={() => handleDeleteQuestion(q.id)} className="p-3 text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <Card noPadding>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/50">
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Concept Metadata</th>
                  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Formula Status</th>
                  <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {concepts.map(c => (
                  <tr key={c.id} className="group hover:bg-slate-50/30 transition-all">
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-slate-900">{c.name}</p>
                      <p className="text-[11px] text-slate-400 font-medium leading-relaxed max-w-lg mt-1">{c.summary}</p>
                    </td>
                    <td className="px-8 py-6">
                      {c.formula ? (
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100">
                          <Calculator size={12} strokeWidth={3} />
                          <span className="text-[9px] font-black uppercase tracking-widest">Active Reference</span>
                        </div>
                      ) : (
                        <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest italic">Not Required</span>
                      )}
                    </td>
                    <td className="px-8 py-6 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => { setEditingConcept(c); setShowConceptForm(true); }} className="p-3 text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit3 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {/* Forms Overlay Style */}
      {showQuestionForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[60] p-6 overflow-y-auto">
          <div className="bg-white rounded-[40px] w-full max-w-3xl p-10 md:p-14 max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">{editingQuestion?.id ? 'Update Question' : 'New Mastery Unit'}</h3>
              <button onClick={() => setShowQuestionForm(false)} className="p-3 hover:bg-slate-50 rounded-2xl text-slate-400"><X size={20} /></button>
            </div>
            <form onSubmit={handleSaveQuestion} className="space-y-8">
              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Syllabus Topic</label>
                  <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm focus:ring-4 focus:ring-blue-100 outline-none transition-all" value={editingQuestion?.topicId || ''} onChange={e => setEditingQuestion({...editingQuestion, topicId: e.target.value})}>
                    {topics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Modal Type</label>
                  <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm focus:ring-4 focus:ring-blue-100 outline-none transition-all" value={editingQuestion?.type || 'single'} onChange={e => setEditingQuestion({...editingQuestion, type: e.target.value as QuestionType})}>
                    <option value="single">Single Response</option>
                    <option value="multi">Multi Selection</option>
                    <option value="fill">Calculation Output</option>
                    <option value="matching">Association Matrix</option>
                  </select>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Educational Prompt</label>
                <textarea className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl font-medium text-slate-900 focus:ring-4 focus:ring-blue-100 outline-none transition-all min-h-[140px]" value={editingQuestion?.prompt || ''} onChange={e => setEditingQuestion({...editingQuestion, prompt: e.target.value})} placeholder="Describe the problem context clearly..." required />
              </div>
              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setShowQuestionForm(false)} className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all">Cancel</button>
                <button type="submit" className="flex-1 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all">Publish Question</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showConceptForm && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-[60] p-6 overflow-y-auto">
          <div className="bg-white rounded-[40px] w-full max-w-3xl p-10 md:p-14 max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex items-center justify-between mb-10">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">Concept Engineering</h3>
              <button 
                type="button"
                disabled={isGenerating || !editingConcept?.name}
                onClick={handleAiSuggest}
                className="flex items-center gap-3 px-6 py-3 bg-blue-50 text-blue-600 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-100 transition-all disabled:opacity-30"
              >
                {isGenerating ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
                AI Content Assistant
              </button>
            </div>
            <form onSubmit={handleSaveConcept} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Syllabus Domain</label>
                  <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm focus:ring-4 focus:ring-blue-100 outline-none" value={editingConcept?.topicId || ''} onChange={e => setEditingConcept({...editingConcept, topicId: e.target.value})}>
                    {topics.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Concept Designation</label>
                  <input className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm focus:ring-4 focus:ring-blue-100 outline-none" value={editingConcept?.name || ''} onChange={e => setEditingConcept({...editingConcept, name: e.target.value})} placeholder="e.g., Compass Adjustment" required />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Knowledge Summary</label>
                <textarea className="w-full p-6 bg-slate-50 border border-slate-200 rounded-3xl font-medium text-sm focus:ring-4 focus:ring-blue-100 outline-none min-h-[100px]" value={editingConcept?.summary || ''} onChange={e => setEditingConcept({...editingConcept, summary: e.target.value})} required />
              </div>
              <div className="bg-blue-50 p-8 rounded-[32px] border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <Calculator size={18} className="text-blue-600" />
                  <label className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Active Formula (Optional)</label>
                </div>
                <textarea className="w-full p-5 bg-white border border-blue-200 rounded-2xl font-mono text-sm text-blue-900 focus:ring-4 focus:ring-blue-200 outline-none min-h-[60px]" value={editingConcept?.formula || ''} onChange={e => setEditingConcept({...editingConcept, formula: e.target.value})} />
              </div>
              <div className="flex gap-4 pt-6">
                <button type="button" onClick={() => setShowConceptForm(false)} className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest transition-all">Discard</button>
                <button type="submit" className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all">Save Core Concept</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

const X = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
