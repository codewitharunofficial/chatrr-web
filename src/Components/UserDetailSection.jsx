import React from 'react'

const UserDetailSection = ({field, value}) => {
  return (
    <div
          style={{
            width: "60%",
            height: 25,
            border: "1px solid black",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 10,
            borderRadius: 10,
            gap: 10,
            justifyContent: "center",
            alignSelf: 'center',
            backgroundColor: 'lightgreen',
          }}
        >
          <h6>{field}: </h6>
          <h6>{value}</h6>
        </div>
  )
}

export default UserDetailSection
