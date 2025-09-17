export interface FAQ {
  question: string;
  answer: string;
  keywords: string[];
}

export const faqData: FAQ[] = [
  {
    question: 'How do I report an issue?',
    answer: 'To report an issue, tap the "+" button on the Community screen, take a photo, add a description, and select the issue category. Your location will be automatically detected.',
    keywords: ['report', 'issue', 'submit', 'how to', 'create']
  },
  {
    question: 'Where can I track my reports?',
    answer: 'You can track all your reports by tapping on your profile icon in the top left of the Community screen. This will take you to "My Reports" where you can see the status of all your submissions.',
    keywords: ['track', 'status', 'my reports', 'follow up', 'progress']
  },
  {
    question: 'Which department handles drainage issues?',
    answer: 'Drainage and water-related issues are handled by the Public Works Department. They typically respond within 48-72 hours depending on severity.',
    keywords: ['drainage', 'water', 'flood', 'sewer', 'department']
  },
  {
    question: 'How long does it take to fix potholes?',
    answer: 'Pothole repairs are managed by the Roads Department. Minor potholes are usually fixed within 5-7 business days, while major road repairs may take 2-3 weeks.',
    keywords: ['pothole', 'road', 'repair', 'time', 'how long']
  },
  {
    question: 'Can I vote on issues reported by others?',
    answer: 'Yes! You can vote on community issues by tapping the "I face this too 👍" button on any issue. This helps prioritise which problems get addressed first.',
    keywords: ['vote', 'voting', 'support', 'community', 'prioritise']
  },
  {
    question: 'What information do I need to provide when reporting?',
    answer: 'When reporting an issue, please provide: a clear photo, accurate location, detailed description, and select the appropriate category. The more details, the faster we can help!',
    keywords: ['information', 'details', 'photo', 'location', 'description']
  }
];
