import React from "react";
import { Ticket as TicketType } from "../api";
import TicketContent from "./TicketContent";

export type TicketProps = {
  ticket: TicketType;
  onHideTicket: (id: string) => void;
};

export type TicketState = {
  contentText: React.RefObject<unknown>;
  hi: string;
};

class Ticket extends React.Component<TicketProps, TicketState> {
  constructor(props: TicketProps) {
    super(props);
    this.handleTicketHide = this.handleTicketHide.bind(this);
  }

  handleTicketHide() {
    this.props.onHideTicket(this.props.ticket.id);
  }

  render() {
    const { ticket } = this.props;
    const labels = ticket.labels;

    return (
      <div className="ticket">
        <button className="hide-btn" onClick={this.handleTicketHide}>
          Hide
        </button>
        <h5 className="title">{ticket.title}</h5>
        <TicketContent content={ticket.content} />
        <footer>
          <div className="meta-data">
            By {ticket.userEmail} | {new Date(ticket.creationTime).toLocaleString()}
          </div>
          <div className="labels">
            {labels
              ? labels.map((label) => (
                  <span key={label} className="label">
                    {label}
                  </span>
                ))
              : null}
          </div>
        </footer>
      </div>
    );
  }
}

export default Ticket;
