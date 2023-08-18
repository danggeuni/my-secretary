import { useState, useEffect } from "react";
import { FaSignInAlt, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context";
import Spinner from "../components/Spinner";
import styles from "./Login.module.css";
import axios from "axios";

function Register() {
  // const { isLoading, setIsLoading } = useGlobalContext();

  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const success = () => {
    setIsError(false);
    setIsLoading(false);
    setIsSuccess(true);
  };

  const reset = () => {
    setIsLoading(false);
    setIsError(false);
    setIsSuccess(false);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  useEffect(() => {
    const localuser = localStorage.getItem("user");
    if (localuser) {
      navigate("/");
    }
  }, []);

  const API_URL = "http://localhost:5000/api/users/";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { name, email, password, password2 } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const register = async (userData) => {
    try {
      const response = await axios.post(API_URL, userData);

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        success();
      }
    } catch (error) {}
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error("비밀번호가 다릅니다.");
    } else {
      const userData = {
        name,
        email,
        password,
      };

      register(userData);
    }

    reset();
  };

  const goregister = () => {
    navigate("/register");
  };

  const login = () => {
    navigate("/login");
  };

  if (isLoading) {
    return <Spinner />;
  }

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
            <div className={styles.register} onClick={goregister}>
              <h1>
                <FaUser /> Register
              </h1>
            </div>
          </div>
        </section>
      </div>

      <section className={styles.heading}>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className={styles.form}>
        <form onSubmit={onSubmit}>
          <div className={styles.form_group}>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={name}
              placeholder="Enter your name"
              onChange={onChange}
            />
          </div>
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
            <input
              type="password"
              className="form-control"
              id="password2"
              name="password2"
              value={password2}
              placeholder="Confirm password"
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

export default Register;
