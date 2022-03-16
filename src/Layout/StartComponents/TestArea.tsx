import { Card } from "react-bootstrap";

interface Props {
  timeUp: boolean;
  countDown: number;
  contentParagraph: React.RefObject<HTMLDivElement>;
  sentences: string[];
  correctIndexs: number[];
  incorrectIndexs: number[];
  currWordIndex: number;
  allText: string;
  inputField: React.RefObject<HTMLInputElement>;
  handleKeyDown: (e: any) => void;
}
const TestArea: React.FC<Props> = (props) => {
  const {
    timeUp,
    countDown,
    contentParagraph,
    sentences,
    correctIndexs,
    incorrectIndexs,
    currWordIndex,
    allText,
    inputField,
    handleKeyDown,
  } = props;
  return (
    <Card className="m-5 col-4 align-middle">
      <div
        style={{
          background: "white",
          margin: "30px",
          display: !timeUp ? "block" : "none",
        }}
      >
        <h1>{countDown}</h1>

        <p
          ref={contentParagraph}
          style={{ overflowY: "hidden", maxHeight: "100px" }}
        >
          {sentences.map((w, i) => (
            <span
              key={i}
              style={{
                color:
                  i === correctIndexs[0]
                    ? "green"
                    : i === incorrectIndexs[0]
                    ? "red"
                    : correctIndexs.find((element) => {
                        return element === i;
                      })
                    ? "green"
                    : incorrectIndexs.find((element) => {
                        return element === i;
                      })
                    ? "red"
                    : "black",
              }}
            >
              {w.split("").map((char, j) => {
                return (
                  <span
                    key={j}
                    style={{
                      textDecoration: currWordIndex === i ? "underline" : "",
                      color: currWordIndex === i ? "black" : "",
                    }}
                  >
                    {char}
                  </span>
                );
              })}{" "}
              {(i + 1) % 8 === 0 && <br />}
              {currWordIndex + 8 > i &&
              (i + 1) % 8 === 0 &&
              currWordIndex <= i ? (
                <>
                  <input
                    autoComplete="off"
                    defaultValue={allText}
                    ref={inputField}
                    onKeyDown={handleKeyDown}
                    type="text"
                    id="text"
                    className="form-control p-0"
                  />
                  {inputField.current?inputField.current!.focus():<></>}
                </>
              ) : (
                <></>
              )}
            </span>
          ))}
        </p>

        <input hidden ref={inputField} />
      </div>
    </Card>
  );
};

export default TestArea;
