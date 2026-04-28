import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const UpdateProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [image, setImage] = useState();
  const [updateProduct, setUpdateProduct] = useState({
    id: null,
    title: "",
    content: "",
    author: "",
    category: "",
    releaseDate: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/product/${id}`
        );
        setProduct(response.data);

        const responseImage = await axios.get(
          `http://localhost:8080/api/product/${id}/image`,
          { responseType: "blob" }
        );
        const imageFile = await converUrlToFile(responseImage.data, response.data.imageName);
        setImage(imageFile);
        setUpdateProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const converUrlToFile = async (blobData, fileName) => {
    const file = new File([blobData], fileName, { type: blobData.type });
    return file;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedProduct = new FormData();
    updatedProduct.append("imageFile", image);
    updatedProduct.append(
      "product",
      new Blob([JSON.stringify(updateProduct)], { type: "application/json" })
    );

    axios
      .put(`http://localhost:8080/api/product/${id}`, updatedProduct, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log("Blog updated successfully:", updatedProduct);
        alert("Blog updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating blog:", error);
        alert("Failed to update blog. Please try again.");
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateProduct({
      ...updateProduct,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="update-product-container">
      <div className="center-container" style={{ marginTop: "7rem" }}>
        <h1>Update Blog</h1>
        <form className="row g-3 pt-1" onSubmit={handleSubmit}>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Title</h6>
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={product.title}
              value={updateProduct.title}
              onChange={handleChange}
              name="title"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Author</h6>
            </label>
            <input
              type="text"
              name="author"
              className="form-control"
              placeholder={product.author}
              value={updateProduct.author}
              onChange={handleChange}
              id="author"
            />
          </div>
          <div className="col-12">
            <label className="form-label">
              <h6>Content</h6>
            </label>
            <textarea
              className="form-control"
              placeholder={product.content}
              name="content"
              onChange={handleChange}
              value={updateProduct.content}
              id="content"
              rows="5"
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">
              <h6>Category</h6>
            </label>
            <select
              className="form-select"
              value={updateProduct.category}
              onChange={handleChange}
              name="category"
              id="category"
            >
              <option value="">Select category</option>
              <option value="Technology">Technology</option>
              <option value="Travel">Travel</option>
              <option value="Mobile">Mobile</option>
              <option value="Food & Recipes">Food & Recipes</option>
              <option value="Finance">Finance</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Education">Education</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="col-md-4">
            <label className="form-label">
              <h6>Release Date</h6>
            </label>
            <input
              type="date"
              className="form-control"
              onChange={handleChange}
              value={updateProduct.releaseDate}
              name="releaseDate"
              id="releaseDate"
            />
          </div>
          <div className="col-md-8">
            <label className="form-label">
              <h6>Image</h6>
            </label>
            <img
              src={image ? URL.createObjectURL(image) : ""}
              alt={product.imageName}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                padding: "5px",
                margin: "0",
              }}
            />
            <input
              className="form-control"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              name="imageFile"
              id="imageFile"
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Update Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProduct;