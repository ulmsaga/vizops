import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Loader2, Mail, Lock, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { authApi } from '@/api/auth'

interface LoginPageProps {
  onOtpSent: (email: string) => void
}

export default function LoginPage({ onOtpSent }: LoginPageProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await authApi.login(email, password)
      onOtpSent(email)
    } catch (err: any) {
      setError(err.response?.data?.error ?? '로그인에 실패했습니다.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 mb-4 shadow-lg shadow-blue-500/30">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">VizOps</h1>
          <p className="text-slate-400 mt-1">Operations Intelligence Platform</p>
        </div>

        <Card className="border-slate-800 bg-slate-900/60 backdrop-blur shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-xl">로그인</CardTitle>
            <CardDescription className="text-slate-400">
              이메일과 비밀번호를 입력하세요
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-300">이메일</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="admin@vizops.dev"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-300">비밀번호</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="pl-10 bg-slate-800 border-slate-700 text-white placeholder:text-slate-500 focus-visible:ring-blue-500"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="rounded-md bg-red-900/40 border border-red-800 px-3 py-2 text-sm text-red-300">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium h-11 shadow-lg shadow-blue-500/20"
              >
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />확인 중...</>
                ) : '이메일 인증 코드 받기'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
