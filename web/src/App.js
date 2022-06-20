import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Loading from "./components/Loading";
import Result from "./components/Result";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [imageURL, setImageURL] = useState(null);

  const onSubmitImage = async (event) => {
    try {
      const file = event.target.files[0];

      if (!file) return;

      setLoading(true);
      const body = new FormData();
      body.append("image", file);

      const response = await axios.post("/api/images/cloud", body, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status !== 201) {
        throw new Error(response.data.error);
      }

      event.target.value = "";
      setImageURL(response.data.url);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("An error occurred while uploading the image", {
        className: "text-poppins font-normal",
      });
    }
  };

  return (
    <div className="min-w-full min-h-screen flex flex-col relative">
      <main>
        {loading ? (
          <Loading />
        ) : (
          <>
            {imageURL ? (
              <Result url={imageURL} />
            ) : (
              <Form onSubmit={onSubmitImage} />
            )}
          </>
        )}
      </main>
      <Toaster />
      <Footer />
    </div>
  );
};

export default App;
