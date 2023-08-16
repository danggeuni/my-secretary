import { useState, useEffect } from "react";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const navigate = useNavigate();

  useEffect(() => {
    const localuser = localStorage.getItem("user");
    if (localuser) {
      navigate("/");
    }
  });

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
  };

  const register = () => {
    navigate("/register");
  };

  const login = () => {
    navigate("/login");
  };

  return (
    <>
      <div className={styles.header_wrapper}>
        <section className={styles.header}>
          <div className={styles.title}>
            <h1>My Secretary</h1>
          </div>

          <div className={styles.header_right}>
            <div className={styles.login} onClick={login}>
              <h1>
                <FaSignInAlt /> Login
              </h1>
            </div>
            <div className={styles.space}></div>
            <div className={styles.register} onClick={register}>
              <h1>
                <FaUser /> Register
              </h1>
            </div>
          </div>
        </section>
      </div>

      <section className={styles.heading}>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login and starts</p>
      </section>

      <section className={styles.form}>
        <form onSubmit={onSubmit}>
          <div className={styles.form_group}>
            <input
              type="email"
              className={styles.form_control}
              id="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={onChange}
            />
          </div>
          <div className={styles.form_group}>
            <input
              type="password"
              className={styles.form_control}
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>

          <div className={styles.form_group}>
            <button type="submit" className={`${styles.btn}`}>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
