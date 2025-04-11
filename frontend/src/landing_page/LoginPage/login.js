import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css"; // Using the same CSS for consistency

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setRememberMe(checked);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
  
    try {
      const response = await axios.post("http://localhost:3002/api/auth/login", {
        ...formData,
        password: formData.password.trim(),
      });
      
  
      // Store JWT token in localStorage
      localStorage.setItem("token", response.data.token);

        // ✅ Save login status
        localStorage.setItem("isLoggedIn", "true");

        // ✅ Redirect to Dashboard app (running on port 3001 or 3003)
       // window.location.href = "http://localhost:3001"; // Change this if needed
       alert("Login successful");
       window.location.href = process.env.REACT_APP_DASHBOARD_URL;

  
     
       // 🔁 Redirect to the separate Dashboard app
   // window.location.href = "http://localhost:3003"; // Change this to your actual dashboard URL
  } catch (err) {
    setError(
      err.response?.data?.error || "Invalid username or password"
    );
  } finally {
    setLoading(false);
  }
};

  //     navigate("/dashboard");

  //   } catch (err) {
  //     setError(
  //       err.response?.data?.error || "Invalid username or password"
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  
  
  return (
    <div className="signup-container login-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleSubmit} className="signup-form">
        {error && <div className="error-message">{error}</div>}

        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          required
          className="input-field"
        />
        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input-field"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="toggle-password"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <div className="remember-me">
          <label>
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={handleChange}
            />
            Remember me
          </label>
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "Logging in..." : "Login"}
        </button>

        <p className="redirect-text">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;



// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import styles from "./Login.module.css"; // Updated to use CSS module

// const LoginPage = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox") {
//       setRememberMe(checked);
//     } else {
//       setFormData({
//         ...formData,
//         [name]: value,
//       });
//     }
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const trimmedData = {
//         username: formData.username.trim(),
//         password: formData.password.trim(),
//       };

//       const response = await axios.post(
//         "http://localhost:3003/api/auth/login",
//         trimmedData
//       );
//       alert("Login successful");

//       // Redirect to separate dashboard React app
//       window.location.href = "http://localhost:3001"; // Replace with your actual dashboard URL
//     } catch (err) {
//       setError(
//         err.response?.data?.error || "Invalid username or password"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className={`${styles.signupContainer} ${styles.loginContainer}`}>
//       <h2 className={styles.formTitle}>Login</h2>
//       <form onSubmit={handleSubmit} className={styles.signupForm}>
//         {error && <div className={styles.errorMessage}>{error}</div>}

//         <input
//           type="text"
//           name="username"
//           placeholder="Enter your username"
//           value={formData.username}
//           onChange={handleChange}
//           required
//           className={styles.inputField}
//         />
//         <div className={styles.passwordWrapper}>
//           <input
//             type={showPassword ? "text" : "password"}
//             name="password"
//             placeholder="Enter your password"
//             value={formData.password}
//             onChange={handleChange}
//             required
//             className={styles.inputField}
//           />
//           <button
//             type="button"
//             onClick={togglePasswordVisibility}
//             className={styles.togglePassword}
//           >
//             {showPassword ? "Hide" : "Show"}
//           </button>
//         </div>

//         <div className={styles.rememberMe}>
//           <label>
//             <input
//               type="checkbox"
//               checked={rememberMe}
//               onChange={handleChange}
//             />
//             Remember me
//           </label>
//         </div>

//         <button type="submit" disabled={loading} className={styles.submitBtn}>
//           {loading ? "Logging in..." : "Login"}
//         </button>

//         <p className={styles.redirectText}>
//           Don't have an account? <Link to="/signup">Sign up</Link>
//         </p>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;
