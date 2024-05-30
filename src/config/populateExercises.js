require('dotenv').config();
const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');
const connectDB = require('./db');

// Bootstrap exercise data
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
    image: 'https://cdn-0.weighttraining.guide/wp-content/uploads/2016/10/push-up-tall-resized.png?ezimgfmt=ng%3Awebp%2Fngcb4',
    video: 'https://www.youtube.com/watch?v=IODxDxX7oi4',
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
    image: 'https://cdn-0.weighttraining.guide/wp-content/uploads/2016/10/pull-up-2-resized.png?ezimgfmt=ng%3Awebp%2Fngcb4',
    video: 'https://www.youtube.com/watch?v=eGo4IYlbE5g',
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
    image: 'https://cdn-0.weighttraining.guide/wp-content/uploads/2021/06/Hack-squat.png?ezimgfmt=ng%3Awebp%2Fngcb4',
    video: 'https://www.youtube.com/watch?v=ultWZbUMPL8',
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
    image: 'https://cdn-0.weighttraining.guide/wp-content/uploads/2016/10/Front-Plank-resized.png?ezimgfmt=ng%3Awebp%2Fngcb4',
    video: 'https://www.youtube.com/watch?v=ASdvN_XEl_c',
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
    image: 'https://yakkafit.wordpress.com/wp-content/uploads/2013/05/burpee-1.jpg',
    video: 'https://www.youtube.com/watch?v=JZQA08SlJnM',
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
    image: 'https://cdn-0.weighttraining.guide/wp-content/uploads/2018/11/Lunge-resized.png?ezimgfmt=ng%3Awebp%2Fngcb4',
    video: 'https://www.youtube.com/watch?v=QOVaHwm-Q6U',
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
    image: 'https://cdn-0.weighttraining.guide/wp-content/uploads/2016/11/bicycle-crunch-resized-1.png?ezimgfmt=ng%3Awebp%2Fngcb4',
    video: 'https://www.youtube.com/watch?v=9FGilxCbdz8',
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
    image: 'https://cdn-0.weighttraining.guide/wp-content/uploads/2021/09/Seated-dumbbell-one-arm-shoulder-press.png?ezimgfmt=ng%3Awebp%2Fngcb4',
    video: 'https://www.youtube.com/watch?v=HzIiNhHhhtA',
    
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
    image: 'https://cdn-0.weighttraining.guide/wp-content/uploads/2022/10/Dumbbell-Russian-Twist-on-stability-ball.png?ezimgfmt=ng%3Awebp%2Fngcb4',
    video: 'https://www.youtube.com/watch?v=wkD8rjkodUI',
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
    image: 'https://cdn-0.weighttraining.guide/wp-content/uploads/2016/05/Barbell-Deadlift-1.png?ezimgfmt=ng%3Awebp%2Fngcb4',
    video: 'https://www.youtube.com/watch?v=op9kVnSso6Q',
  },
  {
    name: 'Bench Press',
    workout_type: 'Chest',
    description: 'An upper body exercise that targets the chest, shoulders, and triceps.',
    steps: [
      'Lie on a bench with your feet flat on the ground.',
      'Grip the barbell with your hands slightly wider than shoulder-width apart.',
      'Lower the barbell to your chest, then press it back up to the starting position.',
    ],
    image: 'https://cdn-0.weighttraining.guide/wp-content/uploads/2017/07/close-grip-barbell-bench-press-resized.png?ezimgfmt=ng%3Awebp%2Fngcb4',
    video: 'https://www.youtube.com/watch?v=SCVCLChPQFY',
  },
  {
    name: 'Tricep Dip',
    workout_type: 'Arms',
    description: 'An upper body exercise that targets the triceps.',
    steps: [
      'Sit on a bench with your hands next to your hips.',
      'Lift your body off the bench and walk your feet out in front of you.',
      'Lower your body by bending your elbows, then press back up to the starting position.',
    ],
    image: 'https://cdn-0.weighttraining.guide/wp-content/uploads/2016/05/Triceps-Dip-resized.png?ezimgfmt=ng%3Awebp%2Fngcb4',
    video: 'https://www.youtube.com/watch?v=6MwtkyNC2ZY',
  },
  {
    name: 'Leg Press',
    workout_type: 'Legs',
    description: 'A lower body exercise that targets the quadriceps, hamstrings, and glutes.',
    steps: [
      'Sit on the leg press machine with your feet shoulder-width apart.',
      'Press the platform away from you by extending your knees.',
      'Lower the platform back to the starting position.',
    ],
    image: 'https://cdn-0.weighttraining.guide/wp-content/uploads/2016/05/Sled-45-degree-Leg-Press-resized.png?ezimgfmt=ng%3Awebp%2Fngcb4',
    video: 'https://www.youtube.com/watch?v=IZxyjW7MPJQ',
  }
];

// Function to populate the exercises collection
const populateExercises = async () => {
  try {
    await connectDB();
    await Exercise.deleteMany({});
    await Exercise.insertMany(exercises);
    console.log('Exercise data populated successfully');
    process.exit();
  } catch (err) {
    console.error('Failed to populate exercise data:', err);
    process.exit(1);
  }
};

// Execute the function
populateExercises();