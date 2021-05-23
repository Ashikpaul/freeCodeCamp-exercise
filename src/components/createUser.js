import React, { useState } from "react";
import axios from "axios";

export default function CreateUser() {
  const [username, setUserName] = useState(() => "test user");
  const [age, setAge] = useState(() => 25);

  const onUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const onAgeChange = (e) => {
    setAge(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      username: username,
      age: age
    };

    axios
      .post("https://exercise-backend.glitch.me/users/add", newUser)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));

    setUserName("");
    setAge(0);
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <input
            type="text"
            required
            className="form-control"
            value={username}
            onChange={onUserNameChange}
          />
        </div>
        <div className="form-group">
          <label>Age: </label>
          <input
            type="number"
            required
            className="form-control"
            value={age}
            onChange={onAgeChange}
          />
        </div>
        <br />
        <div className="form-group">
          <button type="submit" value="Create User" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
