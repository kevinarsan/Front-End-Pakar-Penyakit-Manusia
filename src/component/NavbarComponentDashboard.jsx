import { useState, useEffect } from "react";
import { Navbar, Container, Nav, Form } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";
import logo from "../../public/nm.png";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FiUser } from "react-icons/fi";
import { BiSearchAlt } from "react-icons/bi";
import axios from "axios";

const navLinks = [
  {
    to: "/dashboard/notification",
    label: (
      <div className="position-relative">
        <IoMdNotificationsOutline className="fs-4 fw-bold" />
        <div className="amount-notif">
          <div className="notification-badge"></div>
        </div>
      </div>
    ),
  },
  {
    to: "/dashboard/profiles",
    label: (
      <div className="me-1">
        <FiUser className="fs-4 ms-1 me-3 mb-1 fw-bold" />
        <span id="usernamePlaceholder"></span>
      </div>
    ),
  },
];

const NavbarComponentDashboard = () => {
  const [changeColor, setChangeColor] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [username, setUsername] = useState("");

  const changeBackgroundColor = () => {
    if (window.scrollY > 10) {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  };

  useEffect(() => {
    changeBackgroundColor();
    window.addEventListener("scroll", changeBackgroundColor);
    return () => {
      window.removeEventListener("scroll", changeBackgroundColor);
    };
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://api-penyakit-manusia.up.railway.app/api/v1/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUsername(response.data.me.username);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://api-penyakit-manusia.up.railway.app/api/v1/notifications/me",
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
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
  }, []);

  const unreadCount = notifications.filter(
    (notification) => !notification.isRead
  ).length;

  useEffect(() => {
    document.getElementById("usernamePlaceholder").innerText = username;
  }, [username]);

  return (
    <Navbar expand="lg" className={`${changeColor ? "color-active" : ""}`}>
      <Container>
        <Navbar.Brand
          href="/dashboard/home-page"
          className="brand fs-3 fw-bold mt-2"
        >
          <img src={logo} alt="" className="me-1 mb-1" />
          DIAGNOSIFY
        </Navbar.Brand>

        <Form className="offset-2 d-flex flex-grow-1 justify-content-center">
          <Form.Control
            size="lg"
            type="search"
            placeholder="  Cari..."
            className="search-home me-2 fs-6"
            aria-label="Search"
          />
          <div className="search">
            <Link to="#">
              <BiSearchAlt className="text-white fs-4" />
            </Link>
          </div>
        </Form>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="nav-link ms-auto">
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                as={Link}
                to={link.to}
                className="nav-link"
                activeClassName="active"
              >
                {link.to === "/dashboard/notification" && unreadCount > 0 ? (
                  <div className="position-relative">
                    {link.label}
                    <span className="notification-badge">{unreadCount}</span>
                  </div>
                ) : (
                  link.label
                )}
              </NavLink>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarComponentDashboard;
