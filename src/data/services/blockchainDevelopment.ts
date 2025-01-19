export const header = {
  title: 'Technology for every industry, success for every client',
  description:
    'Our solutions are custom-built to push existing technological boundaries and meet the specific needs of every sector we serve.',
};

export const backgroundImage = '/images/aiServices/serviceSectionBackground.svg';

export const tgheading = 'Our blockchain development service expertise';

export const tgdescription
  = 'Our solutions are custom-built to push existing technological boundaries and meet the specific needs of every sector we serve.';

export const tgexpertiseAreas = [
  { title: 'Distributed Ledger Technology' },
  { title: 'Consensus Algorithms' },
  { title: 'Smart Contracts' },
  { title: 'Cross-Chain Technology' },
  { title: 'Blockchain Security and Audits' },
  { title: 'Privacy and Confidentiality Solutions' },
  {
    title: 'Distributed Ledger Technology',
    description:
      'Our blockchain team specializes in Distributed Ledger Technology, creating secure, transparent systems that decentralize data control. Our expertise in Hype ledger Fabric and Corda ensures scalable solutions across finance and other industries. ',
  },
];

export const ocheading = 'Our Commitment to Excellence';

export const ocdescription
  = 'Excellence serves as our starting point. We work tirelessly towards achieving remarkable results that elevate the bar for technological advancements everywhere.';

export const commitmentData = [
  {
    img: '/images/blockchainServices/diamond.svg',
    value1: '80%',
    value2: '85%',
    value3: '60%',
    desc1: 'Reduction in review analysis time',
    desc2: 'Accuracy in predictive analysis',
    desc3: 'Improvement in overall efficiency',
  },
  {
    img: '/images/blockchainServices/baldman.svg',
    value1: '200%',
    value2: '70%',
    value3: '3X',
    desc1: 'Expansion of new sources monitored',
    desc2: 'Efficiency of AI based scraping',
    desc3: 'Increase in real-time handling capacity',
  },
  {
    img: '/images/blockchainServices/graph.svg',
    value1: '90%',
    value2: '95%',
    desc1: 'Satisfaction with speech quality',
    desc2: 'Text-to-speech accuracy',
  },
];

export const aiHeroHeading = 'Blockchain Development Services';

export const aiHeroDescription
  = 'We specialize in end-to-end blockchain development, offering secure, scalable and industry-specific solutions to bring your decentralized solutions to reality';

export const aiHeroButtonText = 'Book call to solve your tech challenges';

export const aiHeroButtonLink = '/contactus';

export const aiHeroBackgroundImage = '/images/blockchainServices/heroSectionBackground.svg';

export const aiHeroImages = [
  { src: '/images/blockchainServices/box_1.svg', alt: 'box 1' },
  { src: '/images/blockchainServices/box_2.svg', alt: 'box 2' },
  { src: '/images/blockchainServices/box_3.svg', alt: 'box 3' },
  { src: '/images/blockchainServices/box_4.svg', alt: 'box 4' },
];

export const aiServicesHeading = 'Our Services';

export const aiServicesDescription
  = 'Our blockchain development services empower businesses to use decentralized technology for enhanced security and transparency. As a seasoned blockchain development company, we specialize in transforming complex processes into streamlined, trustworthy solutions that make efficiency and secure data handling seamless. Let’s work together to bring your blockchain ideas to life and to the forefront of innovation!';

