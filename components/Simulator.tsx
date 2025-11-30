import React, { useState, useEffect } from 'react';
import { ROLES } from '../constants';
import { Criticality, SimulationResult } from '../types';
import { Info, TrendingDown, DollarSign, Clock, ChevronDown, ChevronUp, Calculator, CheckCircle } from 'lucide-react';

export const Simulator: React.FC = () => {
  const [teamSize, setTeamSize] = useState<number>(6);
  const [selectedRole, setSelectedRole] = useState<string>(ROLES[0].id);
  const [criticality, setCriticality] = useState<Criticality>('Medium');
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const calculateImpact = () => {
    const roleData = ROLES.find(r => r.id === selectedRole)!;
    
    // Assumptions:
    // Base time to hire: 8 weeks
    // Notice period: 4 weeks
    // Onboarding to 100% productivity: 4-6 weeks
    
    // Calculation Logic
    const scarcityMultiplier = roleData.scarcityFactor;
    const criticalityMultiplier = criticality === 'Low' ? 1.0 : criticality === 'Medium' ? 1.3 : 1.8;
    
    // Weeks gap = (Time to hire + Onboarding) - Notice Period
    // Using simple math for estimation
    const estimatedWeeksGap = Math.round((8 * scarcityMultiplier) + 4);
    
    // Velocity loss logic: 1 person out of N + disruption factor
    const rawPersonLoss = 1 / teamSize;
    const disruptionFactor = 0.15; // Context switching for remaining team
    const totalVelocityLoss = Math.min(Math.round((rawPersonLoss + disruptionFactor) * 100), 100);
    
    // Cost impact
    // Salary prorated for gap + Recruitment fees (approx 15% of salary) + Opportunity Cost
    const weeklySalary = roleData.baseSalary / 52;
    const recruitmentCost = roleData.baseSalary * 0.15;
    const opportunityCostFactor = criticalityMultiplier; 
    const directCost = weeklySalary * estimatedWeeksGap;
    const totalCost = Math.round(recruitmentCost + (directCost * opportunityCostFactor));

    // Risk Level
    let risk: 'Low' | 'Medium' | 'High' | 'Critical' = 'Low';
    if (totalVelocityLoss > 20) risk = 'Medium';
    if (totalVelocityLoss > 30) risk = 'High';
    if (totalVelocityLoss > 40 || criticality === 'High') risk = 'Critical';

    setResult({
      weeksToReplace: estimatedWeeksGap,
      velocityLoss: totalVelocityLoss,
      costImpact: totalCost,
      riskLevel: risk
    });
  };

  useEffect(() => {
    calculateImpact();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamSize, selectedRole, criticality]);

  // Derived calculations for detailed breakdown view
  const roleData = ROLES.find(r => r.id === selectedRole)!;
  const recruitmentFee = roleData.baseSalary * 0.15;
  const weeklySalary = roleData.baseSalary / 52;
  const gapWeeks = result?.weeksToReplace || 0;
  const productivityLoss = weeklySalary * gapWeeks;
  
  const criticalityMultiplier = criticality === 'Low' ? 1.0 : criticality === 'Medium' ? 1.3 : 1.8;
  // Opportunity Cost = Total Direct Cost * (Multiplier - 1)
  // This separates the "salary value" from the "extra business impact"
  const opportunityCost = productivityLoss * (criticalityMultiplier - 1);
  
  // Contractor Comparison Logic
  // Assumption: Contractor rate is ~1.35x base salary rate (covers agency margin, casual loading, lack of benefits)
  // But they are immediately productive (0 onboarding) and fill the gap.
  const contractorWeeklyRate = weeklySalary * 1.35; 
  const contractorTotalCost = contractorWeeklyRate * gapWeeks;
  // The savings is the TOTAL cost of vacancy (Risk) minus the cost of the solution (Contractor)
  const costAvoidance = (result?.costImpact || 0) - contractorTotalCost;

  return (
    <section id="simulator" className="py-24 bg-gray-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-lexel-dark mb-4">Capacity Impact Simulator</h2>
          <p className="text-lexel-dark/70 max-w-2xl mx-auto">
            Quantify the operational and financial impact of a sudden vacancy in your infrastructure team.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Controls */}
          <div className="lg:col-span-5 bg-white p-8 rounded shadow-sm border-l-4 border-lexel-teal">
            <h3 className="text-xl font-bold text-lexel-dark mb-6 flex items-center gap-2">
              <Info className="w-5 h-5 text-lexel-teal" />
              Scenario Parameters
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-lexel-dark mb-2">Team Size</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="range" 
                    min="3" 
                    max="20" 
                    value={teamSize} 
                    onChange={(e) => setTeamSize(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-lexel-teal"
                  />
                  <span className="text-xl font-bold text-lexel-teal w-12 text-center">{teamSize}</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">Current headcount including the lead.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-lexel-dark mb-2">Role Vacancy</label>
                <select 
                  className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-lexel-teal focus:border-lexel-teal outline-none"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                >
                  {ROLES.map(role => (
                    <option key={role.id} value={role.id}>{role.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-lexel-dark mb-2">Project Criticality</label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Low', 'Medium', 'High'] as Criticality[]).map((level) => (
                    <button
                      key={level}
                      onClick={() => setCriticality(level)}
                      className={`py-2 px-4 rounded text-sm font-medium transition-colors border ${
                        criticality === level 
                          ? 'bg-lexel-dark text-white border-lexel-dark' 
                          : 'bg-white text-gray-500 border-gray-200 hover:border-lexel-dark'
                      }`}
                    >
                      {level}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-1">Impact on ongoing deliverables.</p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7 grid md:grid-cols-2 gap-6">
            
            {/* Risk Card */}
            <div className={`md:col-span-2 p-6 rounded border ${
              result?.riskLevel === 'Critical' ? 'bg-red-50 border-red-200' : 
              result?.riskLevel === 'High' ? 'bg-orange-50 border-orange-200' : 
              'bg-blue-50 border-blue-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-lexel-dark">Estimated Operational Risk</h4>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  result?.riskLevel === 'Critical' ? 'bg-red-100 text-red-700' :
                  result?.riskLevel === 'High' ? 'bg-orange-100 text-orange-700' :
                  'bg-blue-100 text-blue-700'
                }`}>
                  {result?.riskLevel}
                </span>
              </div>
              <p className="text-sm text-gray-600">
                {result?.riskLevel === 'Critical' 
                  ? "Immediate intervention required. Velocity drop will significantly impact deadlines and SLA compliance."
                  : "Moderate impact expected. Team may need to deprioritize maintenance to maintain feature velocity."}
              </p>
            </div>

            {/* Metric 1 */}
            <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-lexel-teal/10 rounded">
                  <Clock className="w-5 h-5 text-lexel-teal" />
                </div>
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Time to Recover</span>
              </div>
              <div className="text-3xl font-bold text-lexel-dark mb-1">{result?.weeksToReplace} Weeks</div>
              <div className="text-xs text-gray-400">Includes sourcing, notice period, and productivity ramp-up.</div>
            </div>

            {/* Metric 2 */}
            <div className="bg-white p-6 rounded shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-lexel-teal/10 rounded">
                  <TrendingDown className="w-5 h-5 text-lexel-teal" />
                </div>
                <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">Velocity Loss</span>
              </div>
              <div className="text-3xl font-bold text-lexel-dark mb-1">{result?.velocityLoss}%</div>
              <div className="text-xs text-gray-400">Reduction in sprint capacity during the gap period.</div>
            </div>

             {/* Metric 3 - Big Cost */}
             <div className="md:col-span-2 bg-lexel-dark p-6 rounded shadow-lg text-white relative overflow-hidden">
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-lexel-light">
                      <DollarSign className="w-5 h-5" />
                      <span className="text-sm font-medium uppercase tracking-wide">Estimated Cost Impact</span>
                    </div>
                    <div className="text-4xl md:text-5xl font-bold text-white">
                      ${result?.costImpact?.toLocaleString() ?? 0}
                    </div>
                  </div>
                  <div className="text-right md:w-1/2">
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Combined cost of recruitment fees, interim productivity loss, and opportunity cost of delayed features based on role criticality.
                    </p>
                  </div>
                </div>
             </div>

             {/* Methodology Toggle */}
            <div className="md:col-span-2 mt-4 pt-4 border-t border-gray-100">
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center justify-center gap-2 w-full text-center text-lexel-teal font-medium text-sm hover:text-lexel-dark transition-colors py-2"
              >
                <Calculator className="w-4 h-4" />
                {showDetails ? "Hide Calculation Methodology" : "View Risk Calculation Methodology"}
                {showDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>

              {showDetails && (
                <div className="mt-4 bg-slate-50 p-6 rounded border border-slate-200 text-sm space-y-6 text-slate-600 animate-in fade-in slide-in-from-top-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-bold text-lexel-dark mb-2 flex items-center gap-2">
                        <Clock className="w-3 h-3 text-lexel-teal" /> 
                        Replacement Latency
                      </h5>
                      <p className="leading-relaxed text-xs">
                        <code className="bg-slate-200 px-1 py-0.5 rounded">Time = Sourcing (8wks × Scarcity) + Notice (4wks) + Ramp-up (4wks)</code>
                        <br/><br/>
                        Based on current NZ market depth for {selectedRole.replace(/-/g, ' ')}.
                      </p>
                    </div>

                    <div>
                      <h5 className="font-bold text-lexel-dark mb-2 flex items-center gap-2">
                        <TrendingDown className="w-3 h-3 text-lexel-teal" /> 
                        Velocity Impact
                      </h5>
                      <p className="leading-relaxed text-xs">
                        <code className="bg-slate-200 px-1 py-0.5 rounded">Impact = (1 / Team Size) + 15% Context Switching</code>
                        <br/><br/>
                        Disruption factor accounts for interviews, onboarding support, and knowledge transfer.
                      </p>
                    </div>
                  </div>

                  {/* Expanded Cost Section */}
                  <div className="border-t border-slate-200 pt-6">
                    <h5 className="font-bold text-lexel-dark mb-4 flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-lexel-teal" /> 
                      Total Cost of Vacancy (TCOV) Breakdown
                    </h5>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3 bg-white p-4 rounded border border-slate-200">
                            <h6 className="font-bold text-xs uppercase text-gray-400 tracking-wider mb-2">The Cost of Doing Nothing</h6>
                            <div className="flex justify-between items-center text-xs">
                                <span>Recruitment Agency Fees (15%)</span>
                                <span className="font-mono font-medium">${Math.round(recruitmentFee).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>Productivity Loss ({gapWeeks} wks)</span>
                                <span className="font-mono font-medium">${Math.round(productivityLoss).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span>Opportunity Cost ({criticality})</span>
                                <span className="font-mono font-medium">${Math.round(opportunityCost).toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center text-sm font-bold pt-2 border-t border-gray-100 text-lexel-dark">
                                <span>Total Estimated Risk</span>
                                <span>${result?.costImpact?.toLocaleString() ?? 0}</span>
                            </div>
                        </div>
                        
                        <div className="bg-lexel-teal/5 p-4 rounded border border-lexel-teal/20">
                             <h6 className="font-bold text-lexel-teal text-xs uppercase tracking-wide mb-2 flex items-center gap-1">
                                <CheckCircle className="w-3 h-3" />
                                Talent Infrastructure Alternative
                             </h6>
                             <p className="text-xs mb-3 text-gray-500 leading-relaxed">
                                Deploying a pre-vetted consultant covers the {gapWeeks}-week gap, maintaining velocity and eliminating recruitment fees.
                             </p>
                             <div className="space-y-2">
                                <div className="flex justify-between items-center text-xs text-gray-600">
                                    <span>Contractor Investment</span>
                                    <span className="font-mono">~${Math.round(contractorTotalCost).toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs font-bold text-green-700 pt-2 border-t border-lexel-teal/10">
                                    <span>Net Cost Avoidance</span>
                                    <span>${Math.round(costAvoidance).toLocaleString()}</span>
                                </div>
                             </div>
                        </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

             <div className="md:col-span-2 text-center mt-2">
                <p className="text-xs text-gray-400 italic">
                  *Calculations are estimates based on New Zealand market averages for infrastructure roles.
                </p>
             </div>

          </div>
        </div>
      </div>
    </section>
  );
};