import React from "react";
import { createApiClient, Ticket } from "../api";
import SearchBar from "./SearchBar";
import TicketList from "./TicketList";
import "./App.scss";

export type SearchableTicketListState = {
    tickets?: Ticket[];
    hiddenTickets: Set<string>;
    search: string;
};

const api = createApiClient();

class FilterableTicketList extends React.Component<{}, SearchableTicketListState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            search: "",
            hiddenTickets: new Set(),
        };
        this.onSearch = this.onSearch.bind(this);
        this.onHideTicket = this.onHideTicket.bind(this);
        this.onRestoreTickets = this.onRestoreTickets.bind(this);
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

    getFilterTickets = (tickets: Ticket[]) => {
        return tickets.filter(
            (t) =>
                (t.title.toLowerCase() + t.content.toLowerCase()).includes(
                    this.state.search.toLowerCase()
                ) && !this.state.hiddenTickets.has(t.id)
        );
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
                ) : null}
                {tickets ? (
                    <TicketList
                        tickets={this.getFilterTickets(tickets)}
                        onHideTicket={this.onHideTicket}
                    />
                ) : (
                    <h2>Loading..</h2>
                )}
            </>
        );
    }
}

export default FilterableTicketList;
