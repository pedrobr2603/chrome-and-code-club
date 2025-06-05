
import React, { useState } from 'react';
import PostCard from './PostCard';

interface FavoritesPageProps {
  currentUser: string | null;
  onNavigate: (page: string, data?: any) => void;
}

const FavoritesPage = ({ currentUser, onNavigate }: FavoritesPageProps) => {
  // Mock favorited posts
  const [favoritedPosts] = useState([
    {
      id: 2,
      username: 'classicfan',
      content: 'Restaurando meu Chevelle 1969. Dois anos de trabalho e finalmente está ficando como eu sonhei. Que acham do resultado?',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&h=300&fit=crop',
      category: 'classico',
      likes: 89,
      comments: 23,
      isLiked: true,
      isFavorited: true,
      isPinned: false,
      timestamp: '4h'
    },
    {
      id: 6,
      username: 'luxurydriver',
      content: 'Experiência incrível dirigindo a nova Lamborghini Huracán! A aceleração é de outro mundo 🚀',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500&h=300&fit=crop',
      category: 'luxo',
      likes: 234,
      comments: 56,
      isLiked: false,
      isFavorited: true,
      isPinned: false,
      timestamp: '1d'
    }
  ]);

  const handleLike = (postId: number) => {
    console.log('Like post:', postId);
  };

  const handleFavorite = (postId: number) => {
    console.log('Unfavorite post:', postId);
  };

  const handleComment = (postId: number) => {
    onNavigate('comments', { postId });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Header */}
      <div className="glass-effect rounded-2xl p-8 mb-6 text-center">
        <div className="text-6xl mb-4">⭐</div>
        <h1 className="text-3xl font-bold text-white mb-2">Seus Favoritos</h1>
        <p className="text-gray-400">
          Todas as postagens que você salvou para acessar rapidamente
        </p>
      </div>

      {/* Posts */}
      <div className="space-y-6">
        {favoritedPosts.length > 0 ? (
          favoritedPosts.map((post) => (
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
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Nenhum favorito ainda
            </h3>
            <p className="text-gray-400 mb-6">
              Favorite postagens interessantes para encontrá-las facilmente aqui!
            </p>
            <button
              onClick={() => onNavigate('feed')}
              className="racing-button"
            >
              Explorar Feed
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
