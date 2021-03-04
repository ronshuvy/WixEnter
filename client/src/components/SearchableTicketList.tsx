import React from "react";
import { createApiClient, Ticket } from "../api";
import SearchBar from "./SearchBar";
import TicketList from "./TicketList";
import "./App.scss";

export type SearchableTicketListState = {
  tickets?: Ticket[];
  search: string;
};

const api = createApiClient();

class SearchableTicketList extends React.Component<
  {},
  SearchableTicketListState
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      search: "",
    };
  }

  searchDebounce: any = null;

  async componentDidMount() {
    this.setState({
      tickets: await api.getTickets(),
    });
  }

  onSearch = async (val: string, newPage?: number) => {
    clearTimeout(this.searchDebounce);

    this.searchDebounce = setTimeout(async () => {
      this.setState({
        search: val,
      });
    }, 0);
  };

  filterTickets = (tickets: Ticket[]) => {
    return tickets.filter((t) =>
      (t.title.toLowerCase() + t.content.toLowerCase()).includes(
        this.state.search.toLowerCase()
      )
    );
  };

  render() {
    const { tickets, search } = this.state;

    return (
      <>
        <h1>Tickets List</h1>
        <header>
          <SearchBar
            searchText={search}
            onSearchTextChange={this.onSearch.bind(this)}
          />
        </header>
        {tickets ? (
          <div className="results">Showing {tickets.length} results</div>
        ) : null}
        {tickets ? (
          <TicketList tickets={this.filterTickets(tickets)} />
        ) : (
          <h2>Loading..</h2>
        )}
      </>
    );
  }
}

export default SearchableTicketList;
