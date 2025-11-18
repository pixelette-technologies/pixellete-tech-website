export const header = {
  title: 'Technology for every industry, success for every client',
  description:
    'Our quantum-powered AI and blockchain solutions are tailored for high-impact sectors.',
};

export const backgroundImage = '/images/aiServices/serviceSectionBackground.svg';
export const quantumBackgroundImage = '/images/aiServices/serviceSectionBackground.svg';

export const tgheading = 'Our Quantum development solution guarantees';

export const tgdescription
  = 'Every solution we deliver is built for performance, precision, and long-term scalability.';

export const tgexpertiseAreas = [
  { title: 'Quantum Algorithms' },
  { title: 'Quantum Circuit Design' },
  { title: 'Quantum Error Correction' },
  { title: 'Quantum Machine Learning' },
  { title: 'Quantum Cryptography' },
  { title: 'Quantum Simulation' },
];

export const tgExpertiseData = {
  'Quantum Algorithms': {
    title: 'Quantum Algorithms',
    description:
        'We develop cutting-edge quantum algorithms that leverage quantum superposition and entanglement to solve complex computational problems exponentially faster than classical computers.',
  },
  'Quantum Circuit Design': {
    title: 'Quantum Circuit Design',
    description: 'Our team designs optimized quantum circuits using advanced gate operations and quantum logic to maximize computational efficiency and minimize error rates.',
  },
  'Quantum Error Correction': {
    title: 'Quantum Error Correction',
    description: 'We implement robust quantum error correction protocols to maintain quantum coherence and ensure reliable quantum computation in noisy environments.',
  },
  'Quantum Machine Learning': {
    title: 'Quantum Machine Learning',
    description:
        'We develop quantum machine learning models that harness quantum computing power to process and analyze data at unprecedented speeds, enabling breakthroughs in AI and data science.',
  },
  'Quantum Cryptography': {
    title: 'Quantum Cryptography',
    description:
        'Our quantum cryptography solutions provide unbreakable security through quantum key distribution and quantum-resistant encryption methods.',
  },
  'Quantum Simulation': {
    title: 'Quantum Simulation',
    description:
        'We create quantum simulation systems that model complex quantum systems, enabling research and development in materials science, chemistry, and physics.',
  },
};

export const quantumHeroHeading = 'Quantum Services';
export const quantumHeroSubHeading = 'Secure. Intelligent. Future-Ready.';

export const quantumHeroDescription
  = 'Pixelette Quantum brings practical quantum adoption to governments, enterprises, and investors, integrating AI and blockchain with quantum technologies to help organisations stay secure, efficient, and future-ready.We bridge the gap between innovation and application, making quantum-driven intelligence accessible today.';

export const quantumHeroButtonText = 'Consult our experts';

export const quantumHeroButtonLink = '/contact-us';

export const quantumHeroBackgroundImage = '/images/quantumService/bg.png';

export const quantumHeroImages = [
  { src: '/images/quantumService/quantum1.png', alt: 'box 1' },
  { src: '/images/quantumService/quantum2.png', alt: 'box 2' },
  { src: '/images/quantumService/quantum3.png', alt: 'box 3' },
  { src: '/images/quantumService/quantum4.png', alt: 'box 4' },
];

export const quantumServicesHeading = 'Our services';

export const quantumServicesDescription
  = 'Our quantum services empower organisations to explore the practical intersections of AI, blockchain, and quantum computing. We focus on applied pilots and integrations that deliver measurable outcomes, from quantum-ready blockchain frameworks to hybrid AI optimisation.';

export const quantumServicelist
    = [
      {
        title: 'Quantum Services',
        items: [
          'Web3 Hardening (Quantum-Safe Architecture)',
          'Hybrid Quantum-AI Optimisation',
          'Executive Advisory & Roadmapping',
        ],
      },
    ];

