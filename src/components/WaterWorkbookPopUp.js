import { Button } from 'react-bootstrap'
import React, { PropTypes } from 'react'

const WaterWorkbookPopUp = (props) => <div>
  <h3>Water</h3>
  <h4><strong>Toilets: </strong>{props.totalDemand.water.Toilet}</h4>
  <h4><strong>Hygiene: </strong>{props.totalDemand.water.Hygiene}</h4>
  <h4><strong>Kitchen: </strong>{props.totalDemand.water.Kitchen}</h4>
  <h4><strong>Laundry: </strong>{(props.totalDemand.water.Laundry).toFixed(4)}</h4>
  <h4><strong>Drinking: </strong>{props.totalDemand.water.Drinking}</h4>
  <h4><strong>Surface Cleaning: </strong>{(props.totalDemand.water['Surface Cleaning'])}</h4>
  <h4><strong>Evaporative Cooling: </strong>{(props.totalDemand.water['Evaporative Cooling'])}</h4>
  <h4><strong>Water Customers: </strong>{(props.totalDemand.water['Water Customers'])}</h4>
  <Button block bsStyle='info' onClick={props.nextStep}>
    Next Resource <span className='glyphicon glyphicon-circle-arrow-right'></span>
  </Button>
</div>

WaterWorkbookPopUp.propTypes = {
  totalDemand: PropTypes.object,
  nextStep: PropTypes.func
}

export default WaterWorkbookPopUp
