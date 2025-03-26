export interface HealthData {
  date: string;
  heartRate: number;
  steps: number;
  calories: number;
  sleep: number;
  stress: number;
}

export interface DoctorRecommendation {
  id: string;
  name: string;
  specialty: string;
  hospital: string;
  rating: number;
  distance: string;
  image: string;
}

export interface Exercise {
  name: string;
  duration: string;
  intensity: string;
  calories: number;
  description: string;
  videoUrl?: string;
}

export interface DietRecommendation {
  meal: string;
  foods: string[];
  nutrients: {
    protein: number;
    carbs: number;
    fats: number;
  };
}

export interface SymptomRecommendation {
  symptoms: string[];
  exercises: Exercise[];
  doctorSpecialties: string[];
}