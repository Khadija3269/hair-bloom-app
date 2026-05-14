import { Button, Container, FormGroup } from "reactstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../App.css";
import bgImage from "../assets/str.jpg"; // ✨ أضفنا هذا فقط

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    alert("Reset link sent to: " + email);
    navigate("/reset-password");
  };

  return (
    <Container
      fluid
      className="forget-page"
      style={{                       // ✨ هذا اللي أضفناه فقط
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="forget-overlay"></div>

      <div className="forget-box">
        <h1 className="forget-title">Bloom Hair</h1>

        <h2 className="forget-subtitle">Forget Password</h2>

        <p className="forget-text">
          Enter your email to reset your password
        </p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup className="form-space">
            <input
              className="auth-input"
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                onChange: (e) => setEmail(e.target.value),
              })}
            />

            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </FormGroup>

          <Button type="submit" className="auth-btn gray-btn">
            Send
          </Button>

          <Button
            type="button"
            className="auth-btn white-btn"
            onClick={() => navigate("/login")}
          >
            Back to Login
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default ForgetPassword;