import { Container, Row, Col, Card, CardBody, Button, Input } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaUser, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import "../App.css";
import bgImage from "../assets/str.jpg";


const Home = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://bloom-hair-9an9.onrender.com");
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const filteredItems = items.filter(
    (item) =>
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.description?.toLowerCase().includes(search.toLowerCase()) ||
      item.category?.toLowerCase().includes(search.toLowerCase())
  );
/*start of container*/
  return (
    <Container
      fluid
      className="home-page"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
      }}
    >
      <div className="home-wrapper">

        {/* HEADER */}
        <Row className="align-items-center mb-3">

          {/* 🔥 LEFT (Logout) */}
          <Col xs="5">
            <FaSignOutAlt onClick={handleLogout} className="icon" />
          </Col>

          {/* 🔥 CENTER (Title) */}
          <Col xs="2" className="text-center">
            <h1 className="home-title">Bloom Hair</h1>
          </Col>

          {/* 🔥 RIGHT (Profile + Cart) */}
          <Col xs="5" className="home-icons">
            <FaUser onClick={() => navigate("/profile")} className="icon" />
            <FaShoppingCart onClick={() => navigate("/cart")} className="icon" />
          </Col>

        </Row>

        {/* SEARCH */}
        <Row className="mb-3">
          <Col xs="12">
            <Input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
            />
          </Col>
        </Row>

        {/* PRODUCTS */}
        <Row>
          {filteredItems.length === 0 ? (
            <Col xs="12">
              <div className="no-products">No products yet</div>
            </Col>
          ) : (
            filteredItems.map((item) => (
              <Col xs="6" md="3" className="mb-3" key={item._id}>
                <Card className="product-card-home">
                  <CardBody>

                    <div className="product-img-box">
                      <img src={item.image} alt={item.name} className="product-img" />
                    </div>

                    <h5 className="product-name">{item.name}</h5>

                    <p className="product-desc">
                      {item.description || item.category || "Hair product"}
                    </p>

                    <div className="product-bottom-row">
                      <span className="product-price">{item.price} OMR</span>

                      <Button
                        className="add-btn-small"
                        onClick={() => navigate(`/choose/${item._id}`)}
                      >
                        +
                      </Button>
                    </div>

                  </CardBody>
                </Card>
              </Col>
            ))
          )}
        </Row>

      </div>
    </Container>
  );
};

export default Home;
