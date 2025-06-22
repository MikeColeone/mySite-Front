import { User, Lock } from '@element-plus/icons-vue';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '@/apis/user';
import { SET_TOKEN } from '@/utils/auth';
import { ElMessage } from 'element-plus';
import useUserStore from '@/store/modules/user.ts';

const Login = () => {
  const formRef = useRef(null);
  const env = import.meta.env;
  const navigate = useNavigate();
  const userStore = useUserStore();

  const [form, setForm] = useState({
    username: '',
    password: '',
    remember: false
  });

  const rules = {
    username: [
      { required: true, message: '请输入用户名' }
    ],
    password: [
      { required: true, message: '请输入密码' }
    ]
  };

  const handleInputChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const userLogin = () => {
    formRef.current.validate((valid) => {
      if (valid) {
        login(form).then(res => {
          if (res.code === 200) {
            SET_TOKEN(res.data.token, res.data.expire, form.remember);
            ElMessage.success('登录成功');
            navigate('/');
            userStore.getInfo();
          } else {
            ElMessage.error(res.msg);
          }
        });
      }
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      userLogin();
    }
  };

  return (
    <div style={{ textAlign: 'center', margin: '0 20px' }}>
      <div style={{ marginTop: '150px' }}>
        <div style={{ fontSize: '25px', fontWeight: 'bold' }}>登录</div>
        <div style={{ fontSize: '14px', color: 'grey', marginTop: '1rem' }}>
          用户密码使用键式哈希算法加密，请放心注册
        </div>
      </div>
      <div style={{ marginTop: '50px' }}>
        <el-form model={form} rules={rules} ref={formRef}>
          <el-form-item prop="username">
            <el-input
              value={form.username}
              onChange={(value) => handleInputChange('username', value)}
              maxLength={20}
              type="text"
              placeholder="用户名/邮箱"
            >
              <template #prefix>
                <el-icon>
                  <User />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              value={form.password}
              onChange={(value) => handleInputChange('password', value)}
              type="password"
              maxLength={20}
              placeholder="密码"
              onKeyUp={handleKeyPress}
            >
              <template #prefix>
                <el-icon>
                  <Lock />
                </el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-row>
            <el-col span={12} style={{ textAlign: 'left' }}>
              <el-form-item prop="remember">
                <el-checkbox
                  checked={form.remember}
                  onChange={(value) => handleInputChange('remember', value)}
                >
                  记住我
                </el-checkbox>
              </el-form-item>
            </el-col>
            <el-col span={12} style={{ textAlign: 'right' }}>
              <el-link onClick={() => navigate('/reset')}>忘记密码</el-link>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <div style={{ marginTop: '30px' }}>
        <el-button style={{ width: '270px' }} type="success" plain onClick={userLogin}>
          立即登录
        </el-button>
      </div>
      <el-divider>
        <span style={{ fontSize: '13px', color: 'grey' }}>没有账号</span>
      </el-divider>
      <div>
        <el-button
          onClick={() => navigate('/register')}
          style={{ width: '270px' }}
          type="danger"
          plain
        >
          立即注册
        </el-button>
      </div>
      <el-divider>
        <span style={{ fontSize: '13px', color: 'grey' }}>其他方式</span>
      </el-divider>
      <div>
        <div className="other_login">
          <div>
            <el-link
              href={
                env.MODE === 'development'
                  ? env.VITE_SERVE + '/oauth/gitee/render'
                  : env.VITE_SERVE + '/api/oauth/gitee/render'
              }
            >
              <svg-icon name="gitee" width="20px" height="20px" color="#4E86F1" />
            </el-link>
          </div>
          <div style={{ marginLeft: '1rem' }}>
            <el-link
              href={
                env.MODE === 'development'
                  ? env.VITE_SERVE + '/oauth/github/render'
                  : env.VITE_SERVE + '/api/oauth/github/render'
              }
            >
              <svg-icon name="github" width="20px" height="20px" color="#4E86F1" />
            </el-link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

// Styles
const styles = `
.other_login {
  display: flex;
  justify-content: center;
}

.other_login div:hover {
  cursor: pointer;
}
`;

// Add styles to the document head
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);