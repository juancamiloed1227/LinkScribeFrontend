import { useState, useEffect } from "react";
import LinkItem from "./LinkItem";
import { GrFormAdd } from "react-icons/gr";
import ModalForm from "./ModalForm";

const LinkSection = () => {
  const [links, setLinks] = useState([]);
  const [modalState, setModalState] = useState("relative z-10 hidden");
  const options = { month: "long", day: "numeric", year: "numeric" };

  const showModal = () => {
    setModalState("relative z-10");
  };

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/links`,
          {
            headers: {
              Authorization: localStorage.getItem("token"),
            },
          }
        );
        const data = await response.json();
        setLinks(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLinks();
  }, []);

  return (
    <>
      <ModalForm
        modalTitle="Add new link"
        btnAction="Add link"
        modalState={modalState}
        setModalState={setModalState}
        dataType="link"
      />
      <div
        onClick={() => showModal()}
        className="flex items-center bg-gray-300 py-2 px-3 rounded-md mt-5 max-w-lg hover:bg-gray-400 hover:cursor-pointer"
      >
        <GrFormAdd className="text-2xl" />
        <p className="text-md font-semibold pl-2">Add new link</p>
      </div>
      {links.map((link) => (
        <LinkItem
          key={link.id}
          title={link.title}
          url={link.url}
          date={new Date(link.updatedAt).toLocaleDateString("en-US", options)}
          description={link.description}
          category={link.category}
          image={link.image}
        />
      ))}
    </>
  );
};

export default LinkSection;
