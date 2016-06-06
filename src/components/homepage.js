import React from 'react'
import { Carousel } from 'react-bootstrap'
import Slide1 from 'static/images/slide1.png'
import Slide2 from 'static/images/slide2.png'
import Slide3 from 'static/images/slide3.png'
import imbabareport2 from 'static/images/imbaba-report2.png'

class Homepage extends React.Component {
  componentDidMount () {
    $('#homepage-intro-text').typed({
      strings: ['Where Communites Locate Themselves', 'Visualizing Urban Metabolisms',
      'Defining and Measuring Neighborhood Ecologies'],
      backDelay: 2000,
      loop: true
    })
  }
// const Homepage = (props) =>
  render () {
    return (
      <div>
        <div id='homepage-heading'>
          <h2 id='homepage-intro-text'>Where Communites Locate Themselves</h2>
          <h1 id='homepage-intro-title'>Urbinsight</h1>
           {/*<img id='homepage-slideshow-image' src={Slide1} alt='...' />*/}
        </div>
        <Carousel style={{'zIndex': 2, 'marginTop': '25px'}}>
          <Carousel.Item>
            <img width={screen.width} className='homepage-slideshow-image' src={Slide1} alt='...' />
            {/*<Carousel.Caption>
              <h3>Where Communities Locate Themselves</h3>
            </Carousel.Caption>*/}
          </Carousel.Item>
          <Carousel.Item>
            <img width={screen.width} className='homepage-slideshow-image' src={Slide2} alt='...' />
            {/*<Carousel.Caption>
              <h3>Visualizing Urban Metabolism Systems</h3>
            </Carousel.Caption>*/}
          </Carousel.Item>
          <Carousel.Item>
            <img width={screen.width} className='homepage-slideshow-image' src={Slide3} alt='...' />
            {/*<Carousel.Caption>
              <h3>Defining and Measuring Neighborhood Ecologies</h3>
            </Carousel.Caption>*/}
          </Carousel.Item>
        </Carousel>
        <div className='intro-text-frame'>
          <h3 className='intro-text'>
            Creating informative and actionable datasets in one of the primary challenges of increasing urban resilience.
            {/* Our solution is a dynamic mapping platform that visualizes multiple data types and facilitates citizen engagement.
            Urbinsight is designed through a community oriented process which leverages residents' inherent spatial knowledge to create more robust knowledge systems.*/}
          </h3>
        </div>
        <div id='partner-process'>
          <h2 id='partner-process-text'>Partners + Process</h2>
        </div>
        <div>
          <div id='process-intro'>
            <img id='process-intro-image' src={imbabareport2} style={{'width': '100%'}} />
            {/* <h4 id='process-intro-text'>
              We are committed to a process of ground level engagement rooted in a participatory reasearch framework,
              creating the context for communities to articulate their own desires for community betterment. This invovles a multi-stage process centered around community input at each level of the spatial analysis.
              This allows the process to dynamically evolve and become more responsive over time.
            </h4>*/}
          </div>
        </div>
        <div >
          <div id='process-list-title'>
            <h3 id='process-list-title-text'>The urbinsight framework is defined by partnerships at multiple levels.</h3>
          </div>
          <div id='process-list'>
            <ul id='process-list-items'>
              <li><strong>Community:</strong> Our primary focus is to identify a <strong>C</strong>ommunity <strong>B</strong>ased <strong>O</strong>rganization who can lead and inform the community engagement process.</li>
              <li><strong>Institution:</strong> We look towards working with education institutions and partners to implement curriculum related to participatory research and geographic information systems.</li>
              <li><strong>Municipal:</strong> City level partners are instrumental in providing us with data and information to help guide and frame the ground level analysis which the communities contribute to.</li>
              <li><strong>Global:</strong> Our goal is to create cross city analysis to identify best practices globally that can empower citizens worldwide to create sustainable changes in their or urban context.</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Homepage
