import React, { Component } from "react";
import { Button, Input, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";

class AddContact extends Component {
  state = {
    contactForm: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      handle: "",
    },
    showAddContact: false,
  };
  showForm = () => {
    this.setState({
      showAddContact: !this.state.showAddContact ? true : false,
    });
    console.log(this.state.showAddContact);
  };

  handleInput = (e: any) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  submitform = (e: any) => {
    e.preventDefault();
    const newContact = {
      firstName: this.state.contactForm.firstName,
      lastName: this.state.contactForm.lastName,
      email: this.state.contactForm.email,
      phone: this.state.contactForm.phone,
      handle: this.state.contactForm.handle,
    };
  };

  render() {
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
      <div>
        {this.state.showAddContact && (
          <div>
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
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input onChange={this.handleInput} name="email" />
              </Form.Item>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input onChange={this.handleInput} name="phone" />
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

              <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        )}
        <div className="add-contact">
          <Button className="btn" onClick={this.showForm}>
            <PlusOutlined className="plus" />
          </Button>
        </div>
      </div>
    );
  }
}

export default AddContact;
