export const courses = [
    {
        id: 'pcos-specialist',
        slug: 'pcos-specialist-certification',
        title: 'PCOS Specialist Certification',
        price: '$1,299',
        duration: '12-Week Program',
        description: 'Comprehensive training in PCOS management and hormonal health protocols. Master the clinical art of reversing Polycystic Ovary Syndrome.',
        curriculum: [
            'PCOS Pathophysiology & Phenotypes',
            'Insulin Resistance & Metabolic Protocols',
            'Advanced Hormonal Testing Interpretation',
            'Therapeutic Meal Planning & Cycle Syncing',
            'Targeted Supplementation Strategies',
            'Real-world Client Case Studies'
        ]
    },
    {
        id: 'gut-health-mastery',
        slug: 'gut-health-mastery',
        title: 'Gut Health Mastery',
        price: '$999',
        duration: '10-Week Program',
        description: 'Advanced training in digestive health, microbiome optimization, and evidence-based protocols for SIBO and IBS.',
        curriculum: [
            'SIBO Protocols & Breath Test Analysis',
            'IBS Management (Low-FODMAP & Beyond)',
            'Elimination Diets & Reintroduction',
            'Probiotic & Prebiotic Therapy',
            'The Gut-Brain Axis Connection'
        ]
    },
    {
        id: 'metabolic-health',
        slug: 'metabolic-health-expert',
        title: 'Metabolic Health Expert',
        price: '$899',
        duration: '8-Week Program',
        description: 'Certification in Diabetes Reversal, Metabolic Syndrome management, and sustainable weight loss strategies.',
        curriculum: [
            'Type 2 Diabetes Reversal Protocols',
            'Metabolic Syndrome Management',
            'Sustainable Weight Loss Mechanics',
            'Continuous Glucose Monitoring (CGM) Mastery',
            'Cardiovascular Health Nutrition'
        ]
    }
];

