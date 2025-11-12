"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function SignUpPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  
  const defaultRole = searchParams.get("role") === "teacher" ? "TEACHER" : "STUDENT"
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: defaultRole,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords don't match",
        variant: "destructive",
      })
      return
    }

    if (formData.password.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong")
      }

      // Auto sign in after successful signup
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.ok) {
        toast({
          title: "Success",
          description: "Account created successfully",
        })
        router.push("/dashboard")
        router.refresh()
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Advanced Premium Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient - Different colors from sign in */}
        <div className="absolute inset-0 bg-gradient-to-br from-violet-950 via-purple-950 to-fuchsia-950"></div>
        
        {/* Animated gradient orbs */}
        <div className="absolute -top-20 left-10 w-[500px] h-[500px] bg-gradient-to-br from-purple-500/30 to-fuchsia-500/30 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 bg-gradient-to-br from-pink-500/25 to-rose-500/25 rounded-full blur-3xl opacity-40"></div>
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/20 to-violet-500/20 rounded-full blur-3xl opacity-30"></div>
        
        {/* Geometric grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
            maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)'
          }}></div>
        </div>
        
        {/* Elegant diagonal lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#C084FC', stopOpacity: 0.5 }} />
              <stop offset="100%" style={{ stopColor: '#E879F9', stopOpacity: 0 }} />
            </linearGradient>
          </defs>
          <line x1="100%" y1="150" x2="0" y2="300" stroke="url(#lineGradient2)" strokeWidth="2" />
          <line x1="100%" y1="350" x2="0" y2="500" stroke="url(#lineGradient2)" strokeWidth="1.5" />
          <line x1="100%" y1="550" x2="0" y2="700" stroke="url(#lineGradient2)" strokeWidth="1" />
        </svg>
        
        {/* Glowing accent dots */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_30px_10px_rgba(192,132,252,0.3)]"></div>
        <div className="absolute top-2/3 left-1/3 w-1.5 h-1.5 bg-fuchsia-400 rounded-full shadow-[0_0_25px_8px_rgba(232,121,249,0.3)]"></div>
        <div className="absolute bottom-1/4 right-1/2 w-2.5 h-2.5 bg-pink-400 rounded-full shadow-[0_0_35px_12px_rgba(244,114,182,0.3)]"></div>
      </div>

      <div className="flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <Link href="/" className="text-4xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent inline-block mb-6" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900 }}>
              Flexibook
            </Link>
            <h1 className="text-4xl font-black tracking-tight mb-3 text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>Create an account</h1>
            <p className="text-lg text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
              Get started with Flexibook today
            </p>
          </div>
          <div className="backdrop-blur-xl bg-white/80 rounded-3xl shadow-2xl p-8 border border-gray-200/60">
            <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label style={{ fontFamily: "'Inter', sans-serif" }}>I want to</Label>
              <div className="flex gap-4">
                <button
                  type="button"
                  className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all duration-300 font-semibold ${
                    formData.role === "STUDENT"
                      ? "border-gray-800 bg-gray-800 text-white shadow-lg"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                  onClick={() => setFormData({ ...formData, role: "STUDENT" })}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Learn
                </button>
                <button
                  type="button"
                  className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all duration-300 font-semibold ${
                    formData.role === "TEACHER"
                      ? "border-gray-800 bg-gray-800 text-white shadow-lg"
                      : "border-gray-300 bg-white text-gray-700 hover:border-gray-400"
                  }`}
                  onClick={() => setFormData({ ...formData, role: "TEACHER" })}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Teach
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white shadow-lg hover:shadow-xl transition-all duration-300 h-11 font-bold" 
              disabled={isLoading}
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}
            >
              {isLoading ? "Creating account..." : "Create Account"}
            </Button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-gray-500 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>Or continue with</span>
            </div>
          </div>

          <Button
            variant="outline"
            type="button"
            className="w-full h-11 border-2 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300 font-semibold"
            onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </Button>

          <p className="text-center text-sm text-gray-600 mt-6" style={{ fontFamily: "'Inter', sans-serif" }}>
            Already have an account?{" "}
            <Link href="/auth/signin" className="text-gray-900 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}

