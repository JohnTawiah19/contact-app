import React from "react";
import { Button } from "antd";

interface Update {
  updateid: number;
}
const deleteContact = (updateid: number) => {
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
      alert(
        `${resData.data.delete_Contacts_by_pk.firstName} was deleted from contact list`
      );
    });
};

const DeleteContact: React.FC<Update> = (props) => {
  return (
    <>
      <Button
        onClick={() => deleteContact(props.updateid)}
        style={{ background: "#ff4d4f", color: "#fff" }}
      >
        Delete
      </Button>
    </>
  );
};

export default DeleteContact;
