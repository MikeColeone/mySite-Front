import { ConfigProvider } from "antd";
import zhCN from "antd/locale/zh_CN";
import { useEffect } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { report } from "./api/blog";
import routes from "./router";
import { useAppStore } from "./store/modules/app";

function RouterView() {
  const element = useRoutes(routes);
  return element;
}

function App() {
  const size = useAppStore((state) => state.size);

  useEffect(() => {
    report(); // 模拟上报行为
  }, []);

  return (
    <ConfigProvider locale={zhCN} componentSize={size}>
      <RouterView />
    </ConfigProvider>
  );
}

export default function AppWrapper() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
