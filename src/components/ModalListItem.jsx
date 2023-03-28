import { useState, useEffect } from "react";

const ModalListItem = ({ modalState, setModalState, listId }) => {
  const [links, setLinks] = useState([]);
  const [linkToAdd, setLinkToAdd] = useState("");
  const [linkIdToAdd, setLinkIdToAdd] = useState();

  const handleChange = (link) => {
    setLinkToAdd(link);
    
    const linkFound = links.find((lk) => lk.title == link);
    setLinkIdToAdd(linkFound.id)
  };

  const hideModal = () => {
    setModalState("relative z-10 hidden");
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

  const handleClick = async (e) => {
    e.preventDefault();

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/lists/addLink`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({
          listId: listId,
          linkId: linkIdToAdd,
        }),
      });
  
      const json = await response.json();

      hideModal()
  }
  return (
    <>
      <div
        className={modalState}
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 w-full max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-base font-semibold leading-6 text-gray-900 mb-5"
                      id="modal-title"
                    >
                      Add new link to this list
                    </h3>
                    <select
                      className="text-gray-500 py-1 px-2 placeholder-gray-500 rounded-md border-2 border-gray-300 w-full mb-3"
                      value={linkToAdd}
                      onChange={(e) => handleChange(e.target.value)}
                    >
                      {links.map((link) => (
                        <option key={link.id}>{link.title}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-700 sm:mt-0 sm:w-auto"
                      onClick={(e) => handleClick(e)}
                    >
                      Add link
                    </button>
                    <button
                      onClick={() => hideModal()}
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalListItem;
