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
          priority
          width={720}
          height={720}
          sizes="(min-width: 1024px) 22rem, 18rem"
          draggable="false"
          className="size-72 object-cover md:size-80 xl:size-88"
          src={heroImage}
          alt="Nevil Krishna K, full stack developer in Thrissur, Kerala"
        />
      ) : (
        <div className="flex size-72 items-center justify-center text-muted-foreground md:size-80 xl:size-88">
          <span className="text-base uppercase tracking-[0.22em]">no image</span>
        </div>
      )}
    </Squircle>
  );
};

export default HeroImage;
