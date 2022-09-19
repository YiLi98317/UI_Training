import { getNextColorHook, setColorHook } from "./useColor";

export default function Button(props) {
    return(
        <button onClick={() => {
            const next = getNextColorHook();
            setColorHook(next);
        }}>
            Confirm
        </button>
    );
}