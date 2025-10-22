import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Nav, Tab } from "react-bootstrap";
import { loginUserFunction, signupUserFunction } from "../utils/UserUtils";
import Navbar from "../components/Navbar";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("signin");
  const navigate = useNavigate();

  const [LoginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const [SignUpCredentials, setSignUpCredentials] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // ---------- VALIDATIONS ----------
  const LoginValidate = () =>
    LoginCredentials.email?.length > 0 && LoginCredentials.password?.length > 0;

  const SignUpValidateData = () =>
    SignUpCredentials.firstName?.length > 0 &&
    SignUpCredentials.lastName?.length > 0 &&
    SignUpCredentials.email?.length > 0 &&
    SignUpCredentials.password?.length > 0;

  // ---------- FORM SUBMIT HANDLER ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (activeTab === "signin") {
      await handleLoginSubmit();
    } else {
      await handleSignUpSubmit();
    }
  };

  // ---------- LOGIN ----------
  const handleLoginSubmit = async () => {
    console.log("Login submitted with credentials:", LoginCredentials);
    if (LoginValidate()) {
      const user = await loginUserFunction(LoginCredentials);
      navigate("/");
      alert("Login Successful!");
    } else {
      alert("Please fill all login fields.");
    }
  };

  // ---------- SIGNUP ----------
  const handleSignUpSubmit = async () => {
    console.log("Signup submitted with data:", SignUpCredentials);
    if (SignUpValidateData()) {
      const user = await signupUserFunction(SignUpCredentials);
      navigate("/");
      alert("Signup Successful!");
    } else {
      alert("Please fill all signup fields.");
    }
  };

  // ---------- INPUT HANDLERS ----------
  const handleLoginChange = (e) => {
    setLoginCredentials({
      ...LoginCredentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUpChange = (e) => {
    setSignUpCredentials({
      ...SignUpCredentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navbar />
      <div
        className="d-flex align-items-center justify-content-center min-vh-100"
        style={{
          background:
            "linear-gradient(135deg, #1f1f1f 0%, #2c2c2c 50%, #1a1a1a 100%)",
          color: "#fff",
        }}
      >
        <Container
          className="position-relative"
          style={{ zIndex: 2, maxWidth: "480px" }}
        >
          <Tab.Container
            activeKey={activeTab}
            onSelect={(key) => setActiveTab(key)}
          >
            <Nav variant="tabs" fill className="mb-3 bg-dark rounded-3 mt-4">
              <Nav.Item>
                <Nav.Link
                  eventKey="signin"
                  className={`text-light ${
                    activeTab === "signin" ? "bg-secondary" : "bg-dark"
                  }`}
                  style={{ borderRadius: "8px 0 0 8px" }}
                >
                  Sign In
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  eventKey="signup"
                  className={`text-light  ${
                    activeTab === "signup" ? "bg-secondary" : "bg-dark"
                  }`}
                  style={{ borderRadius: "0 8px 8px 0" }}
                >
                  Sign Up
                </Nav.Link>
              </Nav.Item>
            </Nav>

            <Tab.Content>
              {/* ---------- SIGN IN ---------- */}
              <Tab.Pane eventKey="signin">
                <Card className="shadow border-0 mb-5 bg-light text-dark rounded-4">
                  <Card.Body>
                    <h5 className="fw-bold mb-2">Welcome back</h5>
                    <p className="mb-4">Sign in to your account to continue</p>

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="signinEmail" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          id="signinEmail"
                          name="email"
                          className="form-control"
                          placeholder="you@example.com"
                          value={LoginCredentials.email}
                          onChange={handleLoginChange}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="signinPassword" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          id="signinPassword"
                          name="password"
                          className="form-control"
                          placeholder="••••••••"
                          value={LoginCredentials.password}
                          onChange={handleLoginChange}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-100" variant="dark">
                        Sign In
                      </Button>
                    </form>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* ---------- SIGN UP ---------- */}
              <Tab.Pane eventKey="signup">
                <Card className="shadow border-0 mb-5 bg-light text-dark rounded-4 mt-3">
                  <Card.Body>
                    <h5 className="fw-bold mb-2">Create an account</h5>
                    <p className="mb-4">Get started with CodeFlow IDE for free</p>

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="signupFirstName" className="form-label">
                          First Name
                        </label>
                        <input
                          type="text"
                          id="signupFirstName"
                          name="firstName"
                          className="form-control"
                          placeholder="John"
                          value={SignUpCredentials.firstName}
                          onChange={handleSignUpChange}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="signupLastName" className="form-label">
                          Last Name
                        </label>
                        <input
                          type="text"
                          id="signupLastName"
                          name="lastName"
                          className="form-control"
                          placeholder="Doe"
                          value={SignUpCredentials.lastName}
                          onChange={handleSignUpChange}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="signupEmail" className="form-label">
                          Email
                        </label>
                        <input
                          type="email"
                          id="signupEmail"
                          name="email"
                          className="form-control"
                          placeholder="you@example.com"
                          value={SignUpCredentials.email}
                          onChange={handleSignUpChange}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="signupPassword" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          id="signupPassword"
                          name="password"
                          className="form-control"
                          placeholder="••••••••"
                          value={SignUpCredentials.password}
                          onChange={handleSignUpChange}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-100" variant="dark">
                        Create Account
                      </Button>
                    </form>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Tab.Container>
        </Container>
      </div>
    </>
  );
};

export default Auth;
