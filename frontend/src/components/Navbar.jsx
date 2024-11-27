import { useState } from "react";
import SearchBar from "./SearchBar/SearchBar";
import ProfileInfo from "./Cards/ProfileInfo";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  signInSuccess,
  signoutFailure,
  signoutStart,
} from "../redux/user/userSlice";
import axios from "axios";
import PropTypes from 'prop-types';

const Navbar = ({ userInfo, onSearchNote, handleClearSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handles search query submission
  const handleSearch = () => {
    if (searchQuery.trim()) onSearchNote(searchQuery);
  };

  // Clears the search input and triggers clear search callback
  const clearSearch = () => {
    setSearchQuery("");
    handleClearSearch();
  };

  // Logs the user out by interacting with the API and updating Redux state
  const handleLogout = async () => {
    try {
      dispatch(signoutStart());

      const response = await axios.get("http://localhost:3000/api/auth/signout", {
        withCredentials: true,
      });

      if (!response.data.success) {
        dispatch(signoutFailure(response.data.message));
        toast.error(response.data.message);
        return;
      }

      toast.success(response.data.message);
      dispatch(signInSuccess());
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
      dispatch(signoutFailure(error.message));
    }
  };

  return (
    <nav className="bg-[#4f46e5] text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 ">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h2 className="text-2xl font-bold">
              <span className="text-white">Good</span>
              <span className="text-blue-200">Notes</span>
            </h2>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 flex justify-center px-2 lg:ml-6">
            <SearchBar
              value={searchQuery}
              onChange={({ target }) => setSearchQuery(target.value)}
              handleSearch={handleSearch}
              onClearSearch={clearSearch}
              className="bg-white bg-opacity-20 text-white placeholder-blue-200 border-0 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-white focus:bg-opacity-100 focus:text-indigo-900 transition duration-300"
            />
          </div>

          {/* Profile Information */}
          <ProfileInfo
            userInfo={userInfo}
            onLogout={handleLogout}
            className="flex items-center space-x-4"
            avatarClassName="h-10 w-10 rounded-full border-2 border-white overflow-hidden"
            nameClassName="text-sm font-medium text-white hidden md:block"
            menuClassName="mt-2 py-1 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            menuItemClassName="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-100 transition duration-150 ease-in-out"
          />
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  userInfo: PropTypes.object.isRequired,
  onSearchNote: PropTypes.func.isRequired,
  handleClearSearch: PropTypes.func.isRequired,
};

export default Navbar;
