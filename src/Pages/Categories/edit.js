import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/BreadCrumb";
import Alert from "../../components/Alert";
import Form from "./form";
import { getData, putData } from "../../Utils/fetchData";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNotif } from "../../redux/notif/actions";

function CategoryEdit() {
  const { categoryId } = useParams(); //categoryId dari app.js
  const [form, setForm] = useState({
    name: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const fetchOneCategories = async () => {
    const res = await getData(`api/v1/categories/${categoryId}`);
    console.log("Fetch edit", res);
    setForm({ ...form, name: res.data.data.name });
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await putData(`api/v1/categories/${categoryId}`, form);
      dispatch(
        setNotif(
          true,
          "success",
          `Berhasil Tambah ubah dengan nama ${res.data.data.name}`
        )
      );
      //clear timeout notif dii category action.js
      navigate("/categories");
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: "danger",
        message: error.response.data.msg,
      });
    }
  };

  useEffect(() => {
    fetchOneCategories();
  }, []);

  return (
    <Container>
      <BreadCrumb
        textSecond={"Categories"}
        urlSecond={"/categories"}
        textThird="Edit"
      />
      {alert.status && <Alert type={alert.type} message={alert.message} />}

      <Form
        edit
        form={form}
        isLoading={isLoading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}

export default CategoryEdit;
