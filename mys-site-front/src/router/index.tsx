// AppRouter.tsx
import React, { useEffect } from 'react'
// 用于定义路由和路由跳转
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
// 动态设置页面标题
import { Helmet, HelmetProvider } from 'react-helmet-async'
// 自定义的路由数组
import { constantRoutes } from './routers'
// 模拟 Vue 中的 GET_TOKEN 方法
import { GET_TOKEN } from '@/utils/auth'

// 定义一个组件用于处理全局路由逻辑（如滚动、标题、权限）
const RouteGuard: React.FC = () => {
  const location = useLocation() // 当前路由信息
  const navigate = useNavigate() // 用于路由跳转

  useEffect(() => {
    // 路由变更后设置标题
    document.title = (location.state as any)?.meta?.title || '默认标题'

    // 模拟 Vue 中的登录判断逻辑
    const isLogin = GET_TOKEN()

    // 模拟 Vue 中的 beforeEach 判断逻辑
    const isWelcomeRoute = location.pathname.startsWith('/welcome')
    if (isLogin && isWelcomeRoute) {
      navigate('/') // 登录后访问 welcome 页面，重定向到首页
    }

    // 滚动到顶部（Vue 中的 afterEach 行为）
    if (location.pathname.includes('/article') || location.pathname.includes('/messageDetail')) {
      window.scrollTo(0, 0)
    }
  }, [location, navigate])

  return (
    <>
      {/* 渲染实际路由页面 */}
      <Routes>
        {constantRoutes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <>
                {/* 动态设置标题 */}
                <Helmet>
                  <title>{route.meta?.title || '默认标题'}</title>
                </Helmet>
                {route.element}
              </>
            }
          />
        ))}
      </Routes>
    </>
  )
}

// 外部包裹整个应用的 Router 提供器
const AppRouter: React.FC = () => {
  return (
    <HelmetProvider>
      <Router>
        <RouteGuard />
      </Router>
    </HelmetProvider>
  )
}

export default AppRouter