export const services = [
    {
        id: 'hormonal',
        slug: 'hormonal-health',
        title: 'Hormonal Health & PCOS',
        icon: '🌸',
        description: 'Evidence-based clinical protocols for PCOS reversal, Thyroid optimization, and Fertility.',
        hero_title: 'Reclaim Your Hormonal Balance Naturally',
        problem: {
            heading: 'Understanding the Root Cause',
            content: 'Hormonal imbalances like PCOS, Thyroid issues, and infertility are often symptoms of deeper metabolic dysfunction. Conventional treatments often mask these symptoms with medication, ignoring the root causes such as Insulin Resistance, Chronic Inflammation, and Gut Dysbiosis.'
        },
        approach: {
            heading: 'The Taskeen Protocol for Hormonal Balance',
            points: [
                { title: 'Insulin Sensitization', desc: 'Using low-glycemic, anti-inflammatory nutrition to lower insulin levels and reduce androgen production.' },
                { title: 'Estrogen Metabolism', desc: 'Supporting liver detoxification pathways to clear excess estrogen and improve cycle regularity.' },
                { title: 'Cortisol Regulation', desc: 'Lifestyle and dietary strategies to manage stress hormones that disrupt ovulation and sleep.' }
            ]
        },
        details: [
            'Polycystic Ovary Syndrome (PCOS)',
            'Insulin Resistance & Metabolic Syndrome',
            'Thyroid Disorders (Hashimoto\'s, Hypothyroidism)',
            'Menopause & Perimenopause Management',
            'Hormonal Acne & Hirsutism'
        ],
        faqs: [
            { q: 'Can PCOS be reversed with diet?', a: 'Yes. While there is no "cure", the symptoms of PCOS can be put into remission. By addressing insulin resistance and inflammation through specific nutritional protocols, many women restore regular cycles and fertility.' },
            { q: 'Do I need to go Keto?', a: 'Not necessarily. While lower-carb approaches are often effective, we customize the carbohydrate intake to your specific metabolic type and lifestyle.' }
        ]
    },
    {
        id: 'gut',
        slug: 'gut-health',
        title: 'Gut Health Restoration',
        icon: '🌿',
        description: 'Specialized management for SIBO, IBS, Leaky Gut, and Microbiome dysbiosis.',
        hero_title: 'Heal Your Gut, Heal Your Body',
        problem: {
            heading: 'Beyond "Just IBS"',
            content: 'Digestive distress is not normal. Bloating, gas, and irregular movements are signs of an imbalanced microbiome or functional disorders like SIBO (Small Intestinal Bacterial Overgrowth). Ignoring these can lead to systemic inflammation and autoimmunity.'
        },
        approach: {
            heading: 'Functional Gut Restoration',
            points: [
                { title: 'The 4R Program', desc: 'Remove triggers, Replace enzymes, Reinoculate probiotics, and Repair the gut lining.' },
                { title: 'Microbiome Diversity', desc: 'Introducing specific fibers and polyphenols to feed beneficial bacteria (Akkermansia, Bifidobacteria).' },
                { title: 'Vagus Nerve Support', desc: 'Techniques to activate the parasympathetic state ("Rest and Digest") for optimal motility.' }
            ]
        },
        details: [
            'Small Intestinal Bacterial Overgrowth (SIBO)',
            'Irritable Bowel Syndrome (IBS)',
            'Inflammatory Bowel Disease (IBD)',
            'Leaky Gut & Food Sensitivities',
            'GERD & Acid Reflux'
        ],
        faqs: [
            { q: 'Is the Low-FODMAP diet permanent?', a: 'No. The Low-FODMAP diet is a short-term therapeutic tool (usually 4-6 weeks) to reduce symptoms while we address the root cause. We then guide you through a structured reintroduction phase.' },
            { q: 'How do you test for SIBO?', a: 'We can recommend specific breath tests that measure Hydrogen and Methane gases to diagnose SIBO and determine the best nutritional approach.' }
        ]
    },
    {
        id: 'metabolic',
        slug: 'metabolic-wellness',
        title: 'Metabolic Wellness & Diabetes',
        icon: '💪',
        description: 'Clinically proven strategies for Diabetes Reversal, Weight Management, and Heart Health.',
        hero_title: 'Metabolic Flexibility for Life',
        problem: {
            heading: 'The Metabolic Crisis',
            content: 'Metabolic syndrome is the precursor to most chronic diseases. It manifests as stubborn belly fat, high blood sugar, and fatigue. The solution isn’t just "eating less"—it’s about changing *how* your body fuels itself.'
        },
        approach: {
            heading: 'Metabolic Reset',
            points: [
                { title: 'Blood Sugar Stabilization', desc: 'Flattening glucose spikes to reduce insulin load and enable fat burning.' },
                { title: 'Mitochondrial Health', desc: 'Nutrients that support your cellular "power plants" to boost energy and metabolism.' },
                { title: 'Sustainable Weight Loss', desc: 'Focusing on body composition and muscle preservation, not just the number on the scale.' }
            ]
        },
        details: [
            'Type 2 Diabetes Reversal',
            'Cardiovascular Disease Prevention',
            'Metabolic Syndrome Management',
            'Sustainable Weight Loss',
            'Cholesterol & Lipid Optimization'
        ],
        faqs: [
            { q: 'Can Type 2 Diabetes really be reversed?', a: 'Yes. Clinical evidence shows that significant weight loss and dietary changes can restore normal blood sugar levels without medication in many Type 2 diabetics.' },
            { q: 'Do you use intermittent fasting?', a: 'Fasting is a powerful tool we often utilize, but it is customized to your stress levels, hormonal status, and daily schedule.' }
        ]
    },
    {
        id: 'maternal',
        slug: 'maternal-pediatric',
        title: 'Maternal & Pediatric Nutrition',
        icon: '🤰',
        description: 'Expert care for Gestational Diabetes, Prenatal health, and Pediatric growth.',
        hero_title: 'Nurturing the Next Generation',
        problem: {
            heading: 'Critical Windows of Development',
            content: 'The first 1,000 days (from conception to age 2) determine a child’s lifelong health trajectory. Proper nutrition during this window can prevent chronic disease and optimize cognitive development.'
        },
        approach: {
            heading: 'Developmental Nutrition',
            points: [
                { title: 'Epigenetic programming', desc: 'Optimizing maternal nutrient stores to influence positive gene expression in the baby.' },
                { title: 'GDM Management', desc: 'Strict but sustainable blood sugar control for healthy pregnancy outcomes.' },
                { title: 'Picky Eating Solutions', desc: 'Behavioral and nutritional strategies to expand your child’s palate and ensuring adequate growth.' }
            ]
        },
        details: [
            'Gestational Diabetes Management',
            'Prenatal & Postpartum Nutrition',
            'Breastfeeding Support',
            'Infant Introduction to Solids',
            'Pediatric Growth Optimization'
        ],
        faqs: [
            { q: 'When should I start seeing a nutritionist for pregnancy?', a: 'Ideally, 3-6 months before conception to optimize egg quality and nutrient stores. However, starting at any point during pregnancy is highly beneficial.' }
        ]
    },
    {
        id: 'sports',
        slug: 'sports-performance',
        title: 'Sports Performance Nutrition',
        icon: '🏃',
        description: 'Elite nutrition protocols for athletes, MMA weight cuts, and recovery.',
        hero_title: 'Fuel Your Performance',
        problem: {
            heading: 'The Fine Line of Performance',
            content: 'Elite athletes walk a fine line between peak performance and overtraining. Issues like RED-S (Relative Energy Deficiency in Sport) can derail careers and cause long-term health damage.'
        },
        approach: {
            heading: 'Performance Periodization',
            points: [
                { title: 'Nutrient Timing', desc: 'Strategic carbohydrate and protein intake around training sessions for maximum adaptation.' },
                { title: 'Hydration Strategy', desc: 'Precise fluid and electrolyte protocols to prevent performance decline.' },
                { title: 'Safe Weight Cutting', desc: 'Science-based protocols for combat athletes to make weight without sacrificing power or health.' }
            ]
        },
        details: [
            'Performance Nutrition',
            'Weight Cutting for Combat Sports',
            'RED-S Recovery',
            'Muscle Gain Protocols',
            'Endurance Optimization'
        ],
        faqs: [
            { q: 'Do you work with combat athletes?', a: 'Yes, we specialize in safe weight-cutting protocols for MMA and boxing that preserve muscle mass and performance.' }
        ]
    },
    {
        id: 'clinical',
        slug: 'clinical-mnt',
        title: 'Clinical MNT',
        icon: '🧠',
        description: 'Therapeutic diets for Renal disease, Autoimmune conditions, and Oncology.',
        hero_title: 'Medical Nutrition Therapy',
        problem: {
            heading: 'Complex Conditions Require Precise Care',
            content: 'Chronic conditions like Kidney Disease or Autoimmune disorders require highly specific dietary modifications. Generic advice can be dangerous. We provide medical-grade nutritional management.'
        },
        approach: {
            heading: 'Therapeutic Protocols',
            points: [
                { title: 'Autoimmune Protocol (AIP)', desc: 'Systematic elimination of immune triggers to lower antibodies and reduce flare-ups.' },
                { title: 'Renal Protection', desc: 'Precise management of protein, potassium, and phosphorus to preserve kidney function.' },
                { title: 'Liver Support', desc: 'Nutritional strategies to reduce fatty liver deposits and support detoxification enzymes.' }
            ]
        },
        details: [
            'Renal Disease Management (CKD)',
            'Autoimmune Protocol (AIP)',
            'Fatty Liver (NAFLD) Reversal',
            'Cancer Nutrition Support',
            'Hypertension (DASH Diet)'
        ],
        faqs: [
            { q: 'Do you work with doctors?', a: 'Absolutely. We view ourselves as part of your healthcare team and are happy to coordinate with your nephrologist, endocrinologist, or oncologist.' }
        ]
    }
];

