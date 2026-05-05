export type Discipline =
  | 'Brand Strategy'
  | 'Creative Direction'
  | 'UX / Service Design'
  | 'Screenwriting'
  | 'Other'

export interface Agent {
  slug: string
  agentName: string
  discipline: Discipline
  creatorName: string
  creatorSlug: string
  rating: number
  sessionCount: number
  satisfactionPct: number
  quote: string
  bio: string[]
  methodology: string[]
  isAvailable: boolean
  /* [PLACEHOLDER] */
  clients: string[]
  collaboratorSlugs: string[]
}

/* [PLACEHOLDER] — ambassador names aspirational, not confirmed */
export const AGENTS: Agent[] = [
  {
    slug: 'the-strategist',
    agentName: 'The Strategist',
    discipline: 'Brand Strategy',
    creatorName: 'Alex HM Smith',
    creatorSlug: 'alex-hm-smith',
    rating: 4.9,
    sessionCount: 847,
    satisfactionPct: 98,
    quote:
      "Strategy isn't about knowing the answer. It's about asking the question no one else thought to ask.",
    bio: [
      'Twenty years shaping how ambitious brands find their place in the world. From challenger startups to category leaders, the work has always been the same: locate the true tension, name it precisely, and build from there.',
      'This agent carries that process — the diagnostic questions, the positioning frameworks, the hard conversations — so your team can move faster without losing depth.',
    ],
    methodology: [
      'Every engagement starts with the same question: what are you actually competing for? Not in the market, but in the mind. The positioning work follows from there.',
      'Frameworks are only useful if they survive contact with reality. Every output from this agent is designed to be stress-tested, argued with, and improved by your team.',
    ],
    isAvailable: true,
    clients: ['Nike', 'Airbnb', 'Stripe', 'Figma', 'Monzo'],
    collaboratorSlugs: ['the-director', 'the-copywriter'],
  },
  {
    slug: 'the-director',
    agentName: 'The Director',
    discipline: 'Creative Direction',
    creatorName: 'Ben Ditto',
    creatorSlug: 'ben-ditto',
    rating: 4.8,
    sessionCount: 623,
    satisfactionPct: 96,
    quote: 'Good creative direction is invisible. You feel it before you understand it.',
    bio: [
      'Built a career directing work that looked inevitable in hindsight but was never obvious in the making. The discipline is knowing which instinct to follow and which to interrogate.',
      'This agent distils that editorial sense — the ability to assess creative work at any stage and know precisely what it needs next.',
    ],
    methodology: [
      'Creative direction is mostly editing. The first question for any piece of work: what is this trying to feel like, and is it succeeding? Everything else follows from an honest answer to that.',
      'Good feedback is specific and actionable. This agent gives you the diagnosis and the direction, not just a verdict.',
    ],
    isAvailable: true,
    clients: ['Apple', 'Dior', 'Spotify', 'Vice', 'Prada'],
    collaboratorSlugs: ['the-strategist', 'the-producer'],
  },
  {
    slug: 'the-writer',
    agentName: 'The Writer',
    discipline: 'Screenwriting',
    creatorName: 'Francesca Sloane',
    creatorSlug: 'francesca-sloane',
    rating: 4.9,
    sessionCount: 412,
    satisfactionPct: 97,
    quote: 'Character is revealed in the moments people try to hide.',
    bio: [
      'A decade writing for television — series that demanded structure, character depth, and the kind of tonal consistency that only comes from knowing your world completely.',
      'This agent carries that narrative discipline into any context where story matters: pitches, treatments, character development, structural analysis.',
    ],
    methodology: [
      'Every story problem is a character problem. Before looking at plot, this agent asks who wants what, why they cannot have it, and what it will cost them to get it.',
      'Structure is invisible when it works. The goal is always to make the architecture disappear so the emotion can land.',
    ],
    isAvailable: true,
    clients: ['Netflix', 'HBO', 'A24', 'BBC', 'Amazon'],
    collaboratorSlugs: ['the-director', 'the-producer'],
  },
  {
    slug: 'the-designer',
    agentName: 'The Designer',
    discipline: 'UX / Service Design',
    creatorName: 'John Maeda',
    creatorSlug: 'john-maeda',
    rating: 4.7,
    sessionCount: 1204,
    satisfactionPct: 95,
    quote: 'Simplicity is about subtracting the obvious and adding the meaningful.',
    bio: [
      'Decades at the intersection of design, technology, and leadership — building products, institutions, and teams that last. The throughline has always been: make complex things feel simple without making them thin.',
      'This agent brings that lens to product decisions, design critiques, and systems thinking at scale.',
    ],
    methodology: [
      "Simplicity is not minimalism. It is the removal of everything that does not serve the user's actual need. That requires understanding the need more precisely than the user can articulate it.",
      'Technology changes fast. Principles do not. This agent applies durable design thinking to whatever you are building, regardless of platform or medium.',
    ],
    isAvailable: true,
    clients: ['Google', 'Microsoft', 'IDEO', 'Automattic', 'Patagonia'],
    collaboratorSlugs: ['the-researcher', 'the-architect'],
  },
  {
    slug: 'the-researcher',
    agentName: 'The Researcher',
    discipline: 'UX / Service Design',
    creatorName: 'Priya Nair',
    creatorSlug: 'priya-nair',
    rating: 4.8,
    sessionCount: 389,
    satisfactionPct: 94,
    quote: "The most dangerous assumption in design is that you already know what the user wants.",
    bio: [
      'Fifteen years running qualitative and quantitative research programs for products used by millions. The work is always the same: get close enough to see what people actually do, not what they say they do.',
      'This agent carries rigorous research methodology into your design process — from study design to synthesis to the findings that change product direction.',
    ],
    methodology: [
      'Good research starts with a question precise enough to be answerable. This agent helps you sharpen the question before you run a single session.',
      'Synthesis is where research earns its value. The agent turns raw findings into actionable insight, mapped to the decisions you are actually facing.',
    ],
    isAvailable: true,
    clients: ['Uber', 'Shopify', 'Atlassian', 'Spotify', 'Twitter'],
    collaboratorSlugs: ['the-designer', 'the-architect'],
  },
  {
    slug: 'the-copywriter',
    agentName: 'The Copywriter',
    discipline: 'Brand Strategy',
    creatorName: 'Marta Kowalski',
    creatorSlug: 'marta-kowalski',
    rating: 4.6,
    sessionCount: 731,
    satisfactionPct: 93,
    quote: "Every brief is a negotiation between what a brand wants to say and what an audience will actually hear.",
    bio: [
      'Spent twelve years writing for brands that needed to be understood immediately and remembered for longer. Advertising, packaging, digital, editorial — the medium changes, the craft does not.',
      'This agent applies that copy discipline to any communication challenge: positioning statements, campaign concepts, product naming, or just finding the right sentence.',
    ],
    methodology: [
      'Copy fails for one of two reasons: it says the wrong thing clearly, or the right thing badly. Diagnosing which problem you have is the first job.',
      "The best copy sounds like no one wrote it. This agent aims for language that feels inevitable — like the brand could not have said it any other way.",
    ],
    isAvailable: false,
    clients: ['Oatly', 'Innocent', 'BrewDog', 'Mailchimp', 'Slack'],
    collaboratorSlugs: ['the-strategist', 'the-director'],
  },
  {
    slug: 'the-producer',
    agentName: 'The Producer',
    discipline: 'Creative Direction',
    creatorName: 'James Osei',
    creatorSlug: 'james-osei',
    rating: 4.7,
    sessionCount: 518,
    satisfactionPct: 96,
    quote: 'Production is where creative ambition meets physical reality. One of them always bends.',
    bio: [
      'Produced film, commercial, and live projects across four continents. The skill set is part creative, part logistics, part negotiation — knowing what is possible and what to fight for.',
      'This agent brings production intelligence to your projects from the earliest stages, when the decisions that save or cost budget are actually made.',
    ],
    methodology: [
      'The most expensive production mistake is the one made in the brief. This agent works upstream, identifying constraints before they become crises.',
      'Creative ambition and production reality are not opposites. The best producers know how to protect one by being honest about the other.',
    ],
    isAvailable: true,
    clients: ['Nike', 'Google', 'Channel 4', 'Gucci', 'Red Bull'],
    collaboratorSlugs: ['the-director', 'the-writer'],
  },
  {
    slug: 'the-architect',
    agentName: 'The Architect',
    discipline: 'UX / Service Design',
    creatorName: 'Sofia Bernardini',
    creatorSlug: 'sofia-bernardini',
    rating: 4.9,
    sessionCount: 276,
    satisfactionPct: 99,
    quote: "Information architecture is the skeleton. Get it wrong and nothing else can fix it.",
    bio: [
      'Built information architectures for some of the most complex digital products in use today — platforms where millions of decisions are made every day, guided by structure users never consciously notice.',
      'This agent applies that structural thinking to any product or content challenge that needs clarity at scale.',
    ],
    methodology: [
      'Most navigation problems are actually taxonomy problems. Before moving anything, this agent maps what exists and how users actually think about it — often very different things.',
      'Good IA feels like common sense. Getting there requires systematic analysis, user mental models, and enough iterations to find the shape that works.',
    ],
    isAvailable: true,
    clients: ['Wikipedia', 'Gov.uk', 'Salesforce', 'Adobe', 'Zendesk'],
    collaboratorSlugs: ['the-designer', 'the-researcher'],
  },
]

export function getAgentBySlug(slug: string): Agent | undefined {
  return AGENTS.find((a) => a.slug === slug)
}

export const DISCIPLINE_FILTERS = [
  'All',
  'UX / Service Design',
  'Brand Strategy',
  'Creative Direction',
  'Screenwriting',
] as const

export type DisciplineFilter = (typeof DISCIPLINE_FILTERS)[number]
