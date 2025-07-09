import React from 'react';
import UsersForm from '../components/forms/UsersForm';

export default function UsersPage() {
  return (
    <div className="min-h-96 flex flex-col items-center justify-center animate-fade-in">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">👥 Área de Usuários</h2>
          <p className="text-white/70">Faça login ou cadastre-se para acessar todos os recursos</p>
        </div>
        <UsersForm />
      </div>
    </div>
  );
}
