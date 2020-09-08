import React, { Component } from "react";
import { Button, Input, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";

interface ViewProps {
  fetch: any;
}
class AddContact extends Component<ViewProps> {
  state = {
    firstName: "",
    lastName: "",
    email1: "",
    email2: "",
    phone1: "",
    phone2: "",
    handle: "",
    showAddContact: false,
    error: "",
  };

  handleInput = (e: any) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state);
  };

  showForm = () => {
    this.setState({
      showAddContact: !this.state.showAddContact ? true : false,
    });
  };
  submitForm = () => {
    let {
      firstName,
      lastName,
      phone1,
      phone2,
      email1,
      email2,
      handle,
    } = this.state;

    if (firstName === "" || undefined) {
      alert("Please enter the first name");
      return;
    }
    if (lastName === "" || undefined) {
      alert("Please enter the last name");
      return;
    }
    if (handle === "" || undefined) {
      alert("Please enter the twitter handle");
      return;
    }
    if (phone1 === "" || undefined) {
      alert("Please enter the phone number");
      return;
    }
    if (phone1.length < 10) {
      alert("Phone number should be at least 10 digits");
      return;
    }

    if (phone2.length < 10 && phone2 !== "") {
      alert("Phone number should be at least 10 digits");
      return;
    }
    if (email1 === "" || undefined) {
      alert("Please enter the email");
      return;
    }
    const query = JSON.stringify({
      query: `mutation MyMutation {
        insert_Contacts_one(object:
           {firstName: "${firstName}",
           lastName: "${lastName}",
           email1: "${email1}", 
           email2: "${email2}", 
           phone1: "${phone1}",
           phone2: "${phone2}", 
           handle: "${handle}"
          }) {
          firstName
        }
      }
      `,
    });
    console.log(this.state.handle);
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
    this.setState({ showAddContact: false });
    setTimeout(() => {
      this.props.fetch();
    }, 2000);
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
                label="Email1"
                name="email1"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
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
              <Form.Item {...tailLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={this.submitForm}
                >
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
