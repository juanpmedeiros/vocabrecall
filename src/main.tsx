import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import { ToastProvider } from "./contexts/ToastContext";
import { VocabRecallProvider } from "./contexts/VocabRecallContext";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <VocabRecallProvider>
    <ToastProvider>
      <App />
    </ToastProvider>
  </VocabRecallProvider>
);
  