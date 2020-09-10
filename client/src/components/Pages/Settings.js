import React from "react";
import { connect } from "react-redux";

import { loadUser } from "../../actions";

import "../../styles/settings.scss";

const Settings = ({ loadUser }) => {
  const handleManageData = () => {
    loadUser();
  };

  return (
    <div className='settings-container'>
      <h1>Manage your Lexa Settings</h1>
      <p>
        Manage your info, privacy and security to make Lexa work better for you
      </p>
      <hr style={{ width: "80%" }} />
      <div className='settings-container__options'>
        <div className='settings-container__personal-info settings-container_box'>
          <h3>Personal info</h3>
          <p>Manage your personal info.</p>
          <button className='settings-container_btn' onClick={handleManageData}>
            Manage your data
          </button>
        </div>
        <div className='settings-container__payments settings-container_box'>
          <h3>Payments</h3>
          <p>Manage your payment info.</p>
          <button className='settings-container_btn'>
            Manage your Payments
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(loadUser()),
});

export default connect(null, mapDispatchToProps)(Settings);
