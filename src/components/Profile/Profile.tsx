import { useState } from 'react';
import { Activity, Heart, Salad, User, Target, Dumbbell, ChevronRight, ChevronLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type CommonData = {
  age: string;
  weight: string;
  height: string;
  gender: 'male' | 'female' | 'other';
};

type NutritionData = CommonData & {
  activity_level: 'sedentary' | 'light' | 'moderate' | 'very' | 'extra';
  medical_history: string[];
  dietary_preferences: string[];
};

type FitnessData = CommonData & {
  target_weight: string;
  physical_activity: string[];
  body_goals: string[];
};

type ProfileType = 'nutrition' | 'fitness';

function Profile() {
  const [profileType, setProfileType] = useState<ProfileType>('nutrition');
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);

  const [commonData, setCommonData] = useState<CommonData>({
    age: '',
    weight: '',
    height: '',
    gender: 'male',
  });

  const [nutritionData, setNutritionData] = useState<Omit<NutritionData, keyof CommonData>>({
    activity_level: 'sedentary',
    medical_history: [],
    dietary_preferences: [],
  });

  const [fitnessData, setFitnessData] = useState<Omit<FitnessData, keyof CommonData>>({
    target_weight: '',
    physical_activity: [],
    body_goals: [],
  });

  const activityLevels = {
    sedentary: 'Sedentary (little or no exercise)',
    light: 'Lightly active (exercise 1-3 times/week)',
    moderate: 'Moderately active (exercise 3-5 times/week)',
    very: 'Very active (exercise 6-7 times/week)',
    extra: 'Extra active (very intense exercise daily)',
  };

  const medicalConditions = [
    'Diabetes',
    'Hypertension',
    'Heart Disease',
    'Celiac Disease',
    'None',
  ];

  const dietaryPreferences = [
    'Vegetarian',
    'Vegan',
    'Pescatarian',
    'Gluten-Free',
    'Dairy-Free',
    'No Restrictions',
  ];

  const physicalActivities = [
    'Running',
    'Weight Training',
    'Swimming',
    'Cycling',
    'Yoga',
    'HIIT',
    'Sports',
    'Walking',
  ];

  const bodyGoals = [
    'Weight Loss',
    'Muscle Gain',
    'Improve Endurance',
    'Increase Strength',
    'Better Flexibility',
    'Maintain Current Fitness',
    'Body Recomposition',
  ];

  const commonSteps = [
    {
      title: 'Basic Information',
      icon: <User className="w-6 h-6" />,
      component: (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Age</label>
              <input
                type="number"
                value={commonData.age}
                onChange={(e) => setCommonData(prev => ({ ...prev, age: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-12"
                placeholder="Enter your age"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
              <input
                type="number"
                value={commonData.weight}
                onChange={(e) => setCommonData(prev => ({ ...prev, weight: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm h-12"
                placeholder="Enter your weight"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
              <input
                type="number"
                value={commonData.height}
                onChange={(e) => setCommonData(prev => ({ ...prev, height: e.target.value }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 h-12 sm:text-sm"
                placeholder="Enter your height"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                value={commonData.gender}
                onChange={(e) => setCommonData(prev => ({ ...prev, gender: e.target.value as CommonData['gender'] }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const nutritionSteps = [
    ...commonSteps,
    {
      title: 'Activity Level',
      icon: <Activity className="w-6 h-6" />,
      component: (
        <div className="space-y-4">
          {Object.entries(activityLevels).map(([key, label]) => (
            <div
              key={key}
              onClick={() => setNutritionData(prev => ({ ...prev, activity_level: key as NutritionData['activity_level'] }))}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                nutritionData.activity_level === key
                  ? 'bg-blue-100 border-blue-500'
                  : 'bg-gray-50 hover:bg-gray-100'
              } border`}
            >
              <div className="flex items-center">
                <input
                  type="radio"
                  checked={nutritionData.activity_level === key}
                  onChange={() => {}}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <label className="ml-3 block text-sm font-medium text-gray-700">
                  {label}
                </label>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Medical History',
      icon: <Heart className="w-6 h-6" />,
      component: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {medicalConditions.map((condition) => (
            <div
              key={condition}
              onClick={() => {
                const newHistory = nutritionData.medical_history.includes(condition)
                  ? nutritionData.medical_history.filter(c => c !== condition)
                  : [...nutritionData.medical_history, condition];
                setNutritionData(prev => ({ ...prev, medical_history: newHistory }));
              }}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                nutritionData.medical_history.includes(condition)
                  ? 'bg-blue-100 border-blue-500'
                  : 'bg-gray-50 hover:bg-gray-100'
              } border`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={nutritionData.medical_history.includes(condition)}
                  onChange={() => {}}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-3 block text-sm font-medium text-gray-700">
                  {condition}
                </label>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Dietary Preferences',
      icon: <Salad className="w-6 h-6" />,
      component: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dietaryPreferences.map((preference) => (
            <div
              key={preference}
              onClick={() => {
                const newPreferences = nutritionData.dietary_preferences.includes(preference)
                  ? nutritionData.dietary_preferences.filter(p => p !== preference)
                  : [...nutritionData.dietary_preferences, preference];
                setNutritionData(prev => ({ ...prev, dietary_preferences: newPreferences }));
              }}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                nutritionData.dietary_preferences.includes(preference)
                  ? 'bg-blue-100 border-blue-500'
                  : 'bg-gray-50 hover:bg-gray-100'
              } border`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={nutritionData.dietary_preferences.includes(preference)}
                  onChange={() => {}}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-3 block text-sm font-medium text-gray-700">
                  {preference}
                </label>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const fitnessSteps = [
    ...commonSteps,
    {
      title: 'Target Weight',
      icon: <Target className="w-6 h-6" />,
      component: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Target Weight (kg)</label>
            <input
              type="number"
              value={fitnessData.target_weight}
              onChange={(e) => setFitnessData(prev => ({ ...prev, target_weight: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Enter your target weight"
            />
          </div>
        </div>
      ),
    },
    {
      title: 'Physical Activities',
      icon: <Activity className="w-6 h-6" />,
      component: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {physicalActivities.map((activity) => (
            <div
              key={activity}
              onClick={() => {
                const newActivities = fitnessData.physical_activity.includes(activity)
                  ? fitnessData.physical_activity.filter(a => a !== activity)
                  : [...fitnessData.physical_activity, activity];
                setFitnessData(prev => ({ ...prev, physical_activity: newActivities }));
              }}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                fitnessData.physical_activity.includes(activity)
                  ? 'bg-blue-100 border-blue-500'
                  : 'bg-gray-50 hover:bg-gray-100'
              } border`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={fitnessData.physical_activity.includes(activity)}
                  onChange={() => {}}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-3 block text-sm font-medium text-gray-700">
                  {activity}
                </label>
              </div>
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Body Goals',
      icon: <Dumbbell className="w-6 h-6" />,
      component: (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bodyGoals.map((goal) => (
            <div
              key={goal}
              onClick={() => {
                const newGoals = fitnessData.body_goals.includes(goal)
                  ? fitnessData.body_goals.filter(g => g !== goal)
                  : [...fitnessData.body_goals, goal];
                setFitnessData(prev => ({ ...prev, body_goals: newGoals }));
              }}
              className={`p-4 rounded-lg cursor-pointer transition-all ${
                fitnessData.body_goals.includes(goal)
                  ? 'bg-blue-100 border-blue-500'
                  : 'bg-gray-50 hover:bg-gray-100'
              } border`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={fitnessData.body_goals.includes(goal)}
                  onChange={() => {}}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label className="ml-3 block text-sm font-medium text-gray-700">
                  {goal}
                </label>
              </div>
            </div>
          ))}
        </div>
      ),
    },
  ];

  const currentSteps = profileType === 'nutrition' ? nutritionSteps : fitnessSteps;

  const handleNext = () => {
    if (currentStep < currentSteps.length - 1) {
      setDirection(1);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    // Transform the data into the required format
    const biometricData = {
      biometric_data: {
        age: parseInt(commonData.age, 10),
        height: parseInt(commonData.height, 10),
        weight: parseInt(commonData.weight, 10),
        gender: commonData.gender,
        activity_level: nutritionData.activity_level,
        medical_history: nutritionData.medical_history,
        dietary_preferences: nutritionData.dietary_preferences,
        target_fitness: fitnessData.body_goals,
        target: parseInt(fitnessData.target_weight, 10),
        
      },
    };
    const biometrics = {
        biometrics:{
        age: parseInt(commonData.age, 10),
        height: parseInt(commonData.height, 10),
        weight: parseInt(commonData.weight, 10),
        gender: commonData.gender,
        activity_level: nutritionData.activity_level,
        target_fitness: fitnessData.body_goals,
        target: parseInt(fitnessData.target_weight, 10),
        }
    }

    console.log(`${profileType} profile submitted:`, biometricData);

    try {
      let response;
      if (profileType === 'nutrition') {
        // Send nutrition data to the API
        response = await fetch('http://127.0.0.1:5000/generate_plan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(biometricData),
        });
      } else {
        // Send fitness data to the API
        response = await fetch('http://127.0.0.1:5000/generate_coach_plan', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(biometrics),
        });
      }

      // Check if the request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the JSON response
      const data = await response.json();
      console.log('API Response:', data); // Log the API response
    } catch (error) {
      console.error('Error sending data to the API:', error);
    }
  };

  const handleProfileTypeChange = (type: ProfileType) => {
    setProfileType(type);
    setCurrentStep(0);
    setDirection(0);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Profile Type Selection */}
        <div className="mb-8 flex justify-center gap-4">
          <button
            onClick={() => handleProfileTypeChange('nutrition')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              profileType === 'nutrition'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Nutrition Profile
          </button>
          <button
            onClick={() => handleProfileTypeChange('fitness')}
            className={`px-6 py-2 rounded-lg transition-colors ${
              profileType === 'fitness'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            Fitness Profile
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Progress bar */}
          <div className="h-1 bg-gray-200">
            <div
              className="h-full bg-blue-600 transition-all duration-500"
              style={{ width: `${((currentStep + 1) / currentSteps.length) * 100}%` }}
            />
          </div>

          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center gap-2 mb-2"
              >
                {currentSteps[currentStep].icon}
                <h2 className="text-2xl font-bold text-gray-900">{currentSteps[currentStep].title}</h2>
              </motion.div>
              <div className="text-sm text-gray-500">
                Step {currentStep + 1} of {currentSteps.length}
              </div>
            </div>

            {/* Content */}
            <div className="relative overflow-hidden min-h-[300px]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute w-full"
                >
                  {currentSteps[currentStep].component}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation */}
            <div className="mt-8 flex justify-between">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                  currentStep === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Previous
              </button>

              {currentStep === currentSteps.length - 1 ? (
                <button
                  onClick={handleSubmit}
                  className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Complete {profileType === 'nutrition' ? 'Nutrition' : 'Fitness'} Profile
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Next
                  <ChevronRight className="w-5 h-5 ml-1" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;