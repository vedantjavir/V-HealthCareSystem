import { HealthData, DoctorRecommendation, Exercise, DietRecommendation, SymptomRecommendation } from '../types';
import { subDays } from 'date-fns';

export const healthData: HealthData[] = Array.from({ length: 7 }, (_, i) => ({
  date: subDays(new Date(), i).toISOString(),
  heartRate: 65 + Math.floor(Math.random() * 20),
  steps: 5000 + Math.floor(Math.random() * 7000),
  calories: 1800 + Math.floor(Math.random() * 800),
  sleep: 6 + Math.random() * 2,
  stress: Math.floor(Math.random() * 100)
}));

export const recommendedDoctors: DoctorRecommendation[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiologist',
    hospital: 'Central Hospital',
    rating: 4.8,
    distance: '2.5 miles',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300'
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    specialty: 'General Physician',
    hospital: 'City Medical Center',
    rating: 4.7,
    distance: '1.8 miles',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300'
  }
];

export const recommendedExercises: Exercise[] = [
  {
    name: 'Morning Walk',
    duration: '30 minutes',
    intensity: 'Low',
    calories: 150,
    description: 'Start your day with a brisk walk to improve cardiovascular health'
  },
  {
    name: 'Yoga Session',
    duration: '20 minutes',
    intensity: 'Medium',
    calories: 100,
    description: 'Focus on stretching and breathing exercises to reduce stress'
  }
];

export const dietRecommendations: DietRecommendation[] = [
  {
    meal: 'Breakfast',
    foods: ['Oatmeal', 'Berries', 'Greek Yogurt'],
    nutrients: {
      protein: 20,
      carbs: 45,
      fats: 10
    }
  },
  {
    meal: 'Lunch',
    foods: ['Grilled Chicken', 'Quinoa', 'Steamed Vegetables'],
    nutrients: {
      protein: 30,
      carbs: 40,
      fats: 15
    }
  }
];

export const symptomRecommendations: SymptomRecommendation[] = [
  {
    symptoms: ['Back Pain', 'Stiffness'],
    exercises: [
      {
        name: 'Lower Back Stretches',
        duration: '15 minutes',
        intensity: 'Low',
        calories: 50,
        description: 'Gentle stretches to relieve back pain and improve flexibility',
        videoUrl: 'https://www.youtube.com/watch?v=2zgcH_5nUHQ'
      },
      {
        name: 'Core Strengthening',
        duration: '20 minutes',
        intensity: 'Medium',
        calories: 120,
        description: 'Exercises to strengthen core muscles and support back health',
        videoUrl: 'https://www.youtube.com/watch?v=2foCz_vHqPA'
      }
    ],
    doctorSpecialties: ['Physiotherapist', 'Orthopedic Specialist']
  },
  {
    symptoms: ['Joint Pain', 'Arthritis'],
    exercises: [
      {
        name: 'Water Aerobics',
        duration: '30 minutes',
        intensity: 'Low',
        calories: 200,
        description: 'Low-impact exercises in water to reduce joint stress',
        videoUrl: 'https://www.youtube.com/watch?v=Sw3SzlY8bVE'
      }
    ],
    doctorSpecialties: ['Rheumatologist', 'Physical Therapist']
  },
  {
    symptoms: ['Stress', 'Anxiety'],
    exercises: [
      {
        name: 'Meditation',
        duration: '15 minutes',
        intensity: 'Low',
        calories: 30,
        description: 'Guided meditation for stress relief',
        videoUrl: 'https://www.youtube.com/watch?v=ZToicYcHIOU'
      },
      {
        name: 'Yoga for Anxiety',
        duration: '25 minutes',
        intensity: 'Low',
        calories: 100,
        description: 'Gentle yoga poses to reduce anxiety and promote relaxation',
        videoUrl: 'https://www.youtube.com/watch?v=hJbRpHZr_d0'
      }
    ],
    doctorSpecialties: ['Psychiatrist', 'Mental Health Counselor']
  }
];