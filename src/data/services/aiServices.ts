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
export const aiExpertiseData = {
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
    { id: 1, name: 'Python', icon: '/images/tech/logos/python.png' },
    { id: 2, name: 'R', icon: '/images/tech/logos/r.png' },
    { id: 3, name: 'Julia', icon: '/images/tech/logos/julia.png' },
    { id: 4, name: 'Java', icon: '/images/tech/logos/Java.png' },
    { id: 4, name: 'C++', icon: '/images/tech/logos/c++.png' },
    { id: 387, name: 'Scala', icon: '/images/tech/logos/scala.png' },
    { id: 18, name: 'JavaScript', icon: '/images/tech/logos/javascript.png' },
    { id: 19, name: 'TypeScript', icon: '/images/tech/logos/typescript.png' },
    { id: 383, name: 'Ruby', icon: '/images/tech/logos/ruby.png' },
    { id: 5, name: 'PHP', icon: '/images/tech/logos/php.png' },
    { id: 421, name: 'Swift', icon: '/images/tech/logos/swift.png' },
    { id: 20, name: 'Go (Golang)', icon: '/images/tech/logos/go.png' },
    { id: 19, name: 'Rust', icon: '/images/tech/logos/rust.png' },
    { id: 5, name: 'Dart', icon: '/images/tech/logos/dart.png' },
    { id: 2, name: 'Objective-C', icon: '/images/tech/logos/objective-c.png' },
    { id: 65, name: 'Bash', icon: '/images/tech/logos/bash.png' },
    { id: 393, name: 'Shell Scripting', icon: '/images/tech/logos/shell-scripting.png' },
    { id: 190, name: 'Haskell', icon: '/images/tech/logos/haskell.png' },
    { id: 131, name: 'Elixir', icon: '/images/tech/logos/elixir.png' },
    { id: 31, name: 'PyTorch', icon: '/images/tech/kotlin.svg' },
    { id: 329, name: 'Perl', icon: '/images/tech/logos/perl.png' },
    { id: 255, name: 'Matlab', icon: '/images/tech/logos/matlab.png' },
    { id: 245, name: 'Lua', icon: '/images/tech/logos/lua.png' },
    { id: 3, name: 'C#', icon: '/images/tech/logos/c#.png' },

    // { id: 4, name: 'TensorFlow', icon: '/images/tech/logos/tensorflow.png' },
    // { id: 5, name: 'PyTorch', icon: '/images/tech/logos/pytorch.png' },
    // { id: 6, name: 'Keras', icon: '/images/tech/logos/keras.png' },
    // { id: 7, name: 'Sci-kit Learn', icon: '/images/tech/logos/scikit-learn.png' },
    // { id: 8, name: 'Hugging Face Transformers', icon: '/images/tech/logos/huggingface.png' },
    // { id: 9, name: 'OpenCV', icon: '/images/tech/logos/opencv.png' },
    // { id: 10, name: 'MXNet', icon: '/images/tech/logos/mxnet.png' },
    // { id: 11, name: 'Apache Spark', icon: '/images/tech/logos/apache-spark.png' },
    // { id: 12, name: 'spaCy', icon: '/images/tech/logos/spacy.png' },
    // { id: 13, name: 'NLTK', icon: '/images/tech/logos/nltk.png' },
    // { id: 14, name: 'Google AI Platform', icon: '/images/tech/logos/google-ai.png' },
    // { id: 15, name: 'AWS SageMaker', icon: '/images/tech/logos/aws-sagemaker.png' },
    // { id: 16, name: 'Microsoft Azure AI', icon: '/images/tech/logos/azure-ai.png' },
    // { id: 17, name: 'IBM Watson', icon: '/images/tech/logos/ibm-watson.png' },
    // { id: 18, name: 'Dialogflow', icon: '/images/tech/logos/dialogflow.png' },
    // { id: 19, name: 'OpenAI', icon: '/images/tech/logos/openai.png' },
    // { id: 20, name: 'Grok', icon: '/images/tech/logos/grok.png' },
    // { id: 21, name: 'Anthropic', icon: '/images/tech/logos/anthropic.png' },
    // { id: 22, name: 'Cohere', icon: '/images/tech/logos/cohere.png' },
    // { id: 23, name: 'Ray RLlib', icon: '/images/tech/logos/ray-rllib.png' },
    // { id: 24, name: 'Dask', icon: '/images/tech/logos/dask.png' },
    // { id: 25, name: 'DataRobot', icon: '/images/tech/logos/datarobot.png' },
    // { id: 26, name: 'DeepStream SDK', icon: '/images/tech/logos/deepstream-sdk.png' },
    // { id: 27, name: 'Pinecone', icon: '/images/tech/logos/pinecone.png' },
    // { id: 28, name: 'Qdrant', icon: '/images/tech/logos/qdrant.png' },
    // { id: 29, name: 'ElasticSearch', icon: '/images/tech/logos/elasticsearch.png' },
    // { id: 30, name: 'PostgreSQL (pgvector)', icon: '/images/tech/logos/postgresql-pgvector.png' },
    // { id: 31, name: 'Redis (Redisearch)', icon: '/images/tech/logos/redis-redisearch.png' },
    // { id: 32, name: 'FAISS', icon: '/images/tech/logos/faiss.png' },
    // { id: 33, name: 'LangChain', icon: '/images/tech/logos/langchain.png' },
    // { id: 34, name: 'LangGraph', icon: '/images/tech/logos/langgraph.png' },
    // { id: 35, name: 'Chroma', icon: '/images/tech/logos/chroma.png' },
    // { id: 36, name: 'HNSWlib', icon: '/images/tech/logos/hnswlib.png' },
  ],
  Software: [
    { id: 26, name: 'TensorFlow', icon: '/images/tech/flutter.svg' },
    { id: 25, name: 'PyTorch', icon: '/images/tech/kotlin.svg' },
    { id: 28, name: 'Keras', icon: '/images/tech/firebase.svg' },
    { id: 7, name: 'Sci-kit Learn', icon: '/images/tech/logos/scikit-learn.png' },
    { id: 8, name: 'Hugging Face Transformers', icon: '/images/tech/logos/huggingface.png' },
    { id: 13, name: 'NLTK', icon: '/images/tech/logos/nltk.png' },
    { id: 402, name: 'Spacy', icon: '/images/tech/logos/spacy.png' },
    { id: 9, name: 'OpenCV', icon: '/images/tech/logos/opencv.png' },
    { id: 10, name: 'MXNet', icon: '/images/tech/logos/mxnet.png' },
    { id: 433, name: 'Theano', icon: '/images/tech/logos/theano.png' },
    { id: 78, name: 'Caffe', icon: '/images/tech/logos/caffe.png' },
    { id: 141, name: 'Fastai', icon: '/images/tech/logos/fastai.png' },
    { id: 324, name: 'Pandas', icon: '/images/tech/logos/pandas.png' },
    { id: 299, name: 'Numpy', icon: '/images/tech/logos/numpy.png' },
    { id: 24, name: 'Dask', icon: '/images/tech/logos/dask.png' },
    { id: 491, name: 'Xgboost', icon: '/images/tech/logos/xgboost.png' },
    { id: 240, name: 'Lightgbm', icon: '/images/tech/logos/lightgbm.png' },
    { id: 81, name: 'Catboost', icon: '/images/tech/logos/catboost.png' },
    { id: 308, name: 'Open3d', icon: '/images/tech/logos/open3d.png' },
    { id: 256, name: 'Matplotlib', icon: '/images/tech/logos/matplotlib.png' },
    { id: 390, name: 'Seaborn', icon: '/images/tech/logos/seaborn.png' },
    { id: 340, name: 'Plotly', icon: '/images/tech/logos/plotly.png' },
    { id: 228, name: 'Jupyter Notebooks', icon: '/images/tech/logos/jupyter-notebooks.png' },
    { id: 116, name: 'Dash', icon: '/images/tech/logos/dash.png' },
    
    { id: 27, name: 'TensorFlow', icon: '/images/tech/flutter.svg' },
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
