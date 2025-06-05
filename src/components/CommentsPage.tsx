
import React, { useState } from 'react';
import { User, MessageSquare } from 'lucide-react';

interface Comment {
  id: number;
  username: string;
  avatar?: string;
  content: string;
  timestamp: string;
  isLiked: boolean;
  likes: number;
}

interface CommentsPageProps {
  postId?: number;
  onNavigate: (page: string) => void;
  currentUser: string | null;
}

const CommentsPage = ({ postId, onNavigate, currentUser }: CommentsPageProps) => {
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      username: 'turbomaster',
      content: 'Que som maravilhoso! Qual turbo você instalou?',
      timestamp: '1h',
      isLiked: false,
      likes: 3
    },
    {
      id: 2,
      username: 'civicfan2023',
      content: 'Ficou muito bom! Pretendo fazer o mesmo no meu. Quanto custou a instalação?',
      timestamp: '45min',
      isLiked: true,
      likes: 1
    },
    {
      id: 3,
      username: 'speedlover',
      content: 'Show demais! Parabéns pelo projeto 🔥',
      timestamp: '30min',
      isLiked: false,
      likes: 2
    }
  ]);

  // Mock post data
  const post = {
    id: postId || 1,
    username: 'speedking92',
    content: 'Finalmente consegui instalar o turbo no meu Civic! O barulho está de outro mundo 🔥',
    image: 'https://images.unsplash.com/photo-1541348171996-83d1b8b94fbb?w=500&h=300&fit=crop',
    category: 'tuning',
    likes: 24,
    comments: comments.length,
    timestamp: '2h'
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now(),
      username: currentUser || 'usuario',
      content: newComment,
      timestamp: 'agora',
      isLiked: false,
      likes: 0
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const handleLikeComment = (commentId: number) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { 
            ...comment, 
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      {/* Back Button */}
      <button
        onClick={() => onNavigate('feed')}
        className="text-racing-blue hover:text-racing-orange transition-colors mb-6 flex items-center space-x-2"
      >
        <span>←</span>
        <span>Voltar ao Feed</span>
      </button>

      {/* Original Post */}
      <div className="glass-effect rounded-xl p-6 mb-6">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-racing-gradient rounded-full flex items-center justify-center">
            <User size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{post.username}</h3>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>{post.timestamp}</span>
              <span>•</span>
              <span className="text-racing-blue">#{post.category}</span>
            </div>
          </div>
        </div>

        <p className="text-gray-200 mb-4">{post.content}</p>

        {post.image && (
          <div className="mb-4 rounded-lg overflow-hidden">
            <img 
              src={post.image} 
              alt="Post" 
              className="w-full h-64 object-cover"
            />
          </div>
        )}

        <div className="flex items-center space-x-6 pt-4 border-t border-carbon-600">
          <div className="flex items-center space-x-2 text-gray-400">
            <span className="text-lg">❤️</span>
            <span className="text-sm">{post.likes}</span>
          </div>
          <div className="flex items-center space-x-2 text-racing-blue">
            <MessageSquare size={18} />
            <span className="text-sm">{post.comments} comentários</span>
          </div>
        </div>
      </div>

      {/* Comment Form */}
      {currentUser && (
        <div className="glass-effect rounded-xl p-6 mb-6">
          <form onSubmit={handleSubmitComment}>
            <div className="flex space-x-4">
              <div className="w-10 h-10 bg-racing-gradient rounded-full flex items-center justify-center flex-shrink-0">
                <User size={20} className="text-white" />
              </div>
              <div className="flex-1">
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Escreva um comentário..."
                  className="input-racing w-full h-20 resize-none mb-3"
                />
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">
                    {newComment.length}/200 caracteres
                  </span>
                  <button
                    type="submit"
                    disabled={!newComment.trim()}
                    className="racing-button text-sm px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Comentar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white mb-4">
          Comentários ({comments.length})
        </h2>

        {comments.length === 0 ? (
          <div className="glass-effect rounded-xl p-8 text-center">
            <MessageSquare size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">
              Nenhum comentário ainda
            </h3>
            <p className="text-gray-400">
              Seja o primeiro a comentar nesta postagem!
            </p>
          </div>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="glass-effect rounded-lg p-4">
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-racing-gradient rounded-full flex items-center justify-center flex-shrink-0">
                  <User size={16} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-medium text-white">{comment.username}</span>
                    <span className="text-sm text-gray-400">{comment.timestamp}</span>
                  </div>
                  <p className="text-gray-200 mb-2">{comment.content}</p>
                  <button
                    onClick={() => handleLikeComment(comment.id)}
                    className={`flex items-center space-x-1 text-sm transition-colors ${
                      comment.isLiked 
                        ? 'text-racing-red' 
                        : 'text-gray-400 hover:text-racing-red'
                    }`}
                  >
                    <span>❤️</span>
                    <span>{comment.likes}</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentsPage;
