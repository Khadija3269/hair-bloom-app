import { Container, Row, Col, Button, FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import bgImage from "../assets/str.jpg";

const AddCard = () => {
  const navigate = useNavigate();

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleAddCard = () => {
    if (!cardName || !cardNumber || !expDate || !cvv) {
      alert("Please fill all fields");
      return;
    }

    const newCard = {
      id: Date.now(),
      cardName,
      cardNumber,
      expDate,
      cvv,
    };

    const oldCards = JSON.parse(localStorage.getItem("cards")) || [];
    const updatedCards = [...oldCards, newCard];

    localStorage.setItem("cards", JSON.stringify(updatedCards));
    localStorage.setItem("selectedCard", JSON.stringify(newCard));

    alert("Card added successfully");
    navigate("/delivery");
  };

  const formatCardNumber = (number) => {
    return number.replace(/\D/g, "").replace(/(.{4})/g, "$1 ").trim();
  };

  return (
    <Container
      fluid
      className="add-card-page"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="add-card-wrapper">
        <Row className="align-items-center mb-4">
          <Col xs="2">
            <span className="back-icon" onClick={() => navigate("/delivery")}>
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

        <div className="card-container">
          <Row>
            <Col lg="6" className="mb-4">
              <div className="card-preview">
                <div className="card-logo">
                  <span className="circle one"></span>
                  <span className="circle two"></span>
                </div>

                <div className="card-number">
                  {cardNumber
                    ? formatCardNumber(cardNumber)
                    : "**** **** **** ****"}
                </div>

                <div className="card-bottom">
                  <div>
                    <small>Card Holder</small>
                    <div>{cardName || "Your Name"}</div>
                  </div>

                  <div>
                    <small>Expires</small>
                    <div>{expDate || "DD/YY"}</div>
                  </div>
                </div>
              </div>
            </Col>

            <Col lg="6">
              <FormGroup>
                <label className="input-label">Card Name</label>
                <input
                  className="address-input"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </FormGroup>

              <FormGroup className="mt-3">
                <label className="input-label">Card Number</label>
                <input
                  className="address-input"
                  placeholder="**** **** **** ****"
                  value={cardNumber}
                  maxLength="16"
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </FormGroup>

              <Row className="mt-3">
                <Col md="6">
                  <label className="input-label">Exp Date</label>
                  <input
                    className="address-input"
                    placeholder="DD/YY"
                    value={expDate}
                    onChange={(e) => setExpDate(e.target.value)}
                  />
                </Col>

                <Col md="6">
                  <label className="input-label">CVV</label>
                  <input
                    type="password"
                    className="address-input"
                    placeholder="***"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </Col>
              </Row>

              <Button className="save-address-btn" onClick={handleAddCard}>
                Add Card
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </Container>
  );
};

export default AddCard;