export const sessions = [
    {
        id: 'initial',
        slug: 'initial-consultation',
        title: 'Initial Consultation',
        price: '$99',
        description: '60-minute comprehensive health assessment. We dive deep into your history, labs, and lifestyle to build your roadmap.',
        features: ['Complete health history analysis', 'Review of recent bloodwork', 'Goal setting & expectation management', 'Initial dietary direction']
    },
    {
        id: 'followup',
        slug: 'follow-up-session',
        title: 'Follow-Up Session',
        price: '$79',
        description: '30-minute progress review. Accountability, problem-solving, and protocol progression.',
        features: ['Progress tracking (Weight, measurements, symptoms)', 'Protocol adjustments based on biofeedback', 'Meal plan updates', 'Q&A support']
    },
    {
        id: 'lab',
        slug: 'lab-interpretation',
        title: 'Lab Interpretation',
        price: '$149',
        description: '45-minute deep-dive into your functional blood chemistry. Understand what "normal" vs "optimal" means.',
        features: ['Comprehensive biomarker review', 'Identification of functional imbalances', 'Targeted supplement recommendations', 'Letter to GP if needed']
    },
    {
        id: 'transformation',
        slug: 'transformation-package',
        title: 'Transformation Package',
        price: '$599',
        description: 'The Gold Standard. A completely guided 12-week journey to transform your metabolic and hormonal health.',
        features: [
            '1 Initial consultation (60 min)',
            '6 Follow-up sessions (30 min each)',
            'Personalized Meal Plans & Recipes',
            'Direct Email/WhatsApp Support',
            'Supplement & Lifestyle Protocol'
        ]
    },
    {
        id: 'starter',
        slug: 'starter-package',
        title: 'Starter Package',
        price: '$249',
        description: 'Perfect for getting started. A 4-week kickstart to reset your habits and understanding.',
        features: [
            '1 Initial consultation (60 min)',
            '2 Follow-up sessions (30 min each)',
            'Personalized Meal Plan',
            'Email support'
        ]
    }
];

