import storage from "./storage"
const ACCESS_tOKEN:string = 'AUTH_TOKEN'

/**
 * 获取登录授权 Token
 *
 * @returns token
 */
export function getToken(): string {
  return storage.get(ACCESS_tOKEN) || ''
}

/**
 * 验证是否登录
 *
 * @returns boolean
 */
export function isLogin(): boolean {
  return getToken() != ''
}

/**
 * 设置登录授权 Token
 *
 * @returns token
 */
export function setToken(token: string, expire: number): void {
  storage.set(ACCESS_tOKEN, token, expire)
}