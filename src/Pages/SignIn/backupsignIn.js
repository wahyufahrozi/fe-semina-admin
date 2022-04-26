import React, { useState } from "react";
import Alert from "../../components/Alert";
import Button from "../../components/Button";
import TextInput from "../../components/TextInput";

function PageSignIn() {
  const [users, setUsers] = useState([{ id: 1, name: "wahyu", age: 26 }]);
  const [type, setType] = useState("save");
  const [isBool, setisBool] = useState(false);
  const [form, setForm] = useState({
    age: "",
    name: "",
    id: 0,
  });
  const [isLoading, setisLoading] = useState(false);
  const [error, setError] = useState({
    status: false,
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getOneUser = (data) => {
    // console.log(data);
    setForm({
      name: data.name,
      age: data.age,
      id: data.id,
    });
    setType("update");
  };

  const handleUpdate = (data) => {
    const temp = [...users];
    temp.forEach((user) => {
      if (user.id === data.id) {
        user.name = data.name;
        user.age = data.age;
      }
    });
    // console.log(temp);
    setUsers(temp);
    setType("save");
  };
  const handleDelete = (id) => {
    const newUser = users.filter((item) => item.id !== id);

    setUsers(newUser);
  };
  const validate = () => {
    let error = false;

    if (form.name === "") {
      error = true;
      setError({ status: true, message: "nama tidak boleh kosong" });
      return error;
    }
    if (form.age === "") {
      error = true;
      setError({ status: true, message: "umur tidak boleh kosong" });
      return error;
    }
  };
  const onSubmit = () => {
    // let waktu = new Date();
    // console.log("dadad", waktu);
    setisLoading(true);
    if (!validate()) {
      //hit api post
      let temp = [...users];
      temp.push({
        name: form.name,
        age: form.age,
        id: temp.length + 1,
        // id: waktu.getMilliseconds(),
      });
      setUsers(temp);
      setisLoading(false);
      setForm({
        name: "",
        age: "",
        id: 0,
      });
    } else {
      setisLoading(false);
    }
  };
  return (
    <div>
      {error.status && <Alert message={error.message} type="error" />}

      <h1>Form Sign In</h1>
      <TextInput
        placeholder="Masukan Nama "
        type="text"
        value={form.name}
        name="name"
        onChange={(e) => handleChange(e)}
      />
      <br />
      <TextInput
        type="number"
        value={form.age}
        name="age"
        placeholder="Masukan umur"
        onChange={(e) => handleChange(e)}
      />
      <Button
        name={`${type === "save" ? "Save" : "Update"}`}
        loading={isLoading}
        onClick={() => (type === "save" ? onSubmit() : handleUpdate(form))}
      />

      {/* {isBool ? (
        <ul>
          <li>{form.name}</li>
          <li>{form.age}</li>
        </ul>

) : null} */}

      <table>
        <thead>
          <th>Name</th>
          <th>Age</th>
          <th>action</th>
        </thead>
        <tbody>
          {users.map((item) => {
            return (
              <tr>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>
                  <Button
                    name="Edit"
                    loading={isLoading}
                    onClick={() => getOneUser(item)}
                  />
                  <Button
                    name="Delete"
                    loading={isLoading}
                    onClick={() => handleDelete(item.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PageSignIn;
