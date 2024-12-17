import React, { useState } from "react";
import axios from "axios";

function CookieButton() {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = async () => {
    const newState = !isToggled;
    setIsToggled(newState);

    try {
      await axios.post("http://localhost:8000/toggle_click", {
        status: newState,
      });
    } catch (error) {
      console.error("Error toggling click:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>クッキーやろや</h1>
        <p>クッキーをより楽に</p>
      <button
        onClick={handleToggle}
        style={{
          padding: "10px 20px",
          fontSize: "20px",
          backgroundColor: isToggled ? "red" : "green",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
          <p>このボタンクリックしたら連打が始まるからcookie開いて別ウィンドウにしてることを非常に強くお勧めします。</p>
        {isToggled ? "とめる" : "はいぱーくりっく"}
      </button>
    </div>
  );
}

export default CookieButton;
