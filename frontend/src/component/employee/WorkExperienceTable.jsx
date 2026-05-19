import React, { Component } from "react";
import "./PersonalInfoTable.css"; // Using shared profile card CSS
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
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

class WorkExperienceTable extends Component {
  state = {
    workExperienceData: [],
    loading: true,
    rowData: []
  };

  workExperienceObj = [];
  rowDataT = [];

  loadWorkExperienceData = () => {
    axios
      .get("http://localhost:4000/api/work-experience/" + this.props.data["_id"], {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(response => {
        this.workExperienceObj = response.data;
        this.setState({ workExperienceData: response.data, loading: false });
        this.rowDataT = [];
        
        this.workExperienceObj.workExperience.map(data => {
          let temp = {
            data,
            CompanyName: data["CompanyName"],
            Designation: data["Designation"],
            FromDate: data["FromDate"].slice(0, 10),
            ToDate: data["ToDate"].slice(0, 10)
          };
          this.rowDataT.push(temp);
        });
        this.setState({ rowData: this.rowDataT });
      })
      .catch(error => {
        console.log(error);
      });
  };

  onWorkExperienceDelete = (e1, e2) => {
    if (window.confirm("Are you sure to delete this record? ") == true) {
      axios
        .delete("http://localhost:4000/api/work-experience/" + e1 + "/" + e2, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(res => {
          this.componentDidMount();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  componentDidMount() {
    this.loadWorkExperienceData();
  }

  renderProfileCard = (row, index) => {
    return (
      <div key={index} className="profile-card glass-panel">
        <div className="profile-header">
          <h3>{row.Designation} <span style={{ fontSize: '14px', color: 'var(--text-muted)', marginLeft: '10px' }}>at {row.CompanyName}</span></h3>
          {!this.props.back && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button 
                variant="primary" 
                className="edit-profile-btn"
                onClick={() => this.props.onEditWorkExperience(row.data)}
              >
                <FontAwesomeIcon icon={faEdit} /> Edit
              </Button>
              <Button 
                variant="danger" 
                className="edit-profile-btn"
                style={{ background: 'linear-gradient(135deg, var(--danger-color) 0%, #dc2626 100%)' }}
                onClick={() => this.onWorkExperienceDelete(this.props.data["_id"], row.data["_id"])}
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </Button>
            </div>
          )}
        </div>
        
        <div className="profile-grid">
          <div className="profile-item full-width">
            <label>Company Name</label>
            <p>{row.CompanyName}</p>
          </div>
          <div className="profile-item">
            <label>Designation</label>
            <p>{row.Designation}</p>
          </div>
          <div className="profile-item">
            <label>From Date</label>
            <p>{row.FromDate}</p>
          </div>
          <div className="profile-item">
            <label>To Date</label>
            <p>{row.ToDate}</p>
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
            Employee Work Experience Details {this.props.back ? "of " + this.props.data["FirstName"] + " " + this.props.data["LastName"] : ""}
          </h2>

          {this.props.back ? (
            <Link to="/hr/employee">
              <Button variant="secondary" id="back-button" className="glass-button">
                <FontAwesomeIcon icon={faArrowLeft} /> Back
              </Button>
            </Link>
          ) : (
            <Button
              variant="primary"
              id="add-button"
              onClick={this.props.onAddWorkExperience}
            >
              <FontAwesomeIcon icon={faPlus} id="plus-icon" /> Add Experience
            </Button>
          )}
        </div>

        <div id="clear-both" />

        {!this.state.loading ? (
          <div className="profile-container">
            {this.state.rowData.length > 0 ? (
              this.state.rowData.map((row, index) => this.renderProfileCard(row, index))
            ) : (
              <div className="no-data-panel glass-panel">
                <p>No Work Experience details available.</p>
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

export default WorkExperienceTable;
