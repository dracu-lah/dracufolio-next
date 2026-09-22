import { GetHeroImageAPI } from "@/services/api";
import { Squircle } from "@/components/ui/squircle";
import Image from "next/image";
import React from "react";

const HeroImage = async () => {
  let heroImage: string | null = null;
  try {
    heroImage = await GetHeroImageAPI();
  } catch (error) {
    console.error("Failed to load hero image:", error);
  }

  return (
    <Squircle
      as="figure"
      borderWidth={1}
      fillClassName="bg-card"
      className="overflow-hidden bg-border"
    >
      {heroImage ? (
        <Image
          /* `priority` is deprecated in Next 16 and only emits the preload
             link, which then carries no priority hint at all: Lighthouse asks
             for `fetchpriority=high` on the LCP request and this is the LCP
             element on every viewport. */
          preload
          fetchPriority="high"
          width={720}
          height={720}
          sizes="(min-width: 1280px) 22rem, (min-width: 1024px) 20rem, (min-width: 768px) 16rem, 14rem"
          draggable="false"
          className="size-56 object-cover md:size-64 lg:size-80 xl:size-88"
          src={heroImage}
          alt="Nevil Krishna K, full stack developer in Thrissur, Kerala"
        />
      ) : (
        <div className="flex size-56 items-center justify-center text-muted-foreground md:size-64 lg:size-80 xl:size-88">
          <span className="text-base">no image</span>
        </div>
      )}
    </Squircle>
  );
};

export default HeroImage;
