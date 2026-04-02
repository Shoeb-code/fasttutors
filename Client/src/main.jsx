import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "aos/dist/aos.css";
import AOS from "aos";
import { LoadScript } from "@react-google-maps/api";

AOS.init({ duration: 1000, once: true });



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
      libraries={["places"]}
    >
      <App />
    </LoadScript>
  </StrictMode>
);