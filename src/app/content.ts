export const services = [
  {
    slug: 'product-engineering',
    number: '01',
    icon: '⌘',
    title: 'Digital product engineering',
    short: 'From the first sketch to the next big thing.',
    description:
      'Purpose-built web, mobile, and desktop applications that connect your business goals with what people actually need.',
    tags: ['Web applications', 'Mobile experiences', 'MVP development'],
    deliverables: [
      'Product discovery and technical roadmap',
      'Responsive, accessible interface design',
      'Application development and API integration',
      'Quality assurance, deployment, and handover',
    ],
  },
  {
    slug: 'ai-data',
    number: '02',
    icon: '✳',
    title: 'AI & data intelligence',
    short: 'Make your data do something extraordinary.',
    description:
      'Turn complex information into useful decisions with focused machine learning, computer vision, and intelligent automation.',
    tags: ['Machine learning', 'Computer vision', 'Data platforms'],
    deliverables: [
      'Data readiness and feasibility assessment',
      'Model prototyping and evaluation',
      'Data pipelines and application integration',
      'Monitoring and responsible deployment planning',
    ],
  },
  {
    slug: 'experience-design',
    number: '03',
    icon: '◈',
    title: 'Brand & experience design',
    short: 'Beautiful to look at. Effortless to use.',
    description:
      'Distinctive identities and thoughtful digital experiences, grounded in the way your customers think, explore, and act.',
    tags: ['Brand identity', 'UI / UX design', 'Design systems'],
    deliverables: [
      'Audience research and experience mapping',
      'Visual identity and creative direction',
      'Interactive prototypes and usability reviews',
      'Reusable design system and developer handoff',
    ],
  },
  {
    slug: 'cloud-devops',
    number: '04',
    icon: '↗',
    title: 'Cloud & connected systems',
    short: 'A stronger foundation for your next chapter.',
    description:
      'Modernize your infrastructure and connect your systems with scalable cloud architecture, delivery automation, and IoT integration.',
    tags: ['Cloud architecture', 'CI / CD', 'IoT integration'],
    deliverables: [
      'Infrastructure assessment and architecture',
      'Cloud migration and integration planning',
      'Automated build and release pipelines',
      'Operational documentation and support planning',
    ],
  },
];
export const projects = [
  {
    slug: 'orbit',
    name: 'Orbit',
    type: 'Product engineering',
    category: 'Product',
    subtitle: 'A clearer view of everyday operations.',
    description:
      'A concept for an operations workspace that brings orders, tasks, and business signals into one calm, focused interface.',
    color: 'lavender',
    capabilities: ['Dashboard UX', 'Web application', 'Data visualization'],
  },
  {
    slug: 'forma',
    name: 'Forma',
    type: 'Brand & digital experience',
    category: 'Design',
    subtitle: 'Space for a different kind of commerce.',
    description:
      'An exploratory storefront for design-led furniture, with an editorial product experience and a simpler path from discovery to purchase.',
    color: 'peach',
    capabilities: ['Visual identity', 'Commerce UX', 'Responsive design'],
  },
  {
    slug: 'signal',
    name: 'Signal',
    type: 'AI & data intelligence',
    category: 'AI & Data',
    subtitle: 'From complex data to clear direction.',
    description:
      'A concept for turning operational data into understandable trends, with human review built into the decision-making process.',
    color: 'mint',
    capabilities: ['Analytics UX', 'Data exploration', 'AI workflows'],
  },
];
export const articles = [
  {
    slug: 'better-products',
    category: 'PRODUCT THINKING',
    title: 'The best products start with better questions.',
    summary: 'Before choosing a stack or drawing a screen, get clear on the problem worth solving.',
    minutes: '4 min',
    paragraphs: [
      'A useful product begins with a specific person and a specific problem. “We need an app” describes a format. “Our customers cannot track an order without calling us” describes something a team can investigate and improve.',
      'Start by mapping the current experience. Talk to the people who use it, watch where work slows down, and identify the smallest change that would make a meaningful difference. A focused first release teaches you more than a long feature list.',
      'Agree on what success looks like before development begins. It might be fewer support calls, less time spent on a task, or a clearer checkout. Connect each feature to that outcome, test the assumptions, and use what you learn to shape the next release.',
    ],
  },
  {
    slug: 'practical-ai',
    category: 'AI & DATA',
    title: 'Less AI hype. More everyday impact.',
    summary: 'Find the repetitive work, understand your data, and keep people in the loop.',
    minutes: '3 min',
    paragraphs: [
      'The strongest place to start with AI is often a repetitive task that already has a clear definition of a good result. Document classification, information extraction, and search can offer a focused starting point.',
      'Evaluate whether your data is suitable before selecting a model. Check quality, permissions, coverage, and the consequences of an incorrect result. Build a representative evaluation set and compare the proposed system against the current process.',
      'Design a review path for uncertain outputs. People need to understand the limits of a system and know how to correct it. Start with a bounded pilot, observe the results, and expand only when the evidence supports it.',
    ],
  },
  {
    slug: 'design-that-scales',
    category: 'DESIGN NOTES',
    title: 'Consistency is a feature, too.',
    summary: 'Why a small, thoughtful design system makes a big difference as products grow.',
    minutes: '3 min',
    paragraphs: [
      'Every new screen asks a familiar set of questions: how should a button behave, what does an error look like, and how does a person get back? A design system makes those answers consistent.',
      'Start with the patterns the product already needs. Define readable typography, color roles, spacing, form states, and navigation. Test components with keyboard access, long content, and small screens.',
      'Treat the system as a shared product. Document its intended use, make changes deliberately, and keep design and implementation aligned. Consistency reduces decisions for both the team and the people using the product.',
    ],
  },
];
export const faqs = [
  [
    'What kind of businesses do you work with?',
    'We help teams shape new digital products and improve existing ones. Whether you are exploring an early idea or modernizing an established business, we begin with your goals and the people you serve.',
  ],
  [
    'Can you redesign or modernize an existing product?',
    'Yes. We can review your current experience and architecture, identify what is worth keeping, and plan a staged redesign or rebuild around your business priorities.',
  ],
  [
    'How do you estimate cost and timelines?',
    'We first clarify the scope, required integrations, and level of design and engineering work. From there, we can propose milestones and a tailored estimate. There is no one-size-fits-all package.',
  ],
  [
    'What happens after launch?',
    'We can plan a handover, documentation, and ongoing support with you. Maintenance, monitoring, and future improvements are agreed as part of the project scope.',
  ],
];
