import { useEffect, useState } from "react";
// import "../../styles/user.css";
import { Table, Button, Modal, Input, notification } from "antd";
import type { TableProps } from "antd";
import { PlusOutlined } from "@ant-design/icons";
interface IUsers {
  _id: string;
  email: string;
  name: string;
  role: string;
}
const UsersTable = () => {
  const [listUsers, setListUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("");

  const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0b2tlbiBsb2dpbiIsImlzcyI6ImZyb20gc2VydmVyIiwiX2lkIjoiNmEzZTQ3MzVlOWQ1MzUyYjhjMWJjNDk3IiwiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJhZGRyZXNzIjoiVmlldE5hbSIsImlzVmVyaWZ5Ijp0cnVlLCJuYW1lIjoiSSdtIGFkbWluIiwidHlwZSI6IlNZU1RFTSIsInJvbGUiOiJBRE1JTiIsImdlbmRlciI6Ik1BTEUiLCJhZ2UiOjY5LCJpYXQiOjE3ODQyNzcwMTksImV4cCI6MTg3MDY3NzAxOX0.uyd9RiXvy283MnCQV2u93e6bm-UCWph-UXlGgGcQTGg";
  useEffect(() => {
    console.log("Check useEffect");

    getData();
  }, []);

  const getData = async () => {
    

    const res = await fetch("http://localhost:8000/api/v1/users/all", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    const d = await res.json();
    setListUsers(d.data.result);
  };


  const columns: TableProps<IUsers>["columns"] = [
    {
      title: "email",
      dataIndex: "email",
      render: (value, record) => {
        console.log();
        return <a>{record.email}</a>;
      },
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOk = async () => {
    const data = {
      name,
      email,
      password,
      age,
      gender,
      address,
      role,
    };
    console.log("Check data: ", data);
     const res = await fetch("http://localhost:8000/api/v1/users", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({...data}),
    });
    const d = await res.json();
    if (d.data) {
      await getData();
      notification.success({
        message: "Thêm user thành công",
      });
      setIsModalOpen(false);
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: JSON.stringify(d.message),
      })
    }
  };

  const handleCloseCreateModal = () => {
    setIsModalOpen(false);
    setName("");
    setEmail("");
    setPassword("");
    setAge("");
    setGender("");
    setAddress("");
    setRole("");
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2>Users Table</h2>
        <div>
          <Button icon={<PlusOutlined />} type="primary" onClick={ () => setIsModalOpen(true) }> 
            Add new
          </Button>
        </div>
      </div>
      <Table columns={columns} dataSource={listUsers} />
      <Modal
        title="Add new user"
        // closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => handleCloseCreateModal()}
      >
        <div>
          <label>Name:</label>
          <Input
          value={name}
          onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label>Email:</label>
          <Input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <Input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div>
          <label>Age:</label>
          <Input
            value={age}
            onChange={(event) => setAge(event.target.value)}
          />
        </div>
        <div>
          <label>Gender:</label>
          <Input
            value={gender}
            onChange={(event) => setGender(event.target.value)}
          />
        </div>
        <div>
          <label>Address:</label>
          <Input
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div>
          <label>Role:</label>
          <Input
            value={role}
            onChange={(event) => setRole(event.target.value)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default UsersTable;
