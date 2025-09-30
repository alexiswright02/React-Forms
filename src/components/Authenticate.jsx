import { useState } from "react";
import axios from "axios";

export default function Authenticate(token) {
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState(null);

  const handleClick = async () => {
    if (!token) {
      setError("Error: Token not found");
      console.log("Error: Token not found");
      return;
    } else {
      setError(null);
    }

    try {
      axios.defaults.headers.common = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(
        "https://fsa-jwt-practice.herokuapp.com/authenticate"
      );
      setSuccessMessage(response.data.message);
      setUsername(response.data.data.username);
      console.log(response.data.message);
    } catch (e) {
      setError("An error occurred", e);
      console.log("An error occurred", e);
    }
  };

  return (
    <>
      <h2>Authenticate!</h2>
      {username && <p style={{ color: "green" }}>Logged in as: {username}</p>}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button onClick={handleClick}>Authenticate Token</button>
    </>
  );
}
