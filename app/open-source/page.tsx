import OpenSourceSection from "@/components/sections/OpenSource";
import Footer from "@/components/common/Footer";
import BackLink from "@/components/common/BackLink";
import JsonLd from "@/components/common/JsonLd";
import { AUTHOR, breadcrumbJsonLd, pageMetadata, SITE_URL } from "@/lib/seo";

const description =
  "Open-source work by Nevil Krishna K: Resume Builder on js.org, LangSync, a shadcn/ui image cropper registry component, Sway and Hyprland dotfiles, and community contributions.";

export const metadata = pageMetadata({
  title: "Open Source",
  description,
  path: "/open-source",
});

const OpenSourcePage = () => (
  <>
    <JsonLd
      data={[
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `Open Source | ${AUTHOR}`,
          description,
          url: `${SITE_URL}/open-source`,
          author: { "@type": "Person", name: AUTHOR, url: SITE_URL },
        },
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Open Source", path: "/open-source" },
        ]),
      ]}
    />
    <main className="mx-auto max-w-6xl px-6 pt-28 md:pt-32">
      <BackLink />
    </main>
    <OpenSourceSection asPage />
    <Footer />
  </>
);

export default OpenSourcePage;
