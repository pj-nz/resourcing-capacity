import React from 'react';
import { ArrowDownCircle, ShieldAlert } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="bg-lexel-dark text-white pt-24 pb-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-lexel-dark/90"></div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 bg-lexel-teal/10 border border-lexel-teal/30 px-4 py-1.5 rounded-full mb-8 backdrop-blur-sm">
          <ShieldAlert className="w-4 h-4 text-lexel-teal" />
          <span className="text-lexel-teal text-sm font-semibold tracking-wide uppercase">Infrastructure Risk Alert</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          What happens when your <span className="text-lexel-teal">Senior Engineer</span> resigns tomorrow?
        </h1>
        
        <p className="text-xl md:text-2xl text-lexel-light font-light mb-12 max-w-2xl mx-auto">
          Calculate the real cost of gaps in your technical teams. Stop relying on reactive hiring and build resilient talent infrastructure.
        </p>
        
        <a 
          href="#simulator" 
          className="inline-flex items-center gap-3 bg-lexel-teal hover:bg-white hover:text-lexel-teal text-white px-8 py-4 rounded font-bold text-lg transition-all transform hover:-translate-y-1 shadow-lg"
        >
          <ArrowDownCircle className="w-6 h-6" />
          Run Capacity Audit
        </a>
      </div>
    </section>
  );
};