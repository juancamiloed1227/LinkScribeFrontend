import { BiDotsVerticalRounded } from "react-icons/bi";

const CategoryItem = ({ category }) => {
  return (
    <div className="border-2 py-3 px-5 rounded-lg mt-6 max-w-lg border-gray-500">
      <div className="flex justify-between">
        <p className=" mb-2 text-gray-800 text-sm bg-orange-300 w-52 text-center py-1 rounded-md">
          {category}
        </p>
        <BiDotsVerticalRounded className="text-black-600 text-2xl hover:cursor-pointer" />
      </div>
    </div>
  );
};

export default CategoryItem;
