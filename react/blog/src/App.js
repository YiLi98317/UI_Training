import './App.css';
import {Header} from './Header';
import {Content} from './Content';

function App(props) {
  let {author, content} = props.data;
  return (
    <div className="App">
      {/* Header */}
      <Header author={author} />

      {/* content */}
      <Content content={content} />
      
    </div>
  );
}

export default App;