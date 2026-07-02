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
    <figure className="relative border border-border bg-card">
      {heroImage ? (
        <Image
          priority
          width={720}
          height={720}
          sizes="(min-width: 1024px) 22rem, 18rem"
          draggable="false"
          className="size-72 object-cover md:size-80 xl:size-88"
          src={heroImage}
          alt="Portrait of Nevil Krishna K, frontend engineer"
        />
      ) : (
        <div className="flex size-72 items-center justify-center text-muted-foreground md:size-80 xl:size-88">
          <span className="text-sm uppercase tracking-[0.3em]">no image</span>
        </div>
      )}
      <span
        aria-hidden
        className="absolute -top-px -left-px size-5 border-t-2 border-l-2 border-foreground"
      />
      <span
        aria-hidden
        className="absolute -top-px -right-px size-5 border-t-2 border-r-2 border-foreground"
      />
      <span
        aria-hidden
        className="absolute -bottom-px -left-px size-5 border-b-2 border-l-2 border-foreground"
      />
      <span
        aria-hidden
        className="absolute -right-px -bottom-px size-5 border-r-2 border-b-2 border-foreground"
      />
    </figure>
  );
};

export default HeroImage;
