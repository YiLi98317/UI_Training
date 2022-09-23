import React from "react";
import Header from "./Header";
import SearchInput from "./SearchInput";
import EmojiResults from "./EmojiResults";
import filterEmoji from "./filterEmoji";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredEmoji: filterEmoji("", 20)
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(input) {
    console.log("input before filter: ", input);
    this.setState({
      filteredEmoji: filterEmoji(input, 20)
    });
  };

  render() {
    return (
      <div>
        <Header />
        <SearchInput onTextChange={this.handleSearchChange} />
        <EmojiResults emojiData={this.state.filteredEmoji} />
      </div>
    );
  }
}
