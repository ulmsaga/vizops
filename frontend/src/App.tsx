import { useState } from 'react'
import LoginPage from '@/pages/LoginPage'
import OtpPage from '@/pages/OtpPage'
import DashboardPage from '@/pages/DashboardPage'

type Step = 'login' | 'otp' | 'dashboard'

export default function App() {
  const [step, setStep] = useState<Step>('login')
  const [email, setEmail] = useState('')
  const [user, setUser] = useState<{ name: string; email: string } | null>(null)

  const handleOtpSent = (sentEmail: string) => {
    setEmail(sentEmail)
    setStep('otp')
  }

  const handleSuccess = (token: string, name: string) => {
    localStorage.setItem('token', token)
    setUser({ name, email })
    setStep('dashboard')
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setEmail('')
    setStep('login')
  }

  if (step === 'dashboard' && user) {
    return <DashboardPage name={user.name} email={user.email} onLogout={handleLogout} />
  }
  if (step === 'otp') {
    return <OtpPage email={email} onSuccess={handleSuccess} onBack={() => setStep('login')} />
  }
  return <LoginPage onOtpSent={handleOtpSent} />
}
