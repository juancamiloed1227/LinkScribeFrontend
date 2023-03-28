import { useState, useEffect } from "react";
import ListItem from "./ListItem";
import { GrFormAdd } from "react-icons/gr";
import ModalForm from "./ModalForm";

const ListSection = () => {
  const [modalState, setModalState] = useState("relative z-10 hidden");
  const [lists, setLists] = useState([]);
  const [categories, setCategories] = useState([]);
  const options = { month: "long", day: "numeric", year: "numeric" };

  const showModal = () => {
    setModalState("relative z-10");
  };

  useEffect(() => {
    const fetchLinks = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/lists`,
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      const data = await response.json();
      setLists(data);
    };

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

    fetchLinks();
    fetchCategories();
  }, []);

  const getCategoryName = (categoryId) => {
    const category = categories.find((category) => category.id == categoryId);
    return category ? category.name : "Uncategorized";
  };

  return (
    <>
      <ModalForm
        modalTitle="Add new list"
        btnAction="Add list"
        modalState={modalState}
        setModalState={setModalState}
        dataType="list"
        categoriesList={categories}
      />
      <div
        onClick={() => showModal()}
        className="flex items-center bg-gray-300 py-2 px-3 rounded-md mt-5 max-w-lg hover:bg-gray-400 hover:cursor-pointer"
      >
        <GrFormAdd className="text-2xl" />
        <p className="text-md font-semibold pl-2">Add new list</p>
      </div>
      {lists.map((list) => (
        <ListItem
          key={list.id}
          id={list.id}
          title={list.name}
          category={getCategoryName(list.categoryId)}
          date={new Date(list.updatedAt).toLocaleDateString("en-US", options)}
        />
      ))}
    </>
  );
};

export default ListSection;
