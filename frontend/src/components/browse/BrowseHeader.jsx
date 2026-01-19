const BrowseHeader = ({ genres, languages, filters, onChange }) => {
  return (
    <div className="border-b border-white/10 px-12 py-6">
      <h1 className="text-3xl font-bold mb-4">Browse by Languages</h1>

      <div className="flex items-center gap-4">
        {/* ORIGINAL LANGUAGE */}
        <select
          className="bg-black border border-white/30 px-4 py-2 rounded"
          value={filters.language}
          onChange={(e) => onChange("language", e.target.value)}
        >
          <option value="">All Languages</option>
          {languages.map((l) => (
            <option key={l.iso_639_1} value={l.iso_639_1}>
              {l.english_name}
            </option>
          ))}
        </select>

        {/* ENGLISH */}
        <select
          className="bg-black border border-white/30 px-4 py-2 rounded"
          value={filters.english}
          onChange={(e) => onChange("english", e.target.value)}
        >
          <option value="">All</option>
          <option value="en">English</option>
        </select>

        {/* RECOMMENDATIONS */}
        <select
          className="bg-black border border-white/30 px-4 py-2 rounded"
          value={filters.recommendations}
          onChange={(e) => onChange("recommendations", e.target.value)}
        >
          <option value="">Recommendations</option>
          <option value="trending">Trending</option>
        </select>
      </div>
    </div>
  );
};

export default BrowseHeader;
