import React, { Component } from "react";
import { Layout, Card } from "antd";
import ContactDetails from "./ContactDetails";
import AddContact from "./AddContact";

class ViewContacts extends Component {
  state = {
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
    isDeleted: false,
  };

  handleClick = (e: any) => {
    const itemId = e.target.id;
    const details = this.state.Contacts.find((list) => {
      return list.id === itemId;
    });
    this.setState({
      details: details,
    });
    setTimeout(() => {
      this.openModal();
    }, 1);
  };

  //Open details
  openModal = () => {
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
        Contacts (order_by: {firstName: asc}) {
          id
          firstName
          lastName
          email1
          phone1
          email2
          phone2
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
          loading: false,
        });
        // console.log(resData);
      });
  };

  //Delete contact

  deleteContact = (updateid: number) => {
    const query = JSON.stringify({
      query: `mutation MyMutation {
        delete_Contacts_by_pk(id: "${updateid}") {
          firstName
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
        console.log(res);
        return res.json();
      })
      .then((resData) => {
        console.log(resData);
      });
    this.setState({
      isDeleted: !this.state.isDeleted,
    });
    setTimeout(() => {
      this.fetchContacts();
    }, 2000);
  };

  componentDidMount() {
    this.fetchContacts();
    console.log("object");
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
    // console.log(this.state.details);
    return (
      <div>
        <Header className="contact-header">
          <h1>Contact app</h1>
        </Header>
        <div className="list-container">
          {this.state.loading ? "Loading...." : <ul> {list}</ul>}
          <div className="contact-details">
            <ContactDetails
              contact={this.state.details}
              visible={this.state.modalState}
              deleteContact={this.deleteContact}
              fetch={this.fetchContacts}
            />
          </div>
          <div className="new-contact">
            <AddContact fetch={this.fetchContacts} />
          </div>
        </div>
      </div>
    );
  }
}

export default ViewContacts;
