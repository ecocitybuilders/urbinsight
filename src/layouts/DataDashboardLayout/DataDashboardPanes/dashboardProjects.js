import React from 'react'
import { Col } from 'react-bootstrap'

class DashboardProjects extends React.Component {
  render () {
    let projects = [
      {
        name: 'Project 1',
        description: 'This is an example project',
        dateStarted: '07/04/2016',
        image: 'http://greengopost.com/wp-content/uploads/2012/08/cadillac-urban-gardens-3-512x320.png'
      },
      {
        name: 'Project 2',
        description: 'This is another example project',
        dateStarted: '08/04/2016',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQffEVmrcmV5xaMFvZyYWgse8uUw1Y-HjGHItpiTyiSWX8cA68U6A'
      },
      {
        name: 'Project 3',
        description: 'This is a final example project',
        dateStarted: '09/04/2016',
        image: 'http://www.pps.org/images/stories/Rippowam1.jpg'
      }
    ]
    let projectList = projects.map(function (project, index) {
      return (
        <div key={index}>
          <Col md={3}>
            <img style={{width: '100%'}} src={project.image} />
          </Col>
          <Col md={9}>
            <h3>{project.name}</h3>
            <h5><em>{project.dateStarted}</em></h5>
            <h6>{project.description}</h6>
          </Col>
        </div>
      )
    })
    return (
      <div>
        {projectList}
      </div>
    )
  }
}

export default DashboardProjects
