
import React, { useState } from 'react';

interface CreatePostPageProps {
  currentUser: string | null;
  onNavigate: (page: string) => void;
  editPost?: any;
}

const CreatePostPage = ({ currentUser, onNavigate, editPost }: CreatePostPageProps) => {
  const [formData, setFormData] = useState({
    content: editPost?.content || '',
    category: editPost?.category || 'esportivo',
    image: editPost?.image || ''
  });

  const [imagePreview, setImagePreview] = useState<string>(editPost?.image || '');

  const categories = [
    { id: 'esportivo', name: 'Esportivos', icon: '🏎️' },
    { id: 'classico', name: 'Clássicos', icon: '🚗' },
    { id: 'tuning', name: 'Tuning', icon: '⚡' },
    { id: 'eletrico', name: 'Elétricos', icon: '🔋' },
    { id: 'offroad', name: 'Off-road', icon: '🚙' },
    { id: 'luxo', name: 'Luxo', icon: '💎' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content.trim()) {
      alert('Por favor, adicione uma descrição para sua postagem!');
      return;
    }

    // Here you would normally send the data to your backend
    console.log('Nova postagem:', {
      ...formData,
      username: currentUser,
      timestamp: new Date().toISOString()
    });

    alert(editPost ? 'Postagem editada com sucesso!' : 'Postagem criada com sucesso!');
    onNavigate('feed');
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImagePreview(result);
        setFormData({ ...formData, image: result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setFormData({ ...formData, image: url });
    setImagePreview(url);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="glass-effect rounded-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            {editPost ? 'Editar Postagem' : 'Nova Postagem'}
          </h1>
          <p className="text-gray-400">
            Compartilhe sua paixão automotiva com a comunidade
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Category Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-3">
              Categoria
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setFormData({ ...formData, category: category.id })}
                  className={`p-4 rounded-lg border text-center transition-all ${
                    formData.category === category.id
                      ? 'border-racing-red bg-racing-red/20 text-racing-red'
                      : 'border-carbon-600 bg-carbon-700 text-gray-400 hover:border-racing-red/50 hover:text-white'
                  }`}
                >
                  <div className="text-2xl mb-1">{category.icon}</div>
                  <div className="text-sm font-medium">{category.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Descrição *
            </label>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Conte sobre seu carro, modificações, experiências..."
              className="input-racing w-full h-32 resize-none"
              required
            />
            <div className="text-right text-sm text-gray-400 mt-1">
              {formData.content.length}/500 caracteres
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Adicionar Imagem
            </label>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Upload de arquivo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-racing-red file:text-white file:cursor-pointer hover:file:bg-racing-red/80"
                />
              </div>
              <div className="text-center text-gray-400">ou</div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">URL da imagem</label>
                <input
                  type="url"
                  value={formData.image}
                  onChange={handleImageUrlChange}
                  placeholder="https://exemplo.com/imagem.jpg"
                  className="input-racing w-full"
                />
              </div>
            </div>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Preview da Imagem
              </label>
              <div className="relative rounded-lg overflow-hidden">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-64 object-cover"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImagePreview('');
                    setFormData({ ...formData, image: '' });
                  }}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={() => onNavigate('feed')}
              className="flex-1 bg-carbon-700 text-gray-300 font-bold py-3 px-6 rounded-lg hover:bg-carbon-600 transition-all"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 racing-button"
            >
              {editPost ? 'Salvar Alterações' : 'Publicar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePostPage;
