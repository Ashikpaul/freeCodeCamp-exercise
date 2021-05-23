import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function ExerciseList() {
  const [allExercises, setAllExercises] = useState(() => []);

  useEffect(() => {
    axios
      .get("http://localhost:3000/exercises")
      .then((exerData) => {
        setAllExercises(exerData.data);
        console.log(exerData.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteExercise = (id) => {
    axios
      .delete("http://localhost:3000/exercises/" + id)
      .then((e) => console.log(id + "deleted"))
      .catch((err) => console.log(err));

    const newLogs = allExercises.filter((e) => {
      return e._id !== id;
    });
    setAllExercises(newLogs);
  };

  return (
    <div>
      <h1>Logged Exercises</h1>
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th>Username</th>
            <th>Duration</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {allExercises.length &&
            allExercises.map((exe) => {
              return (
                <tr key={exe._id}>
                  <td>{exe.username}</td>
                  <td>{exe.duration}</td>
                  <td>{exe.description}</td>
                  <td>
                    <Link className="btn btn-success" to={"/edit/" + exe._id}>
                      Edit
                    </Link>{" "}
                    <button
                      className="btn btn-secondary"
                      onClick={() => deleteExercise(exe._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
