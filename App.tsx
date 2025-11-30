import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Simulator } from './components/Simulator';
import { TalentShowcase } from './components/TalentShowcase';
import { ContactCTA } from './components/ContactCTA';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-lexel-dark">
      <Header />
      <main>
        <Hero />
        <Simulator />
        <TalentShowcase />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;