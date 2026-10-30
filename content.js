/* =====================================================================
   CONTENT FILE — this is the ONLY file you need to edit to change text.
   - Change words between the quotes "like this".
   - Do not delete commas, brackets [ ] or braces { }.
   - To add a project, copy one whole { ... } block inside "projects"
     (including its comma) and change the words.
   ===================================================================== */

const CONTENT = {
  // ---------- Basic info ----------
  name: "Ardha Rajashekar Reddy",
  role: "Software Engineer Intern",
  eyebrow: "CSE (Data Science) · Hyderabad, India",
  tagline:
    "B.Tech CSE (Data Science) graduate and Software Engineer Intern who builds AI-driven backend systems in Python.",
  photo: "assets/photo.jpg",
  resume: "assets/Rajashekar_Reddy_Resume.pdf",

  // ---------- About ----------
  about: [
    "I'm Rajashekar, a B.Tech graduate in Computer Science and Engineering (Data Science) from Hyderabad. I work as a Software Engineer Intern at Ecliptz Labs, where I design MySQL database schemas, build and test secure API endpoints, and manage backend data flow for AI products.",
    "I enjoy turning data into practical tools. I built FinAdvisor AI, which recommends suitable loan options by calculating risk from a user's financial details. I also built CrowdGuard, a real-time computer vision system that counts people in video feeds and sends alerts when crowds cross a safety limit.",
    "My core skills are Python, SQL, and machine learning with Pandas, NumPy, and Scikit-Learn, and I'm growing into AI agents and cloud with AWS. Outside of code, I run a fashion and apparel account on Pinterest, and I enjoy photo and video editing, content creation, music, and working out."
  ],
  facts: [
    { label: "Location", value: "Hyderabad, Telangana" },
    { label: "Education", value: "B.Tech CSE (Data Science), 2026" },
    { label: "Languages", value: "Telugu, English, Hindi" }
  ],

  // ---------- Links (used in the hero and the Contact section) ----------
  links: {
    email: "ardharajashekarreddy2508@gmail.com",
    linkedin: "https://www.linkedin.com/in/rajashekar-reddy-ardha-09b01031a/",
    github: "https://github.com/rajashekar2629",
    instagram: "https://www.instagram.com/hanumantha.raj25/",
    pinterest: "https://pin.it/3BLcPgw4v"
  },

  // ---------- Experience ----------
  experience: [
    {
      role: "Software Engineer Intern",
      company: "Ecliptz Labs Pvt. Ltd.",
      place: "Hyderabad (Remote)",
      dates: "Sep 2025 – Present",
      bullets: [
        "Worked on AASRA AI, a personal communication AI platform, integrating backend logic and managing smooth data flow.",
        "Assisted in developing scalable web components for user management and content platforms.",
        "Worked on a multi-tenant portfolio platform.",
        "Designed data structures and database schemas in MySQL for user data storage.",
        "Built and tested API endpoints to handle application routing and user features securely."
      ]
    }
  ],

  // ---------- Projects ----------
  // image: path to a picture. Use "" (empty) to show a "Preview coming soon" box.
  // buttons: each one has a label and a url. Add or remove buttons freely.
  projects: [
    {
      title: "FinAdvisor AI",
      date: "April 2026",
      image: "assets/finassist.jpg",
      imageAlt: "Home page of the FinAssist web app showing loan guidance and eligibility checks",
      description:
        "A smart financial advisor that suggests suitable loan options based on a user's financial details, with eligibility checks, a loan calculator and guidance in multiple languages. Deployed as FinAssist.",
      bullets: [
        "Processed raw user inputs and implemented logic to calculate risk factors and personalized offers.",
        "Wrote clean backend queries to fetch and update financial records quickly."
      ],
      tags: ["Python", "Machine Learning", "MySQL", "React"],
      buttons: [
        { label: "Live Demo", url: "https://finassist-sage.vercel.app/", style: "primary" },
        { label: "GitHub", url: "https://github.com/rajashekar2629/finassist-public", style: "ghost" }
      ]
    },
    {
      title: "CrowdGuard – Crowd Density & Safety System",
      date: "April 2025",
      image: "",
      imageAlt: "",
      description:
        "A real-time system that monitors video feeds, counts people, and detects heavy crowd gathering in specific areas.",
      bullets: [
        "Used image processing models to count people and identify sudden crowd build-up.",
        "Configured backend triggers that send warnings when crowd levels cross the safety limit."
      ],
      tags: ["Python", "OpenCV", "Computer Vision", "Flask"],
      buttons: [
        { label: "GitHub", url: "https://github.com/rajashekar2629/crowdgaurd--app", style: "primary" }
      ]
    }
  ],

  // ---------- Skills ----------
  skills: [
    { group: "Programming & Web", items: ["Python", "React", "Node.js", "Express"] },
    { group: "Data Science & AI", items: ["AI Agents", "Pandas", "NumPy", "Scikit-Learn", "Computer Vision", "OpenCV"] },
    { group: "Databases & Tools", items: ["SQL (MySQL)", "Git", "GitHub", "Postman"] },
    { group: "Cloud", items: ["AWS", "Cloud Computing"] },
    { group: "Business Intelligence", items: ["Power BI", "Microsoft Excel", "Microsoft Word"] },
    { group: "Core Concepts", items: ["Operating Systems", "DBMS", "Computer Networks"] }
  ],

  // ---------- Education ----------
  education: [
    {
      school: "Malla Reddy College of Engineering and Technology (MRCET), Hyderabad",
      degree: "B.Tech in Computer Science and Engineering (Data Science)",
      years: "2022 – 2026",
      score: "CGPA: 7.9 / 10"
    },
    {
      school: "Narayana Junior College, Kothapeta",
      degree: "Intermediate (MPC)",
      years: "2020 – 2022",
      score: "Aggregate: 84%"
    },
    {
      school: "Gowthami High School, Nakrekal",
      degree: "Secondary School Certificate (SSC)",
      years: "2011 – 2020",
      score: "CGPA: 10 / 10"
    }
  ],

  // ---------- Certifications ----------
  certifications: [
    { title: "Cambridge English Empower Level C1", issuer: "Cambridge University Press & Assessment", date: "" },
    { title: "JobReady Employability Skills (123 hours)", issuer: "Wadhwani Foundation", date: "Oct 2024" },
    { title: "AWS S3 Basics", issuer: "Coursera", date: "2025" },
    { title: "Python for Beginners: Data Structures", issuer: "Coursera Project Network", date: "May 2023" }
  ],

  // ---------- Beyond code: Pinterest ----------
  beyond: {
    title: "Pinterest Affiliate Marketing",
    niche: "Fashion & Apparel",
    description:
      "Alongside engineering, I run a Pinterest account in the fashion and apparel niche, creating pin content and growing reach through affiliate marketing.",
    stats: [
      { value: "500+", label: "Pins published" },
      { value: "200K+", label: "Views" }
    ],
    handle: "Rajafashion2512",
    interests: ["Exploring new tech", "Photo & video editing", "Content creation", "Music", "Workout"]
  }
};
