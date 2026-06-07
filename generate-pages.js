/* ============================================================
   Sauna Research Studies - Page Generator
   Generates ~70 subpages (homepage already exists as index.html)
   ============================================================ */

const fs = require('fs');
const path = require('path');

// ============================================================
// IMAGE FILES (for random selection)
// ============================================================
const images = [
  'sauna-benefits-immune-system-health-benefits-of-sauna.avif',
  'sauna-lifestyle-image-sauna-laddle-and-bucket-on-wooden-sauna-benches.avif',
  'sauna-lifestyle-image-sauna-laddle-pouring-water-on-hot-sauna-stones.avif',
  'sauna-lifestyle-image-woman-sauna-bathing-relaxing-sauna-session.avif',
  'sauna-lifestyle-what-is-sauna-lifestyle-definition-and-explanation.avif'
];

function getRandomImg() {
  return images[Math.floor(Math.random() * images.length)];
}

// ============================================================
// PAGES ARRAY — Each entry: { slug, title, description, h1, h2s, closing, navCat }
// ============================================================

const pages = [
  // ===== WHAT IS SAUNA / BASICS =====
  {
    slug: 'what-is-a-sauna',
    title: 'What Is a Sauna? – A Complete Guide to Sauna Bathing',
    description: 'Discover what a sauna is, how it works, and why millions of people around the world enjoy regular sauna sessions for health and relaxation.',
    h1: 'What Is a Sauna?',
    h2s: ['The Origins and History of Sauna Bathing', 'How a Traditional Sauna Works', 'Different Types of Saunas Around the World', 'Why People Love Sauna Bathing'],
    closing: 'Discover the Sauna Experience'
  },
  {
    slug: 'types-of-saunas',
    title: 'Types of Saunas – A Guide to Different Sauna Styles',
    description: 'Explore the different types of saunas from traditional Finnish smoke saunas to modern infrared cabins. Find the perfect sauna for your needs.',
    h1: 'Types of Saunas',
    h2s: ['Traditional Finnish Sauna', 'Smoke Sauna – The Original Sauna Experience', 'Infrared Sauna – Modern Heat Therapy', 'Electric and Wood-Burning Saunas', 'Portable and Home Sauna Options'],
    closing: 'Choose Your Preferred Sauna Type'
  },
  {
    slug: 'dry-sauna',
    title: 'Dry Sauna – What It Is and How It Differs from Steam',
    description: 'Learn about dry sauna bathing, its characteristics, health benefits, and how it compares to steam rooms and wet saunas.',
    h1: 'Dry Sauna',
    h2s: ['What Is a Dry Sauna?', 'Dry Sauna Temperature and Humidity Levels', 'Health Benefits of Dry Sauna Bathing', 'Dry Sauna vs Steam Room Comparison'],
    closing: 'Experience the Dry Sauna Difference'
  },
  {
    slug: 'dry-sauna-benefits',
    title: 'Dry Sauna Benefits – Health Advantages of Dry Heat',
    description: 'Discover the health benefits of dry sauna bathing including improved circulation, detoxification, stress reduction, and respiratory health.',
    h1: 'Dry Sauna Benefits',
    h2s: ['Cardiovascular Benefits of Dry Sauna', 'Detoxification Through Sweating', 'Respiratory Health Improvements', 'Stress Reduction and Mental Clarity', 'Skin Health Benefits of Dry Heat'],
    closing: 'Reap the Rewards of Dry Sauna'
  },
  {
    slug: 'infrared-sauna',
    title: 'Infrared Sauna – Modern Heat Therapy Explained',
    description: 'Learn about infrared saunas, how they differ from traditional saunas, their unique health benefits, and what to expect during a session.',
    h1: 'Infrared Sauna',
    h2s: ['What Is an Infrared Sauna?', 'How Infrared Heat Penetrates the Body', 'Infrared Sauna vs Traditional Sauna', 'Health Benefits of Infrared Sauna Therapy'],
    closing: 'Try Infrared Sauna Therapy'
  },
  {
    slug: 'infrared-sauna-temperature',
    title: 'Infrared Sauna Temperature – What to Expect',
    description: 'Understand infrared sauna temperature ranges, optimal settings for health benefits, and how it compares to traditional sauna heat levels.',
    h1: 'Infrared Sauna Temperature',
    h2s: ['Typical Infrared Sauna Temperature Ranges', 'How Infrared Temperature Differs from Traditional Sauna', 'Optimal Temperature Settings for Different Benefits', 'Safety Considerations for Infrared Sauna Use'],
    closing: 'Find Your Ideal Sauna Temperature'
  },
  {
    slug: 'smoke-sauna',
    title: 'Smoke Sauna – The Original Finnish Sauna Experience',
    description: 'Discover the ancient tradition of smoke sauna bathing. Learn about its unique characteristics, preparation process, and authentic Finnish experience.',
    h1: 'Smoke Sauna',
    h2s: ['What Is a Smoke Sauna?', 'The History and Tradition of Smoke Saunas', 'How a Smoke Sauna Is Prepared', 'The Unique Sensory Experience of Smoke Sauna', 'Health Benefits of Smoke Sauna Bathing'],
    closing: 'Experience a Traditional Smoke Sauna'
  },
  {
    slug: 'traditional-finnish-sauna',
    title: 'Traditional Finnish Sauna – The Authentic Experience',
    description: 'Explore the traditional Finnish sauna, its cultural significance, bathing rituals, and why it remains a cornerstone of Finnish wellness.',
    h1: 'Traditional Finnish Sauna',
    h2s: ['What Defines a Traditional Finnish Sauna?', 'The Role of Löyly – Steam on Hot Stones', 'Traditional Sauna Etiquette and Customs', 'Health Benefits of Finnish Sauna Bathing'],
    closing: 'Embrace the Finnish Sauna Tradition'
  },
  {
    slug: 'old-finnish-sauna',
    title: 'Old Finnish Sauna – Heritage and Tradition',
    description: 'Discover the history and heritage of old Finnish saunas. Learn about traditional construction, rituals, and the cultural importance of the ancient sauna.',
    h1: 'Old Finnish Sauna',
    h2s: ['The History of Old Finnish Saunas', 'Traditional Construction Methods', 'The Role of the Sauna in Historical Finnish Life', 'Preserving Old Finnish Sauna Traditions'],
    closing: 'Honor the Old Finnish Sauna Tradition'
  },
  {
    slug: 'finnish-sauna',
    title: 'Finnish Sauna – The Heart of Finnish Culture',
    description: 'Explore the Finnish sauna, an integral part of Finnish culture and identity. Learn about traditions, health benefits, and the sauna way of life in Finland.',
    h1: 'Finnish Sauna',
    h2s: ['The Cultural Significance of the Finnish Sauna', 'Traditional Finnish Sauna Rituals', 'Health Benefits Backed by Finnish Research', 'Modern Finnish Sauna Design and Innovation'],
    closing: 'Immerse Yourself in Finnish Sauna Culture'
  },
  {
    slug: 'finnish-sauna-culture',
    title: 'Finnish Sauna Culture – Traditions and Customs',
    description: 'Discover the rich traditions of Finnish sauna culture. Learn about customs, etiquette, and the deep social importance of sauna in Finland.',
    h1: 'Finnish Sauna Culture',
    h2s: ['The Roots of Finnish Sauna Culture', 'Sauna Etiquette and Social Customs', 'Sauna as a Space for Connection', 'How Sauna Culture Is Passed Down Through Generations'],
    closing: 'Dive Into Finnish Sauna Culture'
  },
  {
    slug: 'sauna-vs-steam-room',
    title: 'Sauna vs Steam Room – Key Differences Explained',
    description: 'Compare sauna vs steam room to understand the differences in heat, humidity, health benefits, and which option suits your wellness goals.',
    h1: 'Sauna vs Steam Room',
    h2s: ['Dry Heat vs Moist Heat – The Fundamental Difference', 'Temperature and Humidity Comparison', 'Health Benefits of Sauna vs Steam Room', 'Which One Is Right for You?'],
    closing: 'Choose Your Preferred Heat Experience'
  },
  {
    slug: 'how-hot-is-sauna',
    title: 'How Hot Is a Sauna? – Temperature Guide and Safety',
    description: 'Find out how hot a sauna typically gets. Learn about optimal temperature ranges for different sauna types and safety guidelines for sauna bathing.',
    h1: 'How Hot Is a Sauna?',
    h2s: ['Traditional Finnish Sauna Temperature Range', 'Infrared Sauna Temperature Differences', 'Factors That Affect Sauna Temperature', 'Safe Temperature Guidelines for Sauna Use'],
    closing: 'Sauna Safely at the Right Temperature'
  },
  {
    slug: 'where-was-sauna-invented',
    title: 'Where Was Sauna Invented? – The Origins of Sauna Bathing',
    description: 'Discover where sauna was invented and how this ancient bathing tradition evolved. Learn about the Finnish origins of sauna culture.',
    h1: 'Where Was Sauna Invented?',
    h2s: ['The Finnish Origins of the Sauna', 'Early Sauna History and Development', 'How Sauna Spread Across the World', 'The Oldest Known Saunas in Finland'],
    closing: 'Appreciate the Ancient Roots of Sauna'
  },

  // ===== HEALTH BENEFITS =====
  {
    slug: 'are-saunas-bad-for-you',
    title: 'Are Saunas Bad for You? – Safety and Risks Explained',
    description: 'Learn about the safety of sauna bathing. Understand potential risks, contraindications, and how to enjoy sauna sessions safely.',
    h1: 'Are Saunas Bad for You?',
    h2s: ['General Safety of Sauna Bathing', 'Potential Risks and Contraindications', 'Who Should Avoid Sauna or Consult a Doctor', 'How to Minimize Risks and Stay Safe'],
    closing: 'Sauna Safely With Confidence'
  },
  {
    slug: 'are-saunas-good-for-your-skin',
    title: 'Are Saunas Good for Your Skin? – Dermatological Benefits',
    description: 'Discover how sauna bathing affects your skin. Learn about the benefits of sweat, improved circulation, and skin health from regular sauna use.',
    h1: 'Are Saunas Good for Your Skin?',
    h2s: ['How Sauna Affects Skin Physiology', 'Benefits of Sweating for Skin Health', 'Improved Circulation and Skin Glow', 'Sauna and Common Skin Conditions', 'Best Practices for Sauna Skin Care'],
    closing: 'Achieve Healthier Skin Through Sauna'
  },
  {
    slug: 'benefit-of-sauna',
    title: 'Benefit of Sauna – Top Health Advantages Explained',
    description: 'Explore the main benefits of sauna bathing including cardiovascular health, stress reduction, detoxification, and improved overall wellbeing.',
    h1: 'Benefit of Sauna',
    h2s: ['Cardiovascular Health Improvements', 'Stress Reduction and Mental Wellbeing', 'Detoxification Through Sweating', 'Enhanced Recovery and Physical Performance', 'Long-Term Health and Longevity Benefits'],
    closing: 'Experience the Benefits of Regular Sauna Use'
  },
  {
    slug: 'is-sauna-healthy',
    title: 'Is Sauna Healthy? – Evidence-Based Health Assessment',
    description: 'Get a comprehensive answer to whether sauna is healthy. Review the scientific evidence for cardiovascular, mental, and physical health benefits.',
    h1: 'Is Sauna Healthy?',
    h2s: ['What the Research Says About Sauna Health', 'Cardiovascular Benefits of Regular Sauna Use', 'Mental Health and Stress Reduction Benefits', 'Physical Recovery and Immune Support', 'Long-Term Health Outcomes and Longevity'],
    closing: 'Make Sauna Part of Your Healthy Lifestyle'
  },
  {
    slug: 'is-sauna-good-for-recovery',
    title: 'Is Sauna Good for Recovery? – Post-Exercise Benefits',
    description: 'Discover whether sauna is beneficial for recovery after exercise. Learn how heat therapy aids muscle recovery, reduces soreness, and improves performance.',
    h1: 'Is Sauna Good for Recovery?',
    h2s: ['How Heat Therapy Aids Muscle Recovery', 'Sauna for Reducing Delayed Onset Muscle Soreness', 'Improved Circulation and Nutrient Delivery', 'The Role of Heat Shock Proteins in Recovery'],
    closing: 'Enhance Your Recovery With Sauna'
  },
  {
    slug: 'sauna-and-health',
    title: 'Sauna and Health – Comprehensive Guide to Wellness Benefits',
    description: 'Explore the comprehensive health benefits of sauna bathing. From heart health to mental wellness, discover how regular sauna use supports overall health.',
    h1: 'Sauna and Health',
    h2s: ['Cardiovascular Health and Sauna Bathing', 'Mental Health Benefits of Regular Sauna Use', 'Immune System Support Through Heat Therapy', 'Sauna for Detoxification and Cellular Health'],
    closing: 'Improve Your Health With Regular Sauna Use'
  },
  {
    slug: 'sauna-bath-benefits',
    title: 'Sauna Bath Benefits – Why Sauna Bathing Is Good for You',
    description: 'Discover the numerous sauna bath benefits including improved circulation, stress relief, detoxification, and better sleep quality.',
    h1: 'Sauna Bath Benefits',
    h2s: ['Physical Health Benefits of Sauna Bathing', 'Mental and Emotional Wellness', 'Detoxification and Cellular Repair', 'Better Sleep and Relaxation', 'Social and Cultural Benefits'],
    closing: 'Enjoy the Full Benefits of Sauna Bathing'
  },
  {
    slug: 'sauna-benefits',
    title: 'Sauna Benefits – The Complete Guide to Health Improvements',
    description: 'Explore the extensive sauna benefits supported by scientific research. From cardiovascular health to longevity, discover what regular sauna can do for you.',
    h1: 'Sauna Benefits',
    h2s: ['Cardiovascular Benefits of Regular Sauna Use', 'Cognitive and Mental Health Benefits', 'Physical Performance and Recovery', 'Immune Function and Longevity'],
    closing: 'Unlock the Full Spectrum of Sauna Benefits'
  },
  {
    slug: 'sauna-health-benefits',
    title: 'Sauna Health Benefits – Evidence-Based Wellness Guide',
    description: 'Discover the evidence-based sauna health benefits from peer-reviewed research. Learn how regular sauna bathing supports heart health, brain function, and longevity.',
    h1: 'Sauna Health Benefits',
    h2s: ['Landmark Research on Sauna Health Benefits', 'Cardiovascular Disease Risk Reduction', 'Dementia and Cognitive Health', 'Mental Health and Stress Reduction'],
    closing: 'Transform Your Health With Sauna'
  },
  {
    slug: 'sauna-cardiovascular-benefits',
    title: 'Sauna Cardiovascular Benefits – Heart Health Research',
    description: 'Explore the cardiovascular benefits of sauna bathing. Learn how regular sauna use supports heart health, reduces blood pressure, and improves circulation.',
    h1: 'Sauna Cardiovascular Benefits',
    h2s: ['How Sauna Affects the Cardiovascular System', 'Reduced Risk of Heart Disease and Stroke', 'Blood Pressure Regulation Through Heat Therapy', 'Improved Endothelial Function and Circulation'],
    closing: 'Support Your Heart Health With Sauna'
  },
  {
    slug: 'sauna-heart-benefits',
    title: 'Sauna Heart Benefits – How Sauna Supports Cardiac Health',
    description: 'Discover how sauna bathing benefits heart health. Learn about reduced cardiovascular mortality, improved circulation, and heart function supported by research.',
    h1: 'Sauna Heart Benefits',
    h2s: ['Sauna Bathing and Reduced Cardiac Mortality', 'Improved Heart Rate Variability', 'Enhanced Blood Circulation and Oxygen Delivery', 'Long-Term Cardiovascular Protection'],
    closing: 'Protect Your Heart With Regular Sauna Use'
  },
  {
    slug: 'why-saunas-are-good',
    title: 'Why Saunas Are Good for You – The Science Explained',
    description: 'Learn why saunas are good for your health based on scientific research. Discover the physiological mechanisms behind sauna health benefits.',
    h1: 'Why Saunas Are Good for You',
    h2s: ['The Physiological Response to Heat Exposure', 'Cardiovascular and Circulatory Benefits', 'Stress Reduction and Hormonal Balance', 'Cellular Repair and Longevity Pathways'],
    closing: 'Understand the Science Behind Sauna Benefits'
  },
  {
    slug: 'what-is-sauna-good-for',
    title: 'What Is Sauna Good For? – Complete Wellness Guide',
    description: 'Find out what sauna is good for including heart health, stress relief, muscle recovery, skin health, and overall wellness.',
    h1: 'What Is Sauna Good For?',
    h2s: ['Cardiovascular Health and Disease Prevention', 'Stress Reduction and Mental Clarity', 'Muscle Recovery and Physical Performance', 'Skin Health and Detoxification', 'Better Sleep and Relaxation'],
    closing: 'Discover What Sauna Can Do for You'
  },
  {
    slug: 'why-do-people-use-saunas',
    title: 'Why Do People Use Saunas? – Motivations and Benefits',
    description: 'Discover why people use saunas around the world. From health benefits to cultural traditions, explore the many reasons for sauna bathing.',
    h1: 'Why Do People Use Saunas?',
    h2s: ['Health and Wellness Motivations', 'Cultural and Social Traditions', 'Relaxation and Stress Relief', 'Physical Recovery and Athletic Performance'],
    closing: 'Find Your Own Reason to Love Sauna'
  },
  {
    slug: 'sauna-and-blood-pressure',
    title: 'Sauna and Blood Pressure – How Heat Affects Hypertension',
    description: 'Learn about the relationship between sauna and blood pressure. Discover how regular sauna bathing can help manage hypertension naturally.',
    h1: 'Sauna and Blood Pressure',
    h2s: ['How Sauna Affects Blood Pressure During and After Sessions', 'Long-Term Blood Pressure Reduction Through Regular Use', 'Research on Sauna and Hypertension Management', 'Safety Considerations for Individuals with High Blood Pressure'],
    closing: 'Manage Blood Pressure With Regular Sauna Use'
  },
  {
    slug: 'sauna-and-cardiovascular-health',
    title: 'Sauna and Cardiovascular Health – Comprehensive Research',
    description: 'Explore the comprehensive research on sauna and cardiovascular health. Learn how regular sauna bathing reduces the risk of heart disease and stroke.',
    h1: 'Sauna and Cardiovascular Health',
    h2s: ['The KIHD Study and Cardiovascular Findings', 'Mechanisms of Cardiovascular Protection', 'Reduced Risk of Sudden Cardiac Death', 'Sauna as Part of a Heart-Healthy Lifestyle'],
    closing: 'Protect Your Cardiovascular Health With Sauna'
  },
  {
    slug: 'sauna-heat-shock-proteins',
    title: 'Sauna Heat Shock Proteins – Cellular Repair Mechanisms',
    description: 'Discover how sauna bathing triggers heat shock proteins, which play a vital role in cellular repair, protein maintenance, and longevity.',
    h1: 'Sauna Heat Shock Proteins',
    h2s: ['What Are Heat Shock Proteins?', 'How Sauna Induces Heat Shock Protein Production', 'The Role of HSPs in Cellular Repair and Longevity', 'Optimizing Sauna Sessions for HSP Activation'],
    closing: 'Boost Your Cellular Health With Sauna'
  },

  // ===== WORKOUT & RECOVERY =====
  {
    slug: 'benefits-of-sauna-after-workout',
    title: 'Benefits of Sauna After Workout – Recovery and Performance',
    description: 'Discover the benefits of using a sauna after your workout including faster recovery, reduced muscle soreness, and improved athletic performance.',
    h1: 'Benefits of Sauna After Workout',
    h2s: ['Muscle Recovery and Reduced Soreness', 'Improved Circulation for Faster Healing', 'Detoxification After Exercise', 'Enhanced Flexibility and Range of Motion'],
    closing: 'Recover Better After Your Workout'
  },
  {
    slug: 'how-to-use-a-sauna-after-a-workout',
    title: 'How to Use a Sauna After a Workout – Best Practices',
    description: 'Learn how to properly use a sauna after a workout. Get tips on timing, hydration, session duration, and maximizing recovery benefits.',
    h1: 'How to Use a Sauna After a Workout',
    h2s: ['When to Enter the Sauna After Exercise', 'Optimal Session Duration for Recovery', 'Hydration Strategies for Post-Workout Sauna', 'Combining Sauna with Cold Exposure for Recovery'],
    closing: 'Master Your Post-Workout Sauna Routine'
  },
  {
    slug: 'sauna-after-workout',
    title: 'Sauna After Workout – Recovery and Wellness Guide',
    description: 'Learn how to use a sauna after a workout for optimal recovery. Discover the benefits of post-exercise heat therapy for athletes and fitness enthusiasts.',
    h1: 'Sauna After Workout',
    h2s: ['Why Post-Workout Sauna Is Beneficial', 'Timing and Duration Guidelines', 'Hydration and Nutrition Considerations', 'Combining Sauna with Stretching and Cool-Down'],
    closing: 'Optimize Your Post-Workout Recovery'
  },
  {
    slug: 'sauna-and-exercise',
    title: 'Sauna and Exercise – How Heat Training Boosts Performance',
    description: 'Explore the relationship between sauna and exercise. Learn how heat acclimation and post-workout sauna sessions can enhance athletic performance.',
    h1: 'Sauna and Exercise',
    h2s: ['Heat Acclimation for Athletic Performance', 'Post-Exercise Sauna for Recovery', 'Improved Cardiovascular Efficiency', 'Enhanced Endurance Through Heat Training'],
    closing: 'Combine Sauna and Exercise for Better Results'
  },
  {
    slug: 'sauna-and-muscle-building',
    title: 'Sauna and Muscle Building – Growth Hormone and Recovery',
    description: 'Discover how sauna bathing may support muscle building through growth hormone release, improved recovery, and reduced inflammation.',
    h1: 'Sauna and Muscle Building',
    h2s: ['Heat Shock Proteins and Muscle Repair', 'Growth Hormone Response to Heat Stress', 'Reduced Inflammation and Faster Recovery', 'Sauna as a Complement to Resistance Training'],
    closing: 'Support Your Muscle Building Goals With Sauna'
  },
  {
    slug: 'sauna-and-recovery',
    title: 'Sauna and Recovery – Accelerate Healing Naturally',
    description: 'Learn how sauna bathing accelerates recovery after exercise or physical exertion. Discover the physiological mechanisms behind heat therapy recovery.',
    h1: 'Sauna and Recovery',
    h2s: ['Physiological Mechanisms of Heat Recovery', 'Reduced Muscle Soreness and Inflammation', 'Improved Sleep Quality for Recovery', 'Sauna Protocol for Optimal Recovery'],
    closing: 'Recover Faster and Stronger With Sauna'
  },
  {
    slug: 'sauna-before-or-after-workout',
    title: 'Sauna Before or After Workout – Which Is Better?',
    description: 'Decide whether to use a sauna before or after your workout. Compare the benefits of pre-workout warmth and post-workout recovery.',
    h1: 'Sauna Before or After Workout',
    h2s: ['Sauna Before Workout – Warming Up and Flexibility', 'Sauna After Workout – Recovery and Muscle Repair', 'Effects on Performance and Endurance', 'Personalized Recommendations Based on Your Goals'],
    closing: 'Choose the Right Sauna Timing for You'
  },
  {
    slug: 'sauna-benefits-for-athletes',
    title: 'Sauna Benefits for Athletes – Performance and Recovery',
    description: 'Discover the specific sauna benefits for athletes including enhanced recovery, improved endurance, reduced muscle soreness, and better sleep.',
    h1: 'Sauna Benefits for Athletes',
    h2s: ['Enhanced Recovery After Intense Training', 'Improved Endurance and Heat Acclimation', 'Reduced Muscle Soreness and Inflammation', 'Better Sleep and Stress Management for Athletes'],
    closing: 'Elevate Your Athletic Performance With Sauna'
  },
  {
    slug: 'sauna-for-athletes',
    title: 'Sauna for Athletes – Performance Enhancement Guide',
    description: 'Learn how sauna bathing benefits athletes of all levels. Discover protocols for recovery, heat acclimation, and performance optimization.',
    h1: 'Sauna for Athletes',
    h2s: ['Heat Acclimation Training for Athletes', 'Post-Training Recovery Protocols', 'Growth Hormone and Recovery Optimization', 'Integrating Sauna Into Your Training Regimen'],
    closing: 'Train Smarter With Sauna'
  },
  {
    slug: 'sauna-for-sports',
    title: 'Sauna for Sports – Enhancing Athletic Performance',
    description: 'Discover how sauna bathing can enhance sports performance through improved recovery, heat tolerance, and cardiovascular conditioning.',
    h1: 'Sauna for Sports',
    h2s: ['Cardiovascular Conditioning Through Heat Exposure', 'Improved Recovery Between Training Sessions', 'Enhanced Mental Toughness and Focus', 'Sport-Specific Sauna Protocols'],
    closing: 'Improve Your Sports Performance With Sauna'
  },
  {
    slug: 'sauna-benefits-weight-loss',
    title: 'Sauna Benefits for Weight Loss – Metabolism and Detox',
    description: 'Discover how sauna bathing can support weight loss goals through calorie burning, water weight loss, detoxification, and improved metabolism.',
    h1: 'Sauna Benefits for Weight Loss',
    h2s: ['Calorie Expenditure During Sauna Sessions', 'Water Weight and Temporary Weight Loss', 'Detoxification and Metabolic Support', 'Combining Sauna with Exercise for Weight Management'],
    closing: 'Support Your Weight Loss Journey With Sauna'
  },

  // ===== HOW TO SAUNA / GUIDES =====
  {
    slug: 'how-long-should-you-stay-in-a-sauna',
    title: 'How Long Should You Stay in a Sauna? – Duration Guide',
    description: 'Find out how long you should stay in a sauna for optimal benefits. Learn about recommended session durations for beginners and experienced users.',
    h1: 'How Long Should You Stay in a Sauna?',
    h2s: ['General Guidelines for Sauna Session Duration', 'Beginner Recommendations', 'Advanced Users and Extended Sessions', 'Listening to Your Body – Signs to Leave the Sauna'],
    closing: 'Find Your Ideal Sauna Session Duration'
  },
  {
    slug: 'how-to-use-a-sauna',
    title: 'How to Use a Sauna – Complete Beginner Guide',
    description: 'Learn how to use a sauna properly with this complete beginner guide. From preparation to cool-down, master the art of sauna bathing.',
    h1: 'How to Use a Sauna',
    h2s: ['Preparing for Your Sauna Session', 'Step-by-Step Sauna Bathing Guide', 'Cooling Down and Post-Sauna Care', 'Common Mistakes to Avoid'],
    closing: 'Master the Art of Sauna Bathing'
  },
  {
    slug: 'sauna-best-practices',
    title: 'Sauna Best Practices – Tips for Optimal Sessions',
    description: 'Discover sauna best practices for safe and effective sessions. Learn about preparation, hydration, timing, and post-sauna care.',
    h1: 'Sauna Best Practices',
    h2s: ['Preparation and Hydration', 'Session Structure and Timing', 'Cooling Down and Rest Periods', 'Post-Sauna Nutrition and Self-Care'],
    closing: 'Follow Sauna Best Practices for Optimal Results'
  },
  {
    slug: 'sauna-guide',
    title: 'Sauna Guide – Everything You Need to Know',
    description: 'A comprehensive sauna guide covering types of saunas, health benefits, safety tips, and how to incorporate sauna into your wellness routine.',
    h1: 'Sauna Guide',
    h2s: ['Getting Started With Sauna Bathing', 'Understanding Different Sauna Types', 'Health Benefits and Scientific Research', 'Safety Guidelines and Best Practices'],
    closing: 'Start Your Sauna Journey Today'
  },
  {
    slug: 'sauna-protocol',
    title: 'Sauna Protocol – Structured Approach to Sauna Bathing',
    description: 'Learn about sauna protocol including optimal session structure, cooling breaks, hydration, and how to progress for maximum benefits.',
    h1: 'Sauna Protocol',
    h2s: ['The Traditional Finnish Sauna Protocol', 'Structuring Your Sauna Session', 'Hydration and Nutrition Around Sauna', 'Advanced Protocols for Experienced Users'],
    closing: 'Develop Your Personal Sauna Protocol'
  },
  {
    slug: 'sauna-routine',
    title: 'Sauna Routine – Building a Consistent Practice',
    description: 'Learn how to build a sustainable sauna routine that fits your lifestyle. Discover the benefits of regular sauna bathing and how to stay consistent.',
    h1: 'Sauna Routine',
    h2s: ['Why Consistency Matters in Sauna Practice', 'Building a Weekly Sauna Schedule', 'Combining Sauna with Other Wellness Practices', 'Tracking Your Progress and Adjusting Your Routine'],
    closing: 'Build a Sustainable Sauna Routine'
  },
  {
    slug: 'sauna-safety',
    title: 'Sauna Safety – Guidelines for Safe Sauna Bathing',
    description: 'Learn important sauna safety guidelines including hydration, temperature limits, session duration, and when to avoid sauna use.',
    h1: 'Sauna Safety',
    h2s: ['Hydration and Electrolyte Balance', 'Temperature and Time Limits', 'Who Should Avoid Sauna or Seek Medical Advice', 'Signs of Overheating and When to Stop'],
    closing: 'Sauna Safely and Confidently'
  },
  {
    slug: 'sauna-session',
    title: 'Sauna Session – What to Expect and How to Prepare',
    description: 'Learn what to expect during a sauna session. From preparation to the experience itself, discover how to make the most of your time in the sauna.',
    h1: 'Sauna Session',
    h2s: ['Preparing for Your Sauna Session', 'What Happens During a Sauna Session', 'The Stages of a Complete Session', 'Post-Sauna Practices for Maximum Benefit'],
    closing: 'Make Every Sauna Session Count'
  },
  {
    slug: 'sauna-tips',
    title: 'Sauna Tips – Expert Advice for Better Sauna Sessions',
    description: 'Get expert sauna tips for improving your sessions. From preparation to relaxation, discover how to enhance your sauna experience.',
    h1: 'Sauna Tips',
    h2s: ['Preparation Tips for the Best Sauna Experience', 'During-Session Tips for Comfort and Safety', 'Post-Sauna Tips for Maximum Benefits', 'Long-Term Tips for Building Your Sauna Practice'],
    closing: 'Apply These Sauna Tips for a Better Experience'
  },
  {
    slug: 'sauna-temperature',
    title: 'Sauna Temperature – Optimal Heat Levels Guide',
    description: 'Learn about optimal sauna temperature ranges for different sauna types. Find the best heat level for health benefits and comfort.',
    h1: 'Sauna Temperature',
    h2s: ['Traditional Sauna Temperature Recommendations', 'Infrared Sauna Temperature Guidelines', 'Factors Influencing Perceived Heat', 'Adjusting Temperature for Comfort and Safety'],
    closing: 'Find Your Perfect Sauna Temperature'
  },

  // ===== LIFESTYLE =====
  {
    slug: 'home-sauna',
    title: 'Home Sauna – Your Personal Wellness Space',
    description: 'Discover everything about home saunas including types, installation considerations, costs, and how to create your personal wellness retreat.',
    h1: 'Home Sauna',
    h2s: ['Types of Home Saunas Available', 'Space Requirements and Installation', 'Cost Considerations for Home Saunas', 'Benefits of Having a Home Sauna'],
    closing: 'Create Your Home Sauna Sanctuary'
  },
  {
    slug: 'home-sauna-ideas',
    title: 'Home Sauna Ideas – Design and Inspiration',
    description: 'Explore creative home sauna ideas for design, layout, and style. Get inspired to create the perfect sauna space in your home.',
    h1: 'Home Sauna Ideas',
    h2s: ['Indoor Sauna Design Ideas', 'Outdoor Sauna Placement and Design', 'Small Space Sauna Solutions', 'Luxury Sauna Features and Upgrades'],
    closing: 'Design Your Dream Home Sauna'
  },
  {
    slug: 'public-sauna',
    title: 'Public Sauna – Community Bathing and Social Wellness',
    description: 'Learn about public saunas, their cultural significance, etiquette, and how to find and enjoy public sauna facilities near you.',
    h1: 'Public Sauna',
    h2s: ['The Culture of Public Sauna Bathing', 'Public Sauna Etiquette and Customs', 'Types of Public Sauna Facilities', 'Health and Safety in Public Saunas'],
    closing: 'Explore the Public Sauna Experience'
  },
  {
    slug: 'sauna-accessories',
    title: 'Sauna Accessories – Essential Gear for Your Sessions',
    description: 'Discover essential sauna accessories including buckets and ladles, sauna hats, aroma oils, thermometers, and other must-have sauna gear.',
    h1: 'Sauna Accessories',
    h2s: ['Traditional Finnish Sauna Accessories', 'Sauna Buckets, Ladles and Water Management', 'Sauna Hats and Protection Accessories', 'Aroma Oils and Sauna Scents', 'Thermometers, Timers and Sauna Gadgets'],
    closing: 'Equip Your Sauna With Essential Accessories'
  },
  {
    slug: 'sauna-decor',
    title: 'Sauna Decor – Creating the Perfect Sauna Ambiance',
    description: 'Discover sauna decor ideas to create a relaxing and inviting sauna space. From lighting to materials, design your ideal sauna retreat.',
    h1: 'Sauna Decor',
    h2s: ['Natural Materials in Sauna Design', 'Lighting for Sauna Ambiance', 'Seating and Layout Considerations', 'Decorative Elements and Personal Touches'],
    closing: 'Design Your Perfect Sauna Space'
  },
  {
    slug: 'sauna-humor',
    title: 'Sauna Humor – Funny Sauna Jokes and Sayings',
    description: 'Enjoy the lighter side of sauna culture with sauna humor. Discover funny sauna jokes, sayings, and the unique wit of sauna enthusiasts.',
    h1: 'Sauna Humor',
    h2s: ['Classic Sauna Jokes and One-Liners', 'Finnish Sauna Humor and Wit', 'Sauna Memes and Internet Culture', 'Sharing Sauna Humor With Fellow Enthusiasts'],
    closing: 'Share a Laugh About Sauna'
  },
  {
    slug: 'sauna-culture',
    title: 'Sauna Culture – Global Traditions and Practices',
    description: 'Explore sauna culture around the world. From Finnish traditions to modern wellness practices, discover how different cultures embrace sauna bathing.',
    h1: 'Sauna Culture',
    h2s: ['Finnish Sauna Culture and Traditions', 'Sauna Culture in Other Nordic Countries', 'The Global Spread of Sauna Bathing', 'Modern Sauna Culture and Wellness Trends'],
    closing: 'Explore Global Sauna Culture'
  },
  {
    slug: 'sauna-essentials',
    title: 'Sauna Essentials – Must-Have Items for Every Bather',
    description: 'Discover sauna essentials that every sauna enthusiast needs. From towels and seating pads to aromatherapy and hydration tools.',
    h1: 'Sauna Essentials',
    h2s: ['Basic Sauna Gear and Equipment', 'Comfort and Hygiene Essentials', 'Aromatherapy and Wellness Additions', 'Sauna Essentials for Beginners'],
    closing: 'Stock Your Sauna With Essentials'
  },
  {
    slug: 'sauna-gifts',
    title: 'Sauna Gifts – Perfect Presents for Sauna Lovers',
    description: 'Find the best sauna gifts for sauna enthusiasts. From accessories and apparel to books and wellness products, discover thoughtful presents.',
    h1: 'Sauna Gifts',
    h2s: ['Sauna Accessory Gift Ideas', 'Sauna-Themed Apparel and Merchandise', 'Wellness and Relaxation Gifts', 'Gifts for Every Budget and Occasion'],
    closing: 'Find the Perfect Sauna Gift'
  },
  {
    slug: 'sauna-whisk',
    title: 'Sauna Whisk – Traditional Sauna Massage Tool (Vasta/Vihta)',
    description: 'Learn about the sauna whisk (vasta or vihta), a traditional Finnish bundle of birch branches used for gentle massage and aromatherapy during sauna sessions.',
    h1: 'Sauna Whisk – Vasta and Vihta',
    h2s: ['What Is a Sauna Whisk?', 'The Tradition of Using Birch Whisk in Sauna', 'Health Benefits of Sauna Whisk Massage', 'How to Make and Care for Your Sauna Whisk'],
    closing: 'Experience the Traditional Sauna Whisk'
  },

  // ===== SAUNA & COLD PLUNGE =====
  {
    slug: 'sauna-and-cold-plunge',
    title: 'Sauna and Cold Plunge – The Ultimate Contrast Therapy',
    description: 'Discover the benefits of combining sauna and cold plunge. Learn about contrast therapy, its health benefits, and how to practice it safely.',
    h1: 'Sauna and Cold Plunge',
    h2s: ['The History of Contrast Therapy', 'Health Benefits of Hot-Cold Contrast', 'How to Combine Sauna and Cold Plunge Safely', 'Finding Your Optimal Contrast Therapy Routine'],
    closing: 'Try Sauna and Cold Plunge Therapy'
  },
  {
    slug: 'sauna-and-plunge',
    title: 'Sauna and Plunge – Hot and Cold Therapy Benefits',
    description: 'Explore the benefits of alternating between sauna and cold plunge. Learn how this ancient practice enhances circulation, recovery, and mental resilience.',
    h1: 'Sauna and Plunge',
    h2s: ['Circulatory Benefits of Hot-Cold Therapy', 'Enhanced Recovery Through Contrast Therapy', 'Mental Health and Resilience Benefits', 'Building a Sauna and Plunge Routine'],
    closing: 'Experience the Power of Contrast Therapy'
  },
  {
    slug: 'sauna-research',
    title: 'Sauna Research – Latest Scientific Studies and Findings',
    description: 'Stay updated on the latest sauna research from leading institutions. Explore peer-reviewed studies on sauna health benefits and physiological effects.',
    h1: 'Sauna Research',
    h2s: ['Landmark Studies in Sauna Research', 'Recent Findings on Cardiovascular Benefits', 'Emerging Research on Cognitive Health', 'Future Directions in Sauna Science'],
    closing: 'Stay Informed About Sauna Research'
  }
];

