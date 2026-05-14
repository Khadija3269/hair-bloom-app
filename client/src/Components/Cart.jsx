import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "../App.css";
import bgImage from "../assets/str.jpg"; // ✨ أضفنا هذا فقط

const Cart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setItems(savedCart);
  }, []);

  const updateCartStorage = (updatedItems) => {
    setItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const increaseQty = (id) => {
    const updated = items.map((item) =>
      item._id === id ? { ...item, qty: item.qty + 1 } : item
    );
    updateCartStorage(updated);
  };

  const decreaseQty = (id) => {
    const updated = items
      .map((item) =>
        item._id === id ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0);

    updateCartStorage(updated);
  };

  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <Container
      fluid
      className="cart-page"
      style={{                    // ✨ هذا اللي أضفناه فقط
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="cart-wrapper">

        {/* TOP BAR */}
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

        {/* ITEMS */}
        <Row className="mt-4">
          {items.length === 0 ? (
            <Col md="12">
              <div className="cart-empty">Cart is empty</div>
            </Col>
          ) : (
            items.map((item) => (
              <Col md="12" className="mb-4" key={item._id}>
                <Card className="cart-card-custom">
                  <CardBody className="cart-card-body-custom">

                    <div className="cart-img-box">
                      <img src={item.image} alt={item.name} className="cart-img" />
                    </div>

                    <div className="cart-info">
                      <h4 className="cart-name">{item.name}</h4>
                      <h5 className="cart-price">{item.price} OMR</h5>
                    </div>

                    <div className="qty-box-cart">
                      <button className="qty-btn" onClick={() => decreaseQty(item._id)}>-</button>
                      <span>{item.qty}</span>
                      <button className="qty-btn" onClick={() => increaseQty(item._id)}>+</button>
                    </div>

                  </CardBody>
                </Card>
              </Col>
            ))
          )}
        </Row>

        {/* TOTAL */}
        <div className="cart-total-box">
          <Row className="align-items-center">
            <Col md="6">
              <h2 className="total-label">Total:</h2>
              <h2>{total} OMR</h2>
            </Col>

            <Col md="6" className="text-end">
              <Button
                className="pay-btn"
                onClick={() => navigate("/delivery")}
                disabled={items.length === 0}
              >
                Payment
              </Button>
            </Col>
          </Row>
        </div>

      </div>
    </Container>
  );
};

export default Cart;