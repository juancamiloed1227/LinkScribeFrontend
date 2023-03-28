import { useState } from "react";

const ListForm = ({ categoriesList }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [categoryId, setCategoryId] = useState();

  const handleChange = (category) => {
    setCategory(category);
    const categoryFound = categoriesList.find((cat) => cat.name == category);
    return categoryFound
      ? setCategoryId(categoryFound.id)
      : setCategoryId(null);
  };

  const handleClick = async (event) => {
    event.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/lists`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        name: title,
        categoryId: categoryId,
      }),
    });

    const json = await response.json();

    setTitle("");
    setCategory("Uncategorized");
  };

  return (
    <>
      <input
        type="text"
        className="text-black py-1 px-2 placeholder-gray-500 rounded-md border-2 border-gray-300 w-full mb-3"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <select
        className="text-gray-500 py-1 px-2 placeholder-gray-500 rounded-md border-2 border-gray-300 w-full mb-3"
        value={category}
        onChange={(e) => handleChange(e.target.value)}
      >
        <option>Uncategorized</option>
        {categoriesList.map((category) => (
          <option key={category.id}>{category.name}</option>
        ))}
      </select>
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto mb-0"
        onClick={handleClick}
      >
        Add new list
      </button>
    </>
  );
};

export default ListForm;
