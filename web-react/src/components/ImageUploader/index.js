import "./index.css";

const ImageUploader = () => {
  return (
    <div className="container">
      <h1 className="title text-poppins">Upload your image</h1>
      <p className="description text-poppins">File should be Jpeg, Png,...</p>
      <div className="input-wrapper">
        <img src="/images/image.svg" alt="Icon" className="img-icon" />
        <span className="gray-4 text-poppins">Drag & Drop your image here</span>
      </div>
      <span className="gray-4 text-poppins">Or</span>
      <button className="btn">Choose a file</button>
    </div>
  );
};

export default ImageUploader;
