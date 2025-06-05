
import React, { useState } from 'react';
import PostCard from './PostCard';

interface Post {
  id: number;
  username: string;
  avatar?: string;
  content: string;
  image?: string;
  category: string;
  likes: number;
  comments: number;
  isLiked: boolean;
  isFavorited: boolean;
  isPinned: boolean;
  timestamp: string;
}

interface FeedPageProps {
  currentUser: string | null;
  onNavigate: (page: string, data?: any) => void;
}

const FeedPage = ({ currentUser, onNavigate }: FeedPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      username: 'speedking92',
      content: 'Finalmente consegui instalar o turbo no meu Civic! O barulho está de outro mundo 🔥 Quem aí também é apaixonado por turbo?',
      image: 'https://images.unsplash.com/photo-1541348171996-83d1b8b94fbb?w=500&h=300&fit=crop',
      category: 'tuning',
      likes: 24,
      comments: 8,
      isLiked: false,
      isFavorited: false,
      isPinned: false,
      timestamp: '2h'
    },
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
      isPinned: true,
      timestamp: '4h'
    },
    {
      id: 3,
      username: 'electricdream',
      content: 'Tesla Model S Plaid chegou! 1020cv de pura emoção elétrica. O futuro já chegou, pessoal! ⚡',
      image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=500&h=300&fit=crop',
      category: 'eletrico',
      likes: 156,
      comments: 42,
      isLiked: false,
      isFavorited: false,
      isPinned: false,
      timestamp: '6h'
    },
    {
      id: 4,
      username: 'trackmaster',
      content: 'Dia de track day com a Porsche 911 GT3! Nada supera a sensação de acelerar em Interlagos 🏁',
      image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=500&h=300&fit=crop',
      category: 'esportivo',
      likes: 78,
      comments: 15,
      isLiked: true,
      isFavorited: false,
      isPinned: false,
      timestamp: '8h'
    }
  ]);

  const categories = [
    { id: 'todos', name: 'Todos', color: 'text-white' },
    { id: 'esportivo', name: 'Esportivos', color: 'text-racing-red' },
    { id: 'classico', name: 'Clássicos', color: 'text-racing-orange' },
    { id: 'tuning', name: 'Tuning', color: 'text-racing-blue' },
    { id: 'eletrico', name: 'Elétricos', color: 'text-racing-yellow' },
    { id: 'offroad', name: 'Off-road', color: 'text-green-400' },
    { id: 'luxo', name: 'Luxo', color: 'text-purple-400' }
  ];

  const filteredPosts = selectedCategory === 'todos' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  const handleFavorite = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isFavorited: !post.isFavorited }
        : post
    ));
  };

  const handleComment = (postId: number) => {
    onNavigate('comments', { postId });
  };

  const handlePin = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, isPinned: !post.isPinned }
        : post
    ));
  };

  const handleEdit = (postId: number) => {
    const post = posts.find(p => p.id === postId);
    onNavigate('edit-post', { post });
  };

  const handleDelete = (postId: number) => {
    if (confirm('Tem certeza que deseja excluir esta postagem?')) {
      setPosts(posts.filter(post => post.id !== postId));
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Category Filter */}
      <div className="glass-effect rounded-xl p-4 mb-6">
        <h2 className="text-lg font-semibold text-white mb-3">Categorias</h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-racing-red text-white'
                  : `${category.color} bg-carbon-700 hover:bg-carbon-600`
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Welcome Message */}
      {currentUser && (
        <div className="glass-effect rounded-xl p-6 mb-6 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Bem-vindo, {currentUser}! 🏎️
          </h2>
          <p className="text-gray-400 mb-4">
            Compartilhe sua paixão por carros com a comunidade
          </p>
          <button
            onClick={() => onNavigate('create-post')}
            className="racing-button"
          >
            Criar Nova Postagem
          </button>
        </div>
      )}

      {/* Posts */}
      <div className="space-y-6">
        {sortedPosts.length === 0 ? (
          <div className="glass-effect rounded-xl p-12 text-center">
            <div className="text-6xl mb-4">🏁</div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Nenhuma postagem encontrada
            </h3>
            <p className="text-gray-400">
              Seja o primeiro a compartilhar algo nesta categoria!
            </p>
          </div>
        ) : (
          sortedPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={currentUser}
              onLike={handleLike}
              onFavorite={handleFavorite}
              onComment={handleComment}
              onPin={handlePin}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default FeedPage;
