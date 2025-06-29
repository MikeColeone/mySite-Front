// React 核心 Hook：useState 处理状态，useNavigate 页面跳转
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// Ant Design 组件
import { Form, Input, Button, Checkbox, Divider, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

// 登录接口方法
import { login } from '@/apis/user';
// 设置 Token 的工具函数（如存储在 localStorage / cookie）
import { SET_TOKEN } from '@/utils/auth';
// 用户状态管理 store
import { useUserStore } from '@/store/modules/user';

const LoginPage:React.FC = () =>{
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const userStore = useUserStore();
  const [loading, setLoading] = React.useState(false);

  //登录逻辑
    const onFinish = async (values: any) => {
    setLoading(true); // 开始 loading
    try {
      const res = await login(values); // 调用登录接口
      if (res.code === 200) {
        // 登录成功，设置 token，是否持久保存由 remember 决定
        SET_TOKEN(res.data.token, res.data.expire, values.remember);
        message.success('登录成功'); // 成功提示
        navigate('/'); // 跳转到首页
        userStore.getInfo(); // 拉取当前用户信息
      } else {
        message.error(res.msg); // 登录失败提示后端返回的 msg
      }
    } catch (error) {
      message.error('登录失败'); // 请求异常
    } finally {
      setLoading(false); // 关闭 loading
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      {/* 这里可以添加登录表单等内容 */}
    </div>
  );
}


export default LoginPage;