// ============================================================
// CONTENT GENERATION FUNCTIONS
// ============================================================

function getRandomImage() {
  return images[Math.floor(Math.random() * images.length)];
}

function generateIntro(h1) {
  return `<p><strong>${h1}</strong> is a topic of growing interest as more people discover the remarkable health benefits of regular sauna bathing. This page provides a comprehensive overview based on scientific research, traditional knowledge, and practical experience. Whether you are new to sauna bathing or looking to deepen your understanding, this guide will give you valuable insights into this ancient wellness practice.</p>

<p>Sauna bathing has been an integral part of Finnish culture for thousands of years, and modern scientific research has confirmed what generations of sauna enthusiasts have known intuitively: that regular time in the heat offers profound benefits for both body and mind. From improved cardiovascular function to enhanced mental clarity, the evidence continues to grow.</p>

<p>On this page, we explore the key aspects of ${h1.toLowerCase()}, drawing from peer-reviewed studies, traditional Finnish sauna wisdom, and practical recommendations from experienced bathers. Our goal is to provide you with accurate, useful, and actionable information that enhances your sauna journey.</p>`;
}

function generateH2Content(h2Title) {
  return `<p>When it comes to <strong>${h2Title.toLowerCase()}</strong>, there is much to explore and understand. This aspect of sauna practice combines traditional knowledge with modern scientific understanding, offering insights that can enhance your sauna experience and health outcomes. Whether you are just beginning your sauna journey or have been practicing for years, paying attention to this area can make a meaningful difference.</p>

<p>Research has shown that consistent attention to this aspect of sauna bathing yields the best results. By understanding the principles behind it and applying them consistently, you can maximize the benefits you receive from your sauna practice while minimizing any potential risks. As with any wellness practice, knowledge and mindful application are the keys to success.</p>`;
}

