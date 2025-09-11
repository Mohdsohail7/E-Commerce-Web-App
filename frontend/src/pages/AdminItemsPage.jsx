import React, { useEffect, useState } from "react";
import { getItems, deleteItem } from "../services/itemService";
import { Link } from "react-router-dom";

const AdminItemsPage = () => {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    try {
      const data = await getItems();
      setItems(data.items || []); // ensure array
    } catch (err) {
      console.error("Failed to fetch items", err);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteItem(id);
        setItems(items.filter((item) => item._id !== id));
      } catch (err) {
        console.error("Failed to delete", err);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Items</h1>
        <Link
          to="/admin/items/new"
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Add Item
        </Link>
      </div>
      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Category</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Created At</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id} className="text-center">
              <td className="p-2 border">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover mx-auto"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="p-2 border">{item.name}</td>
              <td className="p-2 border">{item.description}</td>
              <td className="p-2 border">${item.price}</td>
              <td className="p-2 border">{item.category}</td>
              <td className="p-2 border">{item.stock}</td>
              <td className="p-2 border">
                {new Date(item.createdAt).toLocaleDateString()}
              </td>
              <td className="p-2 border space-x-2">
                <Link
                  to={`/admin/items/edit/${item._id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminItemsPage;
