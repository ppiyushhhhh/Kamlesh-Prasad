/**
 * Offline fallback answers for the "Kamlesh AI" chatbot.
 * Used ONLY when the /api/chat endpoint is unreachable or returns an error,
 * so visitors always get a useful answer sourced from the portfolio content.
 * Mirrors api/_knowledge.ts - never invent facts.
 */

interface OfflineTopic {
  keywords: string[];
  answer: string;
}

const OFFLINE_TOPICS: OfflineTopic[] = [
  {
    keywords: ["who", "kamlesh", "about", "introduce", "yourself", "profile", "background"],
    answer:
      "Kamlesh Prasad is the Chief Technology Officer (CTO) at Runwal Realty, based in Mumbai, India. He is a senior IT leader with over 22 years of experience, including 12+ years in Retail, 8 years with IBM & Accenture, and 4 years in Technical Support Services for India & USA. His leadership spans Digital Transformation, IT Security, Merger IT Integration, Data & Analytics, and IT Operations.",
  },
  {
    keywords: ["experience", "work", "career", "companies", "job", "roles", "history", "worked"],
    answer:
      "Kamlesh's career journey:\n\n- Runwal Realty - Chief Technology Officer (CTO), May 2026 - Present\n- Nexus Malls - General Manager, Information Technology & Cyber Security (9 years)\n- Avenue E-Commerce Limited - Manager, IT Infrastructure / Start-Up Lead (3 years)\n- Accenture Consulting Services - Consulting, IT Infrastructure (1 year)\n- IBM - IT Infrastructure roles (part of 8 years across IBM & Accenture)\n- Sitel India Pvt Ltd - Team Manager (4 years)",
  },
  {
    keywords: ["current", "runwal", "cto", "present", "now", "latest role"],
    answer:
      "Kamlesh is currently the Chief Technology Officer (CTO) at Runwal Realty (May 2026 - Present, Mumbai). He drives enterprise-wide Digital Transformation across Retail and Real Estate, leads SAP, Salesforce, and IT Infrastructure modernization programs, and heads the Information Security & Cyber Security practice with a Zero Trust posture.",
  },
  {
    keywords: ["nexus", "mall", "general manager", "9 years"],
    answer:
      "At Nexus Malls, Kamlesh served as General Manager - Information Technology & Cyber Security for 9 years, leading IT operations, digital transformation, and cyber security for one of India's largest retail mall portfolios.",
  },
  {
    keywords: ["skill", "expertise", "technology", "technologies", "tech stack", "good at", "strengths"],
    answer:
      "Kamlesh's core expertise includes Digital Transformation, IT Infrastructure, Cyber Security & InfoSec, SAP, Salesforce, Cloud technologies, IT Governance, Program Management, M&A IT Integration, Data & Analytics, IT Operations, and Stakeholder Engagement. He has partnered with technology providers like IBM, TCS, Wipro, and Accenture.",
  },
  {
    keywords: ["cyber", "security", "infosec", "information security", "grc", "devsecops"],
    answer:
      "Kamlesh heads Information Security & Cyber Security with a Zero Trust approach. He won the 'Best Cybersecurity Management Initiative' award at Nexus Select Malls, was recognized as 'DevOps Security Expert of the Year' at the DevOps 2.0 Confex & Awards 2026 (Mumbai), received the 'Best GRC Strategy for DevSecOps' recognition at the AppDevSec Show 2025, and the 'Digital Retail Guardian Award 2026' for retail cyber security leadership.",
  },
  {
    keywords: ["certification", "certified", "certificate", "cissp", "cism", "qualification"],
    answer:
      "Kamlesh holds multiple professional certifications in IT leadership, cyber security, and infrastructure. You can see the full, up-to-date list in the Certifications section of this portfolio, or click 'View Resume' below for details.",
  },
  {
    keywords: ["award", "achievement", "recognition", "honor", "honour", "won", "prize"],
    answer:
      "Kamlesh has received numerous awards, including:\n\n- DevOps Security Expert of the Year - DevOps 2.0 Confex & Awards 2026\n- Digital Retail Guardian Award 2026\n- Best GRC Strategy for DevSecOps - AppDevSec Show 2025\n- Dell Technologies World 2025 invitation (Las Vegas)\n- upGrad Leadership Excellence Program (2024)\n- Nexus One Heroes Recognition (2024)\n- Best Technology Implementation of the Year - CIO Conclave & Awards 2024\n- Best Cybersecurity Management Initiative - Nexus Select Malls\n- Quantic Cyber Security Excellence Awards 2023 - IT Infrastructure Leader of the Year",
  },
  {
    keywords: ["education", "degree", "study", "college", "university", "mba", "academic"],
    answer:
      "Kamlesh's academic background includes executive and leadership education such as the upGrad Leadership Excellence Program, alongside his professional qualifications. The full details are in the Education section of this portfolio.",
  },
  {
    keywords: ["contact", "email", "reach", "connect", "linkedin", "hire", "location"],
    answer:
      "You can reach Kamlesh through the 'Let's Connect' contact form on this page, or via LinkedIn: linkedin.com/in/kamleshsprasad0512. He is based in Mumbai, Maharashtra, India.",
  },
  {
    keywords: ["why", "hire", "value", "bring", "fit", "choose"],
    answer:
      "Companies choose Kamlesh because he combines 22+ years of hands-on IT leadership with board-level strategic thinking. He has delivered digital transformation, cyber security programs, M&A IT integrations, and cost-effective technology roadmaps aligned with business goals - while building and leading cross-functional teams that deliver results in competitive, fast-changing environments.",
  },
  {
    keywords: ["cloud", "aws", "azure", "sap", "salesforce"],
    answer:
      "Kamlesh leads cloud and enterprise platform programs including SAP, Salesforce, and modern cloud infrastructure. At Runwal Realty he is driving SAP, Salesforce, and IT Infrastructure modernization as part of enterprise-wide digital transformation.",
  },
  {
    keywords: ["resume", "cv", "download"],
    answer:
      "You can view Kamlesh's full resume by clicking the 'View Resume' link just below this chat input.",
  },
];

const DEFAULT_ANSWER =
  "Kamlesh Prasad is the CTO at Runwal Realty with 22+ years of IT leadership experience across digital transformation, cyber security, and infrastructure. Try asking me about his experience, skills, certifications, awards, or how to contact him.";

/** Match a user question against the offline knowledge base. */
export function getOfflineAnswer(question: string): string {
  const q = question.toLowerCase();
  let best: { topic: OfflineTopic; score: number } | null = null;

  for (const topic of OFFLINE_TOPICS) {
    const score = topic.keywords.reduce(
      (acc, kw) => (q.includes(kw) ? acc + kw.length : acc),
      0,
    );
    if (score > 0 && (!best || score > best.score)) {
      best = { topic, score };
    }
  }

  return best ? best.topic.answer : DEFAULT_ANSWER;
}
