import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "@/providers/theme-provider";
import AuthProvider from "@/providers/auth-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider delayDuration={200}>
          <Toaster
            position="top-center"
            reverseOrder={false}
            toastOptions={{
              style: {
                backgroundColor: "var(--secondary)",
                color: "var(--secondary-foreground)",
              },
            }}
          />
          <App />
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>
);
