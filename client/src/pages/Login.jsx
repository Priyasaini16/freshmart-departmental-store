import { Link } from "react-router-dom";
function Login() {
  return (
    <section className="min-h-screen bg-green-50 flex items-center justify-center px-6 py-12">

      <div className="max-w-6xl w-full min-h-[650px] bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}
        <div className="bg-green-600 text-white flex flex-col justify-center items-center p-16">

          <h1 className="text-5xl font-bold mb-6">
            Welcome Back!
          </h1>

          <p className="text-center text-lg leading-8 max-w-md">
            Login to continue shopping fresh groceries,
            track your orders and enjoy exclusive offers.
          </p>

        </div>

        {/* Right Side */}
        <div className="flex flex-col justify-center p-16">

          <h2 className="text-4xl font-bold text-gray-900 mb-10">
            Login
          </h2>

          <form className="space-y-6">

            <input
              type="email"
              placeholder="Email Address"
              className="w-full border border-gray-300 rounded-xl px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full border border-gray-300 rounded-xl px-5 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <div className="flex justify-between items-center text-sm">

              <label className="flex items-center gap-2">
                <input type="checkbox" />
                Remember Me
              </label>

              <button
                type="button"
                className="text-green-600 hover:underline"
              >
                Forgot Password?
              </button>

            </div>

            <button
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl text-lg font-semibold transition"
            >
              Login
            </button>

          </form>

          <p className="text-center mt-8">
            Don't have an account?

            <Link
              to="/register"
              className="text-green-600 font-semibold ml-2 hover:underline"
             >
             Register
            </Link>

          </p>

        </div>

      </div>

    </section>
  );
}

export default Login;