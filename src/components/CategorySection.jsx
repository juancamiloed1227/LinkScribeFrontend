import CategoryItem from "./CategoryItem";
import { GrFormAdd } from "react-icons/gr";
import ModalForm from "./ModalForm";
import { useState, useEffect } from "react";

const CategorySection = () => {
  const [modalState, setModalState] = useState("relative z-10 hidden");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/categories`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      setCategories(data);
    };

    fetchCategories();
  }, []);

  const showModal = () => {
    setModalState("relative z-10");
  };

  return (
    <>
      <ModalForm
        modalTitle="Add new category"
        btnAction="Add category"
        modalState={modalState}
        setModalState={setModalState}
        dataType="category"
      />
      <div
        onClick={() => showModal()}
        className="flex items-center bg-gray-300 py-2 px-3 rounded-md mt-5 max-w-lg hover:bg-gray-400 hover:cursor-pointer"
      >
        <GrFormAdd className="text-2xl" />
        <p className="text-md font-semibold pl-2">Add new category</p>
      </div>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category.name} />
      ))}
    </>
  );
};

export default CategorySection;
