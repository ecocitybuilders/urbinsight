import React, { PropTypes } from 'react'
import c3 from 'c3'
import Playground from 'static/images/playground.jpg'

let exampleData = {
  bindto: '#socioeconomic-chart-',
  data: {
    columns: [
        ['data1', 300, 350, 300, 0, 0, 120],
        ['data2', 130, 100, 140, 200, 150, 50]
    ],
    types: {
      data1: 'area-spline',
      data2: 'area-spline'
        // 'line', 'spline', 'step', 'area', 'area-step' are also available to stack
    },
    groups: [['data1', 'data2']]
  }
}

class DashboardSocioeconomicPane extends React.Component {
  static propTypes = {
    indicator: PropTypes.string.isRequired
  };
  componentDidMount () {
    exampleData.size = {width: (screen.width / 2.05)}
    exampleData.bindto = '#socioeconomic-chart-' + this.props.indicator
    // When done as exampleData.bindto += this.props.resource it becomes additive!?!? What?
    c3.generate(exampleData)
  }
  render () {
    const mountId = 'socioeconomic-chart-' + this.props.indicator
    return (
      <div>
        <div className='dashboard-pane'>
          <div className='socioeconomic-chart-container' id={mountId}>
          {/* I'm A Graphic based on water consumption and availability*/}
          </div>
        </div>
        <div id='archetype-library'>
          <h3>Demographics Datasets (To be inherited) {this.props.indicator}</h3>
          <h4>
            Browse through 62 key quality of life indicators for
            180 individual measures across 10 domain areas. (To be inherited)
          </h4>
          <select id='archetype-selection'>
            <option>Hello</option>
            <option>World</option>
          </select>
          <div id='archetype-holder'>
            <div id='archetype-image-holder'><img id='archetype-image' src={Playground}></img></div>
            <div id='archetype-text-holder'>
              <h5>
              Feeling safe and secure in our homes, communities and
              urban areas is a basic human right. Feeling and being
              safe is a key to overall health in the community. Safety
              and perceptions of safety feature highly in peoples, view
              of the living environment, their sense of well being and
              quality of life. As urban areas grow, the need for safe
              social and physical environments, where people are able
              to participate fully in their communities, becomes an
              increasing challenge.
              </h5>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DashboardSocioeconomicPane
