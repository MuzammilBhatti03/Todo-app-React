import React from 'react'

const Info = (info) => {
  return (
    <div>Info
      <img src='info.image'></img>
      <br></br>
      {info.name}
      <br></br>
      {info.email}
    </div>
  )
}

export default Info