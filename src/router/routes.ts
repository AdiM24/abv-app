import HomePage from "../pages/home/HomePage";
import LoginPage from "../pages/login/LoginPage";

// other
import { FC } from "react";
import PartnerPage from "../pages/PartnerPage";

// interface
interface Route {
  key: string;
  title: string;
  path: string;
  enabled: boolean;
  component: FC<{}>;
}

export const routes: Array<Route> = [
  {
    key: "home-route",
    title: "Home",
    path: "/",
    enabled: true,
    component: HomePage,
  },
  {
    key: "about-route",
    title: "About",
    path: "/login",
    enabled: true,
    component: LoginPage,
  },
  {
    key: "partner-route",
    title: "Partner",
    path: "/partner",
    enabled: true,
    component: PartnerPage,
  },
];
