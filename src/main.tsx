import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import ReactQueryProvider from "./provider/ReactQueryProvider.tsx";
import { Toaster } from "sonner";
import { ThemeProvider } from "./provider/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <ReactQueryProvider>
        <Toaster position="top-center" richColors={true} />
        <App />
      </ReactQueryProvider>
    </ThemeProvider>
  </StrictMode>
);
