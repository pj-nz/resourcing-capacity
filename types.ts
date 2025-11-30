export interface EngineerProfile {
  id: string;
  firstName: string;
  lastInitial: string;
  title: string;
  location: string;
  status: 'Immediate' | '2 Weeks' | '4 Weeks';
  summary: string; // 2 sentences bio
  skills: string[]; // Core skills (top 8)
  tools: string[]; // Specific tools
  demandLevel: 'Low' | 'Medium' | 'High' | 'Very High' | 'Critical';
  marketScore: number; // 80-99
  yearsExperience: number;
}

export interface RoleData {
  id: string;
  label: string;
  baseSalary: number;
  scarcityFactor: number; // Multiplier for time to hire
}

export type Criticality = 'Low' | 'Medium' | 'High';

export interface SimulationResult {
  weeksToReplace: number;
  velocityLoss: number;
  costImpact: number;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
}