export const blockchainServicelist
= [
  {
    title: 'AI Solutions',
    items: [
      'Generative AI',
      'AI Security',
      'AI Design',
      'AI Ops',
      'Automation Solutions',
    ],
  },
  {
    title: 'AI Applications',
    items: [
      'Chatbots & Conversational AI',
      'Recommendations Engines',
      'AI-as-a-Service (AIaaS)',
      'AI Product Development',
      'Predictive Modeling',
    ],
  },
];
export const blockchainServices = {
  'Generative AI': {
    imageSrc: '/images/aiServices/s_1.svg',
    title: 'Generative AI',
    description:
    'We are recognized as a leading generative AI development company and bring deep expertise in generative AI tools like GPT-4, GPT-3.5, and DALL-E. Our models provide visual content analysis to aid in brand identity, data analysis, business intelligence, and visualization, offering tailored generative AI development services.',
  },
  'AI Security': {
    imageSrc: '/images/aiServices/s_2.svg',
    title: 'AI Security',
    description:
    'Our AI security solutions leverage advanced machine learning algorithms to detect and prevent cyber threats in real time, ensuring robust and reliable system protection.',
  },
  'AI Design': {
    imageSrc: '/images/aiServices/s_3.svg',
    title: 'AI Design',
    description:
    'We provide cutting-edge AI-powered design solutions that enhance user experiences, optimize workflows, and drive creative innovation.',
  },
  'AI Ops': {
    imageSrc: '/images/aiServices/s_4.svg',
    title: 'AI Ops',
    description:
    'Streamline your operations with AI-driven automation and insights that improve efficiency, reduce downtime, and maximize productivity.',
  },
  'Automation Solutions': {
    imageSrc: '/images/aiServices/s_5.svg',
    title: 'Automation Solutions',
    description:
    'Implement intelligent automation solutions that empower businesses to achieve greater accuracy, speed, and scalability in their operations.',
  },
  'Chatbots & Conversational AI': {
    imageSrc: '/images/aiServices/s_6.svg',
    title: 'Chatbots & Conversational AI',
    description:
    'Develop interactive chatbots and conversational AI tools that deliver personalized customer engagement and support.',
  },
  'Recommendations Engines': {
    imageSrc: '/images/aiServices/s_1.svg',
    title: 'Recommendations Engines',
    description:
    'Build recommendation systems that provide users with highly relevant suggestions, enhancing user satisfaction and retention.',
  },
  'AI-as-a-Service (AIaaS)': {
    imageSrc: '/images/aiServices/s_2.svg',
    title: 'AI-as-a-Service (AIaaS)',
    description:
    'Deliver scalable AI capabilities on-demand, enabling businesses to quickly integrate AI into their processes.',
  },
  'AI Product Development': {
    imageSrc: '/images/aiServices/s_3.svg',
    title: 'AI Product Development',
    description:
    'Create innovative AI-driven products that cater to specific business needs, leveraging advanced AI technologies.',
  },
  'Predictive Modeling': {
    imageSrc: '/images/aiServices/s_4.svg',
    title: 'Predictive Modeling',
    description:
    'Harness the power of predictive analytics to forecast trends, identify opportunities, and make data-driven decisions.',
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

export const blockchainTechnologies: Technologies = {
  AI_ML_BI: [
    { id: 1, name: 'Python', icon: '/images/tech/aws.svg' },
    { id: 2, name: 'PyTorch', icon: '/images/tech/kotlin.svg' },
    { id: 3, name: 'Python', icon: '/images/tech/aws.svg' },
    { id: 4, name: 'TensorFlow', icon: '/images/tech/flutter.svg' },
    { id: 5, name: 'Qlik', icon: '/images/tech/mongodb.svg' },
    { id: 6, name: 'Tableau', icon: '/images/tech/node.svg' },
    { id: 7, name: 'Qlik', icon: '/images/tech/mongodb.svg' },
    { id: 8, name: 'PyTorch', icon: '/images/tech/kotlin.svg' },
    { id: 9, name: 'TensorFlow', icon: '/images/tech/flutter.svg' },
    { id: 10, name: 'Keras', icon: '/images/tech/firebase.svg' },
    { id: 11, name: 'Keras', icon: '/images/tech/firebase.svg' },
    { id: 12, name: 'Python', icon: '/images/tech/aws.svg' },
    { id: 13, name: 'Keras', icon: '/images/tech/firebase.svg' },
    { id: 14, name: 'TensorFlow', icon: '/images/tech/flutter.svg' },
    { id: 15, name: 'PyTorch', icon: '/images/tech/kotlin.svg' },
    { id: 16, name: 'Tableau', icon: '/images/tech/node.svg' },
    { id: 17, name: 'Python', icon: '/images/tech/aws.svg' },
    { id: 18, name: 'Qlik', icon: '/images/tech/mongodb.svg' },
    { id: 19, name: 'TensorFlow', icon: '/images/tech/flutter.svg' },
    { id: 29, name: 'Tableau', icon: '/images/tech/node.svg' },
    { id: 21, name: 'Keras', icon: '/images/tech/firebase.svg' },
    { id: 22, name: 'PyTorch', icon: '/images/tech/kotlin.svg' },
    { id: 23, name: 'Tableau', icon: '/images/tech/node.svg' },
    { id: 24, name: 'Qlik', icon: '/images/tech/mongodb.svg' },
  ],
  Software: [
    { id: 25, name: 'PyTorch', icon: '/images/tech/kotlin.svg' },
    { id: 26, name: 'TensorFlow', icon: '/images/tech/flutter.svg' },
    { id: 27, name: 'TensorFlow', icon: '/images/tech/flutter.svg' },
    { id: 28, name: 'Keras', icon: '/images/tech/firebase.svg' },
    { id: 29, name: 'Tableau', icon: '/images/tech/node.svg' },
    { id: 30, name: 'Qlik', icon: '/images/tech/mongodb.svg' },
    { id: 31, name: 'PyTorch', icon: '/images/tech/kotlin.svg' },
    { id: 32, name: 'TensorFlow', icon: '/images/tech/flutter.svg' },
    { id: 33, name: 'Qlik', icon: '/images/tech/mongodb.svg' },
    { id: 34, name: 'Python', icon: '/images/tech/aws.svg' },
    { id: 35, name: 'Keras', icon: '/images/tech/firebase.svg' },
    { id: 36, name: 'Keras', icon: '/images/tech/firebase.svg' },
    { id: 37, name: 'Python', icon: '/images/tech/aws.svg' },
    { id: 38, name: 'Python', icon: '/images/tech/aws.svg' },
    { id: 39, name: 'Qlik', icon: '/images/tech/mongodb.svg' },
    { id: 40, name: 'Tableau', icon: '/images/tech/node.svg' },
    { id: 41, name: 'Tableau', icon: '/images/tech/node.svg' },
    { id: 42, name: 'PyTorch', icon: '/images/tech/kotlin.svg' },
    { id: 43, name: 'TensorFlow', icon: '/images/tech/flutter.svg' },
    { id: 44, name: 'Keras', icon: '/images/tech/firebase.svg' },
    { id: 45, name: 'Python', icon: '/images/tech/aws.svg' },
    { id: 46, name: 'PyTorch', icon: '/images/tech/kotlin.svg' },
    { id: 47, name: 'Tableau', icon: '/images/tech/node.svg' },
    { id: 48, name: 'Qlik', icon: '/images/tech/mongodb.svg' },
  ],
  Mobile: [
    { id: 39, name: 'Qlik', icon: '/images/tech/mongodb.svg' },
    { id: 40, name: 'Tableau', icon: '/images/tech/node.svg' },
    { id: 41, name: 'Tableau', icon: '/images/tech/node.svg' },
    { id: 42, name: 'PyTorch', icon: '/images/tech/kotlin.svg' },
    { id: 43, name: 'TensorFlow', icon: '/images/tech/flutter.svg' },
    { id: 44, name: 'Keras', icon: '/images/tech/firebase.svg' },
    { id: 45, name: 'Python', icon: '/images/tech/aws.svg' },
    { id: 46, name: 'PyTorch', icon: '/images/tech/kotlin.svg' },
    { id: 47, name: 'Tableau', icon: '/images/tech/node.svg' },
    { id: 48, name: 'Qlik', icon: '/images/tech/mongodb.svg' },
  ],
  Blockchain: [
    { id: 31, name: 'PyTorch', icon: '/images/tech/kotlin.svg' },
    { id: 32, name: 'TensorFlow', icon: '/images/tech/flutter.svg' },
    { id: 33, name: 'Qlik', icon: '/images/tech/mongodb.svg' },
    { id: 34, name: 'Python', icon: '/images/tech/aws.svg' },
    { id: 35, name: 'Keras', icon: '/images/tech/firebase.svg' },
    { id: 36, name: 'Keras', icon: '/images/tech/firebase.svg' },
  ],
};
