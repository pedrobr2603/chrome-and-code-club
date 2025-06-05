
import React, { useState } from 'react';
import Header from '../components/Header';
import LoginPage from '../components/LoginPage';
import FeedPage from '../components/FeedPage';
import CreatePostPage from '../components/CreatePostPage';
import ProfilePage from '../components/ProfilePage';
import FavoritesPage from '../components/FavoritesPage';
import CommentsPage from '../components/CommentsPage';

const Index = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState('login');
  const [pageData, setPageData] = useState<any>(null);

  const handleLogin = (username: string, password: string) => {
    // Simulate login - in real app, this would be an API call
    setCurrentUser(username);
    setCurrentPage('feed');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('login');
  };

  const handleNavigate = (page: string, data?: any) => {
    setCurrentPage(page);
    setPageData(data);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
      case 'register':
        return <LoginPage onLogin={handleLogin} onNavigate={handleNavigate} />;
      
      case 'feed':
        return <FeedPage currentUser={currentUser} onNavigate={handleNavigate} />;
      
      case 'create-post':
        return <CreatePostPage currentUser={currentUser} onNavigate={handleNavigate} />;
      
      case 'edit-post':
        return <CreatePostPage currentUser={currentUser} onNavigate={handleNavigate} editPost={pageData?.post} />;
      
      case 'profile':
        return <ProfilePage currentUser={currentUser} onNavigate={handleNavigate} />;
      
      case 'favorites':
        return <FavoritesPage currentUser={currentUser} onNavigate={handleNavigate} />;
      
      case 'comments':
        return <CommentsPage postId={pageData?.postId} onNavigate={handleNavigate} currentUser={currentUser} />;
      
      default:
        return <FeedPage currentUser={currentUser} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen bg-carbon-900">
      {currentUser && (
        <Header 
          currentUser={currentUser} 
          onNavigate={handleNavigate}
          currentPage={currentPage}
        />
      )}
      <main className={currentUser ? 'pt-4' : ''}>
        {renderPage()}
      </main>
    </div>
  );
};

export default Index;
