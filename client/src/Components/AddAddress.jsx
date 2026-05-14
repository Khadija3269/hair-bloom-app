import { Container, Row, Col, Button, FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import bgImage from "../assets/str.jpg";

const AddAddress = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [houseNo, setHouseNo] = useState("");
  const [phone, setPhone] = useState("");

  const handleSaveAddress = () => {
    if (!fullName || !city || !area || !houseNo || !phone) {
      alert("Please fill all fields");
      return;
    }

    const newAddress = {
      id: Date.now(),
      fullName,
      city,
      area,
      houseNo,
      phone,
    };

    const oldAddresses = JSON.parse(localStorage.getItem("addresses")) || [];
    const updatedAddresses = [...oldAddresses, newAddress];

    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
    localStorage.setItem("selectedAddress", JSON.stringify(newAddress));

    alert("Address added successfully");
    navigate("/delivery");
  };

  return (
    <Container
      fluid
      className="add-address-page"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="add-address-wrapper">
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

        <div className="address-card">
          <h2 className="address-title">Add Address</h2>

          <Row>
            <Col md="6" className="mb-3">
              <FormGroup>
                <label className="address-label">Full Name</label>
                <input
                  className="address-input"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Enter your full name"
                />
              </FormGroup>
            </Col>

            <Col md="6" className="mb-3">
              <FormGroup>
                <label className="address-label">Phone Number</label>
                <input
                  className="address-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                />
              </FormGroup>
            </Col>

            <Col md="6" className="mb-3">
              <FormGroup>
                <label className="address-label">City</label>
                <input
                  className="address-input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Enter city"
                />
              </FormGroup>
            </Col>

            <Col md="6" className="mb-3">
              <FormGroup>
                <label className="address-label">Area</label>
                <input
                  className="address-input"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Enter area"
                />
              </FormGroup>
            </Col>

            <Col md="12" className="mb-3">
              <FormGroup>
                <label className="address-label">House / Building No</label>
                <input
                  className="address-input"
                  value={houseNo}
                  onChange={(e) => setHouseNo(e.target.value)}
                  placeholder="Enter house or building number"
                />
              </FormGroup>
            </Col>
          </Row>

          <Button className="save-address-btn" onClick={handleSaveAddress}>
            Save Address
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default AddAddress;