import React, { Component } from "react";
import { Button, Modal, Form, Input } from "antd";

interface Update {
  updateid: number;
  contactDetails: {
    firstName: string;
    lastName: string;
    email1: string;
    email2: string;
    phone1: string;
    phone2: string;
    handle: string;
  };
}
class UpdateContact extends Component<Update> {
  state = {
    loading: false,
    visible: false,
    firstName: "",
    lastName: "",
    email1: "",
    email2: "",
    phone1: "",
    phone2: "",
    handle: "",
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 3000);
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleInput = (e: any) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  // Update contact with new data
  updateContact = () => {
    let {
      firstName,
      lastName,
      phone1,
      phone2,
      email1,
      email2,
      handle,
    } = this.state;

    firstName =
      firstName === "" || undefined || null
        ? this.props.contactDetails.firstName
        : firstName;

    lastName =
      lastName === "" || undefined || null
        ? this.props.contactDetails.lastName
        : lastName;

    phone1 =
      phone1 === "" || undefined || null
        ? this.props.contactDetails.phone1
        : phone1;

    phone2 =
      phone2 === "" || undefined || null
        ? this.props.contactDetails.phone2
        : phone2;

    email1 =
      email1 === "" || undefined || null
        ? this.props.contactDetails.email1
        : email1;
    email2 =
      email2 === "" || undefined || null
        ? this.props.contactDetails.email2
        : email2;
    handle =
      handle === "" || undefined || null
        ? this.props.contactDetails.handle
        : handle;

    const query = JSON.stringify({
      query: `mutation MyMutation {
            update_Contacts(where: {id: {_eq: "${this.props.updateid}"}},
             _set: {
                email1: "${email1}", email2: "${email2}",
                firstName: "${firstName}", handle: "${handle}",
                lastName: "${lastName}",
                phone1: "${phone1}", phone2: "${phone2}"}) {
            returning {
                firstName
                lastName
                }
            }
          }
          `,
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
        console.log(resData.data);
      });
    this.handleOk();
  };
  render() {
    const { visible, loading } = this.state;

    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    // const tailLayout = {
    //   wrapperCol: { offset: 8, span: 16 },
    // };

    const onFinish = (values: any) => {
      console.log("Success:", values);
    };

    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };

    return (
      <>
        <Button type="primary" onClick={this.showModal}>
          Edit
        </Button>
        <Modal
          visible={visible}
          title="Edit contact details"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={loading}
              onClick={this.updateContact}
            >
              Confirm Edit
            </Button>,
          ]}
        >
          <Form
            {...layout}
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item label="First name" name="firstName">
              <Input
                onChange={this.handleInput}
                name="firstName"
                placeholder={this.props.contactDetails.firstName}
              />
            </Form.Item>

            <Form.Item label="Last name" name="lastName">
              <Input
                onChange={this.handleInput}
                name="lastName"
                placeholder={this.props.contactDetails.lastName}
              />
            </Form.Item>

            <Form.Item label="Email1" name="email1">
              <Input
                onChange={this.handleInput}
                name="email1"
                placeholder={this.props.contactDetails.email1}
              />
            </Form.Item>

            <Form.Item label="Email2" name="email2">
              <Input
                onChange={this.handleInput}
                name="email2"
                placeholder={this.props.contactDetails.email2}
              />
            </Form.Item>

            <Form.Item label="Phone1" name="phone1">
              <Input
                onChange={this.handleInput}
                name="phone1"
                placeholder={this.props.contactDetails.phone1}
              />
            </Form.Item>

            <Form.Item label="Phone2" name="phone2">
              <Input
                onChange={this.handleInput}
                name="phone2"
                placeholder={this.props.contactDetails.phone2}
              />
            </Form.Item>

            <Form.Item label="Twitter" name="handle">
              <Input
                onChange={this.handleInput}
                name="handle"
                placeholder={this.props.contactDetails.handle}
              />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default UpdateContact;
