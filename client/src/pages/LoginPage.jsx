import React, { useContext, useState } from "react";
import { useApi } from "../shared/useApi";
import { AuthContext } from "../state/AuthContext";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";

const LoginPage = () => {
  const api = useApi();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { setUser, error, setError, setAccessToken } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const onLogin = async (data) => {
    try {
      setIsLoading(true);
      setError("");
      const res = await api.post("/api/auth/login", data);
      console.log(res);
      setUser(res.data.user);
      setAccessToken(res.data.accessToken);
      navigate("/home",{replace:true});
    } catch (error) {
      setError(error.response?.data?.message || "Invalid Email Or Password!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#1a1613] text-[#e8ddd0] flex items-center justify-center ">
      <div className="animate-[zoomIn_0.5s_ease-in-out] w-full max-w-7xl min-h-150 grid grid-cols-1 md:grid-cols-2 rounded-2xl overflow-hidden border border-[#3a322a] shadow-2xl shadow-white/30">
        {/* Left Section */}
        <div className="hidden md:flex bg-[#d4c4a8] p-12 flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold text-[#1a1613]">SkyMart</h1>

            <p className="mt-4 text-[#1a1613]/70 text-lg max-w-sm">
              Everything you need, all in one place. Create your account and
              start shopping.
            </p>
          </div>

          {/* E-Commerce Image */}
          <div className="flex justify-center my-8">
            <img
              src="https://plus.unsplash.com/premium_photo-1672883551967-ab11316526b4?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
              alt="E-commerce shopping"
              className="w-full max-w-md h-72 object-cover rounded-2xl shadow-xl shadow-[#1a1613]/30 ring-1 ring-[#1a1613]/10"
            />
          </div>

          <p className="text-[#1a1613]/60 text-sm">Simple. Fast. Reliable.</p>
        </div>

        {/* Right Section */}
        <div className="bg-[#221c17] p-8 md:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto">
            <h2 className="text-3xl font-semibold text-[#f0e6d8]">
              Login to continue to SkyMart
            </h2>
            <p className="text-[#a89880] mt-2 mb-8"></p>

            <form onSubmit={handleSubmit(onLogin)} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm text-[#c4b5a0] mb-2">
                  Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email",
                    },
                  })}
                  className="w-full bg-[#2b241d] border border-[#3a322a] text-[#e8ddd0] placeholder-[#6b5e4f] rounded-lg px-4 py-3 outline-none focus:border-[#d4c4a8] focus:ring-1 focus:ring-[#d4c4a8]/30 transition-all duration-300"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.email.message}
                  </p>
                )}
                {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm text-[#c4b5a0] mb-2">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full bg-[#2b241d] border border-[#3a322a] text-[#e8ddd0] placeholder-[#6b5e4f] rounded-lg px-4 py-3 outline-none focus:border-[#d4c4a8] focus:ring-1 focus:ring-[#d4c4a8]/30 transition-all duration-300"
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#d4c4a8] hover:bg-[#e0d2b8] text-[#1a1613] font-semibold py-3 rounded-lg transition-all duration-300 shadow-lg shadow-[#d4c4a8]/10 hover:shadow-[#d4c4a8]/20"
              >
                {isLoading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p className="text-center text-[#a89880] text-sm mt-6">
              Don't have an account?{" "}
              <button
                onClick={() => {
                  setError("");
                  navigate("/");
                }}
                className="text-[#d4c4a8] hover:text-[#e0d2b8] cursor-pointer transition-colors duration-300"
              >
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
