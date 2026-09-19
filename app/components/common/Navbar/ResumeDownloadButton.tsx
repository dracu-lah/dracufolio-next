import { GetResumeAPI } from "@/services/api";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "@/components/common/icons";

const ResumeDownloadButton = async () => {
  const resumeLink = await GetResumeAPI();
  if (resumeLink) {
    return (
      <a href={resumeLink} target="_blank">
        {/* Quieter than the WhatsApp button next to it on purpose: a header
            with two loud buttons has no primary action. */}
        <Button variant="ghost">
          <DownloadIcon className="size-5" />
          Resume
        </Button>
      </a>
    );
  }
};

export default ResumeDownloadButton;
