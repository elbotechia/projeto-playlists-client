import React from 'react';
import headphones from '../assets/headphones.png';

export default function HomePage() {
  return (
    <div className="min-h-96 flex flex-col items-center justify-center text-center animate-fade-in">
      <div className="glass p-12 rounded-3xl max-w-4xl mx-auto">
        <div className="mb-8">
          <img 
            src={headphones} 
            alt="Headphones" 
            className="w-32 h-32 mx-auto mb-6 animate-float opacity-80"
          />
          <h2 className="text-5xl font-bold text-white mb-4 font-display">
            Bem-vindo ao <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">ColabTracks</span>
          </h2>
          <p className="text-xl text-white/80 mb-8 leading-relaxed">
            Descubra músicas incríveis, explore novos artistas e contribua com a comunidade fazendo upload de suas próprias criações musicais.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-white/90 backdrop-blur-md border border-white/30 p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300 h-48 flex flex-col justify-center shadow-lg">
            <div className="text-4xl mb-4">🎵</div>
            <h3 className="text-gray-800 font-semibold mb-2">Explore Músicas</h3>
            <p className="text-gray-600 text-sm">Navegue por uma vasta coleção de tracks de diversos artistas e gêneros.</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-md border border-white/30 p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300 h-48 flex flex-col justify-center shadow-lg">
            <div className="text-4xl mb-4">🎧</div>
            <h3 className="text-gray-800 font-semibold mb-2">Ouça Online</h3>
            <p className="text-gray-600 text-sm">Reproduza suas músicas favoritas diretamente no navegador.</p>
          </div>
          
          <div className="bg-white/90 backdrop-blur-md border border-white/30 p-6 rounded-2xl text-center hover:scale-105 transition-transform duration-300 h-48 flex flex-col justify-center shadow-lg">
            <div className="text-4xl mb-4">📤</div>
            <h3 className="text-gray-800 font-semibold mb-2">Compartilhe</h3>
            <p className="text-gray-600 text-sm">Faça upload de suas próprias criações e compartilhe com a comunidade.</p>
          </div>
        </div>
        
        <div className="mt-12">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full text-white font-semibold animate-glow">
            <span className="mr-2">🚀</span>
            Comece sua jornada musical agora!
          </div>
        </div>
      </div>
    </div>
  );
}
