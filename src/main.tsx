import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./styles.css";

const root = document.getElementById("root")!;

// The page is prerendered at build time, so hydrate rather than re-render.
if (root.hasChildNodes()) {
  hydrateRoot(root, <StrictMode><App /></StrictMode>);
} else {
  createRoot(root).render(<StrictMode><App /></StrictMode>);
}
