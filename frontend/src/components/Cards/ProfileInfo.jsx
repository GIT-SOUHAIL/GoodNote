// eslint-disable-next-line no-unused-vars
import { getInitials } from "../../utils/helper";

// eslint-disable-next-line react/prop-types
const ProfileInfo = ({ onLogout, userInfo }) => {
  // eslint-disable-next-line react/prop-types
  const username = userInfo?.username || "Guest";

  return (
    <div className="flex items-center gap-3">
      {/* User information */}
      <div>
        <p className="text-sm font-medium">{username}</p>
      </div>

      {/* Logout Button */}
      <button
        onClick={onLogout}
        className="text-sm bg-indigo-800/50 px-3 py-1 rounded-md text-white hover:bg-indigo-500 transition-colors duration-200"
      >
        Logout
      </button>
    </div>
  );
};

export default ProfileInfo;
