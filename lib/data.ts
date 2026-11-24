export const profile = {
  name: "Varun T P",
  title: "Product Engineer @ TCS",
  tagline: "Java backend · Full-stack · Mobile",
  summary:
    "Product Engineer at Tata Consultancy Services building Java backend services on the BaNCS platform. I ship REST APIs with Spring Boot, design relational and NoSQL data models, and build cross-platform apps with Flutter and React. 350+ DSA problems solved.",
  location: "Bengaluru, Karnataka, India",
  email: "varu0616@gmail.com",
  phone: "+91 95354 19091",
  github: "https://github.com/Varugowdatp",
  linkedin: "https://www.linkedin.com/in/varun-tp-8ab642262",
  resume: "/Varun_T_P_Resume.pdf",
};

export const stats = [
  { value: "9.54", label: "CGPA · B.E. CSE" },
  { value: "350+", label: "DSA problems solved" },
  { value: "3", label: "Engineering roles" },
  { value: "6", label: "Shipped projects" },
];

export const experience = [
  {
    company: "Tata Consultancy Services",
    role: "Product Engineer — BaNCS User Management System",
    period: "Jun 2026 – Present",
    place: "Bengaluru, Karnataka",
    stack: ["Java", "Spring Boot", "Struts", "Hibernate", "Oracle"],
    points: [
      "Develop and enhance Java backend components of the TCS BaNCS User Management System, supporting core product functionality and business workflows.",
      "Implement backend workflows using Spring Boot, REST APIs and Struts XML configuration to deliver enhancements while preserving existing behavior.",
      "Use Hibernate and Oracle Database for persistence, keeping the service and data layers reliable.",
    ],
  },
  {
    company: "MediCodio.ai",
    role: "Software Development Engineer Intern",
    period: "Jan 2026 – Apr 2026",
    place: "Bengaluru, Karnataka",
    stack: ["PostgreSQL", "Express", "React", "Node.js"],
    points: [
      "Built application modules for a medical coding automation platform on the PERN stack, supporting core product workflows.",
      "Worked across frontend and backend, integrating user-facing features with backend services.",
    ],
  },
  {
    company: "Ignito Corporation",
    role: "Flutter Backend Developer Intern",
    period: "Jun 2025 – Jul 2025",
    place: "Remote",
    stack: ["Flutter", "Firebase", "Firestore"],
    points: [
      "Developed features for the Smart Distributor app covering inventory, finance and distribution management.",
      "Implemented Firestore data operations and Firebase Authentication for secure, synchronized multi-user access.",
    ],
  },
];

export type Project = {
  name: string;
  tag: string;
  problem: string;
  points: string[];
  impact?: string[];
  stack: string[];
  links: { label: string; href: string }[];
};

const gh = "https://github.com/Varugowdatp";

export const featured: Project[] = [
  {
    name: "NearBuy",
    tag: "Hyperlocal E-Commerce Platform",
    problem:
      "Local shops lacked a digital presence and structured order handling, so customers depended on walk-ins.",
    points: [
      "Dual Flutter apps: a customer app for shop discovery and ordering, and a shopkeeper app for inventory and order processing.",
      "Spring Boot REST services managing products, inventory, users and orders.",
      "PostgreSQL persistence with modular components for maintainability and future growth.",
    ],
    stack: ["Flutter", "Spring Boot", "PostgreSQL", "REST"],
    links: [{ label: "GitHub", href: gh }],
  },
  {
    name: "Hype",
    tag: "Local Business Discovery & Review Platform",
    problem:
      "Hidden-gem local shops are hard to find and rarely get honest ratings. Think IMDb and Rotten Tomatoes for neighborhood businesses.",
    points: [
      "Spring Boot REST APIs and PostgreSQL models for listings, reviews, ratings and shop data.",
      "React.js interface with business-owner features: claim a listing, manage the profile, promote the shop.",
    ],
    stack: ["Spring Boot", "PostgreSQL", "React.js", "REST"],
    links: [{ label: "GitHub", href: gh }],
  },
  {
    name: "Smart Distributor",
    tag: "Inventory & Finance System",
    problem:
      "Manual ledger-based inventory work caused inefficiency across 50+ staff users.",
    points: [
      "Real-time Firestore database with a schema designed for multi-user operations.",
      "Role-based authentication and transaction logging for full traceability.",
    ],
    impact: ["50+ active staff", "70% less paperwork", "Full audit trail"],
    stack: ["Flutter", "Firebase", "Firestore", "Role-based Auth"],
    links: [{ label: "GitHub", href: gh }],
  },
];

export const more: Project[] = [
  {
    name: "ML_Textify",
    tag: "AI OCR Document Digitization",
    problem:
      "Image preprocessing pipeline before OCR, 90%+ accuracy on standard documents, export to PDF, Word and TXT.",
    points: [],
    stack: ["Flutter", "ML Kit", "NLP"],
    links: [{ label: "GitHub", href: gh }],
  },
  {
    name: "Expense Tracker",
    tag: "MERN Finance Analytics",
    problem:
      "JWT-secured multi-user app with a REST backend, MongoDB transaction schema and Chart.js dashboards.",
    points: [],
    stack: ["MongoDB", "Express", "React", "Node.js", "JWT"],
    links: [{ label: "GitHub", href: gh }],
  },
  {
    name: "Tic Tac Toe",
    tag: "Flutter State Architecture",
    problem:
      "Clean separation of game logic and UI with minimal, well-structured state management.",
    points: [],
    stack: ["Flutter", "Dart"],
    links: [{ label: "GitHub", href: gh }],
  },
  {
    name: "PawCare",
    tag: "Animal Welfare Web Platform",
    problem:
      "Responsive static site with semantic HTML for accessibility and SEO, centralizing animal welfare resources.",
    points: [],
    stack: ["HTML", "CSS", "JavaScript"],
    links: [{ label: "GitHub", href: gh }],
  },
];

export const skills = [
  { group: "Languages", items: ["Java", "C++", "C", "Dart", "JavaScript", "SQL"] },
  {
    group: "Backend",
    items: ["Spring Boot", "Spring MVC", "Struts", "Hibernate", "REST APIs", "Node.js", "Express"],
  },
  { group: "Frontend & Mobile", items: ["React.js", "Flutter", "HTML/CSS", "Tailwind"] },
  { group: "Databases", items: ["PostgreSQL", "Oracle", "MongoDB", "Firestore"] },
  {
    group: "Tools",
    items: ["Git/GitHub", "IntelliJ IDEA", "Postman", "Android Studio", "VS Code", "Claude Code", "Cursor"],
  },
  {
    group: "Fundamentals",
    items: ["Data Structures & Algorithms", "OOP", "DBMS", "Multithreading", "SDLC", "Agile/Scrum"],
  },
];

export const education = [
  {
    school: "PES College of Engineering, Mandya",
    degree: "B.E. Computer Science & Engineering",
    period: "2022 – 2026",
    score: "CGPA 9.54",
  },
  {
    school: "Cambridge PU College, Channapatna",
    degree: "Pre-University (PCMB)",
    period: "2020 – 2022",
    score: "97%",
  },
];

export const achievements = [
  { title: "Flutter Lead", detail: "Google Developer Group on Campus, PES Mandya" },
  { title: "350+ DSA problems", detail: "250+ on GeeksforGeeks, 100+ on LeetCode" },
  { title: "HackSprint", detail: "Top 5 finish" },
  { title: "Startup Pitch", detail: "Scored 80 / 100" },
];
