import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import { AuthContextProvider } from "context";
import { EventProvider } from './useEvent'; 


// MINDPROS React Context Provider
import { MaterialUIControllerProvider } from "context";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <BrowserRouter>
    <AuthContextProvider>
      <MaterialUIControllerProvider>
      <EventProvider>
        <App />
        </EventProvider>
      </MaterialUIControllerProvider>
    </AuthContextProvider>
  </BrowserRouter>
);