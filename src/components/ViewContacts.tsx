import React, { Component } from "react";
import { Layout, Card } from "antd";
import ContactDetails from "./ContactDetails";
import AddContact from "./AddContact";
// import { gql, useQuery } from "@apollo/client";

class ViewContacts extends Component {
  state = {
    contacts: [
      { id: "1", firstName: "John", lastName: "Tawiah", handle: "@john" },
      { id: "2", firstName: "Michael", lastName: "Blankson", handle: "@blank" },
      { id: "3", firstName: "David", lastName: "Adams", handle: "@david" },
    ],

    Contacts: [{ id: "", firstName: "", lastName: "", email1: "", phone1: "" }],
    details: {
      id: 1,
      firstName: "",
      lastName: "",
      handle: "",
      phone1: "",
      phone2: "",
      email1: "",
      email2: "",
    },
    modalState: false,
    loading: false,
    error: "",
  };

  handleClick = (e: any) => {
    const itemId = e.target.id;
    const details = this.state.Contacts.find((list) => {
      return list.id === itemId;
    });
    this.setState({ details });
    !this.state.modalState
      ? this.setState({ modalState: true })
      : this.setState({ modalState: false });
  };

  //Fetching from the grephql endpoint

  fetchContacts = () => {
    this.setState({ loading: true });
    const requestBody = {
      query: `
      query MyQuery {
        Contacts {
          id
          firstName
          lastName
          email1
          phone1
          handle
        }
      }      
      `,
    };

    fetch("https://great-fawn-85.hasura.app/v1/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Fetch failed");
        }
        return res.json();
      })
      .then((resData) => {
        this.setState({
          Contacts: resData.data.Contacts,
        });
        // console.log(resData);
      });
  };

  componentDidMount() {
    this.fetchContacts();
  }

  render() {
    const { Header } = Layout;

    const list = this.state.Contacts.map((item, index: number) => {
      return (
        <li key={index}>
          <Card className="contact-list">
            <div className="contact" id={item.id} onClick={this.handleClick}>
              {item.firstName} {item.lastName}
            </div>
          </Card>
        </li>
      );
    });
    console.log(this.state.Contacts);

    return (
      <div>
        <Header className="contact-header">
          <h1>Contact app</h1>
        </Header>
        <div className="list-container">
          <ul> {list}</ul>
          <div className="contact-details">
            <ContactDetails
              contact={this.state.details}
              visible={this.state.modalState}
            />
          </div>
          <div className="new-contact">
            <AddContact />
          </div>
        </div>
      </div>
    );
  }
}

export default ViewContacts;
