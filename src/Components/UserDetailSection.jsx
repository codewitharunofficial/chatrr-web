import React from 'react'

const UserDetailSection = ({field, value}) => {
  return (
    <div
    className="user-profile"
          style={{
            minWidth: "60%",
            width: "auto",
            height: "auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            paddingTop: 10,
            gap: 20,
            justifyContent: "center",
            alignSelf: 'center',
            paddingInline: 10,
            borderBottom: "1px solid gray",
            ":hover": {backgroundColor: "white"}
          }}
        >
          <label htmlFor={field} >{field}: </label>
          <h6>{value}</h6>
        </div>
  )
}

export default UserDetailSection
