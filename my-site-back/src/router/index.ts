// src/router/index.tsx
import { lazy } from "react";
import { Navigate } from "react-router-dom";
import type { RouteObject } from "react-router-dom";

// Layout 组件
import Layout from "@/layouts";

// 页面组件（动态导入）
const RedirectPage = lazy(() => import("@/views/redirect"));
const LoginPage = lazy(() => import("@/views/login"));
const NotFound = lazy(() => import("@/views/error/404"));
const HomePage = lazy(() => import("@/views/home"));

const routes: RouteObject[] = [
  {
    path: "/redirect",
    element: <Layout />,
    children: [
      {
        path: ":path/*", // React 不支持 regex path，这里简写为通配
        element: <RedirectPage />,
        meta: { hidden: true },
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />,
    meta: { hidden: true },
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/index" />,
      },
      {
        path: "index",
        element: <HomePage />,
        meta: { title: "首页", icon: "dashboard", affix: true },
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
    meta: { hidden: true },
  },
];

export default routes;
