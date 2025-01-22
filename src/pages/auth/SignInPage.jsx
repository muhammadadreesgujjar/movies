import React, { useState } from "react";
import "../../styles/signIn.css";
import InputField from "../../components/common/InputField";
import { Link, useNavigate } from "react-router-dom";
import { setItem } from "../../helpers/utils/localStorage";
import { useSelector } from "react-redux";
import useLocalStorageHandler from "../../hooks/useLocalStorageHandler";
import {
  validateEmail,
  validatePassword,
} from "../../helpers/utils/onChangeValidation";

const signIn = () => {
  const selector = useSelector((state) => state.usersAuth);
  const navigate = useNavigate();
  useLocalStorageHandler();
  const [error, setError] = useState({
    email: null,
    password: null,
  });

  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const handlechange = (e) => {
    setInputValue((prevVal) => {
      return { ...prevVal, [e.target.name]: e.target.value };
    });

    if (e.target.name == "email") {
      const validEmail = validateEmail(e.target.value);
      setError((prev) => {
        return {
          ...prev,
          email: validEmail,
        };
      });
    }

    if (e.target.name == "password") {
      const validPassword = validatePassword(e.target.value);
      setError((prev) => {
        return {
          ...prev,
          password: validPassword,
        };
      });
    }
  };

  const handleSignIn = () => {
    const findUser = selector.find((item) => item.email == inputValue.email);
    if (!findUser) return alert("Please Sign Up as You do not have account.");
    if (findUser.password != inputValue.password)
      return setError({ email: null, password: "Password is Incorrect" });
    setItem("userMail", inputValue.email);
    navigate("/");
  };

  return (
    <div className="bg-[url('/src/assets/images/bg-img.jpg')] bg-bottom bg-cover bg-no-repeat h-screen flex justify-center items-center text-white">
      <div className="signInBox flex flex-col justify-between">
        <h1 className="text-5xl font-semibold text-center">Sign in</h1>
        <InputField
          name="email"
          placeholder="Email"
          value={inputValue.email}
          onchange={handlechange}
          err={error.email}
        />
        <InputField
          name="password"
          placeholder="Password"
          value={inputValue.password}
          onchange={handlechange}
          err={error.password}
        />
        <div className="flex justify-center gap-1">
          <input type="checkbox" className="checkBox unchecked:bg-gray-200" />
          <p className="text-center checkBoxText leading-6">Remember me</p>
        </div>
        <button
          type="button"
          className="logInButton rounded-lg font-semibold w-full"
          onClick={() => handleSignIn()}
        >
          Login
        </button>
        <p className="text-xs font-semibold text-center">
          Do not have an account?
          <Link
            to="/signUp"
            className="ml-1 
            decoration-blue-500 text-blue-600"
          >
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default signIn;
