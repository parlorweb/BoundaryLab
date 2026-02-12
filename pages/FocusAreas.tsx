
import React from 'react';
import { Card, ProgressBar } from '../components/Cards';
import { ICONS, MASTERY_LABELS } from '../constants';
import { StorageService } from '../services/storage';

interface FocusAreasProps {
  onStartDrill: () => void;
}

export const FocusAreas: React.FC<FocusAreasProps> = ({ onStartDrill }) => {
  const user = StorageService.getCurrentUser();
  const mastery = StorageService.getMastery(user.id);
  const concepts = StorageService.getConcepts();

  const weakMastery = mastery
    .filter(m => m.masteryLevel <= 1)
    .sort((a, b) => a.masteryLevel - b.masteryLevel);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Focus Areas</h2>
          <p className="text-slate-500 mt-1">Target concepts that need reinforcement.</p>
        </div>
        <button 
          onClick={onStartDrill}
          disabled={weakMastery.length === 0}
          className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 disabled:opacity-50 transition-all flex items-center gap-2"
        >
          {ICONS.Focus} Start Focus Drill
        </button>
      </header>

      {weakMastery.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {weakMastery.map(m => {
            const concept = concepts.find(c => c.id === m.conceptId);
            if (!concept) return null;
            return (
              <Card key={m.conceptId} className="hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-bold text-slate-900">{concept.name}</h4>
                    <p className="text-[10px] font-bold text-red-500 uppercase">Mastery: {MASTERY_LABELS[m.masteryLevel]}</p>
                  </div>
                  <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-400">
                    <Target size={20} />
                  </div>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg text-xs text-slate-600 leading-relaxed mb-4">
                  {concept.summary}
                </div>
                <ProgressBar value={m.masteryLevel} max={5} />
                <div className="mt-4 flex justify-between items-center text-[10px] font-bold text-slate-400 uppercase">
                  <span>Attempts: {m.lifetimeAttempts}</span>
                  <span>Accuracy: {Math.round((m.lifetimeCorrect / (m.lifetimeAttempts || 1)) * 100)}%</span>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-12 text-center">
          <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No critical focus areas found!</h3>
          <p className="text-slate-500 mt-2 max-w-sm mx-auto">
            Great job! You don't have any concepts in the 'Struggling' or 'New' phase. 
            Keep practicing your stable areas to move toward 'Exam Ready'.
          </p>
        </div>
      )}
    </div>
  );
};

const Target = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);

const CheckCircle2 = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/>
  </svg>
);
