import React, { useState, useEffect } from 'react';
import { MOCK_PROFILES } from '../constants';
import { TalentCard } from './TalentCard';
import { Filter, ChevronDown } from 'lucide-react';

export const TalentShowcase: React.FC = () => {
  const [filterSkill, setFilterSkill] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [visibleCount, setVisibleCount] = useState<number>(4);

  // Derive unique skills for filter dropdown
  const allSkills = Array.from(new Set(MOCK_PROFILES.flatMap(p => p.skills))).sort();
  const topSkills = ['All', 'Azure', 'AWS', 'GCP', 'Kubernetes', 'Security', 'DevOps', 'Network', 'Data', 'Modern Work'];

  const filteredProfiles = MOCK_PROFILES.filter(profile => {
    const matchStatus = filterStatus === 'All' || profile.status === filterStatus;
    const matchSkill = filterSkill === 'All' || 
                       profile.skills.some(s => s.toLowerCase().includes(filterSkill.toLowerCase())) ||
                       profile.title.toLowerCase().includes(filterSkill.toLowerCase());
    return matchStatus && matchSkill;
  });

  // Reset pagination when filters change
  useEffect(() => {
    setVisibleCount(4);
  }, [filterSkill, filterStatus]);

  const visibleProfiles = filteredProfiles.slice(0, visibleCount);
  const showLoadMore = visibleCount < filteredProfiles.length;

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  return (
    <section id="talent" className="py-24 bg-white border-t border-gray-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-lexel-dark mb-4">Deployed Infrastructure Talent</h2>
            <p className="text-lexel-dark/70 max-w-2xl">
              Access a live bench of pre-vetted engineers ready to deploy in 48 hours. 
              These are not candidates; they are infrastructure assets.
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
             <div className="relative">
                <select 
                  className="appearance-none bg-gray-50 border border-gray-200 text-lexel-dark py-3 px-4 pr-10 rounded focus:outline-none focus:border-lexel-teal w-full sm:w-48 cursor-pointer font-medium"
                  value={filterSkill}
                  onChange={(e) => setFilterSkill(e.target.value)}
                >
                  {topSkills.map(s => <option key={s} value={s}>{s === 'All' ? 'All Skills' : s}</option>)}
                </select>
                <Filter className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
             </div>

             <div className="relative">
                <select 
                  className="appearance-none bg-gray-50 border border-gray-200 text-lexel-dark py-3 px-4 pr-10 rounded focus:outline-none focus:border-lexel-teal w-full sm:w-48 cursor-pointer font-medium"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                >
                  <option value="All">Any Availability</option>
                  <option value="Immediate">Immediate</option>
                  <option value="2 Weeks">Start in 2 Weeks</option>
                  <option value="4 Weeks">Start in 4 Weeks</option>
                </select>
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none w-2 h-2 bg-lexel-teal rounded-full opacity-50"></div>
             </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {visibleProfiles.map(profile => (
            <TalentCard key={profile.id} profile={profile} />
          ))}
        </div>

        {/* Load More */}
        {showLoadMore && (
          <div className="mt-12 text-center">
            <button 
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 px-8 py-3 bg-white border-2 border-lexel-teal text-lexel-teal font-bold rounded hover:bg-lexel-teal hover:text-white transition-colors uppercase tracking-wide text-sm group"
            >
              Load More Talent
              <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </button>
            <p className="mt-3 text-sm text-gray-400">
              Showing {visibleProfiles.length} of {filteredProfiles.length} profiles
            </p>
          </div>
        )}

        {filteredProfiles.length === 0 && (
          <div className="text-center py-20 bg-gray-50 rounded">
            <p className="text-gray-500 text-lg">No specialists match your criteria currently visible on the public bench.</p>
            <button className="mt-4 text-lexel-teal font-bold hover:underline">Contact us for private bench access</button>
          </div>
        )}
      </div>
    </section>
  );
};