import { Button, Container, Row, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "../App.css";
const Start = () => {
  const navigate = useNavigate();

  return (
    <Container fluid className="bg-page">    
      <div className="start-overlay">
      <Row className="vh-100 d-flex justify-content-center align-items-center m-0">
        <Col md="8" lg="7" className="text-center">

          <div className="start-box">
            <h1 className="start-title">Bloom Hair</h1>

            <p className="start-text">
              Let Your Hair Bloom Naturally
            </p>

            <Button
              onClick={() => navigate("/login")}
              className="start-btn"
            >
              Get Started
            </Button>
          </div>

        </Col>
      </Row>
    </div>
    </Container>
  );
};

export default Start;
