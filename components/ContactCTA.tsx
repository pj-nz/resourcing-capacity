import React from 'react';
import { ChevronRight } from 'lucide-react';

export const ContactCTA: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.open(
      'https://outlook.office.com/bookwithme/user/2b3ce858461d463b8e553100325d600b@lexel.co.nz/meetingtype/My6tgxY1d0GgJMIgaHvYCA2?anonymous&ep=mlink',
      '_blank'
    );
  };

  return (
    <section id="contact" className="py-24 bg-lexel-dark text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-lexel-teal rounded-lg p-1">
          <div className="bg-lexel-dark p-8 md:p-12 rounded border border-lexel-teal/30">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-4">Run a real capacity audit</h2>
              <p className="text-lexel-light text-lg">
                Stop guessing. Get a full breakdown of your team's resilience and a custom talent mapping strategy.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
              <div>
                <label className="block text-sm font-medium text-lexel-light mb-1">Work Email</label>
                <input 
                  type="email" 
                  required 
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded text-white placeholder-gray-500 focus:outline-none focus:border-lexel-teal focus:ring-1 focus:ring-lexel-teal transition-all"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium text-lexel-light mb-1">Name</label>
                   <input 
                    type="text" 
                    required 
                    className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded text-white focus:outline-none focus:border-lexel-teal transition-all"
                  />
                </div>
                <div>
                   <label className="block text-sm font-medium text-lexel-light mb-1">Company</label>
                   <input 
                    type="text" 
                    required 
                    className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded text-white focus:outline-none focus:border-lexel-teal transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-lexel-light mb-1">Team Size</label>
                <select className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded text-white focus:outline-none focus:border-lexel-teal transition-all">
                  <option className="bg-lexel-dark">1 - 10</option>
                  <option className="bg-lexel-dark">11 - 50</option>
                  <option className="bg-lexel-dark">50+</option>
                </select>
              </div>

              <button 
                type="submit" 
                className="w-full bg-lexel-teal hover:bg-white hover:text-lexel-teal text-white font-bold py-4 rounded transition-all flex items-center justify-center gap-2 group"
              >
                Book Strategy Call
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};