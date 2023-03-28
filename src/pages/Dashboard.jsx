import { useState } from "react";
import LinkSection from "../components/LinkSection";
import ListSection from "../components/ListSection";
import CategorySection from "../components/CategorySection";

const Dashboard = () => {
  const [element, setElement] = useState("links");

  const handleEvent = (e, element) => {
    e.preventDefault();
    setElement(element);
  };

  const renderSection = () => {
    if (element == "links") {
      return <LinkSection />;
    } else if (element == "lists") {
      return <ListSection />;
    } else {
      return <CategorySection />;
    }
  };

  return (
    <>
      <nav className="bg-blue-600">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-white text-2xl font-semibold">Link Scribe</h1>
            </div>
            <div className="flex items-center">
              <img
                className="h-8 w-8 rounded-full"
                src="https://picsum.photos/id/128/50"
              />
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 lg:max-w-xl md:max-w-xl">
        <div className="px-6 py-4 sm:px-0">
          <div className="flex  justify-evenly max-w-lg">
            <button
              onClick={(e) => handleEvent(e, "links")}
              className="bg-blue-500 py-2 px-6 rounded-md text-md text-white font-medium hover:bg-blue-600"
            >
              Links
            </button>
            <button
              onClick={(e) => handleEvent(e, "lists")}
              className="bg-orange-500 py-2 px-6 rounded-md text-md text-white font-medium hover:bg-orange-600"
            >
              Lists
            </button>
            <button
              onClick={(e) => handleEvent(e, "categories")}
              className="bg-green-500 py-2 px-6 rounded-md text-md text-white font-medium hover:bg-green-600"
            >
              Categories
            </button>
          </div>
          <div>{renderSection()}</div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
