import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Leaf, ArrowRight, Lock, Mail, Eye, EyeOff } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all required fields.");
      return;
    }
    // Simulate login success
    alert("Logged in successfully!");
    navigate("/");
  };

  return (
    <section className="min-h-screen bg-[#fafafa] flex items-center justify-center px-6 py-16">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2 border border-neutral-200">
        
        {/* Left Side — Branding Banner */}
        <div className="bg-gradient-to-br from-green-700 via-green-600 to-emerald-800 text-white flex flex-col justify-between p-10 md:p-14 relative overflow-hidden">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10 blur-2xl" />
          
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-white">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-green-700 shadow-md">
                <Leaf className="h-6 w-6" strokeWidth={2.5} />
              </span>
              <span className="text-2xl font-bold tracking-tight">FreshMart</span>
            </Link>

            <h1 className="mt-12 text-4xl font-bold leading-tight">
              Welcome back to fresh quality.
            </h1>

            <p className="mt-4 text-green-100 leading-relaxed text-sm">
              Log in to access your orders, saved addresses, exclusive member discounts, and fast 10-minute grocery delivery.
            </p>
          </div>

          <div className="mt-10 border-t border-white/20 pt-6">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 rounded-full bg-emerald-300 animate-pulse" />
              <span className="text-xs font-semibold text-green-100 uppercase tracking-wider">
                100% Organic & Farm Fresh Guaranteed
              </span>
            </div>
          </div>
        </div>

        {/* Right Side — Login Form */}
        <div className="flex flex-col justify-center p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-neutral-900">Sign In</h2>
            <p className="mt-2 text-sm text-neutral-500">
              Enter your credentials to manage your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full h-12 rounded-xl border border-neutral-300 bg-neutral-50 pl-11 pr-4 text-sm text-neutral-800 focus:border-green-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-600/20 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full h-12 rounded-xl border border-neutral-300 bg-neutral-50 pl-11 pr-11 text-sm text-neutral-800 focus:border-green-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-green-600/20 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer text-neutral-600">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="rounded border-neutral-300 text-green-600 focus:ring-green-500"
                />
                Remember me
              </label>
              <a href="#forgot" onClick={(e) => { e.preventDefault(); alert("Password reset link sent to your email."); }} className="text-green-600 font-semibold hover:underline">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full h-12 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 text-white font-bold hover:bg-green-700 transition shadow-lg shadow-green-600/20"
            >
              Sign In
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-neutral-600">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="font-semibold text-green-600 hover:underline">
              Create account
            </Link>
          </p>
        </div>

      </div>
    </section>
  );
}

export default Login;