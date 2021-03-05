import React from "react";
import { Ticket as TicketType } from "../api";
import { SearchBarProps } from "./SearchBar";

export type TicketProps = {
    ticket: TicketType;
    onHideTicket: (id: string) => void;
};

class Ticket extends React.Component<TicketProps, {}> {
    constructor(props: TicketProps) {
        super(props);
        this.handleTicketHide = this.handleTicketHide.bind(this);
    }

    handleTicketHide() {
        this.props.onHideTicket(this.props.ticket.id);
    }

    render() {
        const { ticket } = this.props;

        return (
            <div className="ticket">
                <button className="hide-btn" onClick={this.handleTicketHide}>
                    Hide
                </button>
                <h5 className="title">{ticket.title}</h5>
                <p className="content">{ticket.content}</p>
                <footer>
                    <div className="meta-data">
                        By {ticket.userEmail} | {new Date(ticket.creationTime).toLocaleString()}
                    </div>
                </footer>
            </div>
        );
    }
}

export default Ticket;
