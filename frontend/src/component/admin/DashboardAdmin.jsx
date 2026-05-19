import React, { Component } from "react";
import "./DashboardAdmin.css";
import "../PremiumDesign.css";
import { Route, Link, Navigate, Routes } from "react-router-dom";
import Role from "../Role.jsx";
import NavBar from "../NavBar.jsx";
import Position from "../Position.jsx";
import Department from "../Department.jsx";
import AdminPortal from "./AdminPortal.jsx";
import AdminProjectBid from "./AdminProjectBid.jsx";
import NotFound404 from "../NotFound404.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsersCog,
  faUsers,
  faChair,
  faBuilding,
  faDollarSign,
  faTasks
} from "@fortawesome/free-solid-svg-icons";

class DashboardAdmin extends Component {
  state = {
    checked: true
  };

  handleChange = (checked) => {
    if (this.state.checked == true) {
      document.getElementById("sidebar").setAttribute("class", "display-none");
    } else {
      document.getElementById("sidebar").setAttribute("class", "display-block");
    }
    this.setState({ checked });
  };

  render() {
    return (
      <React.Fragment>
        <div id="outer-main-div">
          <div id="outer-nav">
            <NavBar
              loginInfo={this.props.data}
              checked={this.state.checked}
              handleChange={this.handleChange}
              onLogout={this.props.onLogout}
            />
          </div>

          <div id="main-non-nav">
            <div id="sidebar">
              <div id="sidebar-top-content" />
              <div id="main-title">
                <FontAwesomeIcon icon={faUsersCog} className="sidebar-icon" />
                Admin
              </div>
              <ul className="navbar-ul">
                <li>
                  <Link to="/admin/role">
                    <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
                    Role
                  </Link>
                </li>
                <li>
                  <Link to="/admin/position">
                    <FontAwesomeIcon icon={faChair} className="sidebar-icon" />
                    Position
                  </Link>
                </li>
                <li>
                  <Link to="/admin/department">
                    <FontAwesomeIcon icon={faBuilding} className="sidebar-icon" />
                    Department
                  </Link>
                </li>
                <li>
                  <Link to="/admin/project-bid">
                    <FontAwesomeIcon icon={faDollarSign} className="sidebar-icon" />
                    Project Bidding
                  </Link>
                </li>
                <li>
                  <Link to="/admin/portal-master">
                    <FontAwesomeIcon icon={faTasks} className="sidebar-icon" />
                    Portal Master
                  </Link>
                </li>
              </ul>
            </div>

            <div id="main-area">
              <div id="sidebar-top-content" />
              <Routes>
                <Route index element={<Navigate to="role" replace />} />
                <Route path="role" element={<Role />} />
                <Route path="position" element={<Position />} />
                <Route path="department" element={<Department />} />
                <Route path="portal-master" element={<AdminPortal />} />
                <Route path="project-bid" element={<AdminProjectBid />} />
                <Route path="*" element={<NotFound404 />} />
              </Routes>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DashboardAdmin;
