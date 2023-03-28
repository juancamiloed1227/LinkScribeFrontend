import { useState } from "react";

const CategoryForm = () => {
  const [name, setName] = useState("");

  const handleClick = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `${import.meta.env.VITE_API_BASE_URL}/categories`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name,
        }),
      }
    );

    const json = await response.json();

    setName("");
  };

  return (
    <>
      <input
        type="text"
        className="text-black py-1 px-2 placeholder-gray-500 rounded-md border-2 border-gray-300 w-full mb-3"
        placeholder="Category name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="button"
        className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto mb-0"
        onClick={handleClick}
      >
        Add new category
      </button>
    </>
  );
};

export default CategoryForm;
