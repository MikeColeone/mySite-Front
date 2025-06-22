import { Navigate, useRoutes } from 'react-router-dom';
import Layout from '@/views/Layout';
import Home from '@/views/Home';
import TimeLine from '@/views/Pigeonhole/TimeLine';
import Category from '@/views/Pigeonhole/Category';
import Tags from '@/views/Pigeonhole/Tags';
import TreeHole from '@/views/Amusement/TreeHole';
import Message from '@/views/Amusement/Message';
import MessageList from '@/views/Amusement/Message/MessageList';
import MessageDetail from '@/views/Amusement/Message/MessageDetail';
import Link from '@/views/Link';
import Music from '@/views/Music';
import About from '@/views/About';
import Photo from '@/views/Photo';
import Article from '@/views/Article';
import Welcome from '@/views/Welcome';
import Login from '@/views/Welcome/Login';
import Register from '@/views/Welcome/Register';
import Reset from '@/views/Welcome/Reset';
import Setting from '@/views/Setting';

export function AppRoutes() {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'timeline', element: <TimeLine /> },
        { path: 'category/:id?', element: <Category /> },
        { path: 'tags/:id?', element: <Tags /> },
        { path: 'tree-hole', element: <TreeHole /> },
        {
          path: 'message',
          element: <Message />,
          children: [
            { index: true, element: <MessageList /> },
            { path: 'detail/:id?', element: <MessageDetail /> },
          ],
        },
        { path: 'link', element: <Link /> },
        { path: 'music', element: <Music /> },
        { path: 'about', element: <About /> },
        { path: 'photo', element: <Photo /> },
      ],
    },
    { path: 'article/:id', element: <Article /> },
    {
      path: 'welcome',
      element: <Welcome />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: 'reset', element: <Reset /> },
        { index: true, element: <Navigate to="login" replace /> },
      ],
    },
    { path: 'setting', element: <Setting /> },
    { path: '*', element: <Navigate to="/" replace /> },
  ]);
}