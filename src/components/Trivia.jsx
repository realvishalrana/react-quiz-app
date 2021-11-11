import { useEffect, useState } from "react";

export default function Trivia({
  data,
  setStop,
  questionNumber,
  setQuestionNumber,
}) {
  const [question, setQuestion] = useState(null);
  const [selectAnswer, setSelectAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callbacks) => {
    setTimeout(() => {
      callbacks();
    }, duration);
  };

  const handleClick = (a) => {
    setSelectAnswer(a);
    setClassName("answer active");
    delay(3000, () =>
      setClassName(a.correct ? "answer correct" : "answer wrong")
    );
    delay(6000, () => {
      if (a.correct) {
        setQuestionNumber((prev) => prev + 1);
        setSelectAnswer(null);
      } else {
        setStop(true);
      }
    });
    // setTimeout(() => { or of delay(3000 ...)
    //   setClassName(a.correct ? "answer correct" : "answer wrong");
    // });
  };

  return (
    <div>
      <div className="trivia">
        <div className="question">{question?.question}</div>
        <div className="answers">
          {question?.answers.map((a) => (
            <div
              className={selectAnswer === a ? className : "answer"}
              onClick={() => handleClick(a)}
            >
              {a.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
