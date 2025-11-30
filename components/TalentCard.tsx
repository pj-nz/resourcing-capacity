import React from 'react';
import { EngineerProfile } from '../types';

interface TalentCardProps {
  profile: EngineerProfile;
}

export const TalentCard: React.FC<TalentCardProps> = ({ profile }) => {
  return (
    <div className="bg-white p-8 rounded-sm shadow-[0_2px_8px_rgba(0,0,0,0.08)] border-t-4 border-lexel-teal h-full flex flex-col">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-5 mb-6 md:items-start items-center text-center md:text-left">
        <div className="flex-1">
          <h1 className="text-lexel-dark text-3xl font-bold mb-1 font-sans">
            {profile.firstName} {profile.lastInitial}.
          </h1>
          <div className="text-lexel-teal text-lg font-semibold mb-2">
            {profile.title}
          </div>
          <div className="text-lexel-medium text-sm font-normal flex items-center justify-center md:justify-start gap-1">
            <span>📍</span> {profile.location}, New Zealand
          </div>
        </div>
        
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-lexel-teal text-white rounded-sm text-[13px] font-semibold tracking-wide whitespace-nowrap">
          <span className="w-2 h-2 bg-white rounded-full"></span>
          {profile.status}
        </div>
      </div>

      {/* About */}
      <div className="text-lexel-dark text-base font-light leading-relaxed mb-6">
        {profile.summary}
      </div>

      {/* Skills */}
      <div className="mb-6">
        <h3 className="text-lexel-dark text-lg font-bold mb-4 font-sans">Core Skills</h3>
        <div className="flex flex-wrap gap-2.5">
          {profile.skills.map(skill => (
            <span key={skill} className="bg-lexel-teal text-white px-[18px] py-[10px] rounded-sm text-sm font-medium">
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Tools */}
      <div className="mb-auto">
        <h3 className="text-lexel-dark text-lg font-bold mb-4 font-sans">Tools & Technologies</h3>
        <div className="flex flex-wrap gap-2.5">
          {profile.tools.map(tool => (
            <span key={tool} className="bg-lexel-light text-lexel-dark px-[18px] py-[10px] rounded-sm text-sm font-medium">
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center pt-6 border-t-2 border-lexel-light mt-6">
        <div className="flex gap-10 w-full">
          <div className="text-center flex-1 md:flex-none">
            <div className="text-xl md:text-[28px] font-bold text-lexel-teal mb-1">
              <span className="inline-block bg-lexel-teal text-white px-3 py-1.5 rounded-sm text-[11px] font-semibold tracking-wider align-middle">
                {profile.demandLevel}
              </span>
            </div>
            <div className="text-[11px] text-lexel-medium uppercase tracking-[0.8px] font-medium">Demand</div>
          </div>

          <div className="text-center flex-1 md:flex-none">
            <div className="text-2xl md:text-[28px] font-bold text-lexel-teal">
              {profile.marketScore}%
            </div>
            <div className="text-[11px] text-lexel-medium uppercase tracking-[0.8px] font-medium">Market Rarity</div>
          </div>

          <div className="text-center flex-1 md:flex-none">
            <div className="text-2xl md:text-[28px] font-bold text-lexel-teal">
              {profile.yearsExperience}+
            </div>
            <div className="text-[11px] text-lexel-medium uppercase tracking-[0.8px] font-medium">Years Exp</div>
          </div>
        </div>
      </div>
    </div>
  );
};