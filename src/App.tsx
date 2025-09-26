import React from 'react';
import DarkPaymentDemo from './components/DarkPaymentDemo';
import ParticleBackground from './components/ParticleBackground';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-dark-primary relative overflow-hidden">
      <ParticleBackground />
      <DarkPaymentDemo />
    </div>
  );
}

export default App;