import toast, { Toaster } from "react-hot-toast";
import { copyToClipboard } from "../utils";

const Result = ({ url }) => {
  const copyImageUrl = () => {
    copyToClipboard(url);
    toast.success("Image URL copied to clipboard", {
      className: "text-poppins font-normal",
    });
  };

  return (
    <div className="container-uploader justify-start h-auto">
      <div className="bg-green-600 rounded-full w-9 h-9 flex items-center justify-center mb-3">
        <i className="fa-solid fa-check fa-xl text-white" />
      </div>
      <h1 className="title text-poppins mb-7">Uploaded Successfully!</h1>
      <img src={url} alt="Result" className="w-full rounded-xl mb-7" />
      <div className="w-full relative">
        <input
          type="text"
          id="image-url"
          className="bg-gray-100 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed"
          value={url}
          disabled
          readOnly
        />
        <button
          className="btn absolute right-1 top-1 text-poppins"
          type="button"
          onClick={copyImageUrl}
        >
          Copy Link
        </button>
      </div>
      <Toaster />
    </div>
  );
};

export default Result;
