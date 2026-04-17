export const CALENDLY_URL = "https://calendly.com/solyn/advisory-call-clone";

export const loadCalendlyScript = () => {
  if (!document.getElementById("calendly-script")) {
    const script = document.createElement("script");
    script.id = "calendly-script";
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.head.appendChild(script);

    const link = document.createElement("link");
    link.href = "https://assets.calendly.com/assets/external/widget.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);
  }
};
