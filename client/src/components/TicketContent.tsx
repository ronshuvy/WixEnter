import React from "react";
import ShowMore from "react-show-more";

export type TicketContentProps = {
  content: string;
};

const maxLines: number = 3;

class TicketContent extends React.Component<TicketContentProps, {}> {
  render() {
    return (
      <div className="content">
        <ShowMore lines={maxLines} more="See more" less="See less">
          {this.props.content}
        </ShowMore>
      </div>
    );
  }
}

export default TicketContent;
