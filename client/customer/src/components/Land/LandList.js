import React from "react";

const LandList = ({ lands }) => {
  if (!Array.isArray(lands) || lands.length === 0) {
    return <div>No lands available.</div>;
  }

  return (
    <div>
      <h2>Land List</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {lands.map((land) => (
          <div
            key={land.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              width: "200px",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
            }}
          >
            <h3 style={{ fontSize: "1.2rem", margin: "0 0 10px" }}>{land.title}</h3>
            <p style={{ margin: "0 0 10px" }}>{land.description}</p>
            <p style={{ margin: "0 0 10px" }}>Price: ₹{land.price.toLocaleString()}</p>
            <p style={{ margin: "0 0 10px" }}>Location: {land.location}</p>
            <img
              src={`http://localhost:5000${land.imageUrl}`}
              alt={land.title}
              style={{ width: "100%", height: "150px", objectFit: "cover", borderRadius: "5px" }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandList;
