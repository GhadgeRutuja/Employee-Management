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

class FamilyInfoTable extends Component {
  state = {
    familyInfoData: [],
    loading: true,
    rowData: []
  };

  familyInfoObj = [];
  rowDataT = [];

  loadFamilyInfoData = () => {
    axios
      .get("http://localhost:4000/api/family-info/" + this.props.data["_id"], {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then(response => {
        this.familyInfoObj = response.data;
        this.setState({ familyInfoData: response.data, loading: false });
        this.rowDataT = [];
        
        this.familyInfoObj.familyInfo.map(data => {
          let temp = {
            data,
            Name: data["Name"],
            Relationship: data["Relationship"],
            DOB: data["DOB"].slice(0, 10),
            Occupation: data["Occupation"]
          };
          this.rowDataT.push(temp);
        });
        this.setState({ rowData: this.rowDataT });
      })
      .catch(error => {
        console.log(error);
      });
  };

  onFamilyInfoDelete = (e1, e2) => {
    if (window.confirm("Are you sure to delete this record? ") == true) {
      axios
        .delete("http://localhost:4000/api/family-info/" + e1 + "/" + e2, {
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
    this.loadFamilyInfoData();
  }

  renderProfileCard = (row, index) => {
    return (
      <div key={index} className="profile-card glass-panel">
        <div className="profile-header">
          <h3>{row.Name} <span style={{ fontSize: '14px', color: 'var(--text-muted)', marginLeft: '10px' }}>({row.Relationship})</span></h3>
          {!this.props.back && (
            <div style={{ display: 'flex', gap: '10px' }}>
              <Button 
                variant="primary" 
                className="edit-profile-btn"
                onClick={() => this.props.onEditFamilyInfo(row.data)}
              >
                <FontAwesomeIcon icon={faEdit} /> Edit
              </Button>
              <Button 
                variant="danger" 
                className="edit-profile-btn"
                style={{ background: 'linear-gradient(135deg, var(--danger-color) 0%, #dc2626 100%)' }}
                onClick={() => this.onFamilyInfoDelete(this.props.data["_id"], row.data["_id"])}
              >
                <FontAwesomeIcon icon={faTrash} /> Delete
              </Button>
            </div>
          )}
        </div>
        
        <div className="profile-grid">
          <div className="profile-item">
            <label>Name</label>
            <p>{row.Name}</p>
          </div>
          <div className="profile-item">
            <label>Relationship</label>
            <p>{row.Relationship}</p>
          </div>
          <div className="profile-item">
            <label>Date of Birth</label>
            <p>{row.DOB}</p>
          </div>
          <div className="profile-item">
            <label>Occupation</label>
            <p>{row.Occupation}</p>
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
            Employee Dependent Details {this.props.back ? "of " + this.props.data["FirstName"] + " " + this.props.data["LastName"] : ""}
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
              onClick={this.props.onAddFamilyInfo}
            >
              <FontAwesomeIcon icon={faPlus} id="plus-icon" /> Add Dependent
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
                <p>No Dependent details available.</p>
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

export default FamilyInfoTable;
