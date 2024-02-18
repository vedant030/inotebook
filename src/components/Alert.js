import React from 'react'

function Alert(props) {
  const Capitalize = (msg) => {
    let str = msg.toLowerCase()
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return (
    <div>
      {props.alert && (
        <div
          className={`alert alert-${props.alert.type} alert-dismissible fade show`}
          role="alert"
        >
          <strong>{Capitalize(props.alert.type)}</strong>: {props.alert.msg}.
        </div>
      )}
    </div>
  )
}

export default Alert
