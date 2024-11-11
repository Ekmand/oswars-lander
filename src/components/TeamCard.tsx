import React from 'react';

interface TeamCardProps {
  name: string;
  logo: React.ReactNode;
  description: string;
  members: string[];
  color: string;
}

const TeamCard: React.FC<TeamCardProps> = ({ name, logo, description, members, color }) => {
  const colorClasses = {
    blue: 'from-blue-500/20 to-transparent border-blue-500/30',
    purple: 'from-purple-500/20 to-transparent border-purple-500/30',
    red: 'from-red-500/20 to-transparent border-red-500/30',
    green: 'from-green-500/20 to-transparent border-green-500/30'
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} p-4 rounded-lg border`}>
      <div className="flex items-start gap-4">
        <div className="p-2 bg-gray-800/50 rounded-lg backdrop-blur-sm">
          {logo}
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{name}</h3>
          <p className="text-gray-400 text-sm mb-4">{description}</p>
          <div className="space-y-1">
            {members.map((member) => (
              <div key={member} className="text-sm text-gray-300">
                {member}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;