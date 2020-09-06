import React, { Component } from "react";
import { Card } from "antd";
import DeleteContact from "./DeleteContact";
import UpdateContact from "./UpdateContact";

interface DetailProps {
  contact: {
    id: number;
    firstName: string;
    lastName: string;
    phone1: string;
    phone2: string;
    email1: string;
    email2: string;
    handle: string;
  };
  visible: boolean;
}

class ContactDetails extends Component<DetailProps> {
  render() {
    const {
      id,
      firstName,
      lastName,
      handle,
      email1,
      email2,
      phone1,
      phone2,
    } = this.props.contact;
    return (
      <div>
        {this.props.visible && (
          <div className="details">
            <Card
              size="small"
              title="Contact Details"
              // extra={<a href="#">More</a>}
              style={{ width: 300 }}
            >
              <p>
                Name: {firstName} {lastName}
              </p>
              <p>
                Handle:{" "}
                <a href={`https://www.twitter.com/${handle}`}> {handle}</a>
              </p>
              <p>Email 1 : {email1}</p>
              <p>
                Email 2: {"  "}
                {email2 || email2 === "" ? email2 : "N/A"}
              </p>
              <p>Phone 1: {phone1} </p>
              <p>Phone 2: {phone2 ? phone2 : "N/A"}</p>
              <div className="delete-contact">
                <DeleteContact updateid={id} />
              </div>
              <div className="update-contact">
                <UpdateContact updateid={id} />
              </div>
            </Card>
          </div>
        )}
      </div>
    );
  }
}

export default ContactDetails;
