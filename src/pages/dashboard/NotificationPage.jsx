import React, { useEffect, useState } from "react";
import { Row, Col, Container, Modal, Button } from "react-bootstrap";
import axios from "axios";
import { FaArrowLeft, FaCircle } from "react-icons/fa";
import { IoNotificationsCircleSharp } from "react-icons/io5";

const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [senderName, setSenderName] = useState("");

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/v1/notifications/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const sortedNotifications = response.data.myNotif.sort(
          (a, b) => new Date(b.time) - new Date(a.time)
        );
        setNotifications(sortedNotifications);
      } catch (err) {
        console.error("There was an error fetching the notifications!", err);
      }
    };

    fetchNotifications();
  }, [modalShow]);

  useEffect(() => {
    const handleWindowClose = () => {
      window.location.reload();
    };
    window.addEventListener("beforeunload", handleWindowClose);
    return () => window.removeEventListener("beforeunload", handleWindowClose);
  }, []);

  const formatTanggal = (tanggalString) => {
    const tanggal = new Date(tanggalString);
    const options = { day: "numeric", month: "long" };
    const tanggalFormatted = tanggal.toLocaleDateString("id-ID", options);
    const jamFormatted = tanggal.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });
    return `${tanggalFormatted}, ${jamFormatted}`;
  };

  const formatTanggalModal = (tanggalString) => {
    const tanggal = new Date(tanggalString);
    const options = {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const tanggalFormatted = tanggal.toLocaleDateString("id-ID", options);
    return tanggalFormatted;
  };

  const markNotificationAsRead = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.get(
        `http://localhost:5000/api/v1/notifications/get/${notificationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Failed to mark notification as read!", err);
    }
  };

  const handleNotificationClick = async (notification) => {
    setSelectedNotification(notification);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/v1/notifications/get/${notification.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSenderName(response.data.data.user.profile.name);
      await markNotificationAsRead(notification.id);
      setModalShow(true);
    } catch (err) {
      console.error("Failed to fetch notification details!", err);
    }
  };

  const deleteNotification = async (notificationId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/v1/notifications/delete/${notificationId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setModalShow(false);
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.id !== notificationId
        )
      );
    } catch (err) {
      console.error("Failed to delete notification!", err);
    }
  };

  return (
    <div className="notification w-100 overflow-hidden">
      <Row className="wp justify-content-center">
        <div>
          <Container>
            <div className="d-flex justify-content-center mt-4">
              <a
                href="/dashboard/home-page"
                className="col-10 fs-6 fw-semibold"
              >
                <FaArrowLeft className="me-3 mb-1 fs-5" />
                Kembali Ke Beranda
              </a>
            </div>
            <div className="d-flex mt-3 justify-content-center">
              <div className="judul mt-4 col-9 d-flex justify-content-center align-items-center">
                <p className="fs-5 text-white text-center mb-0 fw-bold">
                  Notifikasi
                </p>
              </div>
            </div>
          </Container>
        </div>
      </Row>
      <Row>
        <div>
          <Container>
            <div className="d-flex justify-content-center">
              <div className="col-9 d-flex justify-content-center">
                <div className="col-lg-9 mt-3">
                  {notifications.map((notification) => (
                    <div
                      className="content-notif"
                      key={notification.id}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="d-flex align-items-center col-12">
                        <div className="col-1 fs-3">
                          <IoNotificationsCircleSharp />
                        </div>
                        <div className="fs-6 col-8 mt-1">Notifikasi</div>
                        <div className="time col-3 text-end mt-1 me-2">
                          {formatTanggal(notification.time)}
                        </div>
                        <div className="is-read">
                          <FaCircle
                            style={{
                              color: notification.isRead
                                ? "transparent"
                                : "red",
                            }}
                          />
                        </div>
                      </div>
                      <div className="d-flex">
                        <div className="col-1"></div>
                        <div className="notif-mesage col-8 text-black mb-3">
                          {notification.message}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="mb-3"></div>
                </div>
              </div>
            </div>
          </Container>
        </div>
      </Row>
      <Modal size="lg" show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Detail Notifikasi</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedNotification && (
            <>
              <p>Pengirim: {senderName}</p> {/* Menampilkan nama pengirim */}
              <p>Pesan: {selectedNotification.message}</p>
              <p>Waktu: {formatTanggalModal(selectedNotification.time)}</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Kembali
          </Button>
          <Button
            variant="danger"
            onClick={() => deleteNotification(selectedNotification.id)}
          >
            Hapus
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default NotificationPage;
