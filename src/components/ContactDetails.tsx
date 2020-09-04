import React, { Component } from "react";
import { Card } from "antd";

interface DetailProps {
  contact: {
    id: number;
    firstName: string;
    lastName: string;
    handle: string;
  };
  visible: boolean;
}

class ContactDetails extends Component<DetailProps> {
  state = {
    visible: true,
  };

  render() {
    const { firstName, lastName, handle } = this.props.contact;
    console.log(this.state.visible, this.props.visible, firstName);
    return (
      <div>
        {this.state.visible && (
          <div>
            <Card
              size="small"
              title="Contact Details"
              // extra={<a href="#">More</a>}
              style={{ width: 300 }}
            >
              <p>
                Name: {firstName} {lastName}
              </p>
              <p>Handle: {handle}</p>
              <p>Email: </p>
              <p>Phone: </p>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default ContactDetails;
