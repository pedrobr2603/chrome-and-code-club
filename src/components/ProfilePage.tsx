
import React, { useState } from 'react';
import PostCard from './PostCard';
import { User, Bookmark } from 'lucide-react';

interface ProfilePageProps {
  currentUser: string | null;
  onNavigate: (page: string, data?: any) => void;
}

const ProfilePage = ({ currentUser, onNavigate }: ProfilePageProps) => {
  const [activeTab, setActiveTab] = useState('posts');

  // Mock user data
  const userProfile = {
    username: currentUser || 'speedking92',
    avatar: '',
    bio: 'Apaixonado por carros esportivos e tunados. Honda Civic Si 2019 🔥',
    stats: {
      posts: 24,
      followers: 1247,
      following: 89
    },
    carInfo: {
      make: 'Honda',
      model: 'Civic Si',
      year: 2019,
      modifications: ['Turbo', 'Suspensão', 'Escape', 'Rodas']
    }
  };

  // Mock user posts
  const userPosts = [
    {
      id: 1,
      username: currentUser || 'speedking92',
      content: 'Finalmente consegui instalar o turbo no meu Civic! O barulho está de outro mundo 🔥',
      image: 'https://images.unsplash.com/photo-1541348171996-83d1b8b94fbb?w=500&h=300&fit=crop',
      category: 'tuning',
      likes: 24,
      comments: 8,
      isLiked: false,
      isFavorited: false,
      isPinned: true,
      timestamp: '2h'
    },
    {
      id: 5,
      username: currentUser || 'speedking92',
      content: 'Chegou a nova suspensão! Agora vai ficar muito mais baixo e esportivo. Mal posso esperar para instalar!',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&h=300&fit=crop',
      category: 'tuning',
      likes: 18,
      comments: 12,
      isLiked: true,
      isFavorited: false,
      isPinned: false,
      timestamp: '1d'
    }
  ];

  const handleLike = (postId: number) => {
    console.log('Like post:', postId);
  };

  const handleFavorite = (postId: number) => {
    console.log('Favorite post:', postId);
  };

  const handleComment = (postId: number) => {
    onNavigate('comments', { postId });
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Profile Header */}
      <div className="glass-effect rounded-2xl p-8 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
          {/* Avatar */}
          <div className="relative">
            <div className="w-32 h-32 bg-racing-gradient rounded-full flex items-center justify-center">
              {userProfile.avatar ? (
                <img src={userProfile.avatar} alt={userProfile.username} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User size={48} className="text-white" />
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-racing-red rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🏎️</span>
            </div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-white mb-2">{userProfile.username}</h1>
            <p className="text-gray-400 mb-4">{userProfile.bio}</p>
            
            {/* Stats */}
            <div className="flex justify-center md:justify-start space-x-8 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-racing-red">{userProfile.stats.posts}</div>
                <div className="text-sm text-gray-400">Posts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-racing-blue">{userProfile.stats.followers}</div>
                <div className="text-sm text-gray-400">Seguidores</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-racing-orange">{userProfile.stats.following}</div>
                <div className="text-sm text-gray-400">Seguindo</div>
              </div>
            </div>

            {/* Car Info */}
            <div className="glass-effect rounded-lg p-4 border border-carbon-600">
              <h3 className="text-lg font-semibold text-white mb-3">Meu Carro Principal</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <span className="text-gray-400 text-sm">Marca/Modelo:</span>
                  <p className="text-white font-medium">{userProfile.carInfo.make} {userProfile.carInfo.model}</p>
                </div>
                <div>
                  <span className="text-gray-400 text-sm">Ano:</span>
                  <p className="text-white font-medium">{userProfile.carInfo.year}</p>
                </div>
              </div>
              <div>
                <span className="text-gray-400 text-sm mb-2 block">Modificações:</span>
                <div className="flex flex-wrap gap-2">
                  {userProfile.carInfo.modifications.map((mod, index) => (
                    <span key={index} className="bg-racing-red/20 text-racing-red px-2 py-1 rounded-full text-sm">
                      {mod}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => onNavigate('create-post')}
              className="racing-button text-sm px-6"
            >
              Nova Postagem
            </button>
            <button className="neon-button text-sm px-6">
              Editar Perfil
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="glass-effect rounded-xl mb-6">
        <div className="flex border-b border-carbon-600">
          <button
            onClick={() => setActiveTab('posts')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-all ${
              activeTab === 'posts'
                ? 'text-racing-red border-b-2 border-racing-red'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Minhas Postagens ({userProfile.stats.posts})
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`flex-1 py-4 px-6 text-center font-medium transition-all ${
              activeTab === 'favorites'
                ? 'text-racing-red border-b-2 border-racing-red'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Favoritos
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="space-y-6">
        {activeTab === 'posts' ? (
          userPosts.length > 0 ? (
            userPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                currentUser={currentUser}
                onLike={handleLike}
                onFavorite={handleFavorite}
                onComment={handleComment}
              />
            ))
          ) : (
            <div className="glass-effect rounded-xl p-12 text-center">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Nenhuma postagem ainda
              </h3>
              <p className="text-gray-400 mb-6">
                Comece compartilhando suas experiências automotivas!
              </p>
              <button
                onClick={() => onNavigate('create-post')}
                className="racing-button"
              >
                Criar Primeira Postagem
              </button>
            </div>
          )
        ) : (
          <div className="glass-effect rounded-xl p-12 text-center">
            <div className="text-6xl mb-4">⭐</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Nenhum favorito ainda
            </h3>
            <p className="text-gray-400">
              Favorite postagens interessantes para encontrá-las facilmente aqui!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
