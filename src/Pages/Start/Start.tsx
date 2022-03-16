import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import words from "../../Arrays/words";
import Results from "../../Layout/StartComponents/Results";
import TestArea from "../../Layout/StartComponents/TestArea";

function Start() {
  const time = useParams().time;
  const difficulty = useParams().difficulty;
  const [sentences, setSentences] = useState<string[]>([]);
  const [firstTime, setFirstTime] = useState<boolean>(true);
  const [countDown, setCountDown] = useState<number>(
    (time ? parseInt(time) : 1) * 60
  );
  const [started, setStarted] = useState<boolean>(false);
  const [currWordIndex, setCurrWordIndex] = useState<number>(0);
  const [currWord, setCurrWord] = useState<number>(0);

  const [timeUp, setTimeUp] = useState<boolean>(false);
  const [correctIndexs, setCorrectIndexs] = useState<number[]>([]);
  const [incorrectIndexs, setIncorrectIndexs] = useState<number[]>([]);
  const [allText, setAllText] = useState<string>("");
  const [history, setHistory] = useState<string[]>([]);
  const contentParagraph = useRef<HTMLDivElement>(null);
  const inputField = useRef<HTMLInputElement>(null);
  const randomArrayShuffle = (array: string[]) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };
  const handleKeyDown = (e: any) => {
    setAllText(e.target.value);

    if (!started) {
      start();
    }
    if (e.key === " ") {
      if ((currWordIndex + 1) % 8 === 0 && currWordIndex > 1) {
        contentParagraph.current!.scrollBy(0, 25);
        e.preventDefault();
        setHistory((prev) => [...prev, e.target.value]);
        setAllText("");
      }
      checkMatch(e.target.value);
      setCurrWord((prev) => prev + 1);
      setCurrWordIndex((prev) => prev + 1);
    }
    if (e.key === "Backspace") {
      if (e.target.value.length === 0) {
        setAllText(history[history.length - 1]);
      }
      if ((currWordIndex + 1) % 8 === 0 && currWordIndex > 1) {
      }
      if (e.target.value.length === 0)
        contentParagraph.current!.scrollBy(0, -25);

      if (currWordIndex > 0)
        if (
          e.target.value[e.target.value.length - 1] === " " ||
          e.target.value.length === 0
        ) {
          setCurrWord((prev) => prev - 1);
          setCurrWordIndex((prev) => prev - 1);
        }
    }
  };
  const checkMatch = (currInput: string) => {
    if (
      sentences[currWord] ===
      currInput.split(" ")[currInput.split(" ").length - 1]
    ) {
      setIncorrectIndexs((prev) =>
        prev.filter(function (value) {
          return currWord !== value;
        })
      );
      setCorrectIndexs((prev) => [...prev, currWord]);
    } else {
      setCorrectIndexs((prev) =>
        prev.filter(function (value) {
          return currWord !== value;
        })
      );
      setIncorrectIndexs((prev) => [...prev, currWord]);
    }
  };
  const start = () => {
    setTimeUp(false);
    setStarted(true);
    const interval = setInterval(() => {
      setCountDown((prev) => {
        if (prev === 0) {
          clearInterval(interval);
          setTimeUp(true);
          setStarted(false);

          return 0;
        } else {
          return prev - 1;
        }
      });
    }, 1000);
  };
  const reset = () => {
    setCurrWord(0);
    setFirstTime(true);
    setCountDown((time ? parseInt(time) : 1) * 60);
    inputField.current!.value = "";
    setTimeUp(false);
    setSentences([]);

    setCorrectIndexs([]);
    setIncorrectIndexs([]);

    setCurrWordIndex(0);
    setAllText('')
  };
  useEffect(() => {
    if (firstTime) {
      setFirstTime(false);
      randomArrayShuffle(
        difficulty === "Hard" || difficulty === "Med" || difficulty === "Easy"
          ? words[difficulty]
          : words.Hard
      ).map((s) => {
        s.split(" ").map((w) =>
          setSentences((prevState) => {
            return [...prevState, w];
          })
        );
      });
    }
  }, [firstTime]);
  return (
    <div       style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <TestArea
        timeUp={timeUp}
        countDown={countDown}
        contentParagraph={contentParagraph}
        sentences={sentences}
        correctIndexs={correctIndexs}
        incorrectIndexs={incorrectIndexs}
        currWordIndex={currWordIndex}
        allText={allText}
        inputField={inputField}
        handleKeyDown={handleKeyDown}
      />
      <Results
        timeUp={timeUp}

        time={time}
        correctIndexs={correctIndexs}
        incorrectIndexs={incorrectIndexs}
        reset={reset}
      />
    </div>
  );
}

export default Start;
