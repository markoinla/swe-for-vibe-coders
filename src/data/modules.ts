// The curriculum. Each module groups a set of lessons (MDX files in
// src/content/lessons/<slug>/). `status` lets us ship the site with the first
// module fully built and the rest visibly "coming soon".

export type ModuleStatus = 'available' | 'coming-soon';

export interface Module {
  slug: string;
  title: string;
  emoji: string;
  tagline: string;
  description: string;
  status: ModuleStatus;
}

export const modules: Module[] = [
  {
    slug: 'version-control',
    title: 'Version Control',
    emoji: '🌳',
    tagline: 'Save points for your code',
    description:
      'What git actually is, commits as save points, branches, reading a diff, and undoing mistakes safely — the single highest-leverage skill for anyone shipping code.',
    status: 'available',
  },
  {
    slug: 'working-with-ai',
    title: 'Working with AI Tools',
    emoji: '🤖',
    tagline: 'Drive the AI, don’t get driven',
    description:
      'Small changes, reviewing generated code, writing prompts as specs, and knowing when to distrust the machine. How to stay in control of a codebase the AI is helping you write.',
    status: 'available',
  },
  {
    slug: 'reading-code',
    title: 'Reading Code You Didn’t Write',
    emoji: '🔎',
    tagline: 'Follow the thread',
    description:
      'Tracing how a program flows, searching a codebase, and making sense of a file you’ve never seen before — without reading every line.',
    status: 'coming-soon',
  },
  {
    slug: 'testing',
    title: 'Testing Basics',
    emoji: '✅',
    tagline: 'Prove it works',
    description:
      'What a test actually is, why it saves you hours of manual clicking, and writing your very first one. Confidence to change code without breaking it.',
    status: 'coming-soon',
  },
  {
    slug: 'dont-break-prod',
    title: 'Don’t Break Production',
    emoji: '🚦',
    tagline: 'Safety rails',
    description:
      'Environments, secrets and .env files, why you never commit API keys, and basic security hygiene. The mistakes that are embarrassing to make and easy to avoid.',
    status: 'coming-soon',
  },
  {
    slug: 'debugging',
    title: 'Debugging',
    emoji: '🐛',
    tagline: 'Find the actual problem',
    description:
      'Reading stack traces, moving beyond console.log, and narrowing a bug down systematically instead of changing things at random.',
    status: 'coming-soon',
  },
  {
    slug: 'shipping',
    title: 'Shipping',
    emoji: '🚀',
    tagline: 'Get it out the door',
    description:
      'Pull requests, code review, what "deploying" means, and how to roll back when something goes wrong. Going from "works on my machine" to live.',
    status: 'coming-soon',
  },
];

export const moduleBySlug = (slug: string) =>
  modules.find((m) => m.slug === slug);
