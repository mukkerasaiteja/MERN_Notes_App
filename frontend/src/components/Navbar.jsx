import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import { useState, useEffect } from "react";

//rfce

function Navbar({ user, setUser, search, setSearch }) {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState(search || "");

  useEffect(() => {
    setInputValue(search || "");
  }, [search]);

  useEffect(() => {
    const id = setTimeout(() => {
      setSearch && setSearch(inputValue.trim());
    }, 300);
    return () => clearTimeout(id);
  }, [inputValue, setSearch]);

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    setSearch && setSearch("");
    navigate("/login");
  }

  return (
    <nav className="bg-[#0E7490] text-[#FDFBF7] p-4 shadow-lg font-semibold text-xl">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/">Notes App</Link>
          {user && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearch && setSearch(inputValue.trim());
              }}
              className="relative"
            >
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                <FiSearch />
              </span>
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search notes..."
                className="pl-9 pr-8 py-1 rounded-md w-64 bg-white text-[#2E2E2E] placeholder-slate-400 border border-transparent focus:border-[#0E7490] focus:ring-1 focus:ring-[#0E7490]/20 outline-none"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={() => {
                    setInputValue("");
                    setSearch && setSearch("");
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-700 cursor-pointer p-1"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </form>
          )}
        </div>
        {user && (
          <div className="flex items-center space-x-4 ">
            <span className="text-white font-medium">{user.username}</span>
            <button
              onClick={handleLogout}
              className="cursor-pointer bg-[#F87171] hover:bg-[#DC2626] transition-colors duration-500 rounded-md px-2 py-1"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
