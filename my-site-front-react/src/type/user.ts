/**
 * 邮箱信息
 */

export interface Email {
  email: string;
  password: string;
  code: string;
}

/**
 * 用户信息
 * @description 用户信息
 * @property {number} id - 用户ID
 * @property {string} email - 邮箱
 * @property {string} nickname - 昵称
 * @property {string} avatar - 头像
 * @property {string} website - 网站
 * @property {string} password - 密码
 * @property {string} code - 验证码
 * @property {string} info - 个人信息
 */

export interface User {
  id: number;
  email: string;
  nickname: string;
  avatar: string;
  website: string;
  password: string;
  code: string;
  info: string;
}

