// Single source of truth for resume content. Components read from here.

export const profile = {
  name: 'Praveen Raj S',
  firstName: 'Praveen',
  lastName: 'Raj S',
  role: 'AI/ML Engineer in training',
  tagline: 'I build LLM-powered agents, ML models and the web pages that ship them.',
  location: 'Coimbatore, IN',
  coords: '11.01°N 76.96°E',
  email: 'praveensah2608@gmail.com',
  github: 'https://github.com/praveenraj2608',
  linkedin: 'https://www.linkedin.com/in/praveenraj2608',
  summary:
    'B.E. Computer Science and Engineering (AI & ML) undergraduate who builds Generative AI, LLM-powered and multi-agent applications with Python, CrewAI, LangChain and AI APIs. Hands-on with AI agents, prompt engineering, voice-enabled apps, contextual workflows and REST APIs.',
  seeking: 'Open to AI/ML, Generative AI, LLM and AI Agent roles.',
  education: {
    school: 'Rathinam Technical Campus, Coimbatore',
    degree: 'B.E. Computer Science and Engineering',
    focus: 'Artificial Intelligence & Machine Learning',
    university: 'Anna University',
    years: '2024 - 2028',
  },
};

export const skills: { group: string; items: string[] }[] = [
  { group: 'Programming', items: ['Python', 'Java'] },
  {
    group: 'Generative AI',
    items: ['LLMs', 'Prompt Engineering', 'AI Agents', 'Multi-Agent Systems'],
  },
  {
    group: 'Frameworks & APIs',
    items: ['CrewAI', 'LangChain', 'OpenAI API', 'Claude API', 'Gemini API'],
  },
  {
    group: 'Machine Learning',
    items: ['scikit-learn', 'PyTorch', 'ANN', 'LSTM', 'Classification', 'Regression'],
  },
  { group: 'Backend & Data', items: ['Flask', 'REST APIs', 'MongoDB Atlas', 'PostgreSQL', 'SQL'] },
  { group: 'Web', items: ['HTML', 'CSS', 'JavaScript', 'Astro.js'] },
  {
    group: 'Tools',
    items: ['Git', 'GitHub', 'Firebase', 'Netlify', 'Render', 'Cloudflare Pages', 'n8n', 'OAuth', 'OneSignal'],
  },
];

// Short list used by the hero marquee.
export const marquee = [
  'Python',
  'CrewAI',
  'LangChain',
  'Claude API',
  'OpenAI API',
  'PyTorch',
  'scikit-learn',
  'XGBoost',
  'Streamlit',
  'Flask',
  'PostgreSQL',
  'Astro.js',
  'n8n',
];

export type TimelineItem = {
  kind: 'Experience' | 'Achievement' | 'Education';
  title: string;
  org: string;
  date: string;
  points?: string[];
};

export const timeline: TimelineItem[] = [
  {
    kind: 'Achievement',
    title: 'ZEN AI Hackathon - Winner',
    org: 'Sri Shakthi Institute of Engineering and Technology',
    date: 'Mar 2026',
  },
  {
    kind: 'Experience',
    title: 'Freelance Web Developer',
    org: 'AKR Mills',
    date: 'Client project',
    points: [
      'Designed and delivered a responsive business website with Astro.js.',
      'Built the page structure, styling and production build for the client.',
      'Deployed and configured production hosting on Cloudflare Pages.',
    ],
  },
  {
    kind: 'Achievement',
    title: 'Design Dynamo',
    org: 'Rathinam Group of Institutions',
    date: 'May 2025',
  },
  {
    kind: 'Education',
    title: 'B.E. CSE (Artificial Intelligence & Machine Learning)',
    org: 'Rathinam Technical Campus, Anna University',
    date: '2024 - 2028',
  },
];
