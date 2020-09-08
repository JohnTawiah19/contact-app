import React, { Component } from "react";
import { Button } from "antd";

interface Update {
  updateid: number;
  deleteContact: any;
}

class DeleteContact extends Component<Update> {
  state = {
    loading: false,
  };

  render() {
    return (
      <>
        <Button
          onClick={() => this.props.deleteContact(this.props.updateid)}
          style={{ background: "#ff4d4f", color: "#fff" }}
        >
          Delete
        </Button>
      </>
    );
  }
}

export default DeleteContact;
