import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  //for redirect
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();
    // const { name, email, password } = credential;
    const response = await fetch("https://jaybansod.github.io/api/auth/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credential.name,
        email: credential.email,
        password: credential.password,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the authtoken
      localStorage.setItem("token", json.authToken);
      console.log("sign in authtoken " + json.authToken);
      //redirect
      props.showAlert("Signup Successfully", "success");
      navigate("/");
    } else {
      props.showAlert("Invalid credentials", "danger");
    }
  };
  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <h2>Create An Account To Use iNoteBook</h2>

        <form onSubmit={handelSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              aria-describedby="emailHelp"
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="cpassword"
              name="cpassword"
              onChange={onChange}
              minLength={5}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Signup;
