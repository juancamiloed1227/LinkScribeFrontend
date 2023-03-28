import { useState, useEffect } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import ModalListItem from "./ModalListItem";

const ListItem = ({ id, title, category = "Uncategorized", date }) => {
  const [modalState, setModalState] = useState("relative z-10 hidden");
  const [myLinks, setMyLinks] = useState([]);

  useEffect(() => {
    const fetchLinks = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/lists/getLinks/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });
      const json = await response.json();
      setMyLinks(json);
    };

    fetchLinks();
  }, []);

  const showModal = (event) => {
    event.preventDefault();
    setModalState("relative z-10");
  };

  return (
    <div className="border-2 py-3 px-5 rounded-lg mt-6 max-w-lg border-gray-500">
      <div className="flex justify-between">
        <ModalListItem
          modalState={modalState}
          setModalState={setModalState}
          listId={id}
        />
        <h3 className="text-xl font-semibold mb-2 text-black-600">{title}</h3>
        <BiDotsVerticalRounded
          onClick={(e) => showModal(e)}
          className="text-black-600 text-2xl hover:cursor-pointer"
        />
      </div>
      {
        myLinks.map((link) => (
          <a href={link.url} target="_blank"><p className="text-gray-500 text-sm">- {link.url}</p></a>
        ))
        
      }
      <p className=" mb-2 text-gray-800 text-sm bg-orange-300 w-36 text-center py-1 rounded-md mt-2">
        {category}
      </p>
      <p className="text-xs pt-0 text-gray-500">{date}</p>
    </div>
  );
};

export default ListItem;
