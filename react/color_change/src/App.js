import './App.css';
import ColorPanel from './ColorPanel';
import ColorSelector from './ColorSelector';
import Button from './Button';
import {useColorHook} from './useColor';

function App(props) {
  document.title = "Component Manipulation";
  const [color, setColor] = useColorHook({backgroundColor: "whitesmoke"});
  const data = props.data;

  return (
    <div className="App">
      <h1>
        Component manipulation using state
      </h1>

      <ColorPanel style={color} />

      <ColorSelector values={data.values} />

      <Button />
    </div>
  );
}

export default App;