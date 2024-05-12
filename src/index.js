import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "react-toastify/dist/ReactToastify.css";
import { CurrentChatProvider } from "./Contexts/CurrentChatContext";
import { UserProvider } from "./Contexts/UserModelContext";
import { CurrentConvoProvider } from "./Contexts/CurrentConvoContext";
import { ChatMessageProvider } from "./Contexts/ShowChatMessages";
import { SearchProvider } from "./Contexts/SearchContext";
import { TabsProvider } from "./Contexts/For Small Devices/Tabs";
import { ServerProvider } from "./Contexts/NetworkContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ServerProvider>
    <TabsProvider>
    <SearchProvider>
      <ChatMessageProvider>
        <CurrentConvoProvider>
          <CurrentChatProvider>
            <UserProvider>
              <React.StrictMode>
                <BrowserRouter>
                  <App />
                </BrowserRouter>
              </React.StrictMode>
            </UserProvider>
          </CurrentChatProvider>
        </CurrentConvoProvider>
      </ChatMessageProvider>
    </SearchProvider>
  </TabsProvider>
  </ServerProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
