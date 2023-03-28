import { useState } from "react";

const LinkForm = ({ btnAction = "Add link" }) => {
  const [url, setUrl] = useState("");
  const [divClass, setDivClass] = useState("");
  const [loading, setLoading] = useState("text-gray-600 text-sm hidden");
  const [model, setModel] = useState("Bert Model");

  const handleClick = async (event) => {
    event.preventDefault();
    setDivClass("hidden");
    setLoading("text-gray-600 text-sm");

    const petitionModel = model == 'Bert Model' ? 'bert' : 'chatgpt'

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/links`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify({
        url: url,
        model: petitionModel
      }),
    });

    const json = await response.json();
    setDivClass("");
    setLoading("text-gray-600 text-sm hidden");
  };

  return (
    <>
      <div className={divClass}>
        <input
          type="text"
          className="text-black py-1 px-2 placeholder-gray-500 rounded-md border-2 border-gray-300 w-full mb-3"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <select
          className="text-gray-500 py-1 px-2 placeholder-gray-500 rounded-md border-2 border-gray-300 w-full mb-3"
          value={model}
          onChange={e => setModel(e.target.value)}
        >
          <option>Bert Model</option>
          <option>ChatGPT Model</option>
        </select>
        <button
          onClick={(e) => handleClick(e)}
          type="button"
          className="inline-flex w-full justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto mb-0"
        >
          {btnAction}
        </button>
      </div>
      <p className={loading}>Creating link ...</p>
    </>
  );
};

export default LinkForm;
