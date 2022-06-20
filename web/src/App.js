import React, { useState } from "react";
import axios from "axios";
import Footer from "./components/Footer";
import Form from "./components/Form";
import Loading from "./components/Loading";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
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
      const data = await response.json();

      if (data.status !== "SUCCESS") {
        throw new Error(data.error);
      }

      event.current.value = "";
      setImageURL(data.imageURL);
      setLoading(false);
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <main>{loading ? <Loading /> : <Form onSubmit={onSubmitImage} />}</main>
      <Footer />
    </div>
  );
};

export default App;
