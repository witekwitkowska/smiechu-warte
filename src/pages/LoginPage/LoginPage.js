import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LoginPage = ({ quizData }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [activeUser, setActiveUser] = useState("default");

  useEffect(() => {
    var users = [];
    quizData.forEach(row => {
      users = users.concat(row.users);
    });
    setAllUsers(users.filter((v, i, a) => a.indexOf(v) === i));

  }, [quizData]);

  const handleChange = event => {
    setActiveUser(event.target.value);
  };
  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <section>
      <div>
        <h1>Jak masz na imię?</h1>
        <form id="selectUser" onSubmit={handleSubmit}>
          <select value={activeUser} onChange={handleChange}>
            {allUsers.map(user => (
              <option value={user}>{user}</option>
            ))}
          </select>
          <Link to={{
            pathname: `/${activeUser}/questions/`, props: {
              userQuizData: quizData.filter(
                data => data.users.includes(activeUser) === true
              )
            }
          }} >
            <input
              className="SubmitButton"
              type="submit"
              name="SUBMITBUTTON"
              value="Tak to ja"
            />
          </Link>
        </form>
      </div>
    </section >
  );
};

export default LoginPage;
