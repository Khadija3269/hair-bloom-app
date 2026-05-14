import { Container, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../App.css";

const CardSuccess = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="success-page">
      <div className="success-container">
        
        <h1 className="success-title">Bloom Hair</h1>

        <div className="success-circle">
          <span className="success-check">✓</span>
        </div>

        <p className="success-text">
          Card added successfully
        </p>

        <Button
          className="success-btn"
          onClick={() => navigate("/delivery")}
        >
          Continue
        </Button>

      </div>
    </Container>
  );
};

export default CardSuccess;