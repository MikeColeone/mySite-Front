import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Divider, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { login } from '@/apis/user';
import { SET_TOKEN } from '@/utils/auth';
import useUserStore from '@/store/modules/user.ts';

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const userStore = useUserStore();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await login(values);
      if (res.code === 200) {
        SET_TOKEN(res.data.token, res.data.expire, values.remember);
        message.success('登录成功');
        navigate('/');
        userStore.getInfo();
      } else {
        message.error(res.msg);
      }
    } catch (error) {
      message.error('登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto', padding: '20px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 style={{ fontSize: 24, fontWeight: 'bold' }}>登录</h1>
        <p style={{ color: '#666', marginTop: 8 }}>
          用户密码使用键式哈希算法加密，请放心注册
        </p>
      </div>

      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{ remember: false }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入用户名' }]}
        >
          <Input prefix={<UserOutlined />} placeholder="用户名/邮箱" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="密码"
            onPressEnter={() => form.submit()}
          />
        </Form.Item>

        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>记住我</Checkbox>
            </Form.Item>
            <Link to="/reset">忘记密码</Link>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            立即登录
          </Button>
        </Form.Item>
      </Form>

      <Divider plain>没有账号</Divider>
      
      <Button
        type="default"
        block
        onClick={() => navigate('/register')}
      >
        立即注册
      </Button>

      <Divider plain>其他方式</Divider>
      
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16 }}>
        <a href={`${import.meta.env.VITE_SERVE}/oauth/gitee/render`}>
          {/* 这里放Gitee图标组件 */}
          <span>Gitee</span>
        </a>
        <a href={`${import.meta.env.VITE_SERVE}/oauth/github/render`}>
          {/* 这里放GitHub图标组件 */}
          <span>GitHub</span>
        </a>
      </div>
    </div>
  );
};

export default LoginPage;