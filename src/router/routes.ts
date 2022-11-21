import HomePage from "../pages/home/HomePage";

// other
import { FC } from "react";
import PartnerPage from "../pages/partners/PartnersPage";
import { Business, Home } from "@mui/icons-material";
import CreatePartnerPage from "../pages/partners/CreatePartnerPage";

// interface
export interface RouteDefinition {
  key: string;
  title: string;
  path: string;
  enabled: boolean;
  component: FC<{}>;
  icon?: any;
  nested?: any[];
}

export const routes: Array<RouteDefinition> = [
  {
    key: "home-route",
    title: "Home",
    path: "/",
    enabled: true,
    component: HomePage,
    icon: Home,
  },
  {
    key: "partners-route",
    title: "Partners",
    path: "/partners",
    enabled: true,
    component: PartnerPage,
    icon: Business,
    nested: [
      {
        key: "partners-create-route",
        title: "Create partner",
        path: "/partners/create",
        enabled: true,
        component: CreatePartnerPage,
      },
    ],
  },
];
