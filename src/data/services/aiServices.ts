export const header = {
  title: 'Technology for every industry, success for every client',
  description:
    'Our solutions are custom-built to push existing technological boundaries and meet the specific needs of every sector we serve.',
};

export const backgroundImage = '/images/aiServices/serviceSectionBackground.svg';

export const tgheading = 'Our AI development service expertise';

export const tgdescription
  = 'Pixelette Technologies has been a globally trusted artificial intelligence development company for 6 years. We have top AI development talent that makes use of the latest AI tools and technologies to drive exponential business growth for our clients.';

export const tgexpertiseAreas = [
  { title: 'Machine Learning' },
  { title: 'Deep Learning' },
  { title: 'Natural Language Processing (NLP)' },
  { title: 'Robotic Process Automation' },
  { title: 'Computer Vision' },
];

// Define the mapping for additional data
export const extraDataMapping = {
  'Machine Learning': {
    title: 'Machine Learning Insights',
    description:
        'Explore advanced algorithms and techniques for supervised and unsupervised learning.',
  },
  'Deep Learning': {
    title: 'Deep Learning Revolution',
    description: 'Understand neural networks, CNNs, and RNNs for deep learning systems.',
  },
  'Natural Language Processing (NLP)': {
    title: 'NLP Applications',
    description: 'Discover how NLP powers chatbots, sentiment analysis, and more.',
  },
  'Robotic Process Automation': {
    title: 'Automation Simplified',
    description:
        'Learn about streamlining workflows with RPA for enhanced productivity.',
  },
  'Computer Vision': {
    title: 'Vision Beyond Limits',
    description:
        'Dive into image recognition, object detection, and real-time vision systems.',
  },
};

export const ocheading = 'Our Commitment to Excellence';

export const ocdescription
  = 'Excellence serves as our starting point. We work tirelessly towards achieving remarkable results that elevate the bar for technological advancements everywhere.';

export const commitmentData = [
  {
    img: '/images/aiServices/McDonald.svg',
    value1: '80%',
    value2: '85%',
    value3: '60%',
    desc1: 'Reduction in review analysis time',
    desc2: 'Accuracy in predictive analysis',
    desc3: 'Improvement in overall efficiency',
  },
  {
    img: '/images/aiServices/Lytics.svg',
    value1: '200%',
    value2: '70%',
    value3: '3X',
    desc1: 'Expansion of new sources monitored',
    desc2: 'Efficiency of AI based scraping',
    desc3: 'Increase in real-time handling capacity',
  },
  {
    img: '/images/aiServices/PSA.svg',
    value1: '90%',
    value2: '95%',
    desc1: 'Satisfaction with speech quality',
    desc2: 'Text-to-speech accuracy',
  },
];

export const aiHeroHeading = 'AI Development Services';

export const aiHeroDescription
  = 'From concept to deployment, we deliver adaptive, scalable AI solutions that bring your vision of intelligent technology to life.';

export const aiHeroButtonText = 'AI Development Services';

export const aiHeroButtonLink = 'AI Development Services';

export const aiHeroBackgroundImage = '/images/aiServices/heroSectionBackground.svg';

export const aiHeroImages = [
  { src: '/images/aiServices/box_1.svg', alt: 'box 1' },
  { src: '/images/aiServices/box_2.svg', alt: 'box 2' },
  { src: '/images/aiServices/box_3.svg', alt: 'box 3' },
  { src: '/images/aiServices/box_4.svg', alt: 'box 4' },
];

export const aiServicesHeading = 'Our Services';

export const aiServicesDescription
  = 'Our AI development services empower businesses to tap into extensive data, driving measurable results. As an award-winning AI software development company, we specialize in turning ideas into actionable insights, making efficiency and quick decision-making unavoidable. Let’s collaborate to bring your AI vision to life and to its intended audience!';

export const aiServicelist
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
export const aiServices = {
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

export const aiTechnologies: Technologies = {
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
