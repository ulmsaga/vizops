import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),

  verifyOtp: (email: string, otpCode: string) =>
    api.post<{ token: string; email: string; name: string }>(
      '/auth/verify-otp', { email, otpCode }
    ),
}
