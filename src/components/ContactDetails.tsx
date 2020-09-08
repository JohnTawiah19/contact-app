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
  deleteContact: any;
  fetch: any;
}

class ContactDetails extends Component<DetailProps> {
  state = {
    twitter: "",
  };

  // this.fetchHandle(handle);
  fetchHandle = (handle: string) => {
    const query = JSON.stringify({
      query: `mutation MyMutation {
           addHandle(handle: "${handle}") {
             twitter
           }
         }`,
    });

    fetch("https://great-fawn-85.hasura.app/v1/graphql", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: query,
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Fetch failed");
        }
        return res.json();
      })
      .then((resData) => {
        const twitter = resData.data.addHandle.twitter;
        this.setState({ twitter });
      });
  };

  componentWillReceiveProps() {
    this.fetchHandle(this.props.contact.handle);
  }

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
    console.log(this.state.twitter);
    return (
      <div>
        {this.props.visible && (
          <div className="details">
            <Card size="small" title="Contact Details" style={{ width: 300 }}>
              <p>
                Name: {firstName} {lastName}
              </p>
              <p>
                Handle: <a href={this.state.twitter}> {handle}</a>
              </p>
              <p>Email 1 : {email1}</p>
              {email2.length > 2 ? <p>Email 2: {email2}</p> : null}
              <p>Phone 1: {phone1} </p>
              {phone2.length > 2 ? <p>Phone 2: {phone2}</p> : null}
              <div className="delete-contact">
                <DeleteContact
                  updateid={id}
                  deleteContact={this.props.deleteContact}
                />
              </div>
              <div className="update-contact">
                <UpdateContact
                  updateid={id}
                  contactDetails={{
                    firstName,
                    lastName,
                    email1,
                    email2,
                    phone1,
                    phone2,
                    handle,
                  }}
                  fetch={this.props.fetch}
                  visible={this.props.visible}
                />
              </div>
            </Card>
          </div>
        )}
      </div>
    );
    // }
  }
}

export default ContactDetails;
