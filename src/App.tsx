import React from 'react';
import { Activity } from 'lucide-react';
import { HealthMetrics } from './components/HealthMetrics';
import { Recommendations } from './components/Recommendations';
import { SymptomAnalyzer } from './components/SymptomAnalyzer';
import { HealthcareBot } from './components/HealthcareBot';
import { 
  healthData, 
  recommendedDoctors, 
  recommendedExercises, 
  dietRecommendations,
  symptomRecommendations 
} from './data/mockData';

function App() {
  const handleSymptomAnalysis = (selectedSymptoms: string[]) => {
    const matchingRecommendations = symptomRecommendations.filter(rec =>
      rec.symptoms.some(symptom => selectedSymptoms.includes(symptom))
    );

    return {
      exercises: matchingRecommendations.flatMap(rec => rec.exercises),
      doctorSpecialties: Array.from(
        new Set(matchingRecommendations.flatMap(rec => rec.doctorSpecialties))
      )
    };
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">HealthTrack</span>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Health Dashboard</h1>
              <p className="mt-1 text-gray-600">
                Track your health metrics and get personalized recommendations
              </p>
            </div>

            <HealthMetrics data={healthData} />
            
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Symptom Analysis
              </h2>
              <SymptomAnalyzer onAnalyze={handleSymptomAnalysis} />
            </div>

            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                General Recommendations
              </h2>
              <Recommendations
                doctors={recommendedDoctors}
                exercises={recommendedExercises}
                diet={dietRecommendations}
              />
            </div>
          </div>

          <div className="lg:col-span-1">
            <HealthcareBot />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;