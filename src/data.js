export const meetings = [
  {
    id: "acme",
    title: "Acme Corp · Quarterly Business Review",
    short: "Acme Corp QBR",
    time: "Today, 14:00–15:00",
    date: "Oct 13, 2026",
    host: "You",
    people: "5 participants · 2 external",
    tag: "Customer meetings",
    brief: true,
    status: "Upcoming",
  },
  {
    id: "product",
    title: "Product Leadership Sync",
    short: "Product Leadership Sync",
    time: "Today, 11:00–11:45",
    date: "Oct 13, 2026",
    host: "Priya Shah",
    people: "6 participants",
    tag: "Product leadership",
    brief: false,
    status: "Finished",
  },
  {
    id: "jordan",
    title: "Jordan Lee · Weekly 1:1",
    short: "Jordan Lee · Weekly 1:1",
    time: "Yesterday, 16:30–17:00",
    date: "Oct 12, 2026",
    host: "You",
    people: "2 participants",
    tag: "1:1s",
    brief: true,
    status: "Finished",
  },
  {
    id: "design",
    title: "Design critique · Quick brief",
    short: "Design critique",
    time: "Oct 9, 15:00–15:45",
    date: "Oct 9, 2026",
    host: "You",
    people: "8 participants",
    tag: "Design critique",
    brief: false,
    status: "Finished",
  },
];
export const briefItems = [
  {
    text: "Ava Brooks’s team pushed back on Enterprise pricing and will bring a phased-seat counter-proposal.",
    sources: ["Gmail"],
  },
  {
    text: "The pricing concern is team-driven, not an executive objection.",
    sources: ["Gmail"],
  },
  {
    text: "SSO security review is approved. Sandbox access promised before today is still pending.",
    sources: ["My Notes", "Gmail"],
  },
  {
    text: "EU data residency remains open since the procurement introduction.",
    sources: ["My Notes"],
  },
];
export const followUps = [
  {
    id: "summary",
    title: "Meeting summary to Google Docs",
    kind: "Workflow",
    state: "needs-action",
    detail:
      "The summary is ready for your approval before it is saved to Google Docs.",
    icon: "FileText",
  },
  {
    id: "email",
    title: "Follow-up email to attendees",
    kind: "Workflow",
    state: "completed",
    detail: "Sent to 5 attendees with decisions and next steps.",
    icon: "Mail",
  },
  {
    id: "recap",
    title: "Draft recap email to Ava Brooks",
    kind: "Workflow",
    state: "completed",
    detail: "A draft is ready to review before sending.",
    icon: "Mail",
  },
  {
    id: "message",
    title: "Ask Ava to confirm the phased rollout",
    kind: "Suggested",
    state: "suggested",
    detail: "Confirm the order for Customer Success and Sales.",
    icon: "MessageSquare",
  },
  {
    id: "staffing",
    title: "Create rollout owner checklist",
    kind: "Suggested",
    state: "suggested",
    detail: "Turn the owners and deadlines into a shared checklist.",
    icon: "ListChecks",
  },
];
export const taskGroups = [
  {
    meeting: "Acme Corp · Quarterly Business Review",
    date: "Today · 14:00",
    id: "acme",
    items: [
      {
        id: "t1",
        title: "Confirm the phased rollout sequence with Ava",
        owner: "You",
        due: "Today",
        source: "Decision at 14:23",
      },
      {
        id: "t2",
        title: "Provide sandbox access for SSO validation",
        owner: "Jordan Lee",
        due: "Tomorrow",
        source: "Action item at 14:37",
      },
      {
        id: "t3",
        title: "Share revised Enterprise pricing proposal",
        owner: "You",
        due: "Thursday",
        source: "Next step at 14:49",
      },
    ],
  },
  {
    meeting: "Product Leadership Sync",
    date: "Today · 11:00",
    id: "product",
    items: [
      {
        id: "t4",
        title: "Confirm Q4 design review owners",
        owner: "Priya Shah",
        due: "Friday",
        source: "Action item at 11:29",
      },
      {
        id: "t5",
        title: "Publish the release readiness checklist",
        owner: "You",
        due: "Friday",
        source: "Next step at 11:41",
      },
    ],
  },
  {
    meeting: "Jordan Lee · Weekly 1:1",
    date: "Yesterday · 16:30",
    id: "jordan",
    items: [
      {
        id: "t6",
        title: "Send Jordan the sandbox testing plan",
        owner: "You",
        due: "Tomorrow",
        source: "Action item at 16:52",
      },
    ],
  },
];
export const tags = [
  {
    id: "customer",
    name: "Customer meetings",
    count: 8,
    updated: "Updated today",
    insight:
      "The Acme rollout has a new pricing proposal and an open sandbox dependency.",
    action: "Review customer risks",
    color: "blue",
  },
  {
    id: "product",
    name: "Product leadership",
    count: 5,
    updated: "Updated today",
    insight:
      "Q4 design ownership is still open across two leadership meetings.",
    action: "Review open decisions",
    color: "purple",
  },
  {
    id: "design",
    name: "Design critique",
    count: 3,
    updated: "Updated Oct 9",
    insight: "The same onboarding concern appeared in the last two critiques.",
    action: "Compare feedback",
    color: "peach",
  },
  {
    id: "one",
    name: "1:1s",
    count: 7,
    updated: "Updated yesterday",
    insight: "Jordan is waiting on a sandbox testing plan before Thursday.",
    action: "View next steps",
    color: "green",
  },
  {
    id: "mfu",
    name: "MFU Daily Stand-Up",
    count: 34,
    updated: "Updated Oct 9",
    insight: "Three blockers from this week remain unresolved.",
    action: "Review blockers",
    color: "amber",
  },
];
export const people = {
  recommended: [
    {
      id: "dawn",
      name: "Dawn Song",
      role: "Manager of Speech · AI",
      initials: "DS",
      tone: "peach",
    },
    {
      id: "george",
      name: "George Wang",
      role: "Machine Learning Engineer",
      initials: "GW",
      tone: "blue",
    },
    {
      id: "alan",
      name: "Alan He",
      role: "Manager of Engineering",
      initials: "AH",
      tone: "green",
    },
    {
      id: "sera",
      name: "Sera Zhang",
      role: "Product Design · Platform",
      initials: "SZ",
      tone: "purple",
    },
    {
      id: "junjie",
      name: "Junjie Zhou",
      role: "Software Engineer",
      initials: "JZ",
      tone: "amber",
    },
  ],
  followed: [
    {
      id: "mu",
      name: "Mu Han",
      role: "Chief Development Officer · Engineer R&D",
      email: "mu.han@zoom.us",
      initials: "MH",
      type: "Internal",
      tone: "peach",
      insight: "Mu mentioned the enterprise launch twice this month.",
    },
    {
      id: "sue",
      name: "Sue Wang",
      role: "Product Manager · Product",
      email: "sue.wang@zoom.us",
      initials: "SW",
      type: "Internal",
      tone: "blue",
      insight: "Sue is tracking Q4 design review ownership.",
    },
    {
      id: "jay",
      name: "Jay Wu",
      role: "Head of Zoom AI Productivity · Platform R&D",
      email: "jay.wu@zoom.us",
      initials: "JW",
      type: "Internal",
      tone: "green",
      insight: "Jay asked for a clearer release readiness view.",
    },
    {
      id: "andrew",
      name: "Andrew Hu",
      role: "Head of Product · Product",
      email: "andrew.hu@zoom.us",
      initials: "AH",
      type: "Internal",
      tone: "purple",
      insight: "Andrew wants an update on customer follow-ups.",
    },
    {
      id: "ava",
      name: "Ava Brooks",
      role: "VP of Operations · Acme Corp",
      email: "ava.brooks@acme.example",
      initials: "AB",
      type: "External",
      tone: "amber",
      insight: "Ava is waiting for the revised rollout plan.",
    },
  ],
};
export const noteCopy = {
  acme: {
    outcome:
      "Acme confirmed a phased rollout starting with Customer Success and Sales. The team will validate SSO in the sandbox before procurement reviews final pricing.",
    decisions: [
      "Use a three-phase rollout for 2,000 seats, beginning October 26.",
      "Review the revised Enterprise proposal on Thursday.",
    ],
    questions: [
      "Which team will own sandbox access for the SSO test?",
      "Does EU data residency change the rollout timeline?",
    ],
  },
  product: {
    outcome:
      "The team aligned on the Q4 review schedule and release readiness work. Design ownership remains open for the next milestone.",
    decisions: [
      "Publish one release readiness checklist for Product and Engineering.",
      "Resolve Q4 design review ownership by Friday.",
    ],
    questions: [
      "Who signs off on the design review?",
      "Which launch risks need an executive decision?",
    ],
  },
  jordan: {
    outcome:
      "Jordan will coordinate sandbox testing and share an updated SSO validation plan.",
    decisions: [
      "Start the sandbox validation as soon as access is granted.",
      "Keep the Acme rollout team informed of test results.",
    ],
    questions: ["When will the sandbox be available?"],
  },
  design: {
    outcome:
      "The team reviewed Quick Brief entry points and agreed to simplify the in-meeting layout.",
    decisions: [
      "Keep the brief available in meeting and on the note detail page.",
      "Show cited sources next to each brief item.",
    ],
    questions: [
      "How much of the brief should remain visible while taking notes?",
    ],
  },
};
export const jordanBriefItems = [
  {
    text: "Jordan is preparing the SSO sandbox validation plan for the Acme rollout.",
    sources: ["My Notes"],
  },
  {
    text: "The next dependency is access to the customer sandbox.",
    sources: ["My Notes"],
  },
];
