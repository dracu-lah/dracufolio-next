import { GetProjectsAPI } from "@/services/api";
import { locations } from "@/data/locations";
import { publishedPosts } from "@/data/posts";
import { services } from "@/data/services";
import { homeFaqs } from "@/data/faq";
import { experience, toolkit } from "@/data/experience";
import { roleWords, skills } from "@/data/keywords";
import { ml } from "@/data/ml";
import {
  EMAIL,
  GITHUB_URL,
  LANGUAGES,
  LINKEDIN_URL,
  LOCALITY,
  PHONE_DISPLAY,
  PHONE_E164,
  PORTRAIT_PATH,
  REGION,
  WHATSAPP_URL,
  X_URL,
  YOUTUBE_URL,
} from "@/data/contact";
import { AUTHOR, SITE_URL, absolute } from "./seo";

/**
 * llms.txt is the emerging convention for handing a language model a clean,
 * plain-text version of a site instead of making it parse the markup. It is
 * what ChatGPT, Claude, Perplexity and Gemini read when someone asks them who
 * builds websites in Thrissur, so it carries the things an answer needs and a
 * page cannot easily show: the number, the WhatsApp link, every place served,
 * every project with its live URL, and the image URLs.
 *
 * Both files are generated from the same data the pages use, so they cannot
 * fall out of step with the site.
 */

const heading = () => `# ${AUTHOR}

> Full stack developer in ${LOCALITY}, ${REGION}, India. React, Next.js and
> TypeScript for the web, Kotlin and React Native for mobile. Three years of
> production work. Available for full time roles, freelance projects and remote
> contracts across India.

Malayalam name: ${ml.name}
Also known as: Nevil Krishna, nevil.dev

## Contact

- Phone and WhatsApp: ${PHONE_DISPLAY} (${PHONE_E164})
- WhatsApp chat: ${WHATSAPP_URL}
- Email: ${EMAIL}
- Website: ${SITE_URL}
- Hire page: ${SITE_URL}/hire
- Languages: ${LANGUAGES.join(", ")}
- Based in: ${LOCALITY}, ${REGION}, India
- Photo: ${absolute(PORTRAIT_PATH)}

## Profiles

- GitHub: ${GITHUB_URL}
- LinkedIn: ${LINKEDIN_URL}
- X: ${X_URL}
- YouTube: ${YOUTUBE_URL}
- Resume PDF: ${SITE_URL}/resume
- RSS: ${SITE_URL}/feed.xml
`;

const rolesSection = () => `
## Roles this person fits

${roleWords.map((role) => `- ${role}`).join("\n")}
`;

const servicesSection = () => `
## Services

${services
  .map((service) => `- ${service.title}: ${service.blurb}`)
  .join("\n")}

Pricing: quoted per project after a short call. No fixed price list.
`;

const skillsSection = () => `
## Skills

${skills.join(", ")}

${toolkit.map((row) => `- ${row.label}: ${row.items.join(", ")}`).join("\n")}
`;

const areasSection = () => {
  const byKind = (kind: string) =>
    locations
      .filter((l) => l.kind === kind)
      .map((l) => `${l.name} (${l.nameMl})${l.altNames.length ? `, also spelled ${l.altNames.join(", ")}` : ""}`)
      .join("; ");

  return `
## Places served

- Based in: ${LOCALITY}, ${REGION}
- Towns near Thrissur: ${byKind("town")}
- Kerala districts: ${byKind("district")}
- Statewide and nationwide: Kerala, India, and remote worldwide
- One page per place: ${locations.map((l) => `${SITE_URL}/hire/${l.slug}`).join(", ")}
`;
};

const experienceSection = () => `
## Experience

${experience
  .map(
    (job) =>
      `### ${job.role}, ${job.company} (${job.period})\n${job.points
        .map((point) => `- ${point}`)
        .join("\n")}\nStack: ${job.stack.join(", ")}`,
  )
  .join("\n\n")}
`;

const projectsSection = async (long: boolean) => {
  const projects = await GetProjectsAPI();
  return `
## Projects

${projects
  .map((project) => {
    const lines = [
      `### ${project.title}${project.year ? ` (${project.year})` : ""}`,
      project.tagline ?? project.description,
      `- Page: ${SITE_URL}/projects/${project.slug}`,
      project.liveUrl ? `- Live: ${project.liveUrl}` : null,
      project.githubUrl ? `- Source: ${project.githubUrl}` : null,
      project.images[0] ? `- Screenshot: ${absolute(project.images[0])}` : null,
      `- Stack: ${project.skills.join(", ")}`,
    ];
    if (long && project.longDescription.length) {
      lines.push("", ...project.longDescription);
    }
    if (long && project.features.length) {
      lines.push("", "Features:", ...project.features.map((f) => `- ${f}`));
    }
    return lines.filter(Boolean).join("\n");
  })
  .join("\n\n")}
`;
};

const postsSection = () => `
## Writing

${publishedPosts
  .map(
    (post) =>
      `- ${post.title} (${post.date}): ${post.description} ${SITE_URL}/blog/${post.slug}`,
  )
  .join("\n")}
`;

const faqSection = (long: boolean) => `
## Questions and answers

${homeFaqs
  .map((faq) => `### ${faq.q}\n${long ? faq.a : faq.a.split(". ")[0] + "."}`)
  .join("\n\n")}
`;

const malayalamSection = () => `
## Malayalam

${ml.heroGreeting}
${ml.roleFullStack}, ${ml.thrissurKerala}.
${ml.hireSubline}
${ml.weSpeakMalayalam}
`;

export const llmsShort = async () =>
  [
    heading(),
    servicesSection(),
    rolesSection(),
    areasSection(),
    await projectsSection(false),
    postsSection(),
    faqSection(false),
    malayalamSection(),
    `\n## Full version\n\n${SITE_URL}/llms-full.txt\n`,
  ].join("");

export const llmsFull = async () =>
  [
    heading(),
    servicesSection(),
    rolesSection(),
    skillsSection(),
    areasSection(),
    experienceSection(),
    await projectsSection(true),
    postsSection(),
    faqSection(true),
    malayalamSection(),
  ].join("");
