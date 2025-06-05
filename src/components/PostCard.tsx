
import React, { useState } from 'react';
import { Bookmark, MessageSquare, User } from 'lucide-react';

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

interface PostCardProps {
  post: Post;
  currentUser: string | null;
  onLike: (postId: number) => void;
  onFavorite: (postId: number) => void;
  onComment: (postId: number) => void;
  onEdit?: (postId: number) => void;
  onDelete?: (postId: number) => void;
  onPin?: (postId: number) => void;
}

const PostCard = ({ 
  post, 
  currentUser, 
  onLike, 
  onFavorite, 
  onComment,
  onEdit,
  onDelete,
  onPin 
}: PostCardProps) => {
  const [showMenu, setShowMenu] = useState(false);
  const isOwner = currentUser === post.username;

  const getCategoryColor = (category: string) => {
    const colors = {
      'esportivo': 'text-racing-red',
      'classico': 'text-racing-orange',
      'tuning': 'text-racing-blue',
      'eletrico': 'text-racing-yellow',
      'offroad': 'text-green-400',
      'luxo': 'text-purple-400'
    };
    return colors[category as keyof typeof colors] || 'text-gray-400';
  };

  return (
    <div className={`post-card animate-slide-up ${post.isPinned ? 'ring-2 ring-racing-red' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-racing-gradient rounded-full flex items-center justify-center">
            {post.avatar ? (
              <img src={post.avatar} alt={post.username} className="w-full h-full rounded-full object-cover" />
            ) : (
              <User size={20} className="text-white" />
            )}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-white">{post.username}</h3>
              {post.isPinned && (
                <span className="text-xs bg-racing-red text-white px-2 py-1 rounded-full">
                  Fixado
                </span>
              )}
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>{post.timestamp}</span>
              <span>•</span>
              <span className={getCategoryColor(post.category)}>
                #{post.category}
              </span>
            </div>
          </div>
        </div>

        {/* Menu Options */}
        {isOwner && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-carbon-700 transition-all"
            >
              •••
            </button>
            
            {showMenu && (
              <div className="absolute right-0 top-full mt-2 w-48 glass-effect rounded-lg border border-carbon-600 z-10">
                <button
                  onClick={() => {
                    onPin?.(post.id);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-carbon-700 rounded-t-lg transition-all"
                >
                  {post.isPinned ? 'Desafixar' : 'Fixar no perfil'}
                </button>
                <button
                  onClick={() => {
                    onEdit?.(post.id);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-carbon-700 transition-all"
                >
                  Editar
                </button>
                <button
                  onClick={() => {
                    onDelete?.(post.id);
                    setShowMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-red-400 hover:text-red-300 hover:bg-carbon-700 rounded-b-lg transition-all"
                >
                  Excluir
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="mb-4">
        <p className="text-gray-200 leading-relaxed">{post.content}</p>
      </div>

      {/* Image */}
      {post.image && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img 
            src={post.image} 
            alt="Post image" 
            className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-carbon-600">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => onLike(post.id)}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all ${
              post.isLiked 
                ? 'bg-racing-red text-white' 
                : 'text-gray-400 hover:text-racing-red hover:bg-carbon-700'
            }`}
          >
            <span className="text-lg">❤️</span>
            <span className="text-sm font-medium">{post.likes}</span>
          </button>

          <button
            onClick={() => onComment(post.id)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-400 hover:text-racing-blue hover:bg-carbon-700 transition-all"
          >
            <MessageSquare size={18} />
            <span className="text-sm font-medium">{post.comments}</span>
          </button>
        </div>

        <button
          onClick={() => onFavorite(post.id)}
          className={`p-2 rounded-lg transition-all ${
            post.isFavorited 
              ? 'text-racing-orange bg-carbon-700' 
              : 'text-gray-400 hover:text-racing-orange hover:bg-carbon-700'
          }`}
        >
          <Bookmark size={18} fill={post.isFavorited ? 'currentColor' : 'none'} />
        </button>
      </div>
    </div>
  );
};

export default PostCard;
