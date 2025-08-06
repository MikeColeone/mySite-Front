<template>
  <Loading />

  <div class="login-container">
    <!-- 登录表单卡片 -->
    <div class="login-card">
      <h3 class="title">博客后台管理系统</h3>

      <form @submit.prevent="handleLogin">
        <!-- 用户名输入 -->
        <div class="form-group">
          <div class="input-wrapper">
            <i class="fa fa-user icon"></i>
            <input
              type="text"
              v-model="loginForm.username"
              placeholder="账号"
              @blur="validateField('username')"
              :class="{ 'input-error': errors.username }"
            />
          </div>
          <p class="error-message" v-if="errors.username">
            {{ errors.username }}
          </p>
        </div>

        <!-- 密码输入 -->
        <div class="form-group">
          <div class="input-wrapper">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="loginForm.password"
              placeholder="密码"
              @blur="validateField('password')"
              @keyup.enter="handleLogin"
              :class="{ 'input-error': errors.password }"
            />
            <button type="button" class="toggle-btn" @click="togglePassword">
              <i
                class="fa"
                :class="showPassword ? 'fa-eye-slash' : 'fa-eye'"
              ></i>
            </button>
          </div>
          <p class="error-message" v-if="errors.password">
            {{ errors.password }}
          </p>
        </div>

        <!-- 登录按钮 -->
        <div class="form-group">
          <button type="submit" class="login-btn" :disabled="loading">
            <span v-if="!loading">登 录</span>
            <span v-else class="loading">
              <i class="fa fa-spinner fa-spin mr-2"></i>登录中...
            </span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import useStore from "@/store";
import Loading from "@/components/loading/index.vue";

// 状态管理
const { user } = useStore();
const router = useRouter();
const route = useRoute();

// 表单数据
const loginForm = reactive({
  username: "test@qq.com",
  password: "123456",
});

// 状态变量
const loading = ref(false);
const showPassword = ref(false);
const errors = reactive({
  username: "",
  password: "",
});

// 切换密码显示状态
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// 验证规则
const rules = {
  username: [{ required: true, message: "请输入用户名" }],
  password: [
    { required: true, message: "请输入密码" },
    { min: 6, message: "密码不能少于6位" },
  ],
};

// 验证单个字段
const validateField = (field: string) => {
  (errors as Record<string, string>)[field] = "";

  if (field === "username") {
    if (!loginForm.username.trim()) {
      errors.username = rules.username[0].message;
    }
  }

  if (field === "password") {
    if (!loginForm.password) {
      errors.password = rules.password[0].message;
    } else if (loginForm.password.length < 6) {
      errors.password = rules.password[1].message;
    }
  }
};

// 验证整个表单
const validateForm = (): boolean => {
  let isValid = true;

  // 验证用户名
  if (!loginForm.username.trim()) {
    errors.username = rules.username[0].message;
    isValid = false;
  }

  // 验证密码
  if (!loginForm.password) {
    errors.password = rules.password[0].message;
    isValid = false;
  } else if (loginForm.password.length < 6) {
    errors.password = rules.password[1].message;
    isValid = false;
  }

  return isValid;
};

// 登录处理
const handleLogin = async () => {
  // 表单验证
  if (!validateForm()) {
    return;
  }

  loading.value = true;

  try {
    // 调用登录接口
    await user.LogIn({ ...loginForm });

    // 登录成功，跳转页面
    const redirect = route.query.redirect || "/";
    router
      .push(redirect as string)
      .then(() => {
        console.log("跳转成功，当前路由:", router.currentRoute.value.fullPath);
      })
      .catch((err) => {
        console.error("跳转失败", err);
      });
  } catch (error) {
    console.error("登录失败", error);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss" src="./style.css">
// @import "./style.css";
</style>
