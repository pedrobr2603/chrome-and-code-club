
import React, { useState } from 'react';

interface LoginPageProps {
  onLogin: (username: string, password: string) => void;
  onNavigate: (page: string) => void;
}

const LoginPage = ({ onLogin, onNavigate }: LoginPageProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onLogin(formData.username, formData.password);
    } else {
      // Simulate registration
      if (formData.password === formData.confirmPassword) {
        onLogin(formData.username, formData.password);
      } else {
        alert('Senhas não coincidem!');
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-racing-gradient rounded-full flex items-center justify-center mx-auto mb-4 animate-glow">
            <span className="text-3xl">🏎️</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">CarConnect</h1>
          <p className="text-gray-400">A rede social dos apaixonados por carros</p>
        </div>

        {/* Form */}
        <div className="glass-effect rounded-2xl p-8">
          <div className="flex rounded-lg bg-carbon-800 p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                isLogin 
                  ? 'bg-racing-red text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Entrar
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                !isLogin 
                  ? 'bg-racing-red text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Cadastrar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Nome de usuário
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                className="input-racing w-full"
                placeholder="Digite seu nome de usuário"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="input-racing w-full"
                  placeholder="Digite seu email"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Senha
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="input-racing w-full"
                placeholder="Digite sua senha"
                required
              />
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Confirmar senha
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="input-racing w-full"
                  placeholder="Confirme sua senha"
                  required
                />
              </div>
            )}

            <button
              type="submit"
              className="racing-button w-full mt-6"
            >
              {isLogin ? 'Entrar' : 'Cadastrar'}
            </button>
          </form>

          {isLogin && (
            <div className="text-center mt-4">
              <a 
                href="#" 
                className="text-racing-blue hover:text-racing-orange transition-colors text-sm"
              >
                Esqueceu sua senha?
              </a>
            </div>
          )}

          <div className="text-center mt-6 pt-6 border-t border-carbon-600">
            <p className="text-gray-400 text-sm">
              {isLogin ? 'Novo no CarConnect?' : 'Já tem uma conta?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-racing-blue hover:text-racing-orange transition-colors ml-1 font-medium"
              >
                {isLogin ? 'Cadastre-se' : 'Faça login'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
