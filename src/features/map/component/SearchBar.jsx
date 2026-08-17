// src/components/map/SearchBar.jsx
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocation, faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  onSearchSubmit,
  isSearching,
}) => {
  return (
    <form onSubmit={onSearchSubmit} className="flex gap-1 w-full">
      <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-100 w-full flex flex-col sm:flex-row max-w-xl lg:mx-0">
        <div className="relative grow flex items-center p-1 text-slate-400 w-full gap-1">
          <FontAwesomeIcon icon={faLocation} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="أدخل اسم المدينة، الشارع، أو الحي ..."
            className="w-full pl-4 pr-10 py-1 outline-none text-slate-800 placeholder-slate-400 bg-transparent"
            dir="auto"
          />
        </div>
        <button
          type="submit"
          disabled={isSearching}
          className={`bg-secondary hover:bg-slate-800 text-white px-8 py-2 rounded-xl font-bold transition-colors sm:w-auto w-80 flex items-center justify-center gap-2 ${
            isSearching
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-emerald-600 text-white hover:bg-emerald-700'
          }`}
        >
          ابحث
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;