import React from "react";

export type SearchBarProps = {
  searchText: string;
  onSearchTextChange: (t: string) => void;
};

class SearchBar extends React.Component<SearchBarProps, {}> {
  constructor(props: SearchBarProps) {
    super(props);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }

  handleSearchTextChange(e: any) {
    this.props.onSearchTextChange(e.target.value);
  }

  render() {
    return (
      <input
        type="search"
        placeholder="Search..."
        value={this.props.searchText}
        onChange={this.handleSearchTextChange}
      />
    );
  }
}

export default SearchBar;