export const locations = [
    {
        country: 'pakistan',
        cities: [
            // PUNJAB
            { slug: 'lahore', name: 'Lahore', province: 'Punjab', landmarks: ['Badshahi Mosque', 'Lahore Fort', 'Liberty Market', 'MM Alam Road', 'DHA Phase 1-9', 'Emporium Mall', 'Wagah Border'] },
            { slug: 'faisalabad', name: 'Faisalabad', province: 'Punjab', landmarks: ['Clock Tower (Ghanta Ghar)', '8 Bazaars', 'D-Ground', 'Kohinoor City', 'University of Agriculture', 'Gatwala Park'] },
            { slug: 'rawalpindi', name: 'Rawalpindi', province: 'Punjab', landmarks: ['GHQ', 'Raja Bazaar', 'Saddar Bank Road', 'Bahria Town (Phase 1-8)', 'Ayub National Park'] },
            { slug: 'multan', name: 'Multan', province: 'Punjab', landmarks: ['Multan Fort (Qila)', 'Tomb of Shah Rukn-e-Alam', 'Hussain Agahi Bazaar', 'Multan Cantt', 'DHA Multan'] },
            { slug: 'gujranwala', name: 'Gujranwala', province: 'Punjab', landmarks: ['Jinnah Stadium', 'Satellite Town', 'Old City (Rail Bazaar)', 'Citi Housing', 'Pehlwanadi'] },
            { slug: 'sialkot', name: 'Sialkot', province: 'Punjab', landmarks: ['Iqbal Manzil', 'Sialkot Cantt', 'Clock Tower', 'Sialkot Dry Port', 'Head Marala'] },
            { slug: 'bahawalpur', name: 'Bahawalpur', province: 'Punjab', landmarks: ['Noor Mahal', 'Darbar Mahal', 'Derawar Fort', 'Sadiq Public School', 'Lal Suhanra Park'] },
            { slug: 'sargodha', name: 'Sargodha', province: 'Punjab', landmarks: ['PAF Base Mushaf', 'Kirana Hills', 'Company Bagh', 'University Road', 'Remount Depot'] },
            { slug: 'sahiwal', name: 'Sahiwal', province: 'Punjab', landmarks: ['Harappa Archaeological Ruins', 'Zafar Ali Stadium', 'High Street'] },
            { slug: 'rahim-yar-khan', name: 'Rahim Yar Khan', province: 'Punjab', landmarks: ['Bhong Mosque', 'Sheikh Zayed Palace', 'Fauji Fertilizer Plant', 'Desert Rangers HQ'] },
            { slug: 'gujrat', name: 'Gujrat', province: 'Punjab', landmarks: ['Kinara River Chenab', 'Fan Industry Zone', 'University of Gujrat', 'Shah Daula Shrine'] },
            { slug: 'jhelum', name: 'Jhelum', province: 'Punjab', landmarks: ['Rohtas Fort', 'Mangla Dam Viewpoint', 'CMH Jhelum', 'Major Akram Shaheed Memorial'] },

            // SINDH
            { slug: 'karachi', name: 'Karachi', province: 'Sindh', landmarks: ['Mazar-e-Quaid', 'Clifton (Sea View)', 'I.I. Chundrigar Road', 'Saddar (Empress Market)', 'Port Qasim'] },
            { slug: 'hyderabad', name: 'Hyderabad', province: 'Sindh', landmarks: ['Pacco Qillo', 'Rani Bagh', 'Resham Gali', 'Auto Bahn Road', 'Sindh Museum'] },
            { slug: 'sukkur', name: 'Sukkur', province: 'Sindh', landmarks: ['Sukkur Barrage', 'Lansdowne Bridge', 'Masoom Shah Jo Minaro', 'Lab-e-Mehran', 'Sadh Belo'] },
            { slug: 'larkana', name: 'Larkana', province: 'Sindh', landmarks: ['Mohenjo-daro', 'Garhi Khuda Bakhsh', 'Shahi Bazaar', 'Rice Canal'] },
            { slug: 'nawabshah', name: 'Nawabshah', province: 'Sindh', landmarks: ['Quaid-e-Awam University', 'Kachehri Road', 'Sakrand Training Center', 'Nawabshah Airport'] },
            { slug: 'mirpurkhas', name: 'Mirpurkhas', province: 'Sindh', landmarks: ['Chittoori Graveyard', 'Market Chowk', 'Mango Research Station', 'Gamma Stadium'] },
            { slug: 'khairpur', name: 'Khairpur', province: 'Sindh', landmarks: ['Faiz Mahal', 'Kot Diji Fort', 'Sachal Sarmast Shrine', 'Date Palm Orchards'] },
            { slug: 'thatta', name: 'Thatta', province: 'Sindh', landmarks: ['Makli Necropolis', 'Shah Jahan Mosque', 'Keenjhar Lake', 'Bhambhore Ruins'] },
            { slug: 'shikarpur', name: 'Shikarpur', province: 'Sindh', landmarks: ['Shahi Bagh', 'Covered Market (Dhuk Bazaar)', 'Old Havelis', 'Lakhi Dar'] },
            { slug: 'jacobabad', name: 'Jacobabad', province: 'Sindh', landmarks: ['Victoria Tower', 'American Airbase (Shahbaz)', 'DC Office', 'Cattle Market'] },
            { slug: 'badin', name: 'Badin', province: 'Sindh', landmarks: ['Oil Fields', 'Zero Point', 'Sugar Mills', 'Cantt Area'] },

            // KHYBER PAKHTUNKHWA
            { slug: 'peshawar', name: 'Peshawar', province: 'KP', landmarks: ['Qissa Khwani Bazaar', 'Bala Hissar Fort', 'Mahabat Khan Mosque', 'Hayatabad', 'Islamia College'] },
            { slug: 'abbottabad', name: 'Abbottabad', province: 'KP', landmarks: ['Ilyasi Masjid', 'PMA Kakul', 'Thandiani', 'Shimla Hill', 'Jinnah Road'] },
            { slug: 'mardan', name: 'Mardan', province: 'KP', landmarks: ['Takht-i-Bahi', 'Guides Infantry Memorial', 'Abdul Wali Khan University'] },
            { slug: 'swat', name: 'Swat (Mingora)', province: 'KP', landmarks: ['Malam Jabba', 'Fizagat Park', 'White Palace Marghazar', 'Green Chowk', 'Saidu Sharif'] },
            { slug: 'kohat', name: 'Kohat', province: 'KP', landmarks: ['Kohat Tunnel', 'Tanda Dam', 'KDA Town', 'Kohat Cantt', 'Company Bagh'] },
            { slug: 'di-khan', name: 'D.I. Khan', province: 'KP', landmarks: ['River Indus Promenade', 'Gomal University', 'Topanwala Chowk', 'Bilot Fort'] },
            { slug: 'nowshera', name: 'Nowshera', province: 'KP', landmarks: ['Nowshera Cantt', 'ASC Centre', 'Risalpur (PAF Academy)', 'Kabul River Bank'] },
            { slug: 'mansehra', name: 'Mansehra', province: 'KP', landmarks: ['Ashoka Rocks Edicts', 'Hazara University', 'Gateway to Kaghan/Naran', 'Batra'] },
            { slug: 'bannu', name: 'Bannu', province: 'KP', landmarks: ['Bannu Woollen Mills', 'Pre-Historic Akra Mounds', 'Cantt Park', 'University of Science & Tech'] },
            { slug: 'haripur', name: 'Haripur', province: 'KP', landmarks: ["Tarbela Dam (World's largest)", 'Khanpur Dam', 'Hattar Industrial Estate'] },
            { slug: 'swabi', name: 'Swabi', province: 'KP', landmarks: ['GIKI', 'Tarbela Lake View', 'Captain Karnal Sher Khan Tomb'] },

            // BALOCHISTAN
            { slug: 'quetta', name: 'Quetta', province: 'Balochistan', landmarks: ['Hanna Lake', 'Liaquat Bazaar', 'Hazarganji Chiltan Park', 'Staff College', 'Askari Park'] },
            { slug: 'gwadar', name: 'Gwadar', province: 'Balochistan', landmarks: ['Gwadar Deep Sea Port', 'Koh-e-Batil', 'PC Gwadar', 'Cricket Stadium'] },
            { slug: 'turbat', name: 'Turbat', province: 'Balochistan', landmarks: ['Punnu Fort', 'Koh-e-Murad', 'Mirani Dam', 'University of Turbat'] },
            { slug: 'khuzdar', name: 'Khuzdar', province: 'Balochistan', landmarks: ['Khuzdar Engineering University', 'Chamrok', 'Moola Chotok'] },
            { slug: 'hub', name: 'Hub', province: 'Balochistan', landmarks: ['Hub Industrial Estate', 'Hub Dam', 'Gadani Shipbreaking Yard'] },
            { slug: 'chaman', name: 'Chaman', province: 'Balochistan', landmarks: ['Friendship Gate (Afghan Border)', 'Khojak Pass', 'Railway Station'] },
            { slug: 'sibi', name: 'Sibi', province: 'Balochistan', landmarks: ['Jirga Hall', 'Sibi Mela Ground', 'Victoria Memorial Hall', 'Nari River'] },
            { slug: 'ziarat', name: 'Ziarat', province: 'Balochistan', landmarks: ['Quaid-e-Azam Residency', 'Juniper Forest', 'Prospect Point', 'Kharwari Baba Shrine'] },
            { slug: 'loralai', name: 'Loralai', province: 'Balochistan', landmarks: ['Loralai Cantt', 'Pathankot', 'University of Loralai'] },
            { slug: 'zhob', name: 'Zhob', province: 'Balochistan', landmarks: ['Fort Sandeman', 'Zhob River', 'Takht-e-Sulaiman'] },
            { slug: 'kalat', name: 'Kalat', province: 'Balochistan', landmarks: ['Kalat Palace', 'Kali Devi Temple', 'Harboi Hills'] },

            // NORTHERN REGIONS (AJK & GB)
            { slug: 'muzaffarabad', name: 'Muzaffarabad', province: 'AJK', landmarks: ['Red Fort', 'Pir Chinasi', 'Domel', 'PC Muzaffarabad'] },
            { slug: 'mirpur', name: 'Mirpur', province: 'AJK', landmarks: ['Mangla Dam', 'Ramkot Fort', 'Khari Sharif', 'Sector F'] },
            { slug: 'rawalakot', name: 'Rawalakot', province: 'AJK (Poonch)', landmarks: ['Banjosa Lake', 'Toli Pir', 'Poonch University', 'Dreamland Park'] },
            { slug: 'kotli', name: 'Kotli', province: 'AJK', landmarks: ['Tattapani (Hot Springs)', 'Gulpur Hydropower', 'Khoiratta'] },
            { slug: 'bagh', name: 'Bagh', province: 'AJK', landmarks: ['Ganga Choti', 'Las Danna', 'Sudhan Gali', 'Bagh City Center'] },
            { slug: 'gilgit', name: 'Gilgit', province: 'GB', landmarks: ['NLI Market', 'Gilgit Airport', 'Kargah Buddha', 'Konodas Bridge', 'Danyore Suspension Bridge'] },
            { slug: 'skardu', name: 'Skardu', province: 'GB', landmarks: ['Shangrila Resort', 'Upper Kachura Lake', 'Cold Desert', 'Deosai Plains', 'Sadpara Lake'] },
            { slug: 'hunza', name: 'Hunza (Karimabad)', province: 'GB', landmarks: ['Baltit Fort', 'Altit Fort', 'Attabad Lake', 'Eagle\'s Nest Viewpoint', 'Passu Cones'] },
            { slug: 'chilas', name: 'Chilas', province: 'GB (Diamer)', landmarks: ['Nanga Parbat View Point', 'Rock Carvings', 'Karakoram Highway Hub'] },
            { slug: 'astore', name: 'Astore', province: 'GB', landmarks: ['Rama Meadows', 'Rama Lake', 'Deosai Plains'] }
        ]
    },
    {
        country: 'uae',
        cities: [
            {
                slug: 'dubai',
                name: 'Dubai',
                desc: 'World-class nutritional therapy for the global citizens of Dubai. Navigating the luxury dining scene while staying healthy.',
                local_focus: 'Vitamin D optimization, combating sedentary indoor lifestyles, and corporate wellness.',
                address: 'Downtown Dubai, UAE'
            },
            {
                slug: 'abu-dhabi',
                name: 'Abu Dhabi',
                desc: 'Capital-grade healthcare standards. Focusing on long-term disease prevention and family health.',
                local_focus: 'Metabolic syndrome management and pediatric nutrition.',
                address: 'Corniche Road, Abu Dhabi'
            },
            { slug: 'sharjah', name: 'Sharjah', desc: 'Family-centered nutritional care.', local_focus: 'Cultural food modification.', address: 'Al Majaz, Sharjah' }
        ]
    },
    {
        country: 'global',
        cities: [
            {
                slug: 'online',
                name: 'Online (Worldwide)',
                desc: 'Access expert care from anywhere. Our secure telehealth platform brings Dr. Sehar to your living room.',
                local_focus: 'Time-zone flexible consultations and digital protocol delivery.',
                address: 'Zoom / Telehealth'
            }
        ]
    }
];
