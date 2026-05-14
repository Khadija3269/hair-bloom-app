import { Container, Row, Col, Button } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";
import bgImage from "../assets/str.jpg"; // ✨ أضفنا الخلفية

const Choose = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [qty, setQty] = useState(1);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`https://bloom-hair-app.onrender.com/${id}`);
      const data = await response.json();
      setProduct(data);
    } catch (error) {
      console.log(error);
    }
  };

  const increase = () => setQty(qty + 1);
  const decrease = () => qty > 1 && setQty(qty - 1);

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingIndex = existingCart.findIndex(
      (item) => item._id === product._id
    );

    if (existingIndex !== -1) {
      existingCart[existingIndex].qty += qty;
    } else {
      existingCart.push({ ...product, qty });
    }

    localStorage.setItem("cart", JSON.stringify(existingCart));

    alert("Added to cart ✅");
    navigate("/home");
  };

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <Container
      fluid
      className="choose-page"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="choose-wrapper">

        {/* HEADER */}
        <Row className="align-items-center mb-4">
          <Col xs="2">
            <span className="back-icon" onClick={() => navigate("/home")}>
              ←
            </span>
          </Col>

          <Col xs="8" className="text-center">
            <h1 className="main-title">Bloom Hair</h1>
          </Col>

          <Col xs="2" className="text-end">
            <span className="menu-dots">⋮</span>
          </Col>
        </Row>

        {/* CARD */}
        <div className="choose-card">
          <h3 className="product-name">{product.name}</h3>

          <Row className="mb-3 align-items-center">
            <Col md="6">
              <h4 className="product-category">{product.category}</h4>
            </Col>

            <Col md="6" className="text-end">
              <span className="ingredient-title">Ingredient</span>
            </Col>
          </Row>

          {/* IMAGE + INGREDIENTS */}
          <div className="choose-grid">

            <div className="main-image-box">
              <img
                src={product.image}
                alt={product.name}
                className="main-image"
              />
            </div>

            <div>
              {product.ingredients && product.ingredients.length > 0 ? (
                product.ingredients.map((item, i) => (
                  <div key={i} className="ingredient-box">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="ingredient-img"
                    />
                    <p className="ingredient-name">{item.name}</p>
                  </div>
                ))
              ) : (
                <div className="no-ingredients">No ingredients</div>
              )}
            </div>

          </div>

          {/* DESCRIPTION */}
          <div className="description-box">
            <h5>Description</h5>
            <p>{product.description || "No description available"}</p>
          </div>

          {/* PRICE + QTY */}
          <Row className="align-items-center">
            <Col md="2">
              <h5 className="price">{product.price} OMR</h5>
            </Col>

            <Col md="3">
              <div className="qty-box-cart">
                <button className="qty-btn" onClick={decrease}>-</button>
                <span>{qty}</span>
                <button className="qty-btn" onClick={increase}>+</button>
              </div>
            </Col>

            <Col md="7" className="text-end">
              <Button className="cart-btn" onClick={handleAddToCart}>
                Add to cart
              </Button>
            </Col>
          </Row>

        </div>
      </div>
    </Container>
  );
};

export default Choose;
