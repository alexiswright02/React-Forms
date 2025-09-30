import { useState } from "react";
import axios from "axios";

export default function SignUpForm(setToken) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError("Error: Username and password are required");
      console.log("Error: Username and password are required");
      return;
    }

    if (username.length < 5) {
        setError("Error: Username must be at least 5 characters long");
        console.log("Error: Username must be at least 5 characters long");
        return;
      }
  
    if (password.length < 5) {
        setError("Error: Password must be at least 5 characters long");
        console.log("Error: Password must be at least 5 characters long");
        return;
      }

    try {
      const response = await axios.post(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          username: username,
          password: password,
        }
      );
      console.log(response.data.message);
      const { token } = response.data;
      console.log("Your token is:", token);
      setToken(token);
      setError(null);
    } catch (e) {
      setError("An error occurred", e);
      console.log("An error occurred", e);
    }
  };

  return (
    <>
      <h2>Sign up!</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <br />
        <label>
          Password:
          <br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <br />
        <button>Submit</button>
      </form>
    </>
  );
}
