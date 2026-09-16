import { useState } from "react";
import roomlime from "../../assets/roomline.png";
import facebook from "../../assets/facebook.png";
import google from "../../assets/google.png";
import apple from "../../assets/apple.png";
import hotel from "../../assets/hotel.jpg";
import { Link, useNavigate } from "react-router-dom";
import "./login.css";
import { login, register } from "../../api/authApi.js";
import Notification from "../../components/Notification.jsx";
import {
  validateConfrimPassword,
  validateEmail,
  validateName,
  validatePhone,
} from "../../validations/authValidations.js";

const Login = ({ setIsAuthenticated, setUserRole }) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [isNotification, setIsNotification] = useState(false);
  const [registerResponse, setRegisterResponse] = useState("");

  const [nameError, setNameError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const isLengthValid = password.length >= 6;
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[!@#$%^&*]/.test(password);

  const formData = {
    email,
    password,
  };

  const registerData = {
    email,
    password,
    name,
    phone,
    confirmPassword,
  };

  //login method
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(formData, () => {
        setEmail("");
        setPassword("");
      });
      const role = data?.user?.role;

      setIsAuthenticated(true);
      setUserRole(role);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", role);

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else if (role === "manager") {
        navigate("/manager/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //register method
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      let isNameValid = validateName(name, setNameError);
      let isEmailValid = validateEmail(email, setEmailError);
      let isPhoneValid = validatePhone(phone, setPhoneError);
      let isConfrimPassValid = validateConfrimPassword(
        password,
        confirmPassword,
        setConfirmPasswordError,
      );
      if (isNameValid && isEmailValid && isPhoneValid && isConfrimPassValid) {
        console.log(
          `password : ${password} and confirm password : ${confirmPassword}`,
        );

        const responseData = await register(registerData, () => {
          setEmail("");
          setPassword("");
          setName("");
          setPhone("");
          setConfirmPassword("");
        });
        if (responseData?.success) {
          setIsNotification(true);
          setRegisterResponse(responseData.success);
          // alert(responseData.success);
        }
        setTimeout(() => {
          setIsNotification(false);
        }, 10000);
      }
    } catch (error) {
      console.log("register failed", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-main">
        {isNotification && <Notification successMessage={registerResponse} />}

        {isCreateAccount ? (
          <div className="login-main-left">
            <div className="login-logo">
              <div className="logo-icon">
                <img src={roomlime} alt="" />
              </div>
              <div className="logo-name">
                <p>RoomLine</p>
              </div>
            </div>
            <div className="login-form">
              <div className="login-form-content register-form-content">
                <div className="login-form-header">
                  <p>Let's start our journey</p>
                  <p>Sign Up to RoomLine</p>
                </div>
                <div className="login-fields">
                  <form onSubmit={handleRegister}>
                    {/* row 1: username and phone */}
                    <div className="input-row">
                      <div className="input-group">
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            setName(newValue);
                            validateName(newValue, setNameError);
                          }}
                          className="custom-input"
                          placeholder=" "
                          required
                        />
                        <span className="error-msg">{nameError}</span>
                        <label htmlFor="name" className="custom-label">
                          User Name
                        </label>
                      </div>

                      <div className="input-group">
                        <input
                          type="text"
                          id="phone"
                          value={phone}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            setPhone(newValue);
                            validatePhone(newValue, setPhoneError);
                          }}
                          className="custom-input"
                          placeholder=" "
                          required
                        />
                        <span className="error-msg">{phoneError}</span>
                        <label htmlFor="phonw" className="custom-label">
                          Phone
                        </label>
                      </div>
                    </div>

                    {/* row 2 : email (full width) */}
                    <div className="input-group">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => {
                          const newValue = e.target.value;
                          setEmail(newValue);
                          validateEmail(newValue, setEmailError);
                        }}
                        className="custom-input"
                        placeholder=" "
                        required
                      />
                      <span className="error-msg">{emailError}</span>
                      <label htmlFor="email" className="custom-label">
                        E-mail
                      </label>
                    </div>

                    {/* row 3 : password and confirm password */}
                    <div className="input-row">
                      <div className="input-group">
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="custom-input"
                          placeholder=" "
                          required
                        />
                        <label htmlFor="password" className="custom-label">
                          Password
                        </label>
                        {password.length > 0 && (
                          <div className="password-rules">
                            <span
                              className={isLengthValid ? "valid" : "invalid"}
                            >
                              {isLengthValid ? "✓" : "○"} 6+ chars
                            </span>
                            <span className={hasUpper ? "valid" : "invalid"}>
                              {hasUpper ? "✓" : "○"} Uppercase (A-Z)
                            </span>
                            <span className={hasLower ? "valid" : "invalid"}>
                              {hasLower ? "✓" : "○"} Lowercase (a-z)
                            </span>
                            <span className={hasNumber ? "valid" : "invalid"}>
                              {hasNumber ? "✓" : "○"} Number (0-9)
                            </span>
                            <span className={hasSpecial ? "valid" : "invalid"}>
                              {hasSpecial ? "✓" : "○"} Symbol (!@#$)
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="input-group">
                        <input
                          type="password"
                          id="confirm-password"
                          value={confirmPassword}
                          onChange={(e) => {
                            const newValue = e.target.value;
                            setConfirmPassword(newValue);
                            validateConfrimPassword(
                              password,
                              newValue,
                              setConfirmPasswordError,
                            );
                          }}
                          className="custom-input"
                          placeholder=" "
                          required
                        />
                        <span className="error-msg">
                          {confirmPasswordError}
                        </span>
                        <label
                          htmlFor="confirm-password"
                          className="custom-label"
                        >
                          Confirm Password
                        </label>
                      </div>
                    </div>

                    <div className="login-btn">
                      <button>Sign Up</button>
                    </div>
                  </form>

                  <div className="signin-with-text"></div>

                  <div className="other-signin-btns">
                    <div className="facebook other-btn">
                      <img src={facebook} alt="" />
                    </div>
                    <div className="google other-btn">
                      <img src={google} alt="" />
                    </div>
                    <div className="apple other-btn">
                      <img src={apple} alt="" />
                    </div>
                  </div>
                  <div className="signup-forgot-pass-link">
                    <span
                      className="auth-link"
                      style={{ cursor: "pointer" }}
                      onClick={() => setIsCreateAccount(false)}
                    >
                      Sign in to account
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="login-main-left">
            <div className="login-logo">
              <div className="logo-icon">
                <img src={roomlime} alt="" />
              </div>
              <div className="logo-name">
                <p>RoomLine</p>
              </div>
            </div>
            <div className="login-form">
              <div className="login-form-content">
                <div className="login-form-header">
                  <p>Welcome Dear</p>
                  <p>Sign In to RoomLine</p>
                </div>
                <div className="login-fields">
                  <form onSubmit={handleLogin}>
                    <div className="input-group">
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="custom-input"
                        placeholder=" "
                        required
                      />
                      <label htmlFor="email" className="custom-label">
                        E-mail
                      </label>
                    </div>
                    <div className="input-group">
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="custom-input"
                        placeholder=" "
                        required
                      />
                      <label htmlFor="password" className="custom-label">
                        Password
                      </label>
                    </div>
                    <div className="login-btn">
                      <button>Sign in</button>
                    </div>
                  </form>
                  <div className="signin-with-text"></div>

                  <div className="other-signin-btns">
                    <div className="facebook other-btn">
                      <img src={facebook} alt="" />
                    </div>
                    <div className="google other-btn">
                      <img src={google} alt="" />
                    </div>
                    <div className="apple other-btn">
                      <img src={apple} alt="" />
                    </div>
                  </div>
                  <div className="signup-forgot-pass-link">
                    <span
                      className="auth-link"
                      style={{ cursor: "pointer" }}
                      onClick={() => setIsCreateAccount(true)}
                    >
                      Create an account
                    </span>

                    <Link
                      to="/forgot-password"
                      className="auth-link forgot-pass"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="login-main-right">
          <img className="hotel-image" src={hotel} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Login;
