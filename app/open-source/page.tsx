import OpenSourceSection from "@/components/sections/OpenSource";
import Footer from "@/components/common/Footer";
import BackLink from "@/components/common/BackLink";
import JsonLd from "@/components/common/JsonLd";
import CtaBlock from "@/components/cta/CtaBlock";
import { pageGraph } from "@/lib/schema";
import { AUTHOR, pageMetadata } from "@/lib/seo";
import { CONTENT_DATES } from "@/data/updated";

const description =
  "Open-source work by Nevil Krishna K: Resume Builder on js.org, LangSync, a shadcn/ui image cropper registry component, Sway and Hyprland dotfiles, and community contributions.";

export const metadata = pageMetadata({
  title: "Open Source",
  description,
  path: "/open-source",
  keywords: [
    "open source developer Kerala",
    "Kotlin Android TV app",
    "shadcn/ui registry component",
    "i18n CLI",
  ],
});

const OpenSourcePage = () => (
  <>
    <JsonLd
      data={pageGraph({
        path: "/open-source",
        name: `Open Source | ${AUTHOR}`,
        description,
        type: "CollectionPage",
        dateModified: CONTENT_DATES.openSource,
        breadcrumb: [
          { name: "Home", path: "/" },
          { name: "Open Source", path: "/open-source" },
        ],
      })}
    />
    <main className="mx-auto max-w-7xl px-6 md:px-10 lg:px-14 pt-24 md:pt-28">
      <BackLink />
    </main>
    <OpenSourceSection asPage />
    <CtaBlock message="Hi Nevil, I saw your open source work and wanted to get in touch." />
    <Footer />
  </>
);

export default OpenSourcePage;
