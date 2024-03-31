import React from 'react'

const UserEditField = ({field, defaultValue}) => {
  return (
          <input placeholder={`Enter Your ${field}`} type={field} defaultValue={defaultValue} autoFocus style={{width: "60%",
            height: 25,
            border: "1px solid black",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 10,
            gap: 10,
            alignSelf: 'center',
            backgroundColor: 'lightgreen'}} />

  )
}

export default UserEditField
