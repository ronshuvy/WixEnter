import React from "react";
import "./App.scss";
import SearchableTicketList from "./SearchableTicketList";

class App extends React.Component {
  render() {
    return (
      <main>
        <SearchableTicketList />
      </main>
    );
  }
}

export default App;
