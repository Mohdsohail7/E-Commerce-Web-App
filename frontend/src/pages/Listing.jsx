import React, { useEffect, useState } from "react";
import { getItems } from "../services/itemService";
import ItemCard from "../components/ItemCard";
import FilterBar from "../components/FilterBar";

export default function Listing() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getItems(filters);
        setItems(res.items);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [filters]);

  return (
    <main className="container-max py-8">
      <FilterBar onChange={setFilters} />

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((it) => (
            <ItemCard key={it._id} item={it} />
          ))}
        </div>
      )}
    </main>
  );
}
