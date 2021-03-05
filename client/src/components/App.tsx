import React from "react";
import "./App.scss";
import FilterableTicketList from "./FilterableTicketList";

class App extends React.Component {
    render() {
        return (
            <main>
                <FilterableTicketList />
            </main>
        );
    }
}

export default App;
