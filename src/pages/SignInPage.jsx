import React, { useState, useEffect } from "react";
import "../styles/signIn.css";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import { getItem, setItem } from "../helpers/utils/localStorage";

const signIn = () => {
  const navigate = useNavigate();
  const [error, setError] = useState({
    email: null,
    password: null,
  });
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    const getuserMail = getItem("userMail");
    if (!getuserMail) {
      navigate("/signIn");
      return;
    }
    const users = getItem("users");
    if (!users) {
      navigate("/signIn");
      return;
    }
    const findUser = users.find((item) => item.email == getuserMail);
    if (!findUser) {
      navigate("/signIn");
      return;
    }
    navigate("/");
  }, []);

  const handlechange = (e) => {
    setInputValue((prevVal) => {
      return { ...prevVal, [e.target.name]: e.target.value };
    });

    if (e.target.name == "email" && e.target.value.length == 0) {
      setError({
        email: "Email is required.",
        password: null,
      });
      return;
    }
    if (
      e.target.name == "email" &&
      !e.target.value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setError({
        email: "Email is not valid.",
        password: null,
      });
      return;
    }

    if (
      e.target.name == "email" &&
      e.target.value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    ) {
      setError({
        email: null,
        password: null,
      });
      return;
    }
    if (e.target.name == "password" && e.target.value.length == 0) {
      setError({
        email: null,
        password: "Password is required.",
      });
      return;
    }
    if (e.target.name == "password" && e.target.value.length > 5) {
      setError({
        email: null,
        password: null,
      });
      return;
    }
    if (
      e.target.name == "password" &&
      e.target.value.length > 0 &&
      e.target.value.length < 5
    ) {
      setError({
        email: null,
        password: "Password length should less than 5.",
      });
      return;
    }
  };

  const handleSignIn = () => {
    const users = getItem("users");
    if (!users) {
      alert("Please Sign Up as You do not have account.");
      return;
    }

    const findUser = users.find((item) => item.email == inputValue.email);
    if (!findUser) {
      alert("Please Sign Up as You do not have account.");
      return;
    }

    if (findUser.password != inputValue.password) {
      setError({
        email: null,
        password: "Password is Incorrect",
      });
      return;
    }
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
          <a
            href="/signUp"
            className="ml-1 
            decoration-blue-500 text-blue-600"
          >
            SignUp
          </a>
        </p>
      </div>
    </div>
  );
};

export default signIn;
