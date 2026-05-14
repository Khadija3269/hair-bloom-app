import { Container, Button } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import str from "../assets/str.jpg";
import "../App.css";

const AdminUpdate = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const product = location.state?.product;

  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
    image: "",
    category: "",
    description: "",
    ingredient1Name: "",
    ingredient1Image: "",
    ingredient2Name: "",
    ingredient2Image: "",
    ingredient3Name: "",
    ingredient3Image: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        quantity: product.quantity || "",
        price: product.price || "",
        image: product.image || "",
        category: product.category || "",
        description: product.description || "",
        ingredient1Name: product.ingredients?.[0]?.name || "",
        ingredient1Image: product.ingredients?.[0]?.image || "",
        ingredient2Name: product.ingredients?.[1]?.name || "",
        ingredient2Image: product.ingredients?.[1]?.image || "",
        ingredient3Name: product.ingredients?.[2]?.name || "",
        ingredient3Image: product.ingredients?.[2]?.image || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = async () => {
    if (
      !formData.name ||
      !formData.quantity ||
      !formData.price ||
      !formData.image ||
      !formData.category ||
      !formData.description
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch(
        `http://backend:5000/update-product/${product._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            quantity: Number(formData.quantity),
            price: Number(formData.price),
            image: formData.image,
            category: formData.category,
            description: formData.description,
            ingredients: [
              {
                name: formData.ingredient1Name,
                image: formData.ingredient1Image,
              },
              {
                name: formData.ingredient2Name,
                image: formData.ingredient2Image,
              },
              {
                name: formData.ingredient3Name,
                image: formData.ingredient3Image,
              },
            ].filter((item) => item.name && item.image),
          }),
        }
      );

      const data = await response.json();
      alert(data.message);

      if (data.message === "Product updated successfully ✅") {
        navigate("/admin-home");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong ❌");
    }
  };

  const fieldStyle = {
    width: "100%",
    height: "46px",
    borderRadius: "22px",
    border: "1px solid #a0a0a0",
    backgroundColor: "#d9d9d9",
    padding: "0 16px",
    outline: "none",
    fontSize: "15px",
    textAlign: "center",
    marginBottom: "14px",
    color: "#333",
    boxSizing: "border-box",
  };

  return (
    <Container
      fluid
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${str})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px 20px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: "34px",
            fontWeight: "700",
            color: "#111",
            marginBottom: "24px",
            textAlign: "center",
          }}
        >
          Bloom Hair
        </h1>

        <div
          style={{
            width: "100%",
            maxWidth: "510px",
            background: "rgba(255,255,255,0.78)",
            backdropFilter: "blur(8px)",
            borderRadius: "28px",
            padding: "34px 26px 30px",
            textAlign: "center",
            boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "500",
              color: "#111",
              marginBottom: "28px",
              lineHeight: "1.3",
            }}
          >
            Update
            <br />
            Product
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            style={fieldStyle}
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            style={fieldStyle}
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            style={fieldStyle}
          />

          <input
            type="text"
            name="image"
            placeholder="Main Image URL"
            value={formData.image}
            onChange={handleChange}
            style={fieldStyle}
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            style={fieldStyle}
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            style={{
              ...fieldStyle,
              cursor: "pointer",
              appearance: "auto",
            }}
          >
            <option value="">Category</option>
            <option value="Hair Care">Hair Care</option>
            <option value="Full Set">Full Set</option>
            <option value="Deep Repair">Deep Repair</option>
          </select>

          <input
            type="text"
            name="ingredient1Name"
            placeholder="Ingredient 1 Name"
            value={formData.ingredient1Name}
            onChange={handleChange}
            style={fieldStyle}
          />

          <input
            type="text"
            name="ingredient1Image"
            placeholder="Ingredient 1 Image URL"
            value={formData.ingredient1Image}
            onChange={handleChange}
            style={fieldStyle}
          />

          <input
            type="text"
            name="ingredient2Name"
            placeholder="Ingredient 2 Name"
            value={formData.ingredient2Name}
            onChange={handleChange}
            style={fieldStyle}
          />

          <input
            type="text"
            name="ingredient2Image"
            placeholder="Ingredient 2 Image URL"
            value={formData.ingredient2Image}
            onChange={handleChange}
            style={fieldStyle}
          />

          <input
            type="text"
            name="ingredient3Name"
            placeholder="Ingredient 3 Name"
            value={formData.ingredient3Name}
            onChange={handleChange}
            style={fieldStyle}
          />

          <input
            type="text"
            name="ingredient3Image"
            placeholder="Ingredient 3 Image URL"
            value={formData.ingredient3Image}
            onChange={handleChange}
            style={fieldStyle}
          />

          <Button
            onClick={handleUpdate}
            style={{
              width: "100%",
              height: "46px",
              marginTop: "4px",
              backgroundColor: "#efefef",
              color: "#111",
              border: "1px solid #888",
              borderRadius: "24px",
              fontSize: "18px",
              fontWeight: "500",
              boxShadow: "none",
              boxSizing: "border-box",
            }}
          >
            Update
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default AdminUpdate;
