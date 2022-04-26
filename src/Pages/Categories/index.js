import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Button from "../../components/Button";
import Table from "../../components/TableWithAction";
import { fetchCategories } from "../../redux/categories/actions";
import { useSelector, useDispatch } from "react-redux";
import AlertMessage from "../../components/Alert";
import { deleteData } from "../../Utils/fetchData";

import { setNotif } from "../../redux/notif/actions";
import Swal from "sweetalert2";
function Categories() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const notif = useSelector((state) => state.notif);
  const categories = useSelector((state) => state.categories);

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    return () => {
      if (!user.token) return navigate("/login");
    };
  });
  const [alert, setAlert] = useState({
    status: false,
    type: "",
    message: "",
  });

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Apakah kamu yakin?",
      text: "Anda tidak akan dapat mengembalikan ini",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Hapus!",
      cancelButtonText: "Batal",
    })
      .then(async (result) => {
        if (result.isConfirmed) {
          const res = await deleteData(`api/v1/categories/${id}`);
          Swal.fire({
            position: "center",
            icon: "success",
            title: `Berhasil Hapus kategori ${res.data.data.name}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        dispatch(fetchCategories());
      })
      .catch((error) => {
        setIsLoading(false);
        setAlert({
          ...alert,
          status: true,
          type: "danger",
          message: error.response.data.msg,
        });
      });
    // setAlert({
    //   ...alert,
    //   status: true,
    //   type: "success",
    //   message: `Berhasil Hapus kategori ${res.data.data.name}`,
    // });
    // dispatch(fetchCategories());
    // setTimeout(() => {
    //   setAlert({
    //     ...alert,
    //     status: false,
    //   });
    // }, 3000);
    // setTimeout(() => {
    //   setAlert({
    //     ...alert,
    //     status: false,
    //   });
    // }, 3000);
  };
  return (
    <Container>
      <Button action={() => navigate("/categories/create")}>Tambah</Button>
      <BreadCrumb textSecond={"Categories"} />
      {notif.status && (
        <AlertMessage type={notif.typeNotif} message={notif.message} />
      )}

      {alert.status && (
        <AlertMessage type={alert.type} message={alert.message} />
      )}
      <Table
        status={categories.status}
        thead={["Nama", "Aksi"]}
        data={categories.data}
        tbody={["name"]}
        editUrl={`/categories/edit`}
        deleteAction={(id) => handleDelete(id)}
        withoutPagination
      />
    </Container>
  );
}

export default Categories;
