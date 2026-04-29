import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../Context/Context";
import axios from "axios";

const Cart = () => {
  const { cart, removeFromCart } = useContext(AppContext);
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImagesAndUpdateCart = async () => {
      try {
        const cartItemsWithImages = await Promise.all(
          cart.map(async (item) => {
            try {
              const response = await axios.get(
                `https://blog-hosting-server.onrender.com/api/product/${item.id}/image`,
                { responseType: "blob" }
              );
              const imageUrl = URL.createObjectURL(response.data);
              return { ...item, imageUrl };
            } catch (error) {
              console.error("Error fetching image:", error);
              return { ...item, imageUrl: "placeholder-image-url" };
            }
          })
        );
        setCartItems(cartItemsWithImages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (cart.length) {
      fetchImagesAndUpdateCart();
    } else {
      setCartItems([]);
    }
  }, [cart]);

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    const newCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(newCartItems);
  };

  return (
    <div className="cart-container">
      <div className="shopping-cart" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="title" style={{ textAlign: "center" }}>Favourites</div>
        {cartItems.length === 0 ? (
          <div className="empty" style={{ textAlign: "center", padding: "2rem" }}>
            <h4>Your Favourites is empty</h4>
          </div>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, width: "100%", maxWidth: "600px" }}>
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <div
                  className="item"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                    cursor: "pointer",
                    justifyContent: "center",
                    padding: "10px 0"
                  }}
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="cart-item-image"
                    onClick={() => navigate(`/product/${item.id}`)}
                    style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "8px" }}
                  />
                  <div
                    className="description"
                    onClick={() => navigate(`/product/${item.id}`)}
                    style={{ flexGrow: 1, maxWidth: "400px" }}
                  >
                    <span style={{ fontWeight: "bold", display: "block" }}>{item.title}</span>
                    <span style={{ fontStyle: "italic", fontSize: "0.85rem" }}>{"~ " + item.author}</span>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => handleRemoveFromCart(item.id)}
                  >
                    <i className="bi bi-trash3-fill"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Cart;