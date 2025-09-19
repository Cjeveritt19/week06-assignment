import "./Image.css";
import { useState, useEffect } from "react";

export default function Image() {
  const [images, setImages] = useState([]);
  const [selectImage, setSelectImage] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(import.meta.env.VITE_API_URL);

      const data = await response.json();
      setImages(data);
      if (data.length > 0) {
        setSelectImage(data[0]);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <h1 className="header">Accessible Image Gallery</h1>

      <div className="thumbnail-container">
        {images.map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt={image.alt}
            onClick={() => setSelectImage(image)}
            className={` ${selectImage?.id === image.id ? "active" : ""}`}
          />
        ))}
      </div>

      <section className="large-image-section">
        {selectImage && (
          <div>
            <img src={selectImage.url} alt={selectImage.alt} />
          </div>
        )}
      </section>
    </>
  );
}
