import React from 'react';
import { DoctorRecommendation, Exercise, DietRecommendation } from '../types';
import { Star, Clock, Flame } from 'lucide-react';

interface Props {
  doctors: DoctorRecommendation[];
  exercises: Exercise[];
  diet: DietRecommendation[];
}

export const Recommendations: React.FC<Props> = ({ doctors, exercises, diet }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Recommended Doctors</h3>
        <div className="space-y-4">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="flex items-start space-x-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium">{doctor.name}</h4>
                <p className="text-sm text-gray-600">{doctor.specialty}</p>
                <p className="text-sm text-gray-600">{doctor.hospital}</p>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm">{doctor.rating}</span>
                  <span className="text-sm text-gray-600">• {doctor.distance}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Recommended Exercises</h3>
        <div className="space-y-4">
          {exercises.map((exercise, index) => (
            <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
              <h4 className="font-medium">{exercise.name}</h4>
              <div className="flex items-center space-x-4 text-sm text-gray-600 mt-2">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {exercise.duration}
                </div>
                <div className="flex items-center">
                  <Flame className="w-4 h-4 mr-1" />
                  {exercise.calories} cal
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{exercise.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">Diet Recommendations</h3>
        <div className="space-y-4">
          {diet.map((meal, index) => (
            <div key={index} className="border-b last:border-0 pb-4 last:pb-0">
              <h4 className="font-medium">{meal.meal}</h4>
              <ul className="mt-2 text-sm text-gray-600">
                {meal.foods.map((food, idx) => (
                  <li key={idx}>• {food}</li>
                ))}
              </ul>
              <div className="mt-2 grid grid-cols-3 gap-2 text-xs">
                <div className="bg-green-100 p-2 rounded">
                  <span className="block text-green-800">Protein</span>
                  <span className="font-medium">{meal.nutrients.protein}g</span>
                </div>
                <div className="bg-blue-100 p-2 rounded">
                  <span className="block text-blue-800">Carbs</span>
                  <span className="font-medium">{meal.nutrients.carbs}g</span>
                </div>
                <div className="bg-yellow-100 p-2 rounded">
                  <span className="block text-yellow-800">Fats</span>
                  <span className="font-medium">{meal.nutrients.fats}g</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};