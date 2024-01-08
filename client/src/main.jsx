import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import UserProvider, { UserContext} from "./context/UserContext.jsx"
import { BrowserRouter } from "react-router-dom";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
