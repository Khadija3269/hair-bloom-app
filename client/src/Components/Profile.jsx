import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaShoppingBag, FaEnvelope, FaPhone } from "react-icons/fa";
import "../App.css";
import bgImage from "../assets/str.jpg"; // ✨ أضفنا هذا فقط

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const orders = [
    { id: 1, title: "Hair Care Package", date: "12 May 2026", price: "27 OMR", status: "Delivered" },
    { id: 2, title: "Deep Repair Package", date: "09 May 2026", price: "33 OMR", status: "Delivered" },
    { id: 3, title: "Conditioner", date: "04 May 2026", price: "14 OMR", status: "Pending" },
  ];

  return (
    <Container
      fluid
      className="profile-page"
      style={{                    // ✨ هذا اللي أضفناه فقط
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="profile-wrapper">

        {/* HEADER */}
        <Row className="align-items-center mb-4">
          <Col xs="2">
            <span className="back-icon" onClick={() => navigate("/home")}>←</span>
          </Col>

          <Col xs="8" className="text-center">
            <h1 className="profile-title">Profile</h1>
          </Col>

          <Col xs="2" className="text-end">
            <span className="cart-icon" onClick={() => navigate("/cart")}>🛒</span>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col lg="8">

            {/* USER CARD */}
            <Card className="profile-card">
              <CardBody className="profile-card-body">

                <FaUserCircle className="profile-avatar" />

                <h2 className="profile-name">{user?.name || "User"}</h2>

                <p className="profile-role">Bloom Hair Customer</p>

                <div className="profile-info">
                  <FaEnvelope />
                  <span>{user?.email || "No email"}</span>
                </div>

                <div className="profile-info">
                  <FaPhone />
                  <span>{user?.phoneNumber || "No phone"}</span>
                </div>

                <Button
                  className="profile-btn"
                  onClick={() => navigate("/edit-profile")}
                >
                  Edit Profile
                </Button>

              </CardBody>
            </Card>

            {/* ORDERS */}
            <Card className="profile-card">
              <CardBody>

                <div className="orders-header">
                  <FaShoppingBag className="orders-icon" />
                  <h3 className="orders-title">Last Orders</h3>
                </div>

                {orders.map((order) => (
                  <div key={order.id} className="order-item">

                    <Row className="align-items-center">
                      <Col md="5">
                        <h5 className="order-name">{order.title}</h5>
                        <p className="order-date">{order.date}</p>
                      </Col>

                      <Col md="3">
                        <span className="order-price">{order.price}</span>
                      </Col>

                      <Col md="4" className="text-end">
                        <span
                          className={
                            order.status === "Delivered"
                              ? "status delivered"
                              : "status pending"
                          }
                        >
                          {order.status}
                        </span>
                      </Col>
                    </Row>

                  </div>
                ))}

              </CardBody>
            </Card>

          </Col>
        </Row>

      </div>
    </Container>
  );
};

export default Profile;