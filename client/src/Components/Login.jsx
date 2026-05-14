import { Button, Container, FormGroup } from "reactstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await fetch("https://hair-bloom-app.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();
      alert(data.message);

      if (data.message === "Login successful ✅") {
        localStorage.setItem("user", JSON.stringify(data.user));

        if (data.user.role === "admin") {
          navigate("/admin-home");
        } else {
          navigate("/home");
        }
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong ❌");
    }
  };

  return (
    <Container fluid className="bg-page">
      <div className="auth-overlay"></div>

      <div className="auth-box">
        <h1 className="auth-title">Bloom Hair</h1>
        <h2 className="auth-subtitle">Login</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup className="form-space">
            <input
              data-testid="login-email"
              className="auth-input"
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="error-text">{errors.email.message}</p>
            )}
          </FormGroup>

          <FormGroup className="form-space">
            <input
              data-testid="login-password"
              className="auth-input"
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
          </FormGroup>

          <p
            className="forget-link"
            onClick={() => navigate("/forget-password")}
          >
            Forget Password?
          </p>

          <Button 
            data-testid="login-btn"
            type="submit" className="auth-btn gray-btn">
            Login
          </Button>

          <Button
            type="button"
            className="auth-btn white-btn"
            onClick={() => navigate("/register")}
          >
            Register Now
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default Login;
