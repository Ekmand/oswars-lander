import React from 'react';
import { Shield, Clock, Award, AlertTriangle } from 'lucide-react';

const RulesPage: React.FC = () => {
  const rules = [
    {
      icon: <Shield className="w-6 h-6 text-green-500" />,
      title: "Code of Conduct",
      description: "All participants must adhere to professional conduct. Harassment or unethical behavior will result in immediate disqualification."
    },
    {
      icon: <Clock className="w-6 h-6 text-blue-500" />,
      title: "Timeline",
      description: "Teams have 6 months to develop their OS. Monthly progress reports are mandatory."
    },
    {
      icon: <Award className="w-6 h-6 text-yellow-500" />,
      title: "Judging Criteria",
      description: "Projects will be judged on innovation, performance, security, and user experience."
    },
    {
      icon: <AlertTriangle className="w-6 h-6 text-red-500" />,
      title: "Restrictions",
      description: "Use of existing kernels or operating systems as a base is prohibited. All code must be original."
    }
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8 text-cyan-400">Competition Rules</h2>
      
      <div className="grid gap-6">
        {rules.map((rule, index) => (
          <div key={index} className="bg-gray-800/30 frosted p-6 rounded-lg border border-white/10">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-gray-800/50 rounded-lg">
                {rule.icon}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{rule.title}</h3>
                <p className="text-gray-300">{rule.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-800/30 frosted rounded-lg border border-white/10">
        <h3 className="text-xl font-semibold mb-4">Scoring System</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Innovation</span>
              <span>30 points</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full w-[30%] bg-cyan-500"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Performance</span>
              <span>25 points</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full w-[25%] bg-purple-500"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>Security</span>
              <span>25 points</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full w-[25%] bg-green-500"></div>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>User Experience</span>
              <span>20 points</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full w-[20%] bg-yellow-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;