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

class EducationTable extends Component {
  state = {
    educationData: [],
    loading: true,
    rowData: []
  };

  educationObj = [];
  rowDataT = [];

  loadEducationData = () => {
    axios
      .get("http://localhost:4000/api/education/" + this.props.data["_id"], {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(response => {
        this.educationObj = response.data;
        this.setState({ educationData: response.data, loading: false });
        this.rowDataT = [];
        
        this.educationObj.education.map(data => {
          let temp = {
            data,
            SchoolUniversity: data["SchoolUniversity"],
            Degree: data["Degree"],
            Grade: data["Grade"],
            PassingOfYear: data["PassingOfYear"]
          };
          this.rowDataT.push(temp);
        });
        this.setState({ rowData: this.rowDataT });
      })
      .catch(error => {
        console.log(error);
      });
  };

  onEducationDelete = (e1, e2) => {
    if (window.confirm("Are you sure to delete this record? ") == true) {
      axios
        .delete("http://localhost:4000/api/education/" + e1 + "/" + e2, {
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
    this.loadEducationData();
  }

  renderProfileCard = (row, index) => {
    return (
      <div key={index} className="profile-card glass-panel">
        <div className="profile-header">
          <h3>{row.Degree}</h3>
          {!this.props.back && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button 
                variant="primary" 
                className="edit-profile-btn"
                onClick={() => this.props.onEditEducation(row.data)}
              >
                <FontAwesomeIcon icon={faEdit} /> Edit
              </Button>
              <Button 
                variant="danger" 
                className="edit-profile-btn"
                style={{ background: 'linear-gradient(135deg, var(--danger-color) 0%, #dc2626 100%)' }}
                onClick={() => this.onEducationDelete(this.props.data["_id"], row.data["_id"])}
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </Button>
            </div>
          )}
        </div>
        
        <div className="profile-grid">
          <div className="profile-item full-width">
            <label>School / University</label>
            <p>{row.SchoolUniversity}</p>
          </div>
          <div className="profile-item">
            <label>Degree</label>
            <p>{row.Degree}</p>
          </div>
          <div className="profile-item">
            <label>Grade</label>
            <p>{row.Grade}</p>
          </div>
          <div className="profile-item">
            <label>Passing Year</label>
            <p>{row.PassingOfYear}</p>
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
            Employee Education Details {this.props.back ? "of " + this.props.data["FirstName"] + " " + this.props.data["LastName"] : ""}
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
              onClick={this.props.onAddEducation}
            >
              <FontAwesomeIcon icon={faPlus} id="plus-icon" /> Add Education
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
                <p>No Education details available.</p>
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

export default EducationTable;
