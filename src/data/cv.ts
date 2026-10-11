// Single source for the CV. The /cv page renders this, and `npm run cv:pdf`
// prints that page to public/Peter_Kioko_CV.pdf, so edit content here only.

export type CvLink = {
  label: string;
  href: string;
};

export type CvHighlight = {
  label?: string;
  text: string;
};

export type CvSkillGroup = {
  group: string;
  items: string;
};

export type CvRole = {
  title: string;
  company: string;
  periods: string[];
  highlights: CvHighlight[];
};

export type CvProject = {
  name: string;
  note?: string;
  link?: CvLink;
  stack: string;
  bullets: string[];
};

export type CvEducation = {
  degree: string;
  school: string;
  dates: string;
  note: string;
};

export type CvMentorship = {
  title: string;
  dates: string;
  text: string;
};

export type Cv = {
  name: string;
  title: string;
  location: string;
  contacts: CvLink[];
  pdfPath: string;
  summary: string;
  skills: CvSkillGroup[];
  experience: CvRole[];
  projects: CvProject[];
  education: CvEducation[];
  mentorship: CvMentorship[];
  honours: string[];
};

export const cv: Cv = {
  name: "Peter Kioko",
  title: "Full-Stack Software Engineer (TypeScript, React, Node, Python, Elixir)",
  location: "Nairobi, Kenya (GMT+3)",
  contacts: [
    { label: "peterkioko64@gmail.com", href: "mailto:peterkioko64@gmail.com" },
    { label: "github.com/p3terkioko", href: "https://github.com/p3terkioko" },
    { label: "linkedin.com/in/peter-kioko-94294723b", href: "https://www.linkedin.com/in/peter-kioko-94294723b/" },
    { label: "peter-seven.vercel.app", href: "https://peter-seven.vercel.app" },
  ],
  pdfPath: "/Peter_Kioko_CV.pdf",

  summary:
    "Full-stack software engineer in Nairobi with about 3 years of hands-on experience (since 2023), building production web platforms from interface to database. Works in React, Next.js and TypeScript on the front end and Node.js/Express, Python/FastAPI and Elixir/Phoenix LiveView on the back end, with PostgreSQL (including pgvector), MongoDB and MySQL. Ships and operates what he builds with Docker, GitHub Actions self-hosted runners, Nginx, DigitalOcean and Vercel. Builds retrieval-augmented generation systems with Llama 3.3 on Groq and uses Claude Code with MCP connectors daily. BSc Computer Science (Second Class Honours, Upper Division), University of Nairobi, graduated September 2026. Peer mentor to early-career developers.",

  skills: [
    { group: "Languages", items: "TypeScript, JavaScript (ES6+), Python, Elixir, SQL, C++ (embedded)" },
    { group: "Front end", items: "React, Next.js, Vite, Tailwind CSS, responsive and accessible UI, Figma-to-code" },
    { group: "Back end", items: "Node.js, Express, FastAPI, Phoenix LiveView, REST APIs, role-based access control, authentication (Supabase Auth, Google OAuth, JWT verification)" },
    { group: "Data", items: "PostgreSQL, pgvector, MongoDB, MySQL, data modelling, concurrency control (OCC and two-phase locking)" },
    { group: "AI", items: "retrieval-augmented generation, Llama 3.3 via Groq API, semantic search, Claude Code with MCP connectors" },
    { group: "Infrastructure", items: "Docker, GitHub Actions (self-hosted runners), Nginx, Certbot SSL, Fail2ban, Linux (Ubuntu, WSL), DigitalOcean, Vercel" },
    { group: "Quality", items: "Playwright, Lighthouse and Core Web Vitals audits, Git branch workflows, peer code review" },
  ],

  experience: [
    {
      title: "Software Engineer",
      company: "Saracen Media Ltd, Nairobi, Kenya",
      periods: ["Internship: June 2025 to December 2025", "Contract: December 2025 to present"],
      highlights: [
        {
          label: "Jikoni",
          text: "Designed and built the full platform for a Nairobi creative hub as an Elixir/Phoenix application, including an 8-table relational data model (memberships, space bookings, contacts), role-based access control for 4 admin roles (super admin, admin, management, front desk), and an invoicing flow for off-platform clients that locks the booking slot immediately and tracks invoice and payment status separately from the booking, so each state change stays consistent.",
        },
        {
          label: "LiveFTA",
          text: "Work on an Elixir/Phoenix broadcast analytics platform covering 3 markets and 15 channels, where live sentiment data arrives continuously: redesigned the live sentiment panel around a net-sentiment headline metric with an hourly divergent bar chart, designed historical storage and a rollup and retention approach for sentiment data beyond the live rolling window, and improved PDF report generation. Diagnosed a DNS outage caused by a Cloudflare nameserver mismatch against the cPanel zone.",
        },
        {
          label: "Adops Media Planner",
          text: "Ramped up on Elixir/Phoenix LiveView with no prior production experience to build real-time, state-driven interfaces across 11 screens, debugging state synchronisation issues in a fast-moving codebase; ran a full colour and design audit and delivered a consolidated UI redesign.",
        },
        {
          label: "AI Brief Builder",
          text: "Built and maintain a production creative-brief tool in vanilla HTML, CSS and JavaScript with an API-integrated submission backend; rebuilt the form as a stepped, guided flow and ran iterative Lighthouse audits that improved usability scores by 22% across three cycles.",
        },
        {
          label: "OOHna",
          text: "Built and deployed the product landing page from Figma designs to production; configured an Nginx reverse proxy and Certbot SSL across 4 subdomains, and traced an SSL certificate overlap through Nginx configuration, certificate scope and DNS records to root cause, restoring sub-2-second load times across all subdomains.",
        },
        {
          label: "Infrastructure and delivery",
          text: "Containerised applications with Docker as part of the CI/CD pipeline and deployed to DigitalOcean droplets via self-hosted GitHub Actions runners behind Nginx; hardened 2 servers with path blocks, rate limiting and Fail2ban after detecting scanner traffic; maintained PostgreSQL databases, branch-based Git workflows and peer code review.",
        },
      ],
    },
  ],

  projects: [
    {
      name: "FitCheck AI",
      note: "BSc capstone",
      link: { label: "github.com/p3terkioko/fitcheck", href: "https://github.com/p3terkioko/fitcheck" },
      stack: "React/Vite, Node.js/Express, Python/FastAPI, PostgreSQL/pgvector, Groq API/Llama 3.3, DigitalOcean, Nginx, GitHub Actions",
      bullets: [
        "Built the full React/Vite frontend and a Node.js/Express REST API backed by a Python/FastAPI microservice that handles claim processing, NLP inference and semantic search over 37,455 indexed chunks from 921 peer-reviewed papers via PostgreSQL/pgvector.",
        "Implemented a retrieval-augmented generation pipeline with Llama 3.3 through the Groq API that returns evidence-backed verdicts with confidence scores; achieved 97% accuracy across 8 structured test claims.",
        "Deployed on a DigitalOcean VPS with Nginx reverse proxy, Certbot SSL and a self-hosted GitHub Actions runner that deploys on every push to main.",
      ],
    },
    {
      name: "Distributed Key-Value Store (OCC vs 2PL)",
      link: { label: "github.com/p3terkioko/occ", href: "https://github.com/p3terkioko/occ" },
      stack: "Python, sockets, matplotlib, seaborn",
      bullets: [
        "Built a distributed key-value database with data nodes, a transaction coordinator that validates optimistic concurrency control, and a client library implementing both OCC buffering and two-phase locking.",
        "Wrote a benchmarking harness that compares throughput and abort rates across conflict scenarios and generates charts and reports automatically.",
      ],
    },
    {
      name: "TabVault",
      link: { label: "github.com/p3terkioko/TabVault", href: "https://github.com/p3terkioko/TabVault" },
      stack: "JavaScript, Manifest V3, Chrome Storage and Alarms APIs, Google OAuth 2.0, Google Drive API",
      bullets: [
        "Built a Manifest V3 browser extension that backs up tab groups and tabs locally every 5 minutes and to the user's own Google Drive every 60 minutes, with one codebase working across Chrome, Brave and Edge.",
        "Implemented the OAuth 2.0 flow, scheduled backups with the Alarms API, snapshot retention (20 local, 30 Drive), and privacy by design: cookies, sessions, logins and history are never saved.",
      ],
    },
    {
      // TODO: no repo link given for this entry.
      name: "MawinguOps",
      stack: "React/Vite, Leaflet, Africa's Talking USSD, Open-Meteo, CHIRPS, Random Forest",
      bullets: [
        "Built a maize planting advisory application for smallholder farmers in Machakos County: a React/Vite dashboard, a Leaflet regional map and a weekly traffic-light advisory in English and Kiswahili.",
        "Normalised third-party weather APIs (Open-Meteo, CHIRPS, ICPAC Geoportal) into 30-day rainfall analytics, and extended reach to feature phones through USSD and SMS/email subscriptions.",
      ],
    },
    {
      // TODO: no link given for this entry.
      name: "Claude Desktop Buddy",
      stack: "ESP32, C++, BLE, PlatformIO, Claude API",
      bullets: [
        "Built a physical AI companion on a TTGO T-Display where an ASCII cat reacts to conversation state (thinking, responding, idle, celebrating).",
      ],
    },
  ],

  education: [
    {
      degree: "BSc Computer Science, Second Class Honours (Upper Division)",
      school: "University of Nairobi, Nairobi, Kenya",
      dates: "2022 to September 2026",
      note: "Graduated September 2026",
    },
  ],

  mentorship: [
    {
      title: "KamiLimu Fellowship: Cohort 10 Peer Mentor",
      dates: "March 2026 to November 2026",
      text: "Selected from Cohort 9 alumni to mentor 3 to 4 mentees over 8 months, facilitating monthly lesson retention sessions, accountability check-ins and resume review support for early-career tech students.",
    },
    {
      title: "KamiLimu Fellowship: Cohort 9 Mentee",
      dates: "March 2025 to November 2025",
      text: "Accepted as 1 of 40 students from 15+ Kenyan universities into a structured tech mentorship programme; finished as runners-up at the Innovation Finals.",
    },
  ],

  honours: [
    "Algorand Hackathon, University of Nairobi: 2nd Place",
    "Code Africa Hackathon: $100 bounty, best deployment on Base (Coinbase Ethereum L2)",
    "Software Engineering, Moringa School (2022, Phase 0 and 1)",
  ],
};
