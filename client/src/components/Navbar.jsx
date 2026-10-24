import React, { useContext } from "react";
import { useApi } from "../shared/useApi";
import { AuthContext } from "../state/AuthContext";
import { useNavigate } from "react-router";

const Navbar = () => {
  const api = useApi();
  const navigate = useNavigate();
  const { user, setUser, setAccessToken } = useContext(AuthContext);

  //console.log(user,accessToken)
  const name = user.name.split(" ")[0];

  const logoutUser = async () => {
    try {
      await api.post("/api/auth/logout");
      setAccessToken(null);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-[#e8ddd0]/80 bg-[#faf6ef]/80 backdrop-blur-xl dark:border-[#2b241d] dark:bg-[#14110e]/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

        <div
          onClick={() => navigate("/")}
          className="group flex cursor-pointer items-center gap-2.5"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#c4a882] to-[#8a6d4b] text-lg shadow-md shadow-[#c4a882]/20 transition-transform duration-300 group-hover:scale-105 group-hover:rotate-3 dark:from-[#d4c4a8] dark:to-[#b8a88a] dark:shadow-[#d4c4a8]/10">
            🛍️
          </div>
          <h1 className="text-xl font-extrabold tracking-tight text-[#2a241d] dark:text-[#f5efe6]">
            Sky<span className="text-[#8a6d4b] dark:text-[#d4c4a8]">Mart</span>
          </h1>
        </div>

        {/* Middle Nav Links */}
        <div className="hidden items-center gap-1 md:flex">
          {[
            { label: "Home", path: "/" },
            { label: "Products", path: "/home/products" },
            { label: "Add Product", path: "/home/add-product" },
          ].map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <a
                key={link.path}
                onClick={() => navigate(link.path)}
                className={`group relative cursor-pointer rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                  isActive
                    ? "text-[#2a241d] dark:text-[#f5efe6]"
                    : "text-[#8a7d6b] hover:text-[#2a241d] dark:text-[#a89880] dark:hover:text-[#f5efe6]"
                }`}
              >
                {link.label}
                
                <span
                  className={`absolute bottom-1 left-4 right-4 h-0.5 origin-left rounded-full bg-gradient-to-r from-[#c4a882] to-[#8a6d4b] transition-transform duration-300 dark:from-[#d4c4a8] dark:to-[#b8a88a] ${
                    isActive
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-100"
                  }`}
                />
              </a>
            );
          })}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">

          <div className="hidden items-center gap-2.5 sm:flex">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e8ddd0] text-xs font-bold text-[#8a6d4b] dark:bg-[#2b241d] dark:text-[#d4c4a8]">
              {name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <span className="text-sm font-medium text-[#4a3f33] dark:text-[#e8ddd0]">
              {name}
            </span>
          </div>

          {/* Divider */}
          <div className="hidden h-6 w-px bg-[#e0d6c8] dark:bg-[#2b241d] sm:block" />

          {/* Logout button */}
          <button
            onClick={logoutUser}
            className="group flex items-center gap-2 rounded-lg border border-[#e0d6c8] bg-white/60 px-3.5 py-2 text-[#8a6d4b] backdrop-blur-sm transition-all duration-300 hover:border-red-300 hover:bg-red-50 hover:text-red-600 dark:border-[#2b241d] dark:bg-[#1a1613]/60 dark:text-[#c4b5a0] dark:hover:border-red-500/30 dark:hover:bg-red-500/10 dark:hover:text-red-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="hidden text-sm font-medium sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
