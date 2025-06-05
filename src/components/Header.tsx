
import React, { useState } from 'react';
import { User, Bookmark, MessageSquare } from 'lucide-react';

interface HeaderProps {
  currentUser: string | null;
  onNavigate: (page: string) => void;
  currentPage: string;
}

const Header = ({ currentUser, onNavigate, currentPage }: HeaderProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <header className="glass-effect border-b border-carbon-600 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onNavigate('feed')}
          >
            <div className="w-10 h-10 bg-racing-gradient rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">🏎️</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">CarConnect</h1>
              <p className="text-xs text-gray-400">Rede Social Automotiva</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <input
              type="text"
              placeholder="Buscar posts, usuários, carros..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input-racing w-full"
            />
          </div>

          {/* Navigation */}
          {currentUser ? (
            <nav className="flex items-center space-x-6">
              <button
                onClick={() => onNavigate('feed')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'feed' 
                    ? 'bg-racing-red text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-carbon-700'
                }`}
              >
                <span className="hidden sm:inline">Feed</span>
              </button>

              <button
                onClick={() => onNavigate('favorites')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'favorites' 
                    ? 'bg-racing-red text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-carbon-700'
                }`}
              >
                <Bookmark size={20} />
                <span className="hidden sm:inline">Favoritos</span>
              </button>

              <button
                onClick={() => onNavigate('create-post')}
                className="racing-button text-sm px-4 py-2"
              >
                <span className="hidden sm:inline">Nova Postagem</span>
                <span className="sm:hidden">+</span>
              </button>

              <button
                onClick={() => onNavigate('profile')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  currentPage === 'profile' 
                    ? 'bg-racing-red text-white' 
                    : 'text-gray-300 hover:text-white hover:bg-carbon-700'
                }`}
              >
                <User size={20} />
                <span className="hidden sm:inline">{currentUser}</span>
              </button>
            </nav>
          ) : (
            <div className="flex space-x-4">
              <button
                onClick={() => onNavigate('login')}
                className="text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-all hover:bg-carbon-700"
              >
                Entrar
              </button>
              <button
                onClick={() => onNavigate('register')}
                className="racing-button text-sm px-4 py-2"
              >
                Cadastrar
              </button>
            </div>
          )}
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <input
            type="text"
            placeholder="Buscar..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-racing w-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
