import { Card, Button, Row, Col } from "react-bootstrap";

interface Props {
  time: any;
  correctIndexs: number[];
  incorrectIndexs: number[];
  reset: () => void;
  timeUp: boolean;
}
const Results: React.FC<Props> = (props) => {
  const { time, correctIndexs, incorrectIndexs, reset ,timeUp} = props;
  return (
    <Row style={{ display: timeUp ? "" : "none" }}>
      <Col xs={3}>
        <Card>
          <h1>
            Speed:
            <br />
            {Math.floor(
              (correctIndexs.length + incorrectIndexs.length) /
                (time ? parseInt(time) : 1)
            )}
            WPS
          </h1>
        </Card>
      </Col>
      <Col xs={3}>
        <Card>
          <h1>
            Accuracy: <br />
            {Math.floor(
              correctIndexs.length + incorrectIndexs.length > 0
                ? (correctIndexs.length /
                    (correctIndexs.length + incorrectIndexs.length)) *
                    100
                : 0
            )}
            %
          </h1>
        </Card>{" "}
      </Col>
      <Col xs={3}>
        <Card>
          <h1>
            correct:
            <br /> {correctIndexs.length}
          </h1>
        </Card>{" "}
      </Col>
      <Col xs={3}>
        <Card>
          <h1>
            incorrect:
            <br /> {incorrectIndexs.length}
          </h1>
        </Card>{" "}
      </Col>
      <Button variant="success" onClick={reset} className="m-2">
        Restart
      </Button>
    </Row>
  );
};

export default Results;
