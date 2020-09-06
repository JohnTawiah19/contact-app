import React, { Component } from "react";
import { Button, Modal, Form, Input } from "antd";

interface Update {
  updateid: number;
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
    const {
      firstName,
      lastName,
      phone1,
      phone2,
      email1,
      email2,
      handle,
    } = this.state;

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
    const tailLayout = {
      wrapperCol: { offset: 8, span: 16 },
    };

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
            <Form.Item
              label="First name"
              name="firstName"
              rules={[
                { required: true, message: "Please input your first name!" },
              ]}
            >
              <Input onChange={this.handleInput} name="firstName" />
            </Form.Item>
            <Form.Item
              label="Last name"
              name="lastName"
              rules={[
                { required: true, message: "Please input your last name!" },
              ]}
            >
              <Input onChange={this.handleInput} name="lastName" />
            </Form.Item>
            <Form.Item
              label="Email1"
              name="email1"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input onChange={this.handleInput} name="email1" />
            </Form.Item>
            <Form.Item label="Email2" name="email2">
              <Input onChange={this.handleInput} name="email2" />
            </Form.Item>
            <Form.Item
              label="Phone1"
              name="phone1"
              rules={[
                {
                  required: true,
                  message: "Please input your phone number!",
                },
              ]}
            >
              <Input onChange={this.handleInput} name="phone1" />
            </Form.Item>
            <Form.Item label="Phone2" name="phone2">
              <Input onChange={this.handleInput} name="phone2" />
            </Form.Item>
            <Form.Item
              label="Twitter"
              name="handle"
              rules={[
                {
                  required: true,
                  message: "Please input your Twitter handle!",
                },
              ]}
            >
              <Input onChange={this.handleInput} name="handle" />
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}

export default UpdateContact;
