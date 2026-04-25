import { Zap, LogOut, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface DashboardPageProps {
  name: string
  email: string
  onLogout: () => void
}

export default function DashboardPage({ name, email, onLogout }: DashboardPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-600">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="text-white font-bold text-lg">VizOps</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-slate-400 text-sm hidden sm:block">{email}</span>
          <Button variant="ghost" size="sm" onClick={onLogout} className="text-slate-400 hover:text-white">
            <LogOut className="w-4 h-4 mr-2" />
            로그아웃
          </Button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white">안녕하세요, {name}님 👋</h2>
          <p className="text-slate-400 mt-2">2차 인증 로그인이 완료되었습니다.</p>
        </div>

        <Card className="border-slate-800 bg-slate-900/60 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-green-400" />
              인증 완료
            </CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 space-y-2">
            <p>✅ 이메일/비밀번호 1차 인증</p>
            <p>✅ 이메일 OTP 2차 인증</p>
            <p>✅ JWT 토큰 발급 완료</p>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
