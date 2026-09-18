import { ogImage, OG_SIZE, OG_CONTENT_TYPE } from "@/lib/og";
import { locationBySlug, locations } from "@/data/locations";
import { headline } from "../copy";

export const alt = "Hire Nevil Krishna K, full stack developer";
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export const generateStaticParams = async () =>
  locations.map((location) => ({ location: location.slug }));

const Image = async ({ params }: { params: Promise<{ location: string }> }) => {
  const { location: slug } = await params;
  const location = locationBySlug(slug);

  return ogImage({
    eyebrow: location
      ? `Hire a developer in ${location.name}`
      : "Hire a developer",
    title: location ? location.name : "Hire me",
    description: location
      ? headline(location)
      : "Full stack developer, Thrissur, Kerala.",
  });
};

export default Image;
