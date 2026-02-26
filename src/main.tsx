import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { VocabRecallProvider } from "./contexts/VocabRecallContext";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <VocabRecallProvider>
    <App />
  </VocabRecallProvider>
);
  