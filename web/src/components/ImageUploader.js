import React, { useRef } from "react";

const ImageUploader = () => {
  const inputRef = useRef(null);
  const onButtonClick = () => inputRef.current.click();

  return (
    <div className="container">
      <h1 className="title text-poppins">Upload your image</h1>
      <p className="description text-poppins">File should be Jpeg, Png,...</p>
      <div className="input-wrapper">
        <input
          ref={inputRef}
          id="image"
          name="image"
          type="file"
          className="input-control"
          accept="image/*"
        />
        <img src="/images/image.svg" alt="Icon" className="img-icon" />
        <span className="gray-4 text-poppins drag-text">
          Drag & Drop your image here
        </span>
      </div>
      <span className="gray-4 text-poppins">Or</span>
      <button className="btn" onClick={onButtonClick}>
        Choose a file
      </button>
    </div>
  );
};

export default ImageUploader;
