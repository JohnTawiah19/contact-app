import React, { Component } from "react";
import { Button, Layout, Card } from "antd";
import { PlusOutlined } from "@ant-design/icons";

export class ViewContacts extends Component {
  state = {
    contacts: [
      {
        firstName: "John",
        lastName: "Tawiah",
        handle: "@john",
      },
      { firstName: "Michael", lastName: "Blankson", handle: "@blank" },
    ],
  };
  render() {
    const { Header } = Layout;
    const list = this.state.contacts.map((item, index: number) => (
      <Card className="contact-list">
        <ul key={index}>
          <li className="contact">
            <p>
              <strong>
                {item.firstName} {item.lastName}
              </strong>
            </p>
          </li>
        </ul>
      </Card>
    ));
    return (
      <div>
        <Header className="contact-header">
          <h1>Contact app</h1>
        </Header>
        <div className="page-title">
          <h2>Contact List</h2>
        </div>
        <div className="list"> {list}</div>
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
