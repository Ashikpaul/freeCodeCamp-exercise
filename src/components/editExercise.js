import React, { useEffect, useState } from "react";
import axios from "axios";

export default function EditExercise(props) {
  const [username, setUserName] = useState(() => "test user");
  const [duration, setDuration] = useState(() => 0);
  const [description, setDescription] = useState(() => "");
  const [users, setUsers] = useState(() => ["test user"]);

  useEffect(() => {
    axios
      .get(
        "https://exercise-backend.glitch.me/exercises/" + props.match.params.id
      )
      .then((exerLogs) => {
        setUserName(exerLogs.data.username);
        setDuration(exerLogs.data.duration);
        setDescription(exerLogs.data.description);
      });
    axios.get("https://exercise-backend.glitch.me/users").then((usersData) => {
      let allusers = usersData.data.map((e) => e.username);
      setUsers(allusers);
    });
  }, []);

  const onUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const onDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const onDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newLog = {
      username: username,
      duration: duration,
      description: description
    };

    axios
      .post(
        "https://exercise-backend.glitch.me/update/" + props.match.params.id,
        newLog
      )
      .then((e) => console.log("new log updated"))
      .catch((err) => console.log(err));

    window.location = "/";
  };

  return (
    <div>
      <h3>Edit Exercise</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={username}
            onChange={onUserNameChange}
          >
            {users.map((e) => {
              return (
                <option key={e} value={e}>
                  {e}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Description: </label>
          <input
            type="text"
            required
            className="form-control"
            value={description}
            onChange={onDescriptionChange}
          />
        </div>
        <div className="form-group">
          <label>Duration: </label>
          <input
            type="text"
            required
            className="form-control"
            value={duration}
            onChange={onDurationChange}
          />
        </div>
        <br />
        <div className="form-group">
          <button
            type="submit"
            value="Edit Exercise Log"
            className="btn btn-success"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
