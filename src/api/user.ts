import type { IAuth, ILoginInfo } from '@/types'
import axios from './base'

export function auth({ username, password }: ILoginInfo) {
  return axios.post<IAuth, IAuth>('auth', {
    username,
    password,
  })
}
