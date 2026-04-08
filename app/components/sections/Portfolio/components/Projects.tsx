"use client";
import Image from "next/image";
import { Globe, X, Github, Maximize2 } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { type Projects } from "@/types/appwrite";

// Project Card Component
const ProjectCard = ({
  project,
  onImageClick,
}: {
  project: Projects[0];
  onImageClick: (imageUrl: string) => void;
}) => {
  const [isImageHovered, setIsImageHovered] = useState(false);

  return (
    <div className="bg-card border-2 dark:border-secondary/20 border-secondary/60 snap-center overflow-hidden  flex flex-col min-w-80   ">
      <div
        className="relative"
        onMouseEnter={() => setIsImageHovered(true)}
        onMouseLeave={() => setIsImageHovered(false)}
      >
        <div className="aspect-video">
          <Image
            draggable="false"
            fill
            src={project.img_url}
            className="cursor-pointer w-full h-full  lg:hover:opacity-80 duration-300 object-cover"
            alt={project.project_title}
            onClick={() => onImageClick(project.img_url)}
          />
        </div>

        {/* Maximize icon on hover */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${
            isImageHovered ? "opacity-0 lg:opacity-100" : "opacity-0"
          }`}
          onClick={() => onImageClick(project.img_url)}
        >
          <Maximize2 size={40} className="text-white drop-shadow-lg" />
        </div>

        {/* Links container */}
        <ProjectLinks project={project} />
      </div>
      <ProjectContent project={project} />
    </div>
  );
};

// Project Links Component
const ProjectLinks = ({ project }: { project: Projects[0] }) => {
  return (
    <div className="absolute top-2 right-2 flex gap-2">
      {project.project_link && (
        <Button asChild>
          <a
            target="_blank"
            href={project.project_link}
            rel="noopener noreferrer"
            aria-label="Visit project website"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-medium">Link</span>
            <Globe size={20} />
          </a>
        </Button>
      )}
      {project.github_link && (
        <Button asChild>
          <a
            target="_blank"
            href={project.github_link}
            rel="noopener noreferrer"
            aria-label="View GitHub repository"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="font-medium">Code</span>
            <Github size={20} className="" />
          </a>
        </Button>
      )}
    </div>
  );
};

// Project Content Component
const ProjectContent = ({ project }: { project: Projects[0] }) => {
  type WordTrimmer = (
    text: string,
    maxWords?: number,
    ellipsis?: string,
  ) => string;

  const trimTo100Words: WordTrimmer = (
    text,
    maxWords = 100,
    ellipsis = "...",
  ) => {
    // 💡 Fix: Use a new variable (words) instead of reassigning 't' (text)
    const words = (text || "").trim().split(/\s+/);

    return words.length <= maxWords
      ? words.join(" ")
      : words.slice(0, maxWords).join(" ") + ellipsis;
  };
  return (
    <div className="flex-1 flex flex-col">
      <div className="px-6 py-4 flex-1">
        <div className="font-bold text-xl text-left mb-2">
          {project.project_title}
        </div>
        <p className="opacity-60 line-clamp-3 whitespace-break-spaces  text-justify text-sm md:text-base">
          {trimTo100Words(project.project_meta_description)}
        </p>
      </div>
      <div className="px-4 pb-4 overflow-hidden">
        {project.project_skills.map((skill: string, index: number) => (
          <span
            key={index}
            className="font-bold bg-secondary rounded-full px-3 py-1 text-xs m-1 inline-block"
          >
            #{skill}
          </span>
        ))}
      </div>
    </div>
  );
};

// Image Modal Component
const ImageModal = ({
  imageUrl,
  onClose,
}: {
  imageUrl: string;
  onClose: () => void;
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    // Add event listener when modal is mounted
    document.addEventListener("keydown", handleEscape);

    // Remove event listener when modal is unmounted
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300"
      onClick={onClose}
    >
      <div className="relative max-w-5xl max-h-[90vh] w-full animate-in zoom-in-95 duration-300 ease-out">
        <Button
          onClick={onClose}
          className="absolute -top-12 right-0 bg-white/10 hover:bg-white/20 text-white transition-all duration-200 hover:scale-110"
          aria-label="Close modal"
        >
          <X size={24} />
        </Button>
        <Image
          src={imageUrl}
          alt="Project preview"
          width={1920}
          height={1080}
          className="w-full h-auto  object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </div>
  );
};

// Main Projects Component
const Projects = ({ projects }: { projects: Projects }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const openModal = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      {/* Mobile: Horizontal Scroll */}
      <div className="relative lg:hidden">
        <div
          ref={scrollRef}
          className="gap-4 max-w-[90vw] snap-x snap-mandatory overflow-x-scroll overflow-y-hidden flex scrollbar-visible"
        >
          {projects.map((project: Projects[0]) => (
            <ProjectCard
              key={project.$id}
              project={project}
              onImageClick={openModal}
            />
          ))}
        </div>
      </div>

      {/* Desktop: Bento Grid */}
      <div className="hidden lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {projects.map((project: Projects[0]) => (
          <ProjectCard
            key={project.$id}
            project={project}
            onImageClick={openModal}
          />
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal imageUrl={selectedImage} onClose={closeModal} />
      )}
    </>
  );
};

export default Projects;
