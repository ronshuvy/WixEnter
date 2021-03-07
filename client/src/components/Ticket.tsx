import React from "react";
import { Ticket as TicketType } from "../api";
import TicketContent from "./TicketContent";

export type TicketProps = {
  ticket: TicketType;
  onHideTicket: (id: string) => void;
};

export type TicketState = {
  priority: number;
};

class Ticket extends React.Component<TicketProps, TicketState> {
  constructor(props: TicketProps) {
    super(props);
    this.state = {
      priority: 0,
    };
    this.handleTicketHide = this.handleTicketHide.bind(this);
    this.handlePriorityClick = this.handlePriorityClick.bind(this);
  }

  handleTicketHide() {
    this.props.onHideTicket(this.props.ticket.id);
  }

  handlePriorityClick() {
    let curr = this.state.priority;
    this.setState({
      priority: (curr + 1) % 4,
    });
  }

  getPriorityLevel() {
    switch (this.state.priority) {
      case 0:
        return "Default";
      case 1:
        return "Low";
      case 2:
        return "Medium";
      case 3:
        return "High";
    }
  }

  render() {
    const { ticket } = this.props;
    const { priority } = this.state;
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
        <span>
          <button className={`priority${priority}`} onClick={this.handlePriorityClick}>
            {this.getPriorityLevel()} Priority
          </button>
        </span>
      </div>
    );
  }
}

export default Ticket;
