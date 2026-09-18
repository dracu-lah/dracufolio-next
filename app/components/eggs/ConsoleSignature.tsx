"use client";
import { useEffect } from "react";
import { PHONE_DISPLAY, WHATSAPP_URL } from "@/data/contact";
import { SITE_URL } from "@/lib/seo";

/**
 * For the people who open devtools on a portfolio, which on this site is most
 * of the audience worth having. Costs nothing, ships no markup, and puts the
 * number in front of somebody who was already curious enough to look.
 */
const ConsoleSignature = () => {
  useEffect(() => {
    const heading = [
      "",
      "  ██   ██ ███████ ██    ██ ██ ██",
      "  ██   ██ ██      ██    ██ ██ ██",
      "  ███  ██ █████   ██    ██ ██ ██",
      "  ██  ███ ██       ██  ██  ██ ██",
      "  ██   ██ ███████   ████   ██ ███████",
      "",
    ].join("\n");

    console.log(
      `%c${heading}`,
      "color:#7dd3a0;font-family:monospace;font-size:11px;line-height:1.1",
    );
    console.log(
      "%cFull stack developer, Thrissur, Kerala.",
      "font-family:monospace;font-size:12px",
    );
    console.log(
      `%cSource       %c${SITE_URL.replace("https://", "")}/source`,
      "color:#8a8a8a;font-family:monospace",
      "font-family:monospace",
    );
    console.log(
      `%cWhatsApp     %c${PHONE_DISPLAY}  ${WHATSAPP_URL.split("?")[0]}`,
      "color:#8a8a8a;font-family:monospace",
      "font-family:monospace",
    );
    console.log(
      "%cShortcuts    %cpress ? on any page",
      "color:#8a8a8a;font-family:monospace",
      "font-family:monospace",
    );
  }, []);

  return null;
};

export default ConsoleSignature;
