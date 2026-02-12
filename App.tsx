
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
import { SavedQuestions } from './pages/SavedQuestions';
import { TutorialPage, TutorialTopic } from './components/TutorialPage';
import { SessionMode, User } from './types';
import { StorageService } from './services/storage';
import { ShieldAlert, Zap, X } from 'lucide-react';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activePage, setActivePage] = useState('dashboard');
  const [practiceMode, setPracticeMode] = useState<SessionMode | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | undefined>(undefined);
  const [selectedTutorialId, setSelectedTutorialId] = useState<TutorialTopic | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showGuestLimitModal, setShowGuestLimitModal] = useState(false);

  useEffect(() => {
    StorageService.init();
    const currentUser = StorageService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
    setIsInitialized(true);
  }, []);

  // Monitor guest session expiration
  useEffect(() => {
    if (!user?.isGuest || !user?.guestExpiresAt) return;

    const interval = setInterval(() => {
      const now = Date.now();
      if (now >= (user.guestExpiresAt || 0)) {
        setShowGuestLimitModal(true);
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [user]);

  const handleLogin = () => {
    setUser(StorageService.getCurrentUser());
    setActivePage('dashboard');
    setShowGuestLimitModal(false);
  };

  const handleLogout = () => {
    StorageService.logout();
    setUser(null);
    setActivePage('dashboard');
    setShowGuestLimitModal(false);
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
      case 'saved':
        return <SavedQuestions onStartSavedPractice={() => handleStartPractice('saved')} />;
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

      {/* Guest Expiration Modal */}
      {showGuestLimitModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-[100] p-6">
          <div className="bg-white rounded-[40px] w-full max-w-lg p-10 md:p-14 text-center shadow-2xl animate-in zoom-in-95 duration-300 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-blue-600"></div>
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8">
              <Zap size={40} className="fill-current" />
            </div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-4">Guest Session Ended</h3>
            <p className="text-slate-500 font-medium leading-relaxed mb-10">
              Your 20-minute trial has concluded. To save your progress, track your readiness score, and access advanced analytics, please create a permanent account.
            </p>
            <div className="space-y-4">
              <button 
                onClick={handleLogout}
                className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all"
              >
                Sign Up & Save Progress
              </button>
              <button 
                onClick={handleLogout}
                className="w-full py-4 bg-white text-slate-400 rounded-2xl font-black text-xs uppercase tracking-widest hover:text-slate-600 transition-all"
              >
                Return to Login
              </button>
            </div>
          </div>
        </div>
      )}
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
