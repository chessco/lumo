export default function StorySelectPage() {
  return (
    <div className="p-4 md:p-6 max-w-2xl mx-auto">
      <h1 className="text-3xl font-black text-gray-800 mb-2">Lumo Stories</h1>
      <p className="text-gray-500 font-medium mb-6">Choose a story to read</p>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-5 bg-white rounded-2xl border-2 border-green-100 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-green-600">auto_stories</span>
          </div>
          <h3 className="font-bold text-gray-800">The Magic Garden</h3>
          <p className="text-sm text-gray-500">Beginner</p>
        </div>
      </div>
    </div>
  );
}
