import React from "react";
import { createApiClient, Ticket } from "../api";
import SearchBar from "./SearchBar";
import TicketList from "./TicketList";
import "./App.scss";
import TicketSorter from "./TicketSorter";
import InfiniteScroll from "react-infinite-scroller";

export type FilterableTicketListState = {
  tickets: Ticket[];
  hiddenTickets: Set<string>;
  search: string;
  sortKey?: string;
};

const api = createApiClient();

class FilterableTicketList extends React.Component<{}, FilterableTicketListState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      search: "",
      hiddenTickets: new Set(),
      tickets: [],
    };
    this.onSearch = this.onSearch.bind(this);
    this.onHideTicket = this.onHideTicket.bind(this);
    this.onRestoreTickets = this.onRestoreTickets.bind(this);
    this.onSortTickets = this.onSortTickets.bind(this);
    this.getMoreTickets = this.getMoreTickets.bind(this);
  }

  searchDebounce: any = null;

  // async componentDidMount() {
  //   this.setState({
  //     tickets: await api.getTickets(),
  //   });
  // }

  onSearch = async (val: string) => {
    clearTimeout(this.searchDebounce);

    this.searchDebounce = setTimeout(async () => {
      this.setState({
        search: val,
        tickets: await api.getTickets({ superSearch: val }),
      });
    }, 0);
  };

  onHideTicket(ticketId: string) {
    this.setState(({ hiddenTickets }) => ({
      hiddenTickets: new Set(hiddenTickets).add(ticketId),
    }));
  }

  onRestoreTickets() {
    this.setState({
      hiddenTickets: new Set(),
    });
  }

  onSortTickets = async (sortKey: string) => {
    let orderedTickets;
    if (sortKey === this.state.sortKey) {
      // @ts-ignore
      orderedTickets = [...this.state.tickets].reverse();
    } else {
      orderedTickets = await api.getTickets({ sortBy: sortKey });
    }

    this.setState({
      sortKey: sortKey,
      tickets: orderedTickets,
      hiddenTickets: new Set(),
    });
  };

  getFilterTickets = (tickets: Ticket[]) => {
    return tickets.filter((t) => !this.state.hiddenTickets.has(t.id));

    // return tickets.filter(
    //   (t) =>
    //     (t.title.toLowerCase() + t.content.toLowerCase()).includes(
    //       this.state.search.toLowerCase()
    //     ) && !this.state.hiddenTickets.has(t.id)
    // );
  };

  getMoreTickets = async (page: number) => {
    const prevTickets = this.state.tickets;
    const nextTickets = await api.getTickets({
      superSearch: this.state.search,
      sortBy: this.state.sortKey,
      page: page,
    });
    this.setState({
      tickets: [...prevTickets, ...nextTickets],
    });
  };

  render() {
    const { tickets, hiddenTickets, search } = this.state;

    return (
      <>
        <h1>Tickets List</h1>
        <header>
          <SearchBar searchText={search} onSearchTextChange={this.onSearch} />
        </header>
        {tickets ? (
          <div className="filter">
            <div className="results">
              Showing {tickets.length} results
              {hiddenTickets.size ? (
                <span className="hidden">
                  {" "}
                  ({hiddenTickets.size} hidden tickets -{" "}
                  <a onClick={this.onRestoreTickets}> restore</a>)
                </span>
              ) : null}
            </div>
            <TicketSorter onSortTickets={this.onSortTickets} />
          </div>
        ) : null}
        <InfiniteScroll loadMore={this.getMoreTickets} hasMore={true}>
          {tickets ? (
            <TicketList tickets={this.getFilterTickets(tickets)} onHideTicket={this.onHideTicket} />
          ) : (
            <h2>Loading..</h2>
          )}
        </InfiniteScroll>
      </>
    );
  }
}

export default FilterableTicketList;
