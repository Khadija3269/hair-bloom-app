import { Container, Button } from "reactstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import bgImage from "../assets/str.jpg";

const Feedback = () => {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [text, setText] = useState("");

  const submitFeedback = () => {
    alert("Feedback submitted!");
    navigate("/home");
  };

  return (
    <Container
      fluid
      className="feedback-page"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="feedback-wrapper">

        <h1 className="feedback-title">Bloom Hair</h1>

        <div className="feedback-box">

          {/* Close */}
          <button
            className="close-btn"
            onClick={() => navigate("/home")}
          >
            ×
          </button>

          {/* Heading */}
          <h2 className="feedback-heading">
            we appreciate your <br /> feedback.
          </h2>

          {/* Text */}
          <p className="feedback-text">
            we are always looking for ways to improve your experience.
            please take a moment to evaluate and tell us what you think.
          </p>

          {/* Stars */}
          <div className="stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                onClick={() => setRating(star)}
                className={star <= rating ? "star active" : "star"}
              >
                ★
              </span>
            ))}
          </div>

          {/* Textarea */}
          <textarea
            className="feedback-input"
            placeholder="what can we do to improve your experience?"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Button */}
          <Button className="feedback-btn" onClick={submitFeedback}>
            Submit My Feedback
          </Button>

        </div>
      </div>
    </Container>
  );
};

export default Feedback;