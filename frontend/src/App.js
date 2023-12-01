import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [height, setHeight] = useState(256);
  const [width, setWidth] = useState(256);
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const [message, setMessage] = useState();
  const handleDownload = async () => {
    try {
      const response = await axios.get("http://localhost:5000/download", {
        responseType: "blob", // Important: Set the responseType to 'blob'
      });

      // Create a blob URL and initiate a download
      const blob = new Blob([response.data], {
        type: response.headers["content-type"],
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "image.jpg";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("image", file);
    axios
      .post("http://localhost:5000/uploads", formData, config)
      .then((res) => {
        console.log(res);
        setMessage(res.data);
        axios.post("http://localhost:5000/resize", {height,width});
      })
      .then((response) => {
        setLoading(false);
      });
  };
  const [loading, setLoading] = useState(false);

  const [imagePreview, setImagePreview] = useState(null);
  return (
    <div className="App">
      <h1> Upload your images here</h1>
      {/* <form action="http://localhost:5000/uploads" method="POST" enctype="multipart/form-data"> */}
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          setFile(e.target.files[0]);
          // const fileReader = new FileReader();
          // let image = URL.createObjectURL(e.target.files[0]);

          // fileReader.readAsDataURL(image);
          let file = e.target.files[0];
          if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
              setImagePreview(reader.result);
            };

            reader.readAsDataURL(file);
          }
        }}
      />
      Height:{" "}
      <input type="number" onChange={(e) => setHeight(e.target.value)} />
      Widht: <input type="number" onChange={(e) => setWidth(e.target.value)} />
      <button type="submit" onClick={handleSubmit}>
        Generate
      </button>
      {imagePreview && (
        <img
          src={imagePreview}
          alt="Preview"
          style={{ maxWidth: "100%", maxHeight: "200px" }}
        />
      )}
      <button onClick={handleDownload}>Download</button>
      <div>{message}</div>
    </div>
  );
}

export default App;
