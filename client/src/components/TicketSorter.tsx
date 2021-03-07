import React from "react";
import { sortKeys } from "../api";

export type TicketSorterProps = {
  onSortTickets: any;
};

type TicketSorterState = {
  sortKey: any;
};

const sKeys = Object.keys(sortKeys);

class TicketSorter extends React.Component<TicketSorterProps, TicketSorterState> {
  constructor(props: TicketSorterProps) {
    super(props);
    this.state = {
      sortKey: null,
    };
  }

  handleSortTicketsClick = (e: any) => {
    const sortParam = e.target.textContent;
    this.setState({
      sortKey: sortParam,
    });
    this.props.onSortTickets(sortParam);
  };

  render() {
    const sortKey = this.state.sortKey;

    return (
      <div className="sortBy">
        Sort by:
        {sKeys.map((key) => (
          <button
            className={sortKey === `${key}` ? "sort-btn-active" : "sort-btn"}
            onClick={this.handleSortTicketsClick}
          >
            {key}
          </button>
        ))}
      </div>
    );
  }
}

export default TicketSorter;
