import React from "react";
import { Ticket as TicketType } from "../api";

export type TicketProps = {
  ticket: TicketType;
};

class Ticket extends React.Component<TicketProps, {}> {
  render() {
    const { ticket } = this.props;

    return (
      <>
        <h5 className="title">{ticket.title}</h5>
        <p className="content">{ticket.content}</p>
        <footer>
          <div className="meta-data">
            By {ticket.userEmail} |{" "}
            {new Date(ticket.creationTime).toLocaleString()}
          </div>
        </footer>
      </>
    );
  }
}

export default Ticket;
