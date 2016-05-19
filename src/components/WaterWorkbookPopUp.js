import { Button } from 'react-bootstrap'
import React, { PropTypes } from 'react'
// import c3 from 'c3'
//
// let chartData
//
// class WaterWorkbookPopUp extends React.Component {
//   render () {
//     let totalDemand = this.props.totalDemand.water
    // let dataArray = []
    // for (var key in totalDemand) {
    //   if (totalDemand.hasOwnProperty(key)) {
    //     dataArray.push([key, totalDemand[key]])
    //   }
    // }
//     console.log(dataArray)
    // chartData = {
    //   bindto: '#waterPopUpChart',
    //   data: {
    //     columns: dataArray
    //   },
    //   size: {
    //     width: 200,
    //     height: 200
    //   }
    // }
//     return (
//       <div>
//         <h3>Water</h3>
//         <div id='waterPopUpChart'></div>
//         <h4><strong>Toilets: </strong>{this.props.totalDemand.water.Toilets}</h4>
//         <h4><strong>Hygiene: </strong>{this.props.totalDemand.water.Hygiene}</h4>
//         <h4><strong>Kitchen: </strong>{this.props.totalDemand.water.Kitchen}</h4>
//         <h4><strong>Laundry: </strong>{(this.props.totalDemand.water.Laundry).toFixed(4)}</h4>
//         <h4><strong>Drinking: </strong>{this.props.totalDemand.water.Drinking}</h4>
//         <h4><strong>Surface Cleaning: </strong>{(this.props.totalDemand.water['Surface Cleaning'])}</h4>
//         <h4><strong>Evaporative Cooling: </strong>{(this.props.totalDemand.water['Evaporative Cooling'])}</h4>
//         <h4><strong>Water Customers: </strong>{(this.props.totalDemand.water['Water Customers'])}</h4>
//         <Button block bsStyle='info' onClick={this.props.nextStep}>
//           Next Resource <span className='glyphicon glyphicon-circle-arrow-right'></span>
//         </Button>
//       </div>
//     )
//   }
//   componentDidMount () {
//     console.log('i got called')
//     c3.generate(chartData)
//   }
// }
const WaterWorkbookPopUp = (props) => <div>
  <h3>Water</h3>
  <h4><strong>Toilets: </strong>{(props.totalDemand.water.Toilets)}</h4>
  <h4><strong>Hygiene: </strong>{(props.totalDemand.water.Hygiene).toFixed(4)}</h4>
  <h4><strong>Kitchen: </strong>{(props.totalDemand.water.Kitchen).toFixed(4)}</h4>
  <h4><strong>Laundry: </strong>{(props.totalDemand.water.Laundry).toFixed(4)}</h4>
  <h4><strong>Drinking: </strong>{(props.totalDemand.water.Drinking).toFixed(4)}</h4>
  <h4><strong>Surface Cleaning: </strong>{(props.totalDemand.water['Surface Cleaning']).toFixed(4)}</h4>
  <h4><strong>Evaporative Cooling: </strong>{(props.totalDemand.water['Evaporative Cooling']).toFixed(4)}</h4>
  <h4><strong>Water Customers: </strong>{(props.totalDemand.water['Water Customers']).toFixed(4)}</h4>
  <Button block bsStyle='info' onClick={props.nextStep}>
    Next Resource <span className='glyphicon glyphicon-circle-arrow-right'></span>
  </Button>
</div>

WaterWorkbookPopUp.propTypes = {
  totalDemand: PropTypes.object,
  nextStep: PropTypes.func
}

export default WaterWorkbookPopUp
