import React from "react";
import { Ticket as TicketType } from "../api";
import Ticket from "./Ticket";

export type TicketListProps = {
  tickets: TicketType[];
  onHideTicket: (id: string) => void;
};

class TicketList extends React.Component<TicketListProps, any> {
  render() {
    const { tickets } = this.props;
    return (
      <ul className="tickets">
        {tickets.map((ticket, i) => (
          <li key={i}>
            <Ticket ticket={ticket} onHideTicket={this.props.onHideTicket} />
          </li>
        ))}
      </ul>
    );
  }
}

export default TicketList;
