const LinkItem = ({ title, url, date, description, category, image }) => {
  return (
    <div className="border-2 pb-3 rounded-lg mt-6 max-w-lg border-gray-500">
      <img src={image} className="max-h-32 w-full object-cover "/>
      <div className="px-4 pt-2">
        <p className="text-gray-700 text-xs font-semibold mb-1">{category}</p>
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold mb-2 text-black-600">{title}</h3>
        </div>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <a href={url} target="_blank">
          <p className=" mb-2 text-blue-400 text-xs underline">{url}</p>
        </a>
        <p className="text-xs pt-0 text-gray-500">{date}</p>
      </div>
    </div>
  );
};

export default LinkItem;
