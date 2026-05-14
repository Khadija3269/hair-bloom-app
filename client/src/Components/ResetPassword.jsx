import { Button, Container, FormGroup } from "reactstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "../App.css";
import bgImage from "../assets/str.jpg"; // ✨ أضفنا هذا فقط

const ResetPassword = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = () => {
    alert("Password changed successfully");
    navigate("/password-success");
  };

  return (
    <Container
      fluid
      className="reset-page"
      style={{                    // ✨ هذا اللي أضفناه فقط
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="reset-overlay"></div>

      <div className="reset-box">
        <h1 className="reset-title">Bloom Hair</h1>

        <h2 className="reset-subtitle">Reset Password</h2>

        <p className="reset-text">Enter new password</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FormGroup className="form-space">
            <input
              type="password"
              placeholder="New Password"
              {...register("newPassword", {
                required: "New Password is required",
              })}
              className="auth-input"
            />
            {errors.newPassword && (
              <p className="error-text">{errors.newPassword.message}</p>
            )}
          </FormGroup>

          <FormGroup className="form-space">
            <input
              type="password"
              placeholder="Confirm New Password"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === newPassword || "Passwords do not match",
              })}
              className="auth-input"
            />
            {errors.confirmPassword && (
              <p className="error-text">
                {errors.confirmPassword.message}
              </p>
            )}
          </FormGroup>

          <Button type="submit" className="auth-btn gray-btn">
            Save
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

export default ResetPassword;