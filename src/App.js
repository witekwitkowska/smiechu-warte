import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import LoginPage from "./pages/LoginPage/LoginPage";
import InsideQuiz from "./pages/InsideQuiz/InsideQuiz.js";
import ResultPage from "./pages/ResultPage/ResultPage";

import config from "./config";
const url = `https://sheets.googleapis.com/v4/spreadsheets/${config.spreadsheetId}/values:batchGet?ranges=Arkusz1&majorDimension=ROWS&key=${config.apiKey}`;

function App() {
  const [quizData, setQuizData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        let batchRowValues = data.valueRanges[0].values;
        const rows = [];
        for (let i = 1; i < batchRowValues.length; i++) {
          let rowObject = {};
          for (let j = 0; j < batchRowValues[i].length; j++) {
            rowObject[batchRowValues[0][j]] = batchRowValues[i][j];
          }
          rows.push(rowObject);
        }

        rows.forEach(row => {
          row.answers = row.answers.split(";");
          row.users = row.users.split(";");
          row.users.push("default")
        });
        const id = setInterval(() => {
          setQuizData(rows);
          setIsLoading(false);
        }, 1000);
        return () => clearInterval(id);
      });
  }, []);
  return (
    <div>
      {isLoading ? (
        <p>Is Loading...</p>
      ) : (
          <BrowserRouter>
            <Switch>
              <Route
                exact path="/"
                render={props => <LoginPage {...props} quizData={quizData} />}
              />
              <Route exact path='/:activeUser/questions' component={InsideQuiz} />
              <Route exact path='/:activeUser/results' component={ResultPage} />
            </Switch>
          </BrowserRouter>
        )}
    </div>
  );
}
export default App;
