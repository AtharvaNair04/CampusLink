"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSupabase } from "@/components/supabase-provider";
import { LogIn, Mail, Lock, AlertCircle, Bell } from "lucide-react";
export default function LoginPage() {
  const router = useRouter();
  const { supabase } = useSupabase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    // give cookie a tick to sync before redirect
    setTimeout(() => {
      router.replace("/admin/dashboard");
    }, 300);
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fdf8f6] via-[#fef5f2] to-[#fce8e3] p-4">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#7c183d]/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#7c183d]/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Main card */}
        <div className="bg-white/80 backdrop-blur-sm shadow-2xl rounded-2xl p-8 sm:p-10 border border-[#7c183d]/10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#7c183d] to-[#a01d4a] rounded-2xl mb-4 shadow-lg">
              <Bell className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[#7c183d] mb-2 flex items-center justify-center gap-2">
              <Bell className="w-7 h-7" />
              CampusLink
            </h1>
            <p className="text-[#8B7B75] text-sm">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Form */}
          <div className="space-y-5">
            {/* Email input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#2C1810] block">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7B75]" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-[#E5DDD9] rounded-xl text-[#2C1810] placeholder:text-[#bfaea6] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#7c183d]/30 focus:border-[#7c183d] focus:bg-white transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Password input */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-[#2C1810] block">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B7B75]" />
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-[#E5DDD9] rounded-xl text-[#2C1810] placeholder:text-[#bfaea6] bg-white/50 focus:outline-none focus:ring-2 focus:ring-[#7c183d]/30 focus:border-[#7c183d] focus:bg-white transition-all duration-200"
                  required
                />
              </div>
            </div>

            {/* Error message */}
            {errorMsg && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <p>{errorMsg}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#7c183d] to-[#a01d4a] text-white py-3.5 rounded-xl hover:from-[#61122e] hover:to-[#7c183d] font-semibold shadow-lg shadow-[#7c183d]/25 hover:shadow-xl hover:shadow-[#7c183d]/35 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <LogIn className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-[#E5DDD9]">
            <p className="text-center text-sm text-[#8B7B75]">
              Secured by CampusLink{" "}
              <span className="text-[#7c183d]">♦</span>
            </p>
          </div>
        </div>

        {/* Bottom shadow effect */}
        <div className="absolute -bottom-2 left-4 right-4 h-4 bg-[#7c183d]/5 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}