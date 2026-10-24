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
      await api.post("auth/logout");
      setAccessToken(null);
      setUser(null);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <nav className="w-full bg-[#221c17] border-b border-[#3a322a] px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-2xl">🛍️</span>
          <h1 className="text-2xl font-bold text-[#d4c4a8] tracking-wide">
            SkyMart
          </h1>
        </div>

        {/* Middle Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a 
            onClick={() => {
              navigate("/");
            }}

            className="text-[#c4b5a0] hover:text-[#d4c4a8] font-medium transition-colors duration-300"
          >
            Home
          </a>
          <a
            onClick={() => {
              navigate("/home/products");
            }}
            className="text-[#c4b5a0] hover:text-[#d4c4a8] font-medium transition-colors duration-300"
          >
            Products
          </a>
          <a
            onClick={() => {
              navigate("/home/add-product");
            }}
            className="text-[#c4b5a0] hover:text-[#d4c4a8] font-medium transition-colors duration-300"
          >
            Add Product
          </a>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-[#e8ddd0] font-medium">{name}</span>
          <button
            onClick={logoutUser}
            className="flex items-center gap-2 bg-[#2b241d] hover:bg-[#ae2614] text-[#d4c4a8] px-4 py-2 rounded-lg border border-[#3a322a] transition-all duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
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
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