function generateClosing(h1) {
  return `<p>We hope this comprehensive guide to <strong>${h1}</strong> has been informative and helpful. The practice of sauna bathing offers a wealth of benefits that can enhance your health, wellbeing, and quality of life. Whether you are drawn to sauna for its cardiovascular benefits, stress reduction properties, or simply as a space for relaxation and reflection, regular practice can transform your wellness journey.</p>

<p>Remember that consistency is key when it comes to sauna bathing. Like any health practice, the benefits accumulate over time with regular use. Start slowly, listen to your body, and gradually build a practice that works for your lifestyle and preferences. The sauna is a forgiving teacher — it rewards patience and respect.</p>

<p>Thank you for visiting Sauna Research Studies. We are dedicated to bringing you the most accurate and useful information about sauna health benefits. Explore our other pages to continue learning about the science and practice of sauna bathing.</p>`;
}

// ============================================================
// HTML TEMPLATE
// ============================================================

function generatePageContent(slug, title, description, h1, h2s, closing) {
  const heroImg = getRandomImage();
  const introP = generateIntro(h1);
  const closingP = generateClosing(h1);

  let h2Sections = '';
  h2s.forEach(function(h2, index) {
    // Insert a random image before the 3rd H2 section (index 2)
    if (index === 2) {
      var midImg = getRandomImage();
      h2Sections += `
        <img class="featured-image"
             src="assets/images/${midImg}"
             alt="${h2}"
             onerror="this.style.display='none'">
        <p class="image-caption">${h2} — an important aspect of sauna practice supported by research.</p>`;
    }
    h2Sections += `
        <h2>${h2}</h2>
        ${generateH2Content(h2)}`;
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>

  <!-- Header placeholder -->
  <div id="header-placeholder"></div>

  <!-- ====== HERO ====== -->
  <div class="page-hero">
    <img class="hero-bg"
         src="assets/images/${heroImg}"
         alt="${h1}"
         onerror="this.style.display='none'">
    <div class="hero-overlay">
      <div class="hero-category">Evidence-Based Research</div>
      <h1 class="hero-title"><a href="index.html">${h1}</a></h1>
      <p class="hero-description">${description}</p>
    </div>
  </div>

  <!-- ====== BREADCRUMB ====== -->
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <a href="index.html">Home</a><span>›</span>
    ${h1}
  </nav>

  <!-- ====== MAIN LAYOUT ====== -->
  <div class="layout">

    <!-- ====== MAIN CONTENT ====== -->
    <main class="content-main">

      ${introP}

      ${h2Sections}

      <h2>${closing}</h2>

      ${closingP}

    </main>

    <!-- ====== SIDEBAR ====== -->
    <aside class="sidebar">

      <div class="sidebar-card">
        <h4>About This Page</h4>
        <p>Learn more about ${h1.toLowerCase()}. This guide draws from peer-reviewed research, traditional Finnish sauna wisdom, and practical experience to provide accurate and useful information.</p>
      </div>

      <div class="sidebar-card">
        <h4>Related Topics</h4>
        <ul class="category-list">
          <li><a href="sauna-benefits.html">Sauna Benefits <span class="count">Guide</span></a></li>
          <li><a href="sauna-health-benefits.html">Health Benefits <span class="count">Guide</span></a></li>
          <li><a href="sauna-guide.html">Sauna Guide <span class="count">Guide</span></a></li>
          <li><a href="sauna-safety.html">Sauna Safety <span class="count">Guide</span></a></li>
          <li><a href="sauna-research.html">Sauna Research <span class="count">Studies</span></a></li>
        </ul>
      </div>

      <div class="sidebar-card">
        <h4>Stay Informed</h4>
        <p style="font-size:.85rem;margin-bottom:12px;">Get the latest sauna research summaries delivered to your inbox.</p>
        <div class="newsletter-form">
          <input type="email" placeholder="your@email.com" />
          <button>Subscribe Free</button>
        </div>
      </div>

    </aside>

  </div><!-- /layout -->

  <!-- Footer placeholder -->
  <div id="footer-placeholder"></div>

  <!-- Scripts -->
  <script src="assets/js/include.js"></script>
</body>
</html>`;
}

// ============================================================
// GENERATE PAGES
// ============================================================

const outputDir = __dirname;

pages.forEach(function(page) {
  const content = generatePageContent(
    page.slug,
    page.title,
    page.description,
    page.h1,
    page.h2s,
    page.closing
  );

  const filePath = path.join(outputDir, page.slug + '.html');
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Generated: ' + page.slug + '.html');
});

console.log('\nDone! Generated ' + pages.length + ' subpages.');