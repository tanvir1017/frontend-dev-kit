declare global {
  interface Window {
    dataLayer: any[];
  }
}

// Function to track events via dataLayer (e.g., Google Tag Manager)
export const trackEvent = (event: string, data?: Record<string, any>) => {
  if (typeof window !== "undefined" && window.dataLayer) {
    window.dataLayer.push({ event, ...data });
  }
};

// Function to load a tracking pixel
export const loadTrackingPixel = (
  url: string,
  eventData?: Record<string, any>
) => {
  if (typeof window !== "undefined") {
    // Create a new image element for the tracking pixel
    const img = new Image(1, 1); // 1x1 pixel
    img.src =
      url + (eventData ? `?${new URLSearchParams(eventData).toString()}` : "");
    img.style.display = "none"; // Hide the pixel
    document.body.appendChild(img);

    // Optional: Clean up by removing the image after loading
    img.onload = () => document.body.removeChild(img);
  }
};

// In a component or page
// import { trackEvent, loadTrackingPixel } from '../lib/integrations';

// Track an event via dataLayer
trackEvent("purchase", { value: 99.99, currency: "USD" });

// Track a conversion with a pixel
loadTrackingPixel("https://tracking.example.com/pixel", {
  event: "conversion",
  userId: "12345",
});
