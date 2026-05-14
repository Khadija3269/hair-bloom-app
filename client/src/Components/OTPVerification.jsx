import { Container, Row, Col, Button, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../App.css";
import bgImage from "../assets/str.jpg";

const OTPVerification = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join("");

    if (code.length === 4) {
      navigate("/thank-you");
    } else {
      alert("Please enter the 4-digit code");
    }
  };

  return (
    <Container
      fluid
      className="otp-page"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="otp-card">
        <Row className="align-items-center mb-4">
          <Col xs="2">
            <span className="back-icon" onClick={() => navigate(-1)}>
              ←
            </span>
          </Col>

          <Col xs="8" className="text-center">
            <h1 className="otp-brand">Bloom Hair</h1>
          </Col>

          <Col xs="2" className="text-end">
            <span className="menu-dots">⋮</span>
          </Col>
        </Row>

        <div className="otp-title-box">
          <h2 className="otp-title">
            OTP <br /> Verification
          </h2>
        </div>

        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <Input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="otp-input"
            />
          ))}
        </div>

        <div className="otp-btn-box">
          <Button className="otp-btn" onClick={handleVerify}>
            Verify
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default OTPVerification;