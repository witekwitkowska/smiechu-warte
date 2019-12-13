import React from "react";

const Question = ({ question }) => {
  return (
    <>
      <div className="question">
        <h1>{question}</h1>
      </div>
    </>
  );
};

export default Question;
