import { lazy } from 'react';

// 懒加载页面组件
const Home = lazy(() => import('@/views/Home'));
const Message = lazy(() => import('@/views/Message'));
const About = lazy(() => import('@/views/About'));
const CategoryArticleList = lazy(() => import('@/views/Category/ArticleList'));
const TagArticleList = lazy(() => import('@/views/Tag/ArticleList'));
const Friend = lazy(() => import('@/views/Friend'));
const Archive = lazy(() => import('@/views/Archive'));
const User = lazy(() => import('@/views/User'));
const Category = lazy(() => import('@/views/Category'));
const Tag = lazy(() => import('@/views/Tag'));
const Picture = lazy(() => import('@/views/Picture'));
const AlbumList = lazy(() => import('@/views/Album/Album'));
const AlbumPhotos = lazy(() => import('@/views/Album/Photo'));
const TalkList = lazy(() => import('@/views/Talk/TalkList'));
const TalkDetail = lazy(() => import('@/views/Talk/Talk'));
const ArticleDetail = lazy(() => import('@/views/Article/Article'));
const NotFound = lazy(() => import('@/views/404'));

// 路由配置
export const routes = [
  {
    path: '/',
    element: <Home />,
    meta: { title: '首页' }
  },
  {
    path: '/message',
    element: <Message />,
    meta: { title: '留言' }
  },
  {
    path: '/about',
    element: <About />,
    meta: { title: '关于' }
  },
  {
    path: '/category/:categoryId',
    element: <CategoryArticleList />
  },
  {
    path: '/tag/:tagId',
    element: <TagArticleList />
  },
  {
    path: '/friend',
    element: <Friend />,
    meta: { title: '友链' }
  },
  {
    path: '/archive',
    element: <Archive />,
    meta: { title: '归档' }
  },
  {
    path: '/user',
    element: <User />,
    meta: { title: '个人中心' }
  },
  {
    path: '/category',
    element: <Category />,
    meta: { title: '分类' }
  },
  {
    path: '/tag',
    element: <Tag />,
    meta: { title: '标签' }
  },
  {
    path: '/picture',
    element: <Picture />,
    meta: { title: '图床' }
  },
  {
    path: '/album',
    element: <AlbumList />,
    meta: { title: '相册' }
  },
  {
    path: '/album/:albumId',
    element: <AlbumPhotos />
  },
  {
    path: '/talk',
    element: <TalkList />,
    meta: { title: '说说' }
  },
  {
    path: '/talk/:id',
    element: <TalkDetail />,
    meta: { title: '说说' }
  },
  {
    path: '/article/:id',
    element: <ArticleDetail />,
    meta: { title: '文章' }
  },
  {
    path: '/404',
    element: <NotFound />,
    meta: { title: '404' }
  },

  {
    path: '*',
    redirect: '/404'
  }
];
    