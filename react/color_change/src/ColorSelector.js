import { setNextColorHook } from "./useColor";
import Option from "./Option";

export default function ColorSelector(props) {
    var initValue = {backgroundColor: "blue"};
    setNextColorHook(initValue);
    const values = props.values;
    const OptionList = values.map((val) => 
        <Option value={val} />
    );

    return(
        <div className="selector">
            <label for="colors">Choose a color:</label>

            <select name="colors"
                onChange={(e) => {
                    initValue = {backgroundColor: e.target.value};
                    setNextColorHook(initValue);
                }}
            >
                {OptionList}
            </select>
        </div>
    );
}