import { GetResumeAPI } from "@/services/api";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "@/components/common/icons";

const ResumeDownloadButton = async () => {
  const resumeLink = await GetResumeAPI();
  if (resumeLink) {
    return (
      /* Quieter than the WhatsApp button next to it on purpose: a header
         with two loud buttons has no primary action. */
      <Button asChild variant="ghost">
        <a href={resumeLink} target="_blank">
          <DownloadIcon className="size-5" />
          Resume
        </a>
      </Button>
    );
  }
};

export default ResumeDownloadButton;
