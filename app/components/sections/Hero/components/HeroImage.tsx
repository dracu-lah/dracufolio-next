import { GetHeroImageAPI } from "@/services/api";
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
    <figure className="overflow-hidden rounded-xl squircle border border-border">
      {heroImage ? (
        <Image
          priority
          width={720}
          height={720}
          sizes="(min-width: 1024px) 22rem, 18rem"
          draggable="false"
          className="size-72 object-cover md:size-80 xl:size-88"
          src={heroImage}
          alt="Portrait of Nevil Krishna K, full stack developer"
        />
      ) : (
        <div className="flex size-72 items-center justify-center text-muted-foreground md:size-80 xl:size-88">
          <span className="text-sm uppercase tracking-[0.3em]">no image</span>
        </div>
      )}
    </figure>
  );
};

export default HeroImage;
