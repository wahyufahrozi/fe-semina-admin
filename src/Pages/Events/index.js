import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BreadCrumb from "../../components/BreadCrumb";
import Button from "../../components/Button";
import Table from "../../components/TableWithAction";
import SearchInput from "../../components/SearchInput";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchEvents,
  setKeyword,
  setCategory,
  setSpeaker,
} from "../../redux/events/actions";
import AlertMessage from "../../components/Alert";
import Swal from "sweetalert2";
import { deleteData } from "../../Utils/fetchData";
import { setNotif } from "../../redux/notif/actions";
import SelectBox from "../../components/SelectBox";
import {
  fetchListCategories,
  fetchListSpeakers,
} from "../../redux/lists/actions";

function EventPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const notif = useSelector((state) => state.notif);
  const events = useSelector((state) => state.events);
  const lists = useSelector((state) => state.lists);

  useEffect(() => {
    return () => {
      if (!user.token) return navigate("/login");
    };
  });

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch, events.keyword, events.category, events.speaker]);

  useEffect(() => {
    dispatch(fetchListSpeakers());
    dispatch(fetchListCategories());
  }, [dispatch]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Apa kamu yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Iya, Hapus",
      cancelButtonText: "Batal",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteData(`api/v1/events/${id}`);

        // Swal.fire({
        //   position: 'top-end',
        //   icon: 'success',
        //   title: `Berhasil hapus kategori ${res.data.data.name}`,
        //   showConfirmButton: false,
        //   timer: 1500,
        // });

        dispatch(
          setNotif(
            true,
            "success",
            `berhasil hapus speaker ${res.data.data.name}`
          )
        );

        dispatch(fetchEvents());
      }
    });
  };

  return (
    <Container>
      <Button action={() => navigate("/events/create")}>Tambah</Button>
      <BreadCrumb textSecond={"Events"} />
      <Row>
        <Col>
          <SearchInput
            name="keyword"
            // value={events.keyword}
            query={events.keyword}
            handleChange={(e) => dispatch(setKeyword(e.target.value))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={"Masukan pencarian kategori"}
            name="category"
            value={events.categories}
            options={lists.categories}
            isClearable={true}
            handleChange={(e) => dispatch(setCategory(e))}
          />
        </Col>
        <Col>
          <SelectBox
            placeholder={"Masukan pencarian pembicara"}
            name="speaker"
            value={events.speaker}
            options={lists.speakers}
            isClearable={true}
            handleChange={(e) => dispatch(setSpeaker(e))}
          />
        </Col>
      </Row>

      {notif.status && (
        <AlertMessage type={notif.typeNotif} message={notif.message} />
      )}
      <Table
        status={events.status}
        thead={[
          "Judul",
          "Harga",
          "Tanggal",
          "Tempat",
          "Kategori",
          "Pembicara",
          "Aksi",
        ]}
        data={events.data}
        tbody={[
          "title",
          "price",
          "date",
          "venueName",
          "categoryName",
          "speakerName",
        ]}
        editUrl={`/events/edit`}
        deleteAction={(id) => handleDelete(id)}
        withoutPagination
      />
    </Container>
  );
}

export default EventPage;
