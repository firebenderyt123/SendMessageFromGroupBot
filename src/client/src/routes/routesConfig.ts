import { DashboardPage, LoginPage, NotFoundPage } from "../pages";

const routes = [
  {
    path: "/",
    component: DashboardPage,
    exact: true,
    isPrivate: false,
  },
  {
    path: "/login",
    component: LoginPage,
    exact: true,
    isPrivate: false,
  },
  {
    path: "*",
    component: NotFoundPage,
    exact: true,
    isPrivate: false,
  },
];

export default routes;
