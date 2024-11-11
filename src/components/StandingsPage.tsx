import React from 'react';
import { Trophy, TrendingUp, Star, Clock } from 'lucide-react';

interface Team {
  name: string;
  logo: React.ReactNode;
  color: string;
  score: number;
}

interface StandingsPageProps {
  teams: Team[];
}

const StandingsPage: React.FC<StandingsPageProps> = ({ teams }) => {
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-cyan-400">Current Standings</h2>
        <div className="flex items-center gap-2 text-gray-400">
          <Clock className="w-5 h-5" />
          <span>Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="grid gap-4">
        {sortedTeams.map((team, index) => (
          <div
            key={team.name}
            className={`bg-gradient-to-r from-${team.color}-500/20 to-transparent p-6 rounded-lg border border-${team.color}-500/30 flex items-center gap-6`}
          >
            <div className="text-2xl font-bold w-8">#{index + 1}</div>
            <div className="p-3 bg-gray-800/50 rounded-lg frosted">
              {team.logo}
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold">{team.name}</h3>
              <div className="mt-2 flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span>{team.score} points</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span>+5 this week</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-purple-500" />
                  <span>3 achievements</span>
                </div>
              </div>
            </div>
            <div className="w-32">
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full bg-${team.color}-500`}
                  style={{ width: `${team.score}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-800/30 frosted p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <h3 className="font-semibold">Highest Score</h3>
          </div>
          <p className="text-2xl font-bold">{Math.max(...teams.map(t => t.score))}</p>
        </div>
        <div className="bg-gray-800/30 frosted p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <h3 className="font-semibold">Average Score</h3>
          </div>
          <p className="text-2xl font-bold">
            {Math.round(teams.reduce((acc, t) => acc + t.score, 0) / teams.length)}
          </p>
        </div>
        <div className="bg-gray-800/30 frosted p-4 rounded-lg border border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <Star className="w-5 h-5 text-purple-500" />
            <h3 className="font-semibold">Total Achievements</h3>
          </div>
          <p className="text-2xl font-bold">12</p>
        </div>
      </div>
    </div>
  );
};

export default StandingsPage;