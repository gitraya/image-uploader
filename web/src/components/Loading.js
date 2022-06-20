const Loading = () => (
  <div className="container-uploader h-auto items-start">
    <h1 className="title text-poppins mb-7">Uploading...</h1>
    <div className="h-1.5 w-full overflow-hidden bg-neutral-100 rounded-lg">
      <div className="progress-bar-value w-full h-full bg-blue-500 rounded-lg" />
    </div>
  </div>
);

export default Loading;
