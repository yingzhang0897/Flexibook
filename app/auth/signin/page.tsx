"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      })

      if (result?.error) {
        toast({
          title: "Error",
          description: "Invalid email or password",
          variant: "destructive",
        })
      } else {
        router.push(callbackUrl)
        router.refresh()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn("google", { callbackUrl })
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Sophisticated background - Enhanced visibility */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient - more contrast */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-gray-100 to-zinc-200"></div>
        
        {/* Geometric pattern - more visible */}
        <div className="absolute inset-0 opacity-[0.15]" style={{
          backgroundImage: `
            linear-gradient(to right, #64748b 1px, transparent 1px),
            linear-gradient(to bottom, #64748b 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
        
        {/* Elegant diagonal lines - more prominent */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.08]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="diagonalLines" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <line x1="0" y1="0" x2="80" y2="80" stroke="#475569" strokeWidth="1"/>
              <line x1="0" y1="40" x2="40" y2="80" stroke="#475569" strokeWidth="1"/>
              <line x1="40" y1="0" x2="80" y2="40" stroke="#475569" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#diagonalLines)"/>
        </svg>
        
        {/* Soft light orbs - more visible */}
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-gradient-radial from-blue-200/40 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-radial from-indigo-200/35 to-transparent rounded-full blur-3xl"></div>
        
        {/* Corner accents - more pronounced */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] opacity-20">
          <div className="absolute top-0 right-0 w-full h-0.5 bg-gradient-to-l from-slate-500 to-transparent"></div>
          <div className="absolute top-0 right-0 w-0.5 h-full bg-gradient-to-b from-slate-500 to-transparent"></div>
        </div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] opacity-20">
          <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-slate-500 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-0.5 h-full bg-gradient-to-t from-slate-500 to-transparent"></div>
        </div>
        
        {/* Additional depth - circular patterns */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] opacity-10 rounded-full border border-slate-300"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-10 rounded-full border border-slate-300"></div>
      </div>

      <div className="flex items-center justify-center min-h-screen px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <Link href="/" className="text-4xl font-black bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent inline-block mb-6" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900 }}>
              Flexibook
            </Link>
            <h1 className="text-4xl font-black tracking-tight mb-3 text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>Welcome back</h1>
            <p className="text-lg text-gray-600" style={{ fontFamily: "'Inter', sans-serif" }}>
              Sign in to your account to continue
            </p>
          </div>
          <div className="backdrop-blur-2xl bg-white/95 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] p-8 border border-gray-200/50 hover:shadow-[0_8px_40px_rgb(0,0,0,0.1)] transition-all duration-500">
            <form onSubmit={handleSubmit} className="space-y-4">
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
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white shadow-lg hover:shadow-xl transition-all duration-300 h-11 font-bold" 
              disabled={isLoading}
              style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}
            >
              {isLoading ? "Signing in..." : "Sign In"}
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
            onClick={handleGoogleSignIn}
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
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup" className="text-gray-900 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      </div>
    </div>
  )
}

