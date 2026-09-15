export const services = [
  {
    slug: 'product-engineering',
    useCase:
      'For teams replacing spreadsheets, launching a customer portal, or testing a new software idea. We can help define the smallest useful release before expanding the feature set.',
    preparation:
      'Bring a description of your users, the workflow you want to improve, any existing software, and the integrations you need. A short example of the current process is a useful starting point.',
    relatedArticle: 'better-products',
    questions: [
      [
        'What is included in MVP development?',
        'An MVP is a first release designed to test a specific business assumption. We agree on the essential user journey, interface, integrations, testing, and handover before development begins.',
      ],
      [
        'Can you build an internal tool or customer portal?',
        'Yes. We can scope role-based workflows, dashboards, and integrations around the way your team operates. Access controls and data requirements are part of the initial planning.',
      ],
    ],

    number: '01',
    icon: 'code' as const,
    title: 'Web applications & MVP development',
    short: 'Web applications, mobile products, and internal tools built around your workflows.',
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
    useCase:
      'For teams exploring document processing, data analysis, computer vision, or repetitive workflows that could benefit from automation. Start with one bounded task and a clear way to evaluate results.',
    preparation:
      'Describe the current task, the available data, who is allowed to use it, and what an incorrect result would mean. We use those constraints to assess whether AI is appropriate.',
    relatedArticle: 'practical-ai',
    questions: [
      [
        'How do you choose a first AI automation project?',
        'We look for a repeatable task with usable data and a measurable definition of a good result. A limited pilot helps evaluate quality, cost, and the need for human review before wider use.',
      ],
      [
        'Will AI outputs need human review?',
        'The review process depends on the consequences of mistakes. We plan validation, escalation for uncertain results, and monitoring rather than assuming that generated output is always correct.',
      ],
    ],

    number: '02',
    icon: 'sparkles' as const,
    title: 'AI automation & data engineering',
    short: 'Data pipelines, practical automation, and AI features with human oversight.',
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
    useCase:
      'For a new digital product, an inconsistent interface, or a brand that needs a clearer visual direction. We connect the identity, user journeys, and interface patterns around the audience you serve.',
    preparation:
      'Share your current screens or brand materials, your audience, the main tasks people need to complete, and any known usability problems. Existing customer feedback helps shape the design priorities.',
    relatedArticle: 'design-that-scales',
    questions: [
      [
        'Can you redesign an existing website or application?',
        'Yes. We review the current journeys, identify friction, and plan a focused redesign. The scope can cover selected screens, a complete interface, or a reusable design system.',
      ],
      [
        'What does a UI/UX design handover include?',
        'We agree on the deliverables before starting. These can include user flows, responsive screen designs, interactive prototypes, component states, and implementation guidance for developers.',
      ],
    ],

    number: '03',
    icon: 'pen' as const,
    title: 'UI/UX design & brand identity',
    short: 'Brand identities and interfaces that make your product easier to understand and use.',
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
    useCase:
      'For teams planning a cloud migration, improving release reliability, or connecting applications and devices. We begin with the current architecture and operational needs.',
    preparation:
      'Bring an overview of your infrastructure, deployment process, integrations, and reliability requirements. Share your operating budget and any constraints on where data can be stored.',
    relatedArticle: 'better-products',
    questions: [
      [
        'Can you improve an existing deployment process?',
        'Yes. We can assess the build and release workflow and scope automated checks, deployment pipelines, rollback procedures, and operational documentation.',
      ],
      [
        'How do you plan cloud costs?',
        'We consider workload, storage, traffic, and reliability needs when proposing architecture. Hosting and third-party service charges are discussed separately from implementation work; costs depend on actual usage.',
      ],
    ],

    number: '04',
    icon: 'cloud' as const,
    title: 'Cloud, DevOps & integrations',
    short: 'Cloud infrastructure, delivery automation, and integrations for connected systems.',
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
  {
    slug: 'mobile-app-development',
    number: '05',
    icon: 'code' as const,
    title: 'Mobile application development',
    short: 'Android and iOS applications built around the tasks your users need to complete.',
    description:
      'Plan, design, and develop mobile applications with clear user journeys, backend integrations, and a practical release plan.',
    tags: ['Android apps', 'iOS apps', 'App store releases'],
    deliverables: [
      'App scope and platform planning',
      'Mobile interface design and prototyping',
      'Application development and backend integration',
      'Device testing and store submission preparation',
    ],
    useCase:
      'For businesses taking a service mobile, founders testing an app idea, or teams replacing a manual field workflow. We define the first useful release and the devices it needs to support.',
    preparation:
      'Share your core user journey, target platforms, integrations, and any offline or notification requirements. Store accounts, review requirements, and ongoing maintenance are part of release planning.',
    relatedArticle: 'better-products',
    questions: [
      [
        'Can you help with publishing an app?',
        'We can prepare a release and support the submission process. Store accounts and any platform fees are agreed with you, and approval remains subject to each store’s review.',
      ],
      [
        'Do you have a published mobile product?',
        'Yes. Money Maker: Budget & Expense is an EmloX Android product available on Google Play. Explore it from our Work page.',
      ],
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
    type: 'AI automation & data engineering',
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
    title: 'Before you build: define the problem.',
    summary: 'Before choosing a stack or drawing a screen, get clear on the problem worth solving.',
    minutes: '1 min',
    paragraphs: [
      'A useful product begins with a specific person and a specific problem. “We need an app” describes a format. “Our customers cannot track an order without calling us” describes something a team can investigate and improve.',
      'Start by mapping the current experience. Talk to the people who use it, watch where work slows down, and identify the smallest change that would make a meaningful difference. A focused first release teaches you more than a long feature list.',
      'Agree on what success looks like before development begins. It might be fewer support calls, less time spent on a task, or a clearer checkout. Connect each feature to that outcome, test the assumptions, and use what you learn to shape the next release.',
    ],
  },
  {
    slug: 'practical-ai',
    category: 'AI & DATA',
    title: 'Choosing a useful first AI project.',
    summary: 'Find the repetitive work, understand your data, and keep people in the loop.',
    minutes: '1 min',
    paragraphs: [
      'The strongest place to start with AI is often a repetitive task that already has a clear definition of a good result. Document classification, information extraction, and search can offer a focused starting point.',
      'Evaluate whether your data is suitable before selecting a model. Check quality, permissions, coverage, and the consequences of an incorrect result. Build a representative evaluation set and compare the proposed system against the current process.',
      'Design a review path for uncertain outputs. People need to understand the limits of a system and know how to correct it. Start with a bounded pilot, observe the results, and expand only when the evidence supports it.',
    ],
  },
  {
    slug: 'design-that-scales',
    category: 'DESIGN NOTES',
    title: 'When your product needs a design system.',
    summary: 'Why a small, thoughtful design system makes a big difference as products grow.',
    minutes: '1 min',
    paragraphs: [
      'Every new screen asks a familiar set of questions: how should a button behave, what does an error look like, and how does a person get back? A design system makes those answers consistent.',
      'Start with the patterns the product already needs. Define readable typography, color roles, spacing, form states, and navigation. Test components with keyboard access, long content, and small screens.',
      'Treat the system as a shared product. Document its intended use, make changes deliberately, and keep design and implementation aligned. Consistency reduces decisions for both the team and the people using the product.',
    ],
  },
];
export const faqs = [
  [
    'How would we work together across time zones?',
    'At the start of an engagement, we agree on meeting overlap, review milestones, and a shared channel for questions and progress. Written updates and recorded decisions help work move forward between calls.',
  ],
  [
    'What kind of businesses do you work with?',
    'We work on projects for founders planning an MVP, businesses improving day-to-day operations, and product teams updating an existing application. Share your priorities so we can assess the fit and define a useful starting point.',
  ],
  [
    'Can you redesign or modernize an existing product?',
    'Yes. We can review your current experience and architecture, identify what is worth keeping, and plan a staged redesign or rebuild around your business priorities.',
  ],
  [
    'How do you estimate cost and timelines?',
    'We estimate each project around its scope, integrations, design needs, and delivery milestones. We agree on the budget and what is included before work begins. If the scope changes, we discuss the impact on cost and timing before proceeding.',
  ],
  [
    'What happens after launch?',
    'We can plan a handover, documentation, and ongoing support with you. Maintenance, monitoring, and future improvements are agreed as part of the project scope.',
  ],
];
