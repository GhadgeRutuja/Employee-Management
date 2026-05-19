import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import Login from "./component/Login.jsx";
import Temp from "./component/Temp.jsx";
import NotFound404 from "./component/NotFound404.jsx";
import DashboardAdmin from "./component/admin/DashboardAdmin.jsx";
import DashboardHR from "./component/hr/DashboardHR.jsx";
import DashboardEmployee from "./component/employee/DashboardEmployee.jsx";

import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes
} from "react-router-dom";

class App extends Component {
  state = {
    data: {},
    loading: false,
    pass: true,
    isLogin: false,
    firstTimeAlert: true,
  };

  componentDidMount() {
    this.setState({
      data: {
        _id: localStorage.getItem("_id") || "",
        Account: localStorage.getItem("Account") || "",
        Name: localStorage.getItem("Name") || ""
      },
      isLogin: localStorage.getItem("isLogin") == "true"
    }, () => {
      this.alertFirstTime();
    });
  }

  alertFirstTime() {
    if (this.state.firstTimeAlert && !this.state.isLogin) {
      setTimeout(function () {
        window.alert(
          `To explore the feature of this application here is the temporary id and pass for all account
      Admin:
          id:admin@gmail.com
          pass:admin
      Hr:
          id:hr@gmail.com
          pass:hr
      Employee:
          id:emp@gmail.com
          pass:emp
      `);
      }, 500);
      this.setState({ firstTimeAlert: false });
    }
  }

  render() {
    return (
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Login route */}
          <Route
            path="/login"
            element={
              this.state.data["Account"] == 1 ? (
                <Navigate to="/admin" replace />
              ) : this.state.data["Account"] == 2 ? (
                <Navigate to="/hr" replace />
              ) : this.state.data["Account"] == 3 ? (
                <Navigate to={`/employee/${this.state.data["_id"]}/personal-info`} replace />
              ) : (
                <Login
                  onSubmit={this.handleSubmit}
                  loading={this.state.loading}
                  pass={this.state.pass}
                />
              )
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/*"
            element={
              this.state.data["Account"] == 1 ? (
                <DashboardAdmin
                  data={this.state.data}
                  onLogout={this.handleLogout}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/admin" element={<Navigate to="/admin/role" replace />} />

          {/* HR routes */}
          <Route
            path="/hr/*"
            element={
              this.state.data["Account"] == 2 ? (
                <DashboardHR
                  data={this.state.data}
                  onLogout={this.handleLogout}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="/hr" element={<Navigate to="/hr/employee" replace />} />

          {/* Employee routes */}
          <Route
            path="/employee/*"
            element={
              this.state.data["Account"] == 3 ? (
                <DashboardEmployee
                  data={this.state.data}
                  onLogout={this.handleLogout}
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/employee"
            element={
              this.state.data["Account"] == 3 && this.state.data["_id"] ? (
                <Navigate
                  to={`/employee/${this.state.data["_id"]}/personal-info`}
                  replace
                />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />

          {/* Default */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    );
  }

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ pass: true });
    this.setState({ loading: true });
    this.login(event.target[0].value, event.target[1].value);
    event.target.reset();
  };

  handleLogout = event => {
    console.log("logout");
    localStorage.clear();
    this.componentDidMount();
  };

  login = (id, pass) => {
    let bodyLogin = {
      email: id,
      password: pass
    };

    axios
      .post((process.env.REACT_APP_API_URL || "http://localhost:4000") + "/api/login", bodyLogin)
      .then(res => {
        console.log(jwtDecode(res.data));
        var decodedData = jwtDecode(res.data);
        localStorage.setItem("token", res.data);

        if (
          (res == undefined ||
            res == null ||
            decodedData.Account == undefined ||
            decodedData.Account == null) &&
          !(
            decodedData.Account == 1 ||
            decodedData.Account == 2 ||
            decodedData.Account == 3
          )
        ) {
          this.setState({ pass: false });
          this.setState({ loading: false });
        } else {
          if (decodedData.Account == 1) {
            this.setState({ pass: true, loading: false, isLogin: true });
            localStorage.setItem("isLogin", true);
            localStorage.setItem("Account", 1);
            localStorage.setItem("_id", decodedData["_id"]);
            localStorage.setItem("Name", decodedData["FirstName"] + " " + decodedData["LastName"]);
            this.componentDidMount();
            window.location.replace("/admin/role");
          }
          if (decodedData.Account == 2) {
            this.setState({ pass: true, loading: false, isLogin: true });
            localStorage.setItem("isLogin", true);
            localStorage.setItem("Account", 2);
            localStorage.setItem("_id", decodedData["_id"]);
            localStorage.setItem("Name", decodedData["FirstName"] + " " + decodedData["LastName"]);
            this.componentDidMount();
            window.location.replace("/hr/employee");
          }
          if (decodedData.Account == 3) {
            this.setState({ pass: true, loading: false, isLogin: true });
            localStorage.setItem("isLogin", true);
            localStorage.setItem("Account", 3);
            localStorage.setItem("_id", decodedData["_id"]);
            localStorage.setItem("Name", decodedData["FirstName"] + " " + decodedData["LastName"]);
            this.componentDidMount();
            window.location.replace("/employee/" + decodedData._id + "/personal-info");
          }
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ pass: false });
        this.setState({ loading: false });
      });
  };
}

export default App;