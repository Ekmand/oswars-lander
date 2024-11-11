import React from 'react';
import { Github, Globe, Award, Clock } from 'lucide-react';

interface Team {
  name: string;
  logo: React.ReactNode;
  description: string;
  members: string[];
  color: string;
  score: number;
}

interface TeamsPageProps {
  teams: Team[];
}

const TeamsPage: React.FC<TeamsPageProps> = ({ teams }) => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-8 text-cyan-400">Competing Teams</h2>
      <div className="grid grid-cols-1 gap-8">
        {teams.map((team) => (
          <div key={team.name} className={`bg-gradient-to-r from-${team.color}-500/20 to-transparent p-6 rounded-lg border border-${team.color}-500/30`}>
            <div className="flex items-start gap-6">
              <div className="p-4 bg-gray-800/50 rounded-lg frosted">
                {team.logo}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-2xl font-bold">{team.name}</h3>
                  <div className="flex items-center gap-3">
                    <button className="p-2 rounded-lg hover:bg-gray-700/50">
                      <Github className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-lg hover:bg-gray-700/50">
                      <Globe className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-300 mb-6">{team.description}</p>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Team Members</h4>
                    <ul className="space-y-2">
                      {team.members.map((member) => (
                        <li key={member} className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gray-700/50 flex items-center justify-center">
                            {member.charAt(0)}
                          </div>
                          <span>{member}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">Achievements</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-yellow-500" />
                        <span>Best Performance</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-cyan-500" />
                        <span>Innovation Award</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;