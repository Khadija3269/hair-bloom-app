import { Container, Row, Col, Card, CardBody, Button, FormGroup } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import bgImage from "../assets/str.jpg"; // ✨ أضفنا هذا فقط

const EditProfile = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("Sara Aljabri");
  const [email, setEmail] = useState("sara@example.com");
  const [phone, setPhone] = useState("+968 91234567");
  const [password, setPassword] = useState("");

  const handleSave = () => {
    if (!fullName || !email || !phone) {
      alert("Please fill all required fields");
      return;
    }

    alert("Profile updated successfully");
    navigate("/profile");
  };

  return (
    <Container
      fluid
      className="edit-profile-page"
      style={{                     // ✨ هذا اللي أضفناه فقط
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="edit-profile-wrapper">

        {/* HEADER */}
        <Row className="align-items-center mb-4">
          <Col xs="2">
            <span className="back-icon" onClick={() => navigate("/profile")}>
              ←
            </span>
          </Col>

          <Col xs="8" className="text-center">
            <h1 className="edit-title">Edit Profile</h1>
          </Col>

          <Col xs="2"></Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg="8">
            <Card className="edit-card">
              <CardBody>

                <FormGroup className="mb-3">
                  <label className="address-label">Full Name</label>
                  <input
                    className="address-input"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </FormGroup>

                <FormGroup className="mb-3">
                  <label className="address-label">Email</label>
                  <input
                    className="address-input"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </FormGroup>

                <FormGroup className="mb-3">
                  <label className="address-label">Phone Number</label>
                  <input
                    className="address-input"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </FormGroup>

                <FormGroup className="mb-4">
                  <label className="address-label">New Password</label>
                  <input
                    className="address-input"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter new password"
                  />
                </FormGroup>

                <div className="edit-buttons">
                  <Button
                    className="cancel-btn"
                    onClick={() => navigate("/profile")}
                  >
                    Cancel
                  </Button>

                  <Button
                    className="save-btn"
                    onClick={handleSave}
                  >
                    Save Changes
                  </Button>
                </div>

              </CardBody>
            </Card>
          </Col>
        </Row>

      </div>
    </Container>
  );
};

export default EditProfile;