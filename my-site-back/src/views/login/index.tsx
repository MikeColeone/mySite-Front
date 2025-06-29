// src/pages/Login.tsx
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Login.scss";

interface LoginForm {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const onFinish = async (values: LoginForm) => {
    setLoading(true);
    try {
      // 模拟登录逻辑
      await fakeLogin(values); // 你可以换成真实的 user.login()
      const redirect = (location.state as any)?.from?.pathname || "/";
      message.success("登录成功");
      navigate(redirect);
    } catch (error) {
      message.error("登录失败，请检查用户名或密码");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <Form
        name="login-form"
        className="login-form"
        initialValues={{ username: "test@qq.com", password: "123456" }}
        onFinish={onFinish}
      >
        <h3 className="title">博客后台管理系统</h3>
        <Form.Item
          name="username"
          rules={[{ required: true, message: "请输入用户名" }]}
        >
          <Input prefix={<UserOutlined />} placeholder="账号" size="large" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            { required: true, message: "请输入密码" },
            { min: 6, message: "密码不能少于6位" },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="密码"
            size="large"
            onPressEnter={() => {
              document.querySelector<HTMLFormElement>("form")?.requestSubmit();
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            {loading ? "登录中..." : "登 录"}
          </Button>
        </Form.Item>
      </Form>
      <div className="el-login-footer">
        <span>Copyright © 2022 - {new Date().getFullYear()} By 阿冬</span>
      </div>
    </div>
  );
};

export default Login;

// 模拟登录函数
const fakeLogin = (values: LoginForm) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (values.username === "test@qq.com" && values.password === "123456") {
        resolve(true);
      } else {
        reject(new Error("invalid"));
      }
    }, 1000);
  });
};
