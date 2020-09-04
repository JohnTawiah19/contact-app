import React, { Component } from "react";
import { Button, Layout, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ContactDetails from "./ContactDetails";

class ViewContacts extends Component {
  state = {
    contacts: [
      { id: 1, firstName: "John", lastName: "Tawiah", handle: "@john" },
      { id: 2, firstName: "Michael", lastName: "Blankson", handle: "@blank" },
      { id: 3, firstName: "David", lastName: "Adams", handle: "@david" },
    ],
    details: { id: 1, firstName: "", lastName: "", handle: "" },
    modalState: false,
  };

  handleClick = (e: any) => {
    const itemId = e.target.id;
    const details = this.state.contacts.find((list) => {
      return list.id === +itemId;
    });
    this.setState({ details, modalState: true });
  };

  render() {
    const { Header } = Layout;
    const list = this.state.contacts.map((item, index: number) => {
      return (
        <li key={index}>
          <Card className="contact-list">
            <div
              className="contact"
              id={item.id.toString()}
              onClick={this.handleClick}
            >
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
          <ul> {list}</ul>
          <div className="contact-details">
            <ContactDetails
              contact={this.state.details}
              visible={this.state.modalState}
            />
          </div>
        </div>
        <div className="add-contact">
          <Button className="btn">
            <PlusOutlined className="plus" />
          </Button>
        </div>
      </div>
    );
  }
}

export default ViewContacts;
