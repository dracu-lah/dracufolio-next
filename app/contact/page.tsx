import ContactSection from "@/components/sections/Contact";
import Footer from "@/components/common/Footer";
import BackLink from "@/components/common/BackLink";
import JsonLd from "@/components/common/JsonLd";
import { AUTHOR, breadcrumbJsonLd, pageMetadata, SITE_URL } from "@/lib/seo";

const description =
  "Get in touch with Nevil Krishna K, full stack React and Next.js developer in Thrissur, Kerala. Email, LinkedIn, or the form on this page.";

export const metadata = pageMetadata({
  title: "Contact",
  description,
  path: "/contact",
});

const ContactPage = () => (
  <>
    <JsonLd
      data={[
        {
          "@context": "https://schema.org",
          "@type": "ContactPage",
          name: `Contact | ${AUTHOR}`,
          description,
          url: `${SITE_URL}/contact`,
          mainEntity: {
            "@type": "Person",
            name: AUTHOR,
            url: SITE_URL,
            email: "mailto:nevilkrishna@gmail.com",
          },
        },
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ]),
      ]}
    />
    <main className="mx-auto max-w-6xl px-6 md:px-10 pt-28 md:pt-32">
      <BackLink />
    </main>
    <ContactSection asPage />
    <Footer />
  </>
);

export default ContactPage;
