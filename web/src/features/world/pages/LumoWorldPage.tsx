import { Link } from 'react-router-dom';

export default function LumoWorldPage() {
  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-black text-gray-800 mb-2">Lumo World</h1>
      <p className="text-gray-500 font-medium mb-6">Your magical world</p>
      
      <div className="grid grid-cols-2 gap-4">
        <Link to="/app/world/trophies" className="p-5 bg-yellow-50 rounded-2xl border-2 border-yellow-200 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-yellow-600">emoji_events</span>
          </div>
          <h3 className="font-bold text-gray-800">Trophy Room</h3>
        </Link>
        <Link to="/app/world/inventory" className="p-5 bg-blue-50 rounded-2xl border-2 border-blue-200 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-blue-600">inventory_2</span>
          </div>
          <h3 className="font-bold text-gray-800">Inventory</h3>
        </Link>
        <Link to="/app/world/avatar" className="p-5 bg-purple-50 rounded-2xl border-2 border-purple-200 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-purple-600">person</span>
          </div>
          <h3 className="font-bold text-gray-800">Avatar</h3>
        </Link>
      </div>
    </div>
  );
}
