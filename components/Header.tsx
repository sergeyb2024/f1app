'use client';

interface HeaderProps {
  savedCount: number;
  onShowSaved: () => void;
}

const Header: React.FC<HeaderProps> = ({ savedCount, onShowSaved }) => {
  return (
    <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-700">
      <div className="p-3 rounded-lg bg-gray-800 border border-gray-700 shadow-md">
        <span className="font-extrabold text-2xl text-blue-500 tracking-wider">
          RACE.APP
        </span>
      </div>
      <button
        onClick={onShowSaved}
        className="p-3 rounded-lg bg-gray-800 border border-gray-700 shadow-md cursor-pointer hover:bg-gray-700 transition duration-300"
      >
        <span className="font-bold text-lg text-amber-400">
          SAVED ({savedCount})
        </span>
      </button>
    </div>
  );
};

export default Header;
