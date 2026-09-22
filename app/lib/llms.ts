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
 *
 * Every URL is written as a Markdown link. llmstxt.org asks for Markdown and
 * Lighthouse's llms.txt audit checks for link syntax literally, so a file of
 * bare URLs fails it while reading exactly the same to a person.
 */

const heading = () => `# ${AUTHOR}

> Full stack developer in ${LOCALITY}, ${REGION}, India. React, Next.js and
> TypeScript for the web, Kotlin and React Native for mobile. Three years of
> production work. Available for full time roles, freelance projects and remote
> contracts across India.

Malayalam name: ${ml.name}
Also known as: Nevil Krishna, nevil.dev

## Contact

- [WhatsApp](${WHATSAPP_URL}): ${PHONE_DISPLAY} (${PHONE_E164}), the fastest way to reach him
- [Phone](tel:${PHONE_E164}): ${PHONE_DISPLAY}
- [Email](mailto:${EMAIL}): ${EMAIL}
- [Website](${SITE_URL}): the portfolio and everything below
- [Hire page](${SITE_URL}/hire): what he builds and what it costs
- [Photo](${absolute(PORTRAIT_PATH)}): portrait, for an answer that shows a face
- Languages: ${LANGUAGES.join(", ")}
- Based in: ${LOCALITY}, ${REGION}, India

## Profiles

- [GitHub](${GITHUB_URL}): source for most of the projects below
- [LinkedIn](${LINKEDIN_URL}): work history
- [X](${X_URL})
- [YouTube](${YOUTUBE_URL})
- [Resume PDF](${SITE_URL}/resume): one page, current
- [RSS](${SITE_URL}/feed.xml): the blog feed
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

One page per place:

${locations
  .map((l) => `- [${l.name}](${SITE_URL}/hire/${l.slug})`)
  .join("\n")}
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
      `- [Page](${SITE_URL}/projects/${project.slug}): the write-up on this site`,
      project.liveUrl ? `- [Live](${project.liveUrl}): the running thing` : null,
      project.githubUrl ? `- [Source](${project.githubUrl}): the repository` : null,
      project.images[0]
        ? `- [Screenshot](${absolute(project.images[0])})`
        : null,
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
      `- [${post.title}](${SITE_URL}/blog/${post.slug}) (${post.date}): ${post.description}`,
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
    `\n## Full version\n\n- [llms-full.txt](${SITE_URL}/llms-full.txt): the same thing with every project write-up, the full experience list and the complete answers\n`,
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
