import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "../App.css";
import bgImage from "../assets/str.jpg"; // ✨ أضفنا هذا فقط

const Delivery = () => {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [shipping, setShipping] = useState(0);
  const [total, setTotal] = useState(0);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const [cards, setCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(savedCart);

    const sub = savedCart.reduce(
      (sum, item) => sum + Number(item.price) * Number(item.qty),
      0
    );

    const shipCost = sub > 100 ? 0 : 10;

    setSubtotal(sub);
    setShipping(shipCost);
    setTotal(sub + shipCost);

    const savedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    const savedSelectedAddress = JSON.parse(localStorage.getItem("selectedAddress"));

    setAddresses(savedAddresses);
    setSelectedAddress(savedSelectedAddress || savedAddresses[0] || null);

    const savedCards = JSON.parse(localStorage.getItem("cards")) || [];
    const savedSelectedCard = JSON.parse(localStorage.getItem("selectedCard"));

    setCards(savedCards);
    setSelectedCard(savedSelectedCard || savedCards[0] || null);
  }, []);

  const selectAddress = (address) => {
    setSelectedAddress(address);
    localStorage.setItem("selectedAddress", JSON.stringify(address));
  };

  const selectCard = (card) => {
    setSelectedCard(card);
    localStorage.setItem("selectedCard", JSON.stringify(card));
  };

  const getLastFour = (cardNumber) => {
    if (!cardNumber) return "****";
    return cardNumber.toString().slice(-4);
  };

  return (
    <Container
      fluid
      className="delivery-page"
      style={{   // 🔥 هذا فقط الإضافة
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="delivery-wrapper">

        {/* HEADER */}
        <Row className="align-items-center mb-4">
          <Col xs="2">
            <span className="back-icon" onClick={() => navigate("/cart")}>←</span>
          </Col>

          <Col xs="8" className="text-center">
            <h1 className="main-title">Bloom Hair</h1>
          </Col>

          <Col xs="2" className="text-end">
            <span className="menu-dots">⋮</span>
          </Col>
        </Row>

        <div className="delivery-card-main">
          <Row>

            {/* LEFT */}
            <Col lg="7">

              <h2 className="section-heading">Address</h2>

              {addresses.length === 0 ? (
                <Card className="delivery-card">
                  <CardBody className="center-text">No address</CardBody>
                </Card>
              ) : (
                addresses.map((address, index) => (
                  <Card
                    key={address.id}
                    className="delivery-card clickable"
                    onClick={() => selectAddress(address)}
                  >
                    <CardBody className="delivery-card-body">

                      <div>
                        <h5>Address {index + 1}</h5>
                        <p>
                          {address.city} / {address.area} <br />
                          {address.houseNo} <br />
                          {address.phone}
                        </p>
                      </div>

                      <Button
                        className={
                          selectedAddress?.id === address.id
                            ? "circle-pink-btn"
                            : "circle-gray-btn"
                        }
                      >
                        {selectedAddress?.id === address.id ? "✓" : ""}
                      </Button>

                    </CardBody>
                  </Card>
                ))
              )}

              <div className="add-row-box" onClick={() => navigate("/add-address")}>
                <span>Add Address</span>
                <button className="circle-outline-btn">+</button>
              </div>

              <h2 className="section-heading">Payment method</h2>

              {cards.length === 0 ? (
                <Card className="payment-card">
                  <CardBody className="center-text">No card</CardBody>
                </Card>
              ) : (
                cards.map((card) => (
                  <Card
                    key={card.id}
                    className="payment-card clickable"
                    onClick={() => selectCard(card)}
                  >
                    <CardBody className="payment-card-body">

                      <div className="credit-card-left">
                        <div className="visa-box">VISA</div>

                        <div>
                          <h4>{card.cardName}</h4>
                          <p>**** **** **** {getLastFour(card.cardNumber)}</p>
                        </div>
                      </div>

                      <Button
                        className={
                          selectedCard?.id === card.id
                            ? "circle-pink-btn"
                            : "circle-gray-btn"
                        }
                      >
                        {selectedCard?.id === card.id ? "✓" : ""}
                      </Button>

                    </CardBody>
                  </Card>
                ))
              )}

              <div className="add-row-box" onClick={() => navigate("/add-card")}>
                <span>Add New card</span>
                <button className="circle-outline-btn">+</button>
              </div>

            </Col>

            {/* RIGHT */}
            <Col lg="5">
              <div className="summary-box">

                <div className="summary-row">
                  <span>sub total :</span>
                  <span>{subtotal} OMR</span>
                </div>

                <div className="summary-row">
                  <span>shipment cost :</span>
                  <span>{shipping === 0 ? "Free" : `${shipping} OMR`}</span>
                </div>

                <div className="summary-total-row">
                  <span className="total-label">Total:</span>
                  <span className="total-value">{total} OMR</span>
                </div>

                <Button
                  className="pay-btn"
                  disabled={cartItems.length === 0}
                  onClick={() => {
                    if (!selectedAddress) return alert("Select address");
                    if (!selectedCard) return alert("Select card");
                    navigate("/otp");
                  }}
                >
                  Pay Now
                </Button>

              </div>
            </Col>

          </Row>
        </div>

      </div>
    </Container>
  );
};

export default Delivery;