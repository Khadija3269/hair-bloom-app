import { Container, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../App.css";
import bgImage from "../assets/str.jpg";

const ThankYou = () => {
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="thank-page"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="thank-box">
        <h1 className="thank-title">Bloom Hair</h1>

        <div className="thank-check">✓</div>

        <h2 className="thank-text">
          Payment Successful <br />
          Thank you for your order
        </h2>

        <Button
          onClick={() => navigate("/feedback")}
          className="thank-btn"
        >
          Feedback
        </Button>
      </div>
    </Container>
  );
};

export default ThankYou;