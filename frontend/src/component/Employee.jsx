import React, { Component } from "react";
import "./Employee.css";
import axios from "axios";
import EmployeeTable from "./EmployeeTable.jsx";
import EmployeeForm from "./EmployeeForm.jsx";
import EmployeeFormEdit from "./EmployeeFormEdit.jsx";
import EmployeeInfo from "./EmployeeInfo.jsx";
import { Routes, Route } from "react-router-dom";
import PersonalInfo from "./employee/PersonalInfo.jsx";
import Education from "./employee/Education.jsx";
import FamilyInfo from "./employee/FamilyInfo.jsx";
import WorkExperience from "./employee/WorkExperience.jsx";






class Employee extends Component {
  state = {
    table: true,
    editForm: false,
    editData: {},
    addFormGender: "",
    editFormGender: "",
    EmpInfo: {},
    EmpInfoBool: false,

  };
  // redirectF=()=>{
  // //  if(this.state.EmpInfo==true){
  //   this.setState({EmpInfo:false})
  //   console.log("rrrrrrrrrrrrrrrrrrrrrrrrrrrr");
  //   return <Redirect to="hr/employee/info" />
  // //  }
  // }

  render() {
    // if (this.state.EmpInfo) {
    //   this.setState({EmpInfo:false});
    //   return <Redirect to="hr/employee/info" />
    // }

    return (
      <Routes>
        <Route
          index
          element={
            <React.Fragment>
              {this.state.table ? (
                this.state.editForm ? (
                  <EmployeeFormEdit
                    onEmployeeEditUpdate={this.handleEmployeeEditUpdate}
                    onFormEditClose={this.handleEditFormClose}
                    editData={this.state.editData}
                    onGenderChange={this.handleEditFormGenderChange}
                  />
                ) : (
                  !this.state.EmpInfoBool ? (
                    <EmployeeTable
                      onAddEmployee={this.handleAddEmployee}
                      onEditEmployee={this.handleEditEmployee}
                      onEmpInfo={this.handleEmpInfo}
                    />
                  ) : (
                    <EmployeeInfo data={this.state.EmpInfo} onBack={this.handleBack} />
                  )
                )
              ) : (
                <EmployeeForm
                  onEmployeeSubmit={this.handleEmployeeSubmit}
                  onFormClose={this.handleFormClose}
                  onGenderChange={this.handleAddFormGenderChange}
                />
              )}
            </React.Fragment>
          }
        />

        <Route
          path="info/personal-info"
          element={<PersonalInfo data={this.state.EmpInfo} back={true} />}
        />
        <Route
          path="info/education"
          element={<Education data={this.state.EmpInfo} back={true} />}
        />
        <Route
          path="info/family-info"
          element={<FamilyInfo data={this.state.EmpInfo} back={true} />}
        />
        <Route
          path="info/work-experience"
          element={<WorkExperience data={this.state.EmpInfo} back={true} />}
        />

      </Routes>
    );
  }
  handleEmpInfo = e => {
    console.log("info", e);
    // history.push("/hr/employee/form-edit");
    this.setState({ EmpInfo: e });
    this.setState({ EmpInfoBool: true })
  };
  handleBack = () => {
    console.log("back");
    this.setState({ EmpInfoBool: false })
  };
  handleEmployeeSubmit = event => {
    event.preventDefault();
    const formElements = event.target.elements;
    
    let body = {
      Email: formElements[0].value,
      Password: formElements[1].value,
      Account: formElements[2].value,
      RoleID: formElements[3].value,
      Gender: this.state.addFormGender,
      FirstName: formElements[4].value,
      MiddleName: formElements[5].value,
      LastName: formElements[6].value,
      DOB: formElements[7].value,
      ContactNo: formElements[8].value,
      EmployeeCode: formElements[9].value,
      DepartmentID: formElements[10].value,
      PositionID: formElements[11].value,
      DateOfJoining: formElements[12].value,
      TerminateDate: formElements[13].value,
    };
    
    console.log("Submitting employee:", body);
    axios
      .post(process.env.REACT_APP_API_URL + "/api/employee", body, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(res => {
        console.log("Employee created successfully:", res.data);
        this.setState({ table: false });
        this.setState({ table: true });
      })
      .catch(err => {
        console.log("Error creating employee:", err);
      });
  };
  handleAddEmployee = () => {
    console.log("clicked1");
    this.setState({ table: false });
  };
  handleEditEmployee = e => {
    console.log(e);
    console.log("clicked6");
    this.setState({ editForm: true });
    this.setState({ editData: e });
    this.setState({ editFormGender: e["Gender"] })
  };
  handleFormClose = () => {
    console.log("clicked1");
    this.setState({ table: true });
  };
  handleEditFormClose = () => {
    console.log("clicked5");
    this.setState({ editForm: false });
  };
  handleFormClose = () => {
    console.log("clicked1");
    this.setState({ table: true });
  };
  handleEmployeeEditUpdate = (info, newInfo) => {
    newInfo.preventDefault();
    const formElements = newInfo.target.elements;
    
    let body = {
      Email: formElements[0].value,
      Account: formElements[1].value,
      RoleID: formElements[2].value,
      Gender: this.state.editFormGender,
      FirstName: formElements[3].value,
      MiddleName: formElements[4].value,
      LastName: formElements[5].value,
      DOB: formElements[6].value,
      ContactNo: formElements[7].value,
      EmployeeCode: formElements[8].value,
      DepartmentID: formElements[9].value,
      PositionID: formElements[10].value,
      DateOfJoining: formElements[11].value,
      TerminateDate: formElements[12].value,
    };
    
    console.log("Updating employee:", body);
    axios
      .put(
        process.env.REACT_APP_API_URL + "/api/employee/" + info["_id"],
        body, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      }
      )
      .then(res => {
        console.log("Employee updated successfully:", res.data);
        this.setState({ table: false });
        this.setState({ table: true });
      })
      .catch(err => {
        console.log("Error updating employee:", err);
      });

    this.setState({ editForm: false });
  };
  handleAddFormGenderChange = (e) => {
    // console.log(e.currentTarget.value);
    this.setState({
      addFormGender: e.currentTarget.value
    });

  };
  handleEditFormGenderChange = (e) => {
    // console.log(e.currentTarget.value);
    // console.log("ggggggggggggggggggggggggggggeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeennnnnnnnnnnnnnnnnnnnnnnnn")
    this.setState({
      editFormGender: e.currentTarget.value
    });

  };
}

export default Employee;

