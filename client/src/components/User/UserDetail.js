import React from "react";

import "../../styles/settings.scss";

const UserDetail = ({ userDetail }) => {
  if (userDetail)
    return (
      <div className='settings-user-details'>
        <table className='settings-user-detail-table'>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{userDetail.name.toUpperCase()}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>
                <input
                  className='table-input'
                  type='email'
                  value={userDetail.email}
                  disabled
                />
                <img
                  className='settings-user-detail-table__edit'
                  src='https://img.icons8.com/plasticine/50/000000/pencil.png'
                  alt='edit'
                />
              </td>
            </tr>
            <tr>
              <td>Phone Number</td>
              <td>
                <input
                  className='table-input'
                  type='text'
                  value={userDetail.phoneNumber}
                  disabled
                />
                <img
                  className='settings-user-detail-table__edit'
                  src='https://img.icons8.com/plasticine/50/000000/pencil.png'
                  alt='edit'
                />
              </td>
            </tr>
            <tr>
              <td>Password</td>
              <td>
                <input
                  className='table-input'
                  type='password'
                  value='**************'
                  disabled
                />
                <img
                  className='settings-user-detail-table__edit'
                  src='https://img.icons8.com/plasticine/50/000000/pencil.png'
                  alt='edit'
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );

  return <></>;
};

export default UserDetail;
