require('dotenv').config();
const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');
const connectDB = require('./db');

const exercises = [
  {
    name: 'Push-Up',
    workout_type: 'Chest',
    description: 'A basic upper body exercise that targets the chest, shoulders, and triceps.',
    steps: [
      'Start in a plank position with your hands shoulder-width apart.',
      'Lower your body until your chest nearly touches the floor.',
      'Push back up to the starting position.',
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/60/Pushup.jpg',
  },
  {
    name: 'Pull-Up',
    workout_type: 'Back',
    description: 'An upper body exercise that targets the back and biceps.',
    steps: [
      'Hang from a pull-up bar with your hands shoulder-width apart.',
      'Pull yourself up until your chin is above the bar.',
      'Lower yourself back down to the starting position.',
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/US_Navy_030618-N-5319A-003_Aircrewman_assigned_to_the_Golden_Falcons_of_Helicopter_Anti-Submarine_Squadron_Two_%28HS-2%29_performs_a_pull-up.jpg',
  },
  {
    name: 'Squat',
    workout_type: 'Legs',
    description: 'A lower body exercise that targets the quadriceps, hamstrings, and glutes.',
    steps: [
      'Stand with your feet shoulder-width apart.',
      'Bend your knees and lower your body until your thighs are parallel to the ground.',
      'Push back up to the starting position.',
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Squat.jpg',
  },
  {
    name: 'Plank',
    workout_type: 'Core',
    description: 'A core exercise that targets the abdominals, obliques, and lower back.',
    steps: [
      'Start in a push-up position with your hands shoulder-width apart.',
      'Hold your body in a straight line from head to heels.',
      'Engage your core and hold the position for the desired amount of time.',
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Plank.jpg',
  },
  {
    name: 'Burpee',
    workout_type: 'Full Body',
    description: 'A full body exercise that combines a squat, push-up, and jump.',
    steps: [
      'Start in a standing position.',
      'Drop into a squat position and place your hands on the ground.',
      'Kick your feet back into a push-up position.',
      'Perform a push-up, then jump your feet back to the squat position.',
      'Jump up explosively into the air.',
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Burpee.gif',
  },
  {
    name: 'Lunge',
    workout_type: 'Legs',
    description: 'A lower body exercise that targets the quadriceps, hamstrings, and glutes.',
    steps: [
      'Stand with your feet hip-width apart.',
      'Take a step forward with your right leg and lower your body until your right thigh is parallel to the ground.',
      'Push back up to the starting position.',
      'Repeat on the other side.',
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Lunge.jpg',
  },
  {
    name: 'Bicycle Crunch',
    workout_type: 'Core',
    description: 'A core exercise that targets the abdominals and obliques.',
    steps: [
      'Lie on your back with your hands behind your head.',
      'Bring your knees to a 90-degree angle and lift your shoulder blades off the ground.',
      'Rotate your torso to bring your right elbow towards your left knee while straightening your right leg.',
      'Repeat on the other side.',
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/8/8d/Bicycle_crunches.gif',
  },
  {
    name: 'Dumbbell Shoulder Press',
    workout_type: 'Shoulders',
    description: 'An upper body exercise that targets the shoulders and triceps.',
    steps: [
      'Sit on a bench with a dumbbell in each hand at shoulder height.',
      'Press the dumbbells overhead until your arms are fully extended.',
      'Lower the dumbbells back to the starting position.',
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Dumbbell_shoulder_press_1.png',
  },
  {
    name: 'Russian Twist',
    workout_type: 'Core',
    description: 'A core exercise that targets the obliques and lower back.',
    steps: [
      'Sit on the ground with your knees bent and feet off the ground.',
      'Lean back slightly and twist your torso to the right, then to the left.',
      'Repeat for the desired number of reps.',
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Russian_twist.jpg',
  },
  {
    name: 'Deadlift',
    workout_type: 'Legs',
    description: 'A lower body exercise that targets the hamstrings, glutes, and lower back.',
    steps: [
      'Stand with your feet hip-width apart and a barbell in front of you.',
      'Bend at the hips and knees to grip the barbell with your hands shoulder-width apart.',
      'Lift the barbell by extending your hips and knees.',
      'Lower the barbell back to the starting position.',
    ],
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1c/Deadlift.jpg',
  },
];

const populateExercises = async () => {
  try {
    await connectDB();
    await Exercise.deleteMany({});
    await Exercise.insertMany(exercises);
    console.log('Exercise data populated successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

populateExercises();