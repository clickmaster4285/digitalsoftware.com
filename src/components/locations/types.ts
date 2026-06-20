// types.ts
export interface LocationClientProps {
  location: any;
  serviceName: string;
  cityName: string;
  geoParagraphs: string[];
  features: { title: string; body: string }[];
  caseStudies: { title: string; body: string; metric?: string }[];
  faqs: { question: string; answer: string }[];
}

export interface ClickItem {
  letter: string;
  title: string;
  desc: string;
  icon: any;
}