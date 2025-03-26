import React, { useState } from 'react';
import { Exercise } from '../types';
import { Play } from 'lucide-react';

interface Props {
  onAnalyze: (symptoms: string[]) => {
    exercises: Exercise[];
    doctorSpecialties: string[];
  };
}

export const SymptomAnalyzer: React.FC<Props> = ({ onAnalyze }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [results, setResults] = useState<{
    exercises: Exercise[];
    doctorSpecialties: string[];
  } | null>(null);

  const commonSymptoms = [
    'Back Pain',
    'Stiffness',
    'Joint Pain',
    'Arthritis',
    'Stress',
    'Anxiety'
  ];

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleAnalyze = () => {
    if (selectedSymptoms.length > 0) {
      const results = onAnalyze(selectedSymptoms);
      setResults(results);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Symptom Analysis</h3>
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-3">Select your symptoms:</p>
            <div className="flex flex-wrap gap-2">
              {commonSymptoms.map(symptom => (
                <button
                  key={symptom}
                  onClick={() => handleSymptomToggle(symptom)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedSymptoms.includes(symptom)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {symptom}
                </button>
              ))}
            </div>
          </div>
          <button
            onClick={handleAnalyze}
            disabled={selectedSymptoms.length === 0}
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Analyze Symptoms
          </button>
        </div>
      </div>

      {results && (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Recommended Exercises</h3>
            <div className="space-y-4">
              {results.exercises.map((exercise, index) => (
                <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{exercise.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {exercise.description}
                      </p>
                      <div className="text-sm text-gray-600 mt-2">
                        Duration: {exercise.duration} • Intensity: {exercise.intensity}
                      </div>
                    </div>
                    {exercise.videoUrl && (
                      <a
                        href={exercise.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-500 hover:text-blue-600"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        <span className="text-sm">Watch Video</span>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-4">Recommended Specialists</h3>
            <div className="space-y-2">
              {results.doctorSpecialties.map((specialty, index) => (
                <div
                  key={index}
                  className="text-sm text-gray-700 bg-gray-50 px-3 py-2 rounded"
                >
                  {specialty}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};