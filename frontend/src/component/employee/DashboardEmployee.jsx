import React, { Component } from "react";
import "./DashboardEmployee.css";
import "../PremiumDesign.css";
import { Route, Link, Navigate, Routes } from "react-router-dom";
import NavBar from "../NavBar.jsx";
import PersonalInfo from "./PersonalInfo.jsx";
import Education from "./Education.jsx";
import FamilyInfo from "./FamilyInfo.jsx";
import WorkExperience from "./WorkExperience.jsx";
import LeaveApplicationEmp from "./LeaveApplicationEmp.jsx";
import NotFound404 from "../NotFound404.jsx";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUsers,
  faUser,
  faFileAlt,
  faUniversity,
  faBriefcase,
  faMale,
} from "@fortawesome/free-solid-svg-icons";

class DashboardEmployee extends Component {
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
    const id = this.props.data["_id"];

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
              <div id="main-title" className="main-title-employee">
                <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
                Employee
              </div>
              <ul className="navbar-ul">
                <li>
                  <Link to={`/employee/${id}/personal-info`}>
                    <FontAwesomeIcon icon={faUser} className="sidebar-icon" />
                    Personal Information
                  </Link>
                </li>
                <li>
                  <Link to={`/employee/${id}/education`}>
                    <FontAwesomeIcon icon={faUniversity} className="sidebar-icon" />
                    Education
                  </Link>
                </li>
                <li>
                  <Link to={`/employee/${id}/family-info`}>
                    <FontAwesomeIcon icon={faMale} className="sidebar-icon" />
                    Dependents
                  </Link>
                </li>
                <li>
                  <Link to={`/employee/${id}/work-experience`}>
                    <FontAwesomeIcon icon={faBriefcase} className="sidebar-icon" />
                    WorkExp
                  </Link>
                </li>
                <li>
                  <Link to={`/employee/${id}/leave-application-emp`}>
                    <FontAwesomeIcon icon={faFileAlt} className="sidebar-icon" />
                    Leave Application
                  </Link>
                </li>
              </ul>
            </div>

            <div id="main-area">
              <div id="sidebar-top-content" />
              <Routes>
                <Route
                  index
                  element={<Navigate to={`/employee/${id}/personal-info`} replace />}
                />
                <Route
                  path=":id/personal-info"
                  element={<PersonalInfo data={this.props.data} back={false} />}
                />
                <Route
                  path=":id/education"
                  element={<Education data={this.props.data} back={false} />}
                />
                <Route
                  path=":id/family-info"
                  element={<FamilyInfo data={this.props.data} back={false} />}
                />
                <Route
                  path=":id/work-experience"
                  element={<WorkExperience data={this.props.data} back={false} />}
                />
                <Route
                  path=":id/leave-application-emp"
                  element={<LeaveApplicationEmp data={this.props.data} />}
                />
                <Route path="*" element={<NotFound404 />} />
              </Routes>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default DashboardEmployee;
