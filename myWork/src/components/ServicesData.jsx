// Single source of truth: used by the cards AND the detail page.
export const services = [
  {
    slug: 'supplement-consultation',
    image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=1400&q=80',
    title: 'Supplement Consultation',
    text: 'Get guidance to understand which supplements may complement your fitness routine.',
    tagline: 'Know what to take, and what to skip',
    intro: 'Our team reviews your goals, diet and training so you only spend money on supplements that actually fit your routine.',
    benefits: [
      { icon: 'target', title: 'Goal-based Advice', text: 'Muscle gain, fat loss or endurance: recommendations follow your target, not a sales list.' },
      { icon: 'shield', title: 'Safe & Honest Guidance', text: 'We explain what each product does, how it is used and when it is not needed.' },
      { icon: 'leaf', title: 'Diet Review', text: 'We check what you already eat first, so supplements fill real gaps only.' }
    ]
  },
  {
    slug: 'smoothie-bar',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=1400&q=80',
    title: 'Smoothie Bar',
    text: 'Recharge after your workout with delicious and nutritious smoothies.',
    tagline: 'Refuel right after your last rep',
    intro: 'Fresh smoothies made to order, built around recovery, energy and taste.',
    benefits: [
      { icon: 'bolt', title: 'Post-workout Blends', text: 'Protein-rich options to support recovery right after training.' },
      { icon: 'leaf', title: 'Fresh Ingredients', text: 'Fruits, oats, nuts and yogurt, blended when you order.' },
      { icon: 'sliders', title: 'Custom Orders', text: 'Choose your base, boosters and sweetness level.' }
    ]
  },
  {
    slug: 'locker-rooms-and-showers',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=1400&q=80',
    title: 'Locker Rooms & Showers',
    text: 'Freshen up after your workout with clean and modern facilities.',
    tagline: 'Walk in sweaty, walk out ready',
    intro: 'Clean, spacious and well-maintained changing areas for every member.',
    benefits: [
      { icon: 'lock', title: 'Secure Lockers', text: 'Keep your bag, phone and valuables safe during your session.' },
      { icon: 'drop', title: 'Hot Showers', text: 'Clean shower stalls with steady hot water all day.' },
      { icon: 'sparkle', title: 'Cleaned Every Hour', text: 'Our staff cleans and restocks throughout opening hours.' }
    ]
  },
  {
    slug: 'nutritional-guidance',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=1400&q=80',
    title: 'Nutritional Guidance',
    text: 'Get practical nutrition advice to complement your training.',
    tagline: 'Eat for the body you are building',
    intro: 'Simple, realistic meal guidance that fits your budget, schedule and taste.',
    benefits: [
      { icon: 'clipboard', title: 'Personal Meal Direction', text: 'Portions and meal timing matched to your training days.' },
      { icon: 'pin', title: 'Local Food Friendly', text: 'Plans built around food you can actually find and cook.' },
      { icon: 'chart', title: 'Progress Check-ins', text: 'We adjust your plan as your body and goals change.' }
    ]
  },
  {
    slug: 'group-classes',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=80',
    title: 'Group Classes',
    text: 'Train together through energetic classes including yoga, Zumba and HIIT.',
    tagline: 'Better workouts, together',
    intro: 'Coach-led classes for every level, with music, energy and people who keep you showing up.',
    benefits: [
      { icon: 'pulse', title: 'Yoga, Zumba & HIIT', text: 'Calm stretching or full-intensity cardio, you pick the day.' },
      { icon: 'users', title: 'All Levels Welcome', text: 'Coaches give easier and harder options for each move.' },
      { icon: 'bolt', title: 'Built-in Motivation', text: 'A group makes it far easier to stay consistent.' }
    ]
  },
  {
    slug: 'personal-training',
    image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=1400&q=80',
    title: 'Personal Training',
    text: 'Work one-on-one with a trainer and follow a program designed around your goals.',
    tagline: 'A program built around you',
    intro: 'Achieve your goals faster with certified trainers who tailor every session to your needs.',
    benefits: [
      { icon: 'clipboard', title: 'Customized Workout Plans', text: 'Built from your goals, fitness level and any limitations.' },
      { icon: 'user', title: 'Individual Attention', text: 'Your trainer corrects form and technique on every exercise.' },
      { icon: 'chart', title: 'Tracked Results', text: 'Regular measurements show exactly how far you have come.' }
    ]
  }
];

export const getService = (slug) => services.find((s) => s.slug === slug);