// src/routes/index.tsx
import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';

// 使用懒加载优化性能
const Layout = lazy(() => import('@/views/Layout'));
// const Home = lazy(() => import('@/views/Home'));
// const TimeLine = lazy(() => import('@/views/Pigeonhole/TimeLine'));
// const Category = lazy(() => import('@/views/Pigeonhole/Category'));
// const Tags = lazy(() => import('@/views/Pigeonhole/Tags'));
// const TreeHole = lazy(() => import('@/views/Amusement/TreeHole'));
// const MessageLayout = lazy(() => import('@/views/Amusement/Message'));
// const MessageList = lazy(() => import('@/views/Amusement/Message/MessageList'));
// const MessageDetail = lazy(() => import('@/views/Amusement/Message/MessageDetail'));
// const Link = lazy(() => import('@/views/Link'));
// const Music = lazy(() => import('@/views/Music'));
// const About = lazy(() => import('@/views/About'));
// const Photo = lazy(() => import('@/views/Photo'));
// const Article = lazy(() => import('@/views/Article'));
// const WelcomeLayout = lazy(() => import('@/views/Welcome'));
const Login = lazy(() => import('@/views/Welcome/Login'));
// const Register = lazy(() => import('@/views/Welcome/Register'));
// const Reset = lazy(() => import('@/views/Welcome/Reset'));
// const Setting = lazy(() => import('@/views/Setting'));

interface RouteMeta {
  title: string;
  requiresAuth?: boolean;
}

interface CustomRouteObject extends RouteObject {
  meta?: RouteMeta;
  children?: CustomRouteObject[];
}

export const constantRoutes: CustomRouteObject[] = [
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        index: true,
        element: <Home />,
        meta: {
          title: 'Ruyu-blog | 不断追求完美的开源博客'
        }
      },
      {
        path: 'timeline',
        element: <TimeLine />,
        meta: {
          title: '时间轴'
        }
      },
      {
        path: 'category/:id?',
        element: <Category />,
        meta: {
          title: '文章分类'
        }
      },
      {
        path: 'tags/:id?',
        element: <Tags />,
        meta: {
          title: '文章标签'
        }
      },
      {
        path: 'tree-hole',
        element: <TreeHole />,
        meta: {
          title: '心灵树洞'
        }
      },
      {
        path: 'message',
        element: <MessageLayout />,
        children: [
          {
            index: true,
            element: <MessageList />,
            meta: {
              title: '留言板'
            }
          },
          {
            path: 'detail/:id?',
            element: <MessageDetail />,
            meta: {
              title: '留言详情'
            }
          }
        ]
      },
      {
        path: 'link',
        element: <Link />,
        meta: {
          title: '博客友链'
        }
      },
      {
        path: 'music',
        element: <Music />,
        meta: {
          title: '音乐'
        }
      },
      {
        path: 'about',
        element: <About />,
        meta: {
          title: '关于网站'
        }
      },
      {
        path: 'photo',
        element: <Photo />,
        meta: {
          title: '相册'
        }
      }
    ]
  },
  {
    path: 'article/:id',
    element: <Article />,
    meta: {
      title: '文章详情'
    }
  },
  {
    path: 'welcome',
    element: <WelcomeLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
        meta: {
          title: '用户登录'
        }
      },
      {
        path: 'register',
        element: <Register />,
        meta: {
          title: '用户注册'
        }
      },
      {
        path: 'reset',
        element: <Reset />,
        meta: {
          title: '重置密码'
        }
      }
    ]
  },
  {
    path: 'setting',
    element: <Setting />,
    meta: {
      title: '用户设置',
      requiresAuth: true
    }
  },
  {
    path: '*',
    element: <Navigate to="/" replace />
  }
];

// 路由元数据处理hook
export function useRouteMeta() {
  const location = useLocation();
  const matched = useMatches();
  
  const currentRoute = matched[matched.length - 1];
  return currentRoute?.meta as RouteMeta | undefined;
}