import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";

import Question from '../../components/Question/Question';
import ProgressBar from '../../components/ProgressBar/ProgressBar';
import VideoWindow from '../../components/VideoWindow/VideoWindow';
// import ResultPage from '../../components/ResultPage/ResultPage';

const InsideQuiz = ({ match, location }) => {

  const {
    params: { activeUser }
  } = match;
  const {
    props: { userQuizData }
  } = location;

  const howMany = userQuizData.length;
  const [id, setId] = useState(1);
  const [counter, setCounter] = useState(0);
  const [checked, setChecked] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [answerFinished, setAnswerFinished] = useState(true)
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizEnd, setQuizEnd] = useState(false);
  const handleOnClickAnswer = event => {
    setAnswered(true);
    isCorrect ? setCounter(counter + 1) : setCounter(counter);
  };
  const handleOnClickNext = event => {
    (id === userQuizData.length) ? setQuizEnd(true) : (setId(id + 1));
    setChecked(0);
    setIsCorrect(false);
    setAnswered(false);
    // setAnswerFinished(false);
  }

  console.log("A teraz active user to " + activeUser);
  console.log("A teraz new_id to " + id);
  console.log("A teraz acounter to " + counter);


  return (
    <>
      <header>
        <div>
          <p>Jesteś zalogowany jako {activeUser}</p>
          <Link to='/'><p>Przełącz użytkownika (wynik obecnej gry zostanie utracony)</p></Link>
          <ProgressBar id={id} howMany={howMany}></ProgressBar>
        </div>

      </header>

      <section>
        <Question question={userQuizData[id - 1].question} />
        <VideoWindow url={userQuizData[id - 1].url} />
        {checked ?
          <input class="active-button"
            type="button"
            value="Potwierdź odpowiedź"
            onClick={handleOnClickAnswer}></input> :
          <input class="disable-button"
            type="button"
            value="Disable Potwierdź odpowiedź"></input>}

        {answerFinished ?
          <input class=" "
            type="button"
            value="Następne pytanie"
            onClick={handleOnClickNext}></input> :
          <input class=" "
            type="button"
            value="Disable Następne pytanie"
          ></input>}

        {
          quizEnd ?
            <Redirect
              to={{
                pathname: `/${activeUser}/results/`, props: {
                  howMany: howMany, counter: counter
                }
              }} /> :
            <></>
        }
      </section>



    </>
  );
};





export default InsideQuiz;
