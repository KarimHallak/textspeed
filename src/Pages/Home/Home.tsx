import { useState } from "react";
import { Button, Container } from "react-bootstrap";
import Selecter from "../../Layout/Shared/Selecter";
import { Link } from "react-router-dom";
import minute from "../../Arrays/minute";
import level from "../../Arrays/level";

function Home() {
  const [time, setTime] = useState<Number>(1);
  const [difficulty, setDifficulty] = useState<string>("Easy");

  const setTimeFunction = (value: { value: string; label: string }) => {
    setTime(parseInt(value.value));
  };
  const setDifficultyFunction = (value: { value: string; label: string }) => {
    setDifficulty(value.value);
  };


  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
      className="text-center pt-5"
    >
      <h1>Check your typing skills in a minute</h1>
      <div>Type away to join 150+ million test takers!</div>
      <Selecter
        options={minute}
        setValueFunction={setTimeFunction}
        placeHolder={"Time"}
      />
      <Selecter
        options={level}
        setValueFunction={setDifficultyFunction}
        placeHolder={"Difficulty"}
      />
      <Button variant="success" className="m-2">
      <Link to={`/start/${time}&${difficulty}`} style={{color:'white'}}>
        Start test
        </Link>
      </Button>
    </Container>
  );
}

export default Home;
