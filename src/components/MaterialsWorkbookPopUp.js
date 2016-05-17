import { Button } from 'react-bootstrap'
import React, { PropTypes } from 'react'

const MaterialsWorkbookPopUp = (props) => <div>
  <h3>Materials</h3>
  <h4><strong>Paper: </strong>{props.totalDemand.materials.Paper}</h4>
  <h4><strong>Organics: </strong>{props.totalDemand.materials.Organics}</h4>
  <h4><strong>Plastics: </strong>{props.totalDemand.materials.Plastics}</h4>
  <h4><strong>Textiles: </strong>{props.totalDemand.materials.Textiles}</h4>
  <h4><strong>Metals: </strong>{props.totalDemand.materials.Metals}</h4>
  <h4><strong>Glass: </strong>{props.totalDemand.materials.Glass}</h4>
  <h4><strong>Trimmings: </strong>{props.totalDemand.materials.Trimmings}</h4>
  <h4><strong>Appliances: </strong>{props.totalDemand.materials.paper}</h4>
  <h4><strong>Hazardous Waste: </strong>{props.totalDemand.materials['Hazardous Waste']}</h4>
  <h4><strong>Inerts and Others: </strong>{props.totalDemand.materials['Inerts and Others']}</h4>
  <Button block bsStyle='info' onClick={props.previousStep}>
    <span className='glyphicon glyphicon-circle-arrow-left'></span> Previous Resource
  </Button>
</div>

MaterialsWorkbookPopUp.propTypes = {
  totalDemand: PropTypes.object,
  previousStep: PropTypes.func
}

export default MaterialsWorkbookPopUp
