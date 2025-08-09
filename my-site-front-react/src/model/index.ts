/**
 * 结果接口
 * @description 结果接口
 * @property {boolean} flag - 状态
 * @property {number} code - 状态码
 * @property {string} msg - 消息
 * @property {T} data - 数据
 */
export interface Result<T> {
  flag: boolean;
  code: number;
  msg: string;
  data: T;
}

/**
 * @description 用户信息
 * @property {string} username - 用户名
 * @property {string} password - 密码
 * @property {string} code - 验证码
 */
export interface UserForm {
  username: string;
  password: string;
  code: string;
}