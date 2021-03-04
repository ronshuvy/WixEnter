import React from "react";
import { Ticket as TicketType } from "../api";
import Ticket from "./Ticket";

export type TicketListProps = {
  tickets: TicketType[];
};

class TicketList extends React.Component<TicketListProps, any> {
  render() {
    const { tickets } = this.props;
    return (
      <ul className="tickets">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="ticket">
            <Ticket ticket={ticket} />
          </li>
        ))}
      </ul>
    );
  }
}

export default TicketList;
