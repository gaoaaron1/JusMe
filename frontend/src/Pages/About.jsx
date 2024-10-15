import React from 'react'
import Sidebar from '../UI/Sidebar/Sidebar'

const About = () => {
    return (
      <div style={{ display: 'flex' }}>
        {/* Sidebar Component */}
        <Sidebar />
        
        {/* Main Content */}
        <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
          <h1>About Us Page</h1>
          <p>
            Welcome to the About Us page. Here we share our story, mission, and vision.
          </p>
        </div>
      </div>
    );
  };
  
  export default About;