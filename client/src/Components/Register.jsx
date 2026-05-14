import { Button, Container, FormGroup } from "reactstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Register = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = async (formData) => {
    try {
      const response = await fetch("https://hair-bloom-app.onrender.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phoneNumber: formData.phone,
          password: formData.password,
        }),
      });

      const data = await response.json();
      alert(data.message);

      if (data.message === "User registered successfully ✅") {
        navigate("/home");
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
        <h2 className="auth-subtitle">Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup className="form-space">
            <input
              data-testid="register-name"
              className="auth-input"
              type="text"
              placeholder="Full Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="error-text">{errors.name.message}</p>}
          </FormGroup>

          <FormGroup className="form-space">
            <input
              data-testid="register-email"
              className="auth-input"
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="error-text">{errors.email.message}</p>}
          </FormGroup>

          <FormGroup className="form-space">
            <input
              data-testid="register-phone"
              className="auth-input"
              type="text"
              placeholder="Phone Number"
              {...register("phone", { required: "Phone is required" })}
            />
            {errors.phone && <p className="error-text">{errors.phone.message}</p>}
          </FormGroup>

          <FormGroup className="form-space">
            <input
              data-testid="register-password"
              className="auth-input"
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && (
              <p className="error-text">{errors.password.message}</p>
            )}
          </FormGroup>

          <FormGroup className="form-space">
            <input
              data-testid="register-confirm-password"
              className="auth-input"
              type="password"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: "Confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <p className="error-text">{errors.confirmPassword.message}</p>
            )}
          </FormGroup>

          <Button
            data-testid="register-btn"
            type="submit" className="auth-btn gray-btn">
            Register
          </Button>

          <Button
            type="button"
            className="auth-btn white-btn"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </form>
      </div>
    </Container>
  );
};
export default Register;
