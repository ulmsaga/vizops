import { useState, useRef, useEffect } from 'react'
import { Loader2, ShieldCheck, ArrowLeft, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { authApi } from '@/api/auth'

interface OtpPageProps {
  email: string
  onSuccess: (token: string, name: string) => void
  onBack: () => void
}

export default function OtpPage({ email, onSuccess, onBack }: OtpPageProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const inputs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => { inputs.current[0]?.focus() }, [])

  const handleChange = (idx: number, val: string) => {
    if (!/^\d*$/.test(val)) return
    const next = [...otp]
    next[idx] = val.slice(-1)
    setOtp(next)
    if (val && idx < 5) inputs.current[idx + 1]?.focus()
  }

  const handleKeyDown = (idx: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const code = otp.join('')
    if (code.length !== 6) return
    setError('')
    setLoading(true)
    try {
      const res = await authApi.verifyOtp(email, code)
      onSuccess(res.data.token, res.data.name)
    } catch (err: any) {
      setError(err.response?.data?.error ?? '인증에 실패했습니다.')
      setOtp(['', '', '', '', '', ''])
      inputs.current[0]?.focus()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600 mb-4 shadow-lg shadow-blue-500/30">
            <ShieldCheck className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">2차 인증</h1>
          <p className="text-slate-400 mt-1">이메일로 발송된 6자리 코드를 입력하세요</p>
        </div>

        <Card className="border-slate-800 bg-slate-900/60 backdrop-blur shadow-2xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-xl flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-400" />
              인증 코드 확인
            </CardTitle>
            <CardDescription className="text-slate-400">
              <span className="text-blue-400 font-medium">{email}</span> 로 발송된 코드 · 5분 유효
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex gap-2 justify-center">
                {otp.map((digit, idx) => (
                  <Input
                    key={idx}
                    ref={el => { inputs.current[idx] = el }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={e => handleChange(idx, e.target.value)}
                    onKeyDown={e => handleKeyDown(idx, e)}
                    className="w-12 h-14 text-center text-2xl font-bold bg-slate-800 border-slate-700 text-white focus-visible:ring-blue-500 focus-visible:border-blue-500"
                  />
                ))}
              </div>

              {error && (
                <div className="rounded-md bg-red-900/40 border border-red-800 px-3 py-2 text-sm text-red-300 text-center">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                disabled={loading || otp.join('').length !== 6}
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium h-11 shadow-lg shadow-blue-500/20"
              >
                {loading ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" />확인 중...</>
                ) : '로그인'}
              </Button>

              <Button type="button" variant="ghost" onClick={onBack} className="w-full text-slate-400 hover:text-white">
                <ArrowLeft className="mr-2 h-4 w-4" />
                이메일/비밀번호로 돌아가기
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
