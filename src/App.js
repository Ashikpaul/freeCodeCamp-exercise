import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./styles.css";
import Navbar from "./components/navbar";
import ExercisesList from "./components/exercisesList";
import EditExercise from "./components/editExercise";
import CreateExercise from "./components/createExercise";
import CreateUSer from "./components/createUser";

export default function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUSer} />
      </div>
    </Router>
  );
}
