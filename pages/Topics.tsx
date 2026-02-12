
import React from 'react';
import { Card, ProgressBar } from '../components/Cards';
import { ICONS } from '../constants';
import { StorageService } from '../services/storage';

interface TopicsProps {
  onStartTopicPractice: (topicId: string) => void;
}

export const Topics: React.FC<TopicsProps> = ({ onStartTopicPractice }) => {
  const topics = StorageService.getTopics();
  const concepts = StorageService.getConcepts();
  const user = StorageService.getCurrentUser();
  const mastery = StorageService.getMastery(user.id);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h2 className="text-2xl font-bold text-slate-900">Syllabus & Progress</h2>
        <p className="text-slate-500 mt-1">Review topics and track your mastery of core concepts.</p>
      </header>

      <div className="space-y-6">
        {topics.map(topic => {
          const topicConcepts = concepts.filter(c => c.topicId === topic.id);
          const topicMastery = mastery.filter(m => {
            const concept = concepts.find(c => c.id === m.conceptId);
            return concept?.topicId === topic.id;
          });
          
          const totalMastery = topicMastery.reduce((acc, curr) => acc + curr.masteryLevel, 0);
          const maxPossible = topicConcepts.length * 5 || 5;
          const percentage = Math.round((totalMastery / maxPossible) * 100);

          return (
            <Card key={topic.id} className="hover:border-slate-300 transition-colors">
              <div className="flex flex-col md:flex-row gap-6 md:items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold">
                      {topic.sortOrder}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{topic.name}</h3>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed mb-4">
                    {topic.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {topicConcepts.map(c => (
                      <span 
                        key={c.id} 
                        className="px-2 py-0.5 bg-slate-100 text-[10px] font-semibold text-slate-500 rounded uppercase tracking-wider"
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="w-full md:w-64 flex flex-col items-center justify-center border-l-0 md:border-l border-slate-100 pl-0 md:pl-6 space-y-4">
                  <div className="w-full">
                    <ProgressBar value={totalMastery} max={maxPossible} label="Mastery Progress" />
                  </div>
                  <button 
                    onClick={() => onStartTopicPractice(topic.id)}
                    className="w-full py-2.5 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                  >
                    Practice Topic {ICONS.Chevron}
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