export const quantumServices = {
  'Web3 Hardening (Quantum-Safe Architecture)': {
    imageSrc: '/images/quantumService/quantumService_1.svg',
    title: 'Web3 Hardening (Quantum-Safe Architecture)',
    description:
        'We prepare blockchain ecosystems for the post-quantum era. Our team helps organisations assess cryptographic dependencies, design crypto-agile architectures, and implement digital-signature upgrades aligned with emerging NIST PQC standards. All delivered with a focus on interoperability, scalability, and long-term data integrity.',
  },
  'Hybrid Quantum-AI Optimisation': {
    imageSrc: '/images/quantumService/quantumService_2.svg',
    title: 'Hybrid Quantum-AI Optimisation',
    description:
        'Combine classical and quantum computing to enhance AI-based decision systems. <br /><br />We develop models and pilots that optimise:<br />• <strong>Finance:</strong> portfolio management, risk modelling<br />• <strong>Supply Chains:</strong> logistics optimisation, dynamic routing<br />• <strong>Energy Systems:</strong> grid balancing and storage efficiency<br /><br />Delivered through APIs or managed service pilots, benchmarked against real business KPIs.',
  },
  'Executive Advisory & Roadmapping': {
    imageSrc: '/images/quantumService/quantumService_3.svg',
    title: 'Executive Advisory & Roadmapping',
    description:
        'We help leadership teams make informed, low-risk decisions on quantum adoption. Includes board-level briefings, technical workshops, and 6- to 12-week pilot frameworks aligned with organisational strategy.',
  },
};

type Technology = {
  id: number;
  name: string;
  icon: string;
};

type Technologies = {
  [key: string]: Technology[];
};

export const quantumTechnologies: Technologies = {
  'Quantum Computing Frameworks': [
    { id: 1, name: 'Qiskit', icon: '/images/tech/logos/python.png' },
    { id: 2, name: 'Cirq', icon: '/images/tech/logos/r.png' },
    { id: 3, name: 'PennyLane', icon: '/images/tech/logos/julia.png' },
    { id: 4, name: 'Q#', icon: '/images/tech/logos/java.png' },
    { id: 5, name: 'Strawberry Fields', icon: '/images/tech/logos/c-plus.png' },
    { id: 6, name: 'Forest', icon: '/images/tech/logos/scala.png' },
    { id: 7, name: 'ProjectQ', icon: '/images/tech/logos/javascript.png' },
    { id: 8, name: 'QuTiP', icon: '/images/tech/logos/typescript.png' },
  ],
  'Quantum Hardware Platforms': [
    { id: 1, name: 'IBM Quantum', icon: '/images/tech/logos/python.png' },
    { id: 2, name: 'Google Quantum AI', icon: '/images/tech/logos/r.png' },
    { id: 3, name: 'Amazon Braket', icon: '/images/tech/logos/julia.png' },
    { id: 4, name: 'Microsoft Azure Quantum', icon: '/images/tech/logos/java.png' },
    { id: 5, name: 'Rigetti Computing', icon: '/images/tech/logos/c-plus.png' },
    { id: 6, name: 'IonQ', icon: '/images/tech/logos/scala.png' },
    { id: 7, name: 'D-Wave Systems', icon: '/images/tech/logos/javascript.png' },
    { id: 8, name: 'Xanadu', icon: '/images/tech/logos/typescript.png' },
  ],
};

export const commitmentData = [
  {
    img: '/images/aiServices/McDonald.svg',
    value1: '90%',
    value2: '95%',
    value3: '70%',
    desc1: 'Faster computation speed',
    desc2: 'Algorithm accuracy',
    desc3: 'Reduction in processing time',
  },
  {
    img: '/images/aiServices/Lytics.svg',
    value1: '300%',
    value2: '80%',
    value3: '5X',
    desc1: 'Increase in problem-solving capacity',
    desc2: 'Improvement in optimization results',
    desc3: 'Faster data processing',
  },
];

export const ocheading = 'Our commitment to excellence';

export const ocdescription
  = 'Excellence serves as our starting point. We work tirelessly towards achieving remarkable results that elevate the bar for technological advancements everywhere.';
