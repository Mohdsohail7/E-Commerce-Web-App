import React, { useState } from "react";

export default function FilterBar({ onChange }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const apply = () => {
    onChange({ search, category, minPrice, maxPrice });
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-4 grid grid-cols-1 md:grid-cols-5 gap-3">
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
        className="col-span-2 px-3 py-2 border rounded"
      />
      <input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="Category (comma-separated)"
        className="px-3 py-2 border rounded"
      />
      <input
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        placeholder="Min price"
        type="number"
        className="px-3 py-2 border rounded"
      />
      <input
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        placeholder="Max price"
        type="number"
        className="px-3 py-2 border rounded"
      />
      <div className="md:col-span-5 flex gap-2 justify-end mt-2">
        <button
          onClick={() => {
            setSearch("");
            setCategory("");
            setMinPrice("");
            setMaxPrice("");
            onChange({});
          }}
          className="px-3 py-1 border rounded"
        >
          Reset
        </button>
        <button
          onClick={apply}
          className="px-3 py-1 bg-blue-600 text-white rounded"
        >
          Apply
        </button>
      </div>
    </div>
  );
}
