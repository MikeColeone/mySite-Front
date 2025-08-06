import React from 'react'
// 导入对应的 SCSS 模块，确保样式只作用于当前组件
import styles from './Header.module.scss'

// 定义组件 Props 类型，和 Vue 的 defineProps 对应
interface HeaderProps {
  title?: string
  subtitle?: string
}

// 函数组件，接收 props 并渲染
const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    // 根容器 div
    <div>
      {/* 头部区域，使用样式模块的类名 */}
      <div className={styles.header}>
        {/* 标题 */}
        <h2 className={styles.title}>{title}</h2>
        {/* 副标题 */}
        <h3 className={styles.subtitle}>
          {/* 包裹副标题文本的 span */}
          <span>{subtitle}</span>
        </h3>
      </div>
    </div>
  )
}

export default Header
