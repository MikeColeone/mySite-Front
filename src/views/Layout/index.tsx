import React from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './fade.css'; // 包含过渡动画的样式

const AppLayout: React.FC = () => {
  const location = useLocation();
  
  // 判断是否显示页脚（树洞页面不显示）
  const shouldShowFooter = location.pathname !== '/tree-hole';

  return (
    <div className="app-container">
      <header className="app-header">
        {/* 这里放头部内容 */}
        <h1>网站标题</h1>
        <nav>{/* 导航内容 */}</nav>
      </header>
      
      <main className="app-main" style={{ minHeight: '100vh' }}>
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames="fade"
            timeout={300}
          >
            <Outlet /> {/* 相当于 Vue 的 router-view */}
          </CSSTransition>
        </TransitionGroup>
      </main>
      
      {shouldShowFooter && (
        <footer className="app-footer">
          {/* 这里放页脚内容 */}
          <p>© 2023 网站名称</p>
        </footer>
      )}
      
      {/* 右下角布局元素 */}
      <div className="bottom-right-layout">
        {/* 返回顶部等按钮 */}
      </div>
    </div>
  );
};

export default AppLayout;