"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Users, Calendar, DollarSign, TrendingUp } from "lucide-react"

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is admin (you can add an isAdmin field to User model)
    if (status === "authenticated" && session?.user?.role !== "TEACHER") {
      // For now, only teachers can access admin (you can create separate ADMIN role)
      router.push("/dashboard")
      return
    }

    if (status === "authenticated") {
      fetchStats()
    }
  }, [status, session])

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/admin/stats")
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error("Failed to fetch stats:", error)
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="container mx-auto px-8 py-12">
          <p className="text-gray-500 text-lg font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="container mx-auto px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
            Admin Dashboard
          </h1>
          <p className="text-lg text-gray-600 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
            Manage your platform
          </p>
        </div>

        {stats && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="relative backdrop-blur-xl bg-gradient-to-br from-blue-50/90 via-white/80 to-cyan-50/90 rounded-3xl shadow-xl p-8 border border-blue-200/40 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <Users className="w-8 h-8 text-blue-600 mb-3" />
                <div className="text-xs font-black uppercase tracking-wider text-blue-600 mb-2" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em' }}>Total Users</div>
                <div className="text-4xl font-black bg-gradient-to-br from-blue-600 to-cyan-600 bg-clip-text text-transparent" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900 }}>
                  {stats.totalUsers || 0}
                </div>
              </div>
            </div>

            <div className="relative backdrop-blur-xl bg-gradient-to-br from-green-50/90 via-white/80 to-emerald-50/90 rounded-3xl shadow-xl p-8 border border-green-200/40 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <Calendar className="w-8 h-8 text-green-600 mb-3" />
                <div className="text-xs font-black uppercase tracking-wider text-green-600 mb-2" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em' }}>Total Bookings</div>
                <div className="text-4xl font-black bg-gradient-to-br from-green-600 to-emerald-600 bg-clip-text text-transparent" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900 }}>
                  {stats.totalBookings || 0}
                </div>
              </div>
            </div>

            <div className="relative backdrop-blur-xl bg-gradient-to-br from-violet-50/90 via-white/80 to-purple-50/90 rounded-3xl shadow-xl p-8 border border-violet-200/40 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <DollarSign className="w-8 h-8 text-violet-600 mb-3" />
                <div className="text-xs font-black uppercase tracking-wider text-violet-600 mb-2" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em' }}>Total Revenue</div>
                <div className="text-4xl font-black bg-gradient-to-br from-violet-600 to-purple-600 bg-clip-text text-transparent" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900 }}>
                  ${stats.totalRevenue?.toFixed(0) || 0}
                </div>
              </div>
            </div>

            <div className="relative backdrop-blur-xl bg-gradient-to-br from-amber-50/90 via-white/80 to-orange-50/90 rounded-3xl shadow-xl p-8 border border-amber-200/40 hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-full blur-3xl"></div>
              <div className="relative">
                <TrendingUp className="w-8 h-8 text-amber-600 mb-3" />
                <div className="text-xs font-black uppercase tracking-wider text-amber-600 mb-2" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: '0.1em' }}>Active Teachers</div>
                <div className="text-4xl font-black bg-gradient-to-br from-amber-600 to-orange-600 bg-clip-text text-transparent" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900 }}>
                  {stats.activeTeachers || 0}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6">
          <div className="backdrop-blur-xl bg-white/80 rounded-2xl shadow-lg p-8 border border-gray-200/60">
            <h2 className="text-2xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
              Quick Actions
            </h2>
            <div className="space-y-4">
              <Button 
                onClick={() => router.push("/admin/users")}
                className="w-full border-2 border-gray-300 hover:border-gray-500 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 text-gray-900 rounded-2xl py-6 font-black text-base transition-all duration-300 shadow-lg hover:shadow-xl justify-start"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900 }}
              >
                <Users className="w-5 h-5 mr-2" />
                Manage Users
              </Button>
              <Button 
                onClick={() => router.push("/admin/bookings")}
                className="w-full border-2 border-gray-300 hover:border-gray-500 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 text-gray-900 rounded-2xl py-6 font-black text-base transition-all duration-300 shadow-lg hover:shadow-xl justify-start"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900 }}
              >
                <Calendar className="w-5 h-5 mr-2" />
                View All Bookings
              </Button>
              <Button 
                onClick={() => router.push("/admin/payments")}
                className="w-full border-2 border-gray-300 hover:border-gray-500 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 text-gray-900 rounded-2xl py-6 font-black text-base transition-all duration-300 shadow-lg hover:shadow-xl justify-start"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 900 }}
              >
                <DollarSign className="w-5 h-5 mr-2" />
                Payment Records
              </Button>
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/80 rounded-2xl shadow-lg p-8 border border-gray-200/60">
            <h2 className="text-2xl font-black text-gray-900 mb-6" style={{ fontFamily: "'Inter', sans-serif" }}>
              Recent Activity
            </h2>
            <div className="space-y-4">
              <p className="text-gray-600 font-medium" style={{ fontFamily: "'Inter', sans-serif" }}>
                Activity feed coming soon...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

