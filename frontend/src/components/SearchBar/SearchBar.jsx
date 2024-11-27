import { FaMagnifyingGlass } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import PropTypes from 'prop-types';

const SearchBar = ({ value, onChange, handleSearch, onClearSearch }) => {
  return (
    <div className="flex items-center w-40 sm:w-60 md:w-80 px-4 bg-slate-100 rounded-md">
      {/* Input Field */}
      <input
        type="text"
        placeholder="Search Notes..."
        className="w-full text-sm bg-transparent py-2 outline-none text-gray-700"
        value={value}
        onChange={onChange}
      />

      {/* Clear Icon */}
      {value && (
        <IoMdClose
          className="text-gray-500 text-xl cursor-pointer hover:text-gray-700 transition-colors duration-200"
          onClick={onClearSearch}
        />
      )}

      {/* Search Icon */}
      <FaMagnifyingGlass
        className="text-gray-500 text-xl cursor-pointer hover:text-gray-700 transition-colors duration-200"
        onClick={handleSearch}
      />
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
  onClearSearch: PropTypes.func.isRequired,
};

export default SearchBar;
