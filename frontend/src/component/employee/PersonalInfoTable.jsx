import React, { Component } from "react";
import "./PersonalInfoTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

class PersonalInfoTable extends Component {
  state = {
    personalInfoData: [],
    loading: true,
    rowData: []
  };

  personalInfoObj = [];
  rowDataT = [];

  loadPersonalInfoData = () => {
    axios
      .get("http://localhost:4000/api/personal-info/" + this.props.data["_id"], {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(response => {
        this.personalInfoObj = response.data;
        this.setState({ personalInfoData: response.data, loading: false });
        this.rowDataT = [];
        
        let data = this.personalInfoObj;
        let temp = {
          data,
          FirstName: data["FirstName"] || "Not Available",
          MiddleName: data["MiddleName"] || "Not Available",
          LastName: data["LastName"] || "Not Available",
          Gender: data["Gender"] || "Not Available",
          ContactNo: data["ContactNo"] || "Not Available",
          Email: data["Email"] || "Not Available",
          PANcardNo: data["PANcardNo"] || "Not Available",
          DOB: data["DOB"] ? data["DOB"].slice(0, 10) : "Not Available",
          Hobbies: data["Hobbies"] || "Not Available",
          PresentAddress: data["PresentAddress"] || "Not Available",
        };

        this.rowDataT.push(temp);
        this.setState({ rowData: this.rowDataT });
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentDidMount() {
    this.loadPersonalInfoData();
  }

  renderProfileCard = (row, index) => {
    return (
      <div key={index} className="profile-card glass-panel">
        <div className="profile-header">
          <h3>
            {row.FirstName} {row.MiddleName !== "Not Available" ? row.MiddleName : ""} {row.LastName}
          </h3>
          {!this.props.back && (
            <Button 
              variant="primary" 
              className="edit-profile-btn"
              onClick={() => this.props.onEditPersonalInfo(row.data)}
            >
              <FontAwesomeIcon icon={faEdit} /> Edit Profile
            </Button>
          )}
        </div>
        
        <div className="profile-grid">
          <div className="profile-item">
            <label>First Name</label>
            <p>{row.FirstName}</p>
          </div>
          <div className="profile-item">
            <label>Middle Name</label>
            <p>{row.MiddleName}</p>
          </div>
          <div className="profile-item">
            <label>Last Name</label>
            <p>{row.LastName}</p>
          </div>
          <div className="profile-item">
            <label>Gender</label>
            <p>{row.Gender}</p>
          </div>
          <div className="profile-item">
            <label>Contact No</label>
            <p>{row.ContactNo}</p>
          </div>
          <div className="profile-item">
            <label>Email</label>
            <p>{row.Email}</p>
          </div>
          <div className="profile-item">
            <label>PAN Card No</label>
            <p>{row.PANcardNo}</p>
          </div>
          <div className="profile-item">
            <label>Date of Birth</label>
            <p>{row.DOB}</p>
          </div>
          <div className="profile-item full-width">
            <label>Hobbies</label>
            <p>{row.Hobbies}</p>
          </div>
          <div className="profile-item full-width">
            <label>Present Address</label>
            <p>{row.PresentAddress}</p>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return (
      <div id="table-outer-div-scroll">
        <div className="profile-page-header">
          <h2 id="role-title">
            Employee Personal Details {this.props.back ? "of " + this.props.data["FirstName"] + " " + this.props.data["LastName"] : ""}
          </h2>
          
          {this.props.back && (
            <Link to="/hr/employee">
              <Button variant="secondary" id="back-button" className="glass-button">
                <FontAwesomeIcon icon={faArrowLeft} /> Back
              </Button>
            </Link>
          )}
        </div>

        <div id="clear-both" />

        {!this.state.loading ? (
          <div className="profile-container">
            {this.state.rowData.length > 0 ? (
              this.state.rowData.map((row, index) => this.renderProfileCard(row, index))
            ) : (
              <div className="no-data-panel glass-panel">
                <p>No Personal Information Available.</p>
              </div>
            )}
          </div>
        ) : (
          <div id="loading-bar">
            <RingLoader
              css={override}
              size={50}
              color={"var(--primary-color)"}
              loading={true}
            />
          </div>
        )}
      </div>
    );
  }
}

export default PersonalInfoTable;
