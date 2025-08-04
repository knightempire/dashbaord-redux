import GoogleIcon from "../icons/GoogleIcon";
import FacebookIcon from "../icons/FacebookIcon";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full bg-white flex items-center justify-center px-2">
      <div className="flex flex-col md:flex-row w-full min-h-screen">
        {/* Top: Image for mobile, Right: Image for desktop */}
        <div className="block md:hidden w-full mt-4">
          <div className="relative w-full h-[180px] sm:h-[240px] overflow-hidden rounded-xl">
            <Image
              src="/login.jpg"
              alt="Floral painting"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        {/* Left: Login Form */}
        <div className="w-full md:w-[40%] flex items-center justify-center p-8 md:ml-32">
          <div className="w-full max-w-md">
            <h2 className="text-xl md:text-2xl font-semibold mb-2">
              Welcome Back{" "}
              <span className="inline-block">👋</span>
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              Today is a new day to try your luck. You shape it. Sign in to start
              managing your projects.
            </p>
            <form className="flex flex-col gap-4">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="example@gmail.com"
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              </div>
              <div className="flex items-center justify-end text-sm mb-2">
      
                <a
                  href="#"
                  className="text-blue-500 hover:underline"
                >
                  Forgot Password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-[#1a253c] text-white py-2 rounded-md font-medium hover:bg-[#25325a] transition"
              >
                Sign in
              </button>
            </form>
            <div className="flex items-center my-4">
              <div className="flex-grow h-px bg-gray-200" />
              <span className="mx-2 text-gray-400 text-xs">Or</span>
              <div className="flex-grow h-px bg-gray-200" />
            </div>
            <div className="flex flex-col gap-2">
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 font-medium hover:bg-gray-50 transition">
                <GoogleIcon />
                Sign in with Google
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 font-medium hover:bg-gray-50 transition">
                <FacebookIcon />
                Sign in with Facebook
              </button>
            </div>
            <p className="text-center text-xs text-gray-500 mt-4">
              Don&apos;t you have an account?{" "}
              <a
                href="#"
                className="text-blue-500 hover:underline"
              >
                Sign up
              </a>
            </p>
            <footer className="mt-4 md:mt-18 text-center text-xs text-gray-400">
              © 2025 All rights reserved.
            </footer>
          </div>
        </div>
        {/* Right: Image for desktop */}
        <div className="hidden md:flex items-center justify-center md:w-[60%] p-8">
          <div className="relative w-full h-[700px] max-w-2xl mx-auto overflow-hidden rounded-xl shadow-lg">
            <Image
              src="/login.jpg"
              alt="Floral painting"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
