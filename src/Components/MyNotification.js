import React from 'react'

const MyNotification = () => {
    return(
      <div style={{
        display: 'flex',
        backgroundColor: 'green',
        borderRadius: 5,
        height: '200px',
        width: '300px'
      }}>
        <h3>Limited Time Offer!</h3>
        <p>Free Geo Metro with every purchase!!</p>
        <img src='https://s.hdnux.com/photos/01/00/22/34/16852741/7/920x920.jpg' 
                alt="Matt and his Metro" 
                width='200'/>
      </div>
    )
  }

  export default MyNotification