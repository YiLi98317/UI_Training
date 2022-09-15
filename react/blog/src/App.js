import './App.css';
import {Header} from './Header';
import {Content} from './Content';

function App() {
  return (
    <div className="App">
      {/* Header */}
      <Header author={"Yi Li"} />

      {/* content */}
      <Content />

    </div>
  );
}

export default App;