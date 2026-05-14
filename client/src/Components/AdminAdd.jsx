import { Container, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css";

const AdminAdd = () => {
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAdd = async () => {
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
      const response = await fetch("http://backend:5000/add-product", {
        method: "POST",
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
      });

      const data = await response.json();
      alert(data.message);

      if (data.message === "Product added successfully ✅") {
        navigate("/admin-home");
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <Container fluid className="admin-page">
      <div className="admin-wrapper">
        <h1 className="admin-title">Bloom Hair</h1>

        <div className="admin-card">
          <h2 className="admin-subtitle">
            Add New <br /> Product
          </h2>

          <input className="admin-input" type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <input className="admin-input" type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} />
          <input className="admin-input" type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} />
          <input className="admin-input" type="text" name="image" placeholder="Main Image URL" value={formData.image} onChange={handleChange} />
          <input className="admin-input" type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} />

          <select className="admin-input" name="category" value={formData.category} onChange={handleChange}>
            <option value="">Category</option>
            <option value="Hair Care">Hair Care</option>
            <option value="Full Set">Full Set</option>
            <option value="Deep Repair">Deep Repair</option>
          </select>

          <input className="admin-input" type="text" name="ingredient1Name" placeholder="Ingredient 1 Name" value={formData.ingredient1Name} onChange={handleChange} />
          <input className="admin-input" type="text" name="ingredient1Image" placeholder="Ingredient 1 Image URL" value={formData.ingredient1Image} onChange={handleChange} />

          <input className="admin-input" type="text" name="ingredient2Name" placeholder="Ingredient 2 Name" value={formData.ingredient2Name} onChange={handleChange} />
          <input className="admin-input" type="text" name="ingredient2Image" placeholder="Ingredient 2 Image URL" value={formData.ingredient2Image} onChange={handleChange} />

          <input className="admin-input" type="text" name="ingredient3Name" placeholder="Ingredient 3 Name" value={formData.ingredient3Name} onChange={handleChange} />
          <input className="admin-input" type="text" name="ingredient3Image" placeholder="Ingredient 3 Image URL" value={formData.ingredient3Image} onChange={handleChange} />

          <Button className="admin-btn" onClick={handleAdd}>
            Add
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default AdminAdd;
