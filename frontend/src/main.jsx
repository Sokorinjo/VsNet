import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router-dom";
import HomePage from "./views/HomePage.jsx";
import LoginPage from "./views/LoginPage.jsx";
import RegisterPage from "./views/RegisterPage.jsx";
import ErrorPage from "./views/ErrorPage.jsx";
import { Provider } from "react-redux";
import store from "./app/store.js";
import UpdateUserProfile from "./views/UpdateUserProfile.jsx";
import ProtectRoute from "./components/ProtectRoute.jsx";
import Prefetch from "./features/auth/Prefetch.jsx";
import PersistLogin from "./features/auth/PersistLogin.jsx";
import Welcome from "./views/Welcome.jsx";
import SettingsPage from "./views/SettingsPage.jsx";
import NewsPage from "./views/NewsPage.jsx";
import InfoPage from "./views/InfoPage.jsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route element={<PersistLogin />}>
        <Route element={<Welcome />}>
          <Route element={<Prefetch />}>
            <Route index={true} element={<HomePage />} />
            <Route path="/profile" element={<UpdateUserProfile />} />
            <Route path="/settings" element={<SettingsPage />}/>
            <Route path="/news" element={<NewsPage />}/>
            <Route path="/info" element={<InfoPage />}/>
            <Route path="/comments/:postId" element={<InfoPage />}/>
            
          </Route>
          {/* <Route path="" element={<ProtectRoute />}> */}
        </Route>
      </Route>

      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
      {/* <App /> */}
    </Provider>
  </React.StrictMode>
);
