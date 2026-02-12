
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';
import { Practice } from './pages/Practice';
import { FocusAreas } from './pages/FocusAreas';
import { Topics } from './pages/Topics';
import { Resources } from './pages/Resources';
import { Admin } from './pages/Admin';
import { SessionHistory } from './pages/SessionHistory';
import { TutorialPage, TutorialTopic } from './components/TutorialPage';
import { SessionMode, User } from './types';
import { StorageService } from './services/storage';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activePage, setActivePage] = useState('dashboard');
  const [practiceMode, setPracticeMode] = useState<SessionMode | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | undefined>(undefined);
  const [selectedTutorialId, setSelectedTutorialId] = useState<TutorialTopic | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    StorageService.init();
    const currentUser = StorageService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsInitialized(true);
  }, []);

  const handleLogin = () => {
    setUser(StorageService.getCurrentUser());
    setActivePage('dashboard');
  };

  const handleLogout = () => {
    StorageService.logout();
    setUser(null);
    setActivePage('dashboard');
  };

  const handleStartPractice = (mode: string, topicId?: string) => {
    setPracticeMode(mode as SessionMode);
    setSelectedTopicId(topicId);
    setActivePage('session');
  };

  const handleExitSession = () => {
    setPracticeMode(null);
    setSelectedTopicId(undefined);
    setActivePage('dashboard');
  };

  const handleNavigateTutorial = (id: TutorialTopic) => {
    setSelectedTutorialId(id);
    setActivePage('tutorial');
  };

  const renderContent = () => {
    if (!user) return <Login onLogin={handleLogin} />;

    switch (activePage) {
      case 'dashboard':
        return <Dashboard onStartPractice={(mode) => handleStartPractice(mode)} onNavigate={setActivePage} />;
      case 'session':
        return practiceMode ? (
          <Practice 
            mode={practiceMode} 
            topicId={selectedTopicId} 
            onExit={handleExitSession} 
          />
        ) : <Dashboard onStartPractice={(mode) => handleStartPractice(mode)} onNavigate={setActivePage} />;
      case 'focus':
        return <FocusAreas onStartDrill={() => handleStartPractice('focus')} />;
      case 'topics':
        return <Topics onStartTopicPractice={(id) => handleStartPractice('topic', id)} />;
      case 'history':
        return <SessionHistory />;
      case 'resources':
        return <Resources onNavigateTutorial={handleNavigateTutorial} />;
      case 'tutorial':
        return selectedTutorialId ? (
          <TutorialPage onBack={() => setActivePage('resources')} topic={selectedTutorialId} />
        ) : <Resources onNavigateTutorial={handleNavigateTutorial} />;
      case 'admin':
        return <Admin />;
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Settings</h2>
            <Card title="Account">
              <p className="text-sm text-slate-600 mb-4">You are logged in as {user.displayName}</p>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-100 text-red-600 rounded-lg font-bold hover:bg-red-200 transition-colors"
              >
                Sign Out
              </button>
            </Card>
          </div>
        );
      default:
        return <Dashboard onStartPractice={(mode) => handleStartPractice(mode)} onNavigate={setActivePage} />;
    }
  };

  if (!isInitialized) return null;

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Layout 
      activePage={activePage === 'session' ? 'practice' : activePage === 'tutorial' ? 'resources' : activePage} 
      onNavigate={setActivePage}
      isAdmin={user.isAdmin}
    >
      {renderContent()}
    </Layout>
  );
};

export default App;

const Card: React.FC<{ children: React.ReactNode, title?: string }> = ({ children, title }) => (
  <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
    {title && <h3 className="text-sm font-semibold text-slate-900 mb-4">{title}</h3>}
    {children}
  </div>
);
