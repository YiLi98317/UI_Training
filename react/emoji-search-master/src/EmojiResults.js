import React from "react";
import Clipboard from "clipboard";
import EmojiResultRow from "./EmojiResultRow";
import "./EmojiResults.css";

export default class EmojiResults extends React.Component {
  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   this.clipboard = new Clipboard(".copy-to-clipboard");
  // }

  // componentWillUnmount() {
  //   this.clipboard.destroy();
  // }

  render() {
    return (
      <div className="component-emoji-results">
        {this.props.emojiData.map(emojiData => (
          <EmojiResultRow
            key={emojiData.title}
            symbol={emojiData.symbol}
            title={emojiData.title}
          />
        ))}
      </div>
    );
  }
}
