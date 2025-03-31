import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./Context/AuthContext.jsx";
import { Provider } from "react-redux";
import store,{persistor} from "./Store/store.jsx";
import { PersistGate } from "redux-persist/integration/react";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
      </BrowserRouter>
      </PersistGate>
  </Provider>
);
