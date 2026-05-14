import { Container, Row, Col, Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FaSignOutAlt } from "react-icons/fa"; // ✨ فقط أضفنا هذا
import str from "../assets/str.jpg";

const AdminHome = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
// test cooment
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = () => {   // ✨ فقط أضفنا هذا
    localStorage.removeItem("user");
    navigate("/login");
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("https://bloom-hair-9an9.onrender.com");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log(error);
    }
  };

  const increaseQty = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: (item.quantity || 1) + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setProducts((prev) =>
      prev.map((item) =>
        item._id === id && (item.quantity || 1) > 1
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      )
    );
  };

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(
        `https://bloom-hair-9an9.onrender.com/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      alert(data.message);

      if (data.message === "Product deleted successfully ✅") {
        setProducts((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (error) {
      console.log(error);
      alert("Error deleting product ❌");
    }
  };

  const editProduct = (item) => {
    navigate("/admin-update", { state: { product: item } });
  };

  return (
    <Container
      fluid
      style={{
        minHeight: "100vh",
        backgroundImage: `url(${str})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        padding: "40px 20px",
        fontFamily: "'Poppins', sans-serif",
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          margin: "0 auto",
          background: "rgba(255,255,255,0.35)",
          backdropFilter: "blur(8px)",
          borderRadius: "24px",
          padding: "24px 20px 30px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "26px",
            position: "relative", // ✨ فقط أضفنا هذا
          }}
        >
          {/* ✨ logout icon */}
          <FaSignOutAlt
            onClick={handleLogout}
            style={{
              position: "absolute",
              left: "0",
              top: "0",
              cursor: "pointer",
              fontSize: "20px",
            }}
          />

          <h1
            style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#111",
              margin: 0,
            }}
          >
            Bloom Hair
          </h1>
        </div>

        {products.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              color: "#333",
              backgroundColor: "rgba(255,255,255,0.72)",
              borderRadius: "22px",
              padding: "24px",
              marginBottom: "18px",
              fontSize: "18px",
              fontWeight: "500",
            }}
          >
            No products yet
          </div>
        ) : (
          products.map((item) => (
            <div
              key={item._id}
              style={{
                backgroundColor: "rgba(255,255,255,0.92)",
                borderRadius: "24px",
                padding: "16px",
                marginBottom: "18px",
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
              }}
            >
              <Row className="align-items-center">
                <Col xs="4">
                  <div
                    style={{
                      width: "100%",
                      height: "95px",
                      borderRadius: "18px",
                      overflow: "hidden",
                      backgroundColor: "#e8dfd8",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                </Col>

                <Col xs="8">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "15px",
                        fontWeight: "500",
                        color: "#ef4d8a",
                        marginBottom: "8px",
                      }}
                    >
                      {item.name}
                    </h4>

                    <button
                      onClick={() => editProduct(item)}
                      style={{
                        border: "none",
                        background: "transparent",
                        fontSize: "22px",
                        cursor: "pointer",
                        lineHeight: 1,
                      }}
                    >
                      ✎
                    </button>
                  </div>

                  <div
                    style={{
                      fontSize: "22px",
                      fontWeight: "700",
                      color: "#111",
                      marginBottom: "12px",
                    }}
                  >
                    {item.price} OMR
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #888",
                        borderRadius: "20px",
                        padding: "4px 10px",
                        backgroundColor: "#f4f4f4",
                        minWidth: "98px",
                        justifyContent: "space-between",
                      }}
                    >
                      <button onClick={() => decreaseQty(item._id)}>-</button>
                      <span>{item.quantity || 1}</span>
                      <button onClick={() => increaseQty(item._id)}>+</button>
                    </div>

                    <button onClick={() => deleteProduct(item._id)}>
                      🗑
                    </button>
                  </div>
                </Col>
              </Row>
            </div>
          ))
        )}

        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <Button
            onClick={() => navigate("/admin-add")}
            style={{
              width: "70%",
              backgroundColor: "#efefef",
              color: "#111",
              border: "1px solid #777",
              borderRadius: "24px",
              fontSize: "18px",
              padding: "12px 20px",
              fontWeight: "500",
              boxShadow: "none",
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default AdminHome;
