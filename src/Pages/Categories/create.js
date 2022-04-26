import React, { useState } from "react";
import { Container } from "react-bootstrap";
import CategoriesForm from "./form";
import ComponentBreadCrumb from "../../components/BreadCrumb";
import { postData } from "../../Utils/fetchData";
import AlertMessage from "../../components/Alert";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNotif } from "../../redux/notif/actions";
function CategoryCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name: "",
  });

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const res = await postData("api/v1/categories", form);
      dispatch(
        setNotif(
          true,
          "success",
          `Berhasil Tambah Kategori dengan nama ${res.data.data.name}`
        )
      );
      //clear timeout notif dii category action.js

      navigate("/categories");
      setIsLoading(false);
    } catch (error) {
      // console.log(error.response);
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: "danger",
        message: error.response.data.msg,
      });
    }
  };
  return (
    <Container>
      <ComponentBreadCrumb
        textSecond={"Categories"}
        urlSecond={"/categories"}
        textThird="Create"
      />
      {alert.status && (
        <AlertMessage type={alert.type} message={alert.message} />
      )}

      <CategoriesForm
        handleChange={handleChange}
        form={form}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </Container>
  );
}

export default CategoryCreate;
