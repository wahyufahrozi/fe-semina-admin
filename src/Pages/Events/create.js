import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import BreadCrumb from "../../components/BreadCrumb";
import Alert from "../../components/Alert";
import Form from "./form";
import { postData } from "../../Utils/fetchData";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNotif } from "../../redux/notif/actions";
import {
  fetchListCategories,
  fetchListSpeakers,
} from "../../redux/lists/actions";

function EventCreate() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists);
  const [form, setForm] = useState({
    title: "",
    price: "",
    date: "",
    file: "",
    cover: "",
    about: "",
    venueName: "",
    tagline: "",
    keyPoint: [""],
    category: "",
    speaker: "",
    stock: "",
  });

  console.log(form.category);

  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchListSpeakers());
    dispatch(fetchListCategories());
  }, [dispatch]);

  const handleChange = (e) => {
    if (e.target.name === "cover") {
      if (
        e?.target?.files[0]?.type === "image/jpg" ||
        e?.target?.files[0]?.type === "image/png" ||
        e?.target?.files[0]?.type === "image/jpeg"
      ) {
        var size = parseFloat(e.target.files[0].size / 3145728).toFixed(2);

        if (size > 2) {
          setAlert({
            ...alert,
            status: true,
            type: "danger",
            message: "Please select image size less than 3 MB",
          });
          setForm({
            ...form,
            file: "",
            [e.target.name]: "",
          });
        } else {
          setForm({
            ...form,
            file: e.target.files[0],
            [e.target.name]: URL.createObjectURL(e.target.files[0]),
          });
        }
      } else {
        setAlert({
          ...alert,
          status: true,
          type: "danger",
          message: "type image png | jpg | jpeg",
        });
        setForm({
          ...form,
          file: "",
          [e.target.name]: "",
        });
      }
    } else if (e.target.name === "category" || e.target.name === "speaker") {
      setForm({ ...form, [e.target.name]: e });
      //kanrena memakai selectbox jadi cmn pake [e.target.name]: e,tidak pake [e.target.name]: e.target.value
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      let formData = new FormData();
      //fungsi append untuk menambah kan sama seperti push
      //push untuk array sedangkang append untuk menambahkan element
      formData.append("cover", form.file);
      formData.append("title", form.title);
      formData.append("price", form.price);
      formData.append("date", form.date);
      formData.append("about", form.about);
      formData.append("venueName", form.venueName);
      formData.append("tagline", form.tagline);
      formData.append("keyPoint", JSON.stringify(form.keyPoint));
      formData.append("category", form.category.value);
      formData.append("speaker", form.speaker.value);
      formData.append("stock", form.stock);
      formData.append("status", true);

      const res = await postData("api/v1/events", formData, true);

      dispatch(
        setNotif(
          true,
          "success",
          `berhasil tambah events ${res.data.data.title}`
        )
      );
      navigate("/events");
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setAlert({
        ...alert,
        status: true,
        type: "danger",
        message: err.response.data.msg,
      });
    }
  };

  const handleChangeKeyPoint = (e, i) => {
    // memiliki parameter e, i event dan index yang berguna untuk mengetahui index keberapa yang ingin diubah
    let _temp = [...form.keyPoint];

    _temp[i] = e.target.value;
    //mengubah value pada index tertentu

    setForm({ ...form, keyPoint: _temp });
  };

  const handlePlusKeyPoint = () => {
    let _temp = [...form.keyPoint];
    //copy semua data yang ada di form
    _temp.push("");
    //push state kosong
    setForm({ ...form, keyPoint: _temp });
  };

  const handleMinusKeyPoint = (index) => {
    let _temp = [...form.keyPoint];
    let removeIndex = _temp
      .map(function (item, i) {
        return i;
      })
      .indexOf(index);

    _temp.splice(removeIndex, 1);
    setForm({ ...form, keyPoint: _temp });
  };
  //untuk meremove form pada index tertentu
  return (
    <Container>
      <BreadCrumb
        textSecond={"Events"}
        urlSecond={"/events"}
        textThird="Create"
      />
      {alert.status && <Alert type={alert.type} message={alert.message} />}
      <Form
        form={form}
        isLoading={isLoading}
        lists={lists}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleChangeKeyPoint={handleChangeKeyPoint}
        handlePlusKeyPoint={handlePlusKeyPoint}
        handleMinusKeyPoint={handleMinusKeyPoint}
      />
    </Container>
  );
}

export default EventCreate;
