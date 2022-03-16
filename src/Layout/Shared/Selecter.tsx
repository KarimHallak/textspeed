import Select, { ActionMeta, SingleValue } from "react-select";
import { Spinner } from "react-bootstrap";

interface Props {
  options: any[];
  setValueFunction: (value: any) => void;
  placeHolder: string;
}
const SearchAndLimit: React.FC<Props> = (props) => {
  const { options, setValueFunction, placeHolder } = props;
  return (
    <div
      className="col-5 mb-2 d-flex justify-content-end m-2"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <label className="col-3" style={{ paddingRight: "15px" }}>{placeHolder}</label>
      <div
        style={{
          height: "30px",
          textAlign: "center",
          width: "100%",
          display: "inline-block",
        }}
      >
        <Select
        className="col-9"
          options={options}
          onChange={setValueFunction}
          placeholder=""
          defaultValue={options.filter(
            (option) => option.label === options[0].label
          )}
        />
      </div>
    </div>
  );
};
export default SearchAndLimit;
