import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { Activity, Heart, Moon, Footprints } from 'lucide-react';
import { HealthData } from '../types';

interface Props {
  data: HealthData[];
}

export const HealthMetrics: React.FC<Props> = ({ data }) => {
  const latestData = data[0];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <MetricCard
          icon={<Heart className="text-red-500" />}
          title="Heart Rate"
          value={`${latestData.heartRate} bpm`}
        />
        <MetricCard
          icon={<Footprints className="text-blue-500" />}
          title="Steps"
          value={latestData.steps.toLocaleString()}
        />
        <MetricCard
          icon={<Activity className="text-green-500" />}
          title="Calories"
          value={`${latestData.calories} kcal`}
        />
        <MetricCard
          icon={<Moon className="text-purple-500" />}
          title="Sleep"
          value={`${latestData.sleep.toFixed(1)} hrs`}
        />
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Weekly Health Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={[...data].reverse()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => format(new Date(date), 'MMM d')}
            />
            <YAxis />
            <Tooltip 
              labelFormatter={(date) => format(new Date(date), 'MMM d, yyyy')}
            />
            <Line type="monotone" dataKey="heartRate" stroke="#ef4444" name="Heart Rate" />
            <Line type="monotone" dataKey="stress" stroke="#8b5cf6" name="Stress Level" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

const MetricCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  value: string;
}> = ({ icon, title, value }) => (
  <div className="bg-white p-4 rounded-lg shadow-md">
    <div className="flex items-center space-x-3">
      {icon}
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-xl font-semibold">{value}</p>
      </div>
    </div>
  </div>
);