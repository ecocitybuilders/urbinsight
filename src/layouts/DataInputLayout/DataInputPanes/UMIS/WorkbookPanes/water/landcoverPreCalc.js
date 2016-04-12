import React from 'react';
import { Button } from 'react-bootstrap'
import { Input } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

class LandcoverPreCalc extends React.Component {
  constructor(){
    super();
  }
  render(){
    let surfaceTypes = [
      {
        stateName: "turfGreen",
        label: "Turf (Green)"
      },
      {
        stateName: "perennialGrassesAndShrubs",
        label: "Perennial Grasses and Shrubs"
      },
      {
        stateName: "treeCanopyOverVegetatedGround",
        label: "Tree Canopy Over Vegetated Ground"
      },
      {
        stateName: "treeCanopyOverSealedSurfaces",
        label: "Tree Canopy Over Sealed Surfaces"
      },
      {
        stateName: "wetOrDryPondsAndInfiltrationTrenches",
        label: "Wet or Dry Ponds and Infiltration Trenches"
      },
      {
        stateName: "vegetatedRoof",
        label: "Vegetated Roofs"
      },
      {
        stateName: "mainRoof",
        label: "Main Roof"
      },
      {
        stateName: "secondaryRoof",
        label: "Secondary Roof"
      },
      {
        stateName: "openDecking",
        label: "Open Decking"
      },
      {
        stateName: "sealedDecking",
        label: "Sealed Decking"
      },
      {
        stateName: "Gravel",
        label: "gravel"
      },
      {
        stateName: "bareEarth",
        label: "Bare Eartch"
      },
      {
        stateName: "sealedPavement",
        label: "Sealed Pavement"
      },
      {
        stateName: "paversAndBricks",
        label: "Pavers and Bricks"
      },
      {
        stateName: "permeableAsphalt",
        label: "Permeable Asphalt"
      },
    ]
    let stateString = "parcel.workbooks.water.estimateDemand.landCoverPreCalculation.surfaceTypes."
    let listItems = surfaceTypes.map(function(surfaceType, key){
      return <Input key={key} label={surfaceType.label} type="checkbox" model={stateString + surfaceType.stateName} />
    });
    let listValues = surfaceTypes.map(function(surfaceType, key){
      return <Input key={key} label={surfaceType.label} type="number" model={stateString + surfaceType.stateName + '.portionOfParcel'} />
    });
    return(
      <div>
        <div>
          <h4>Land Cover Pre Calculation</h4>
          {/*ng-model="parcel.workbooks.water.estimateDemand.landCoverPreCalculation.percentageOfParcelWithRainwaterCatchment"*/}
          <Input label="Percenage of parcel with Rainwater Catchment:" type="number" />

          <h5>Surface Types</h5>

          <h6>Select the types that are present on the parcel.</h6>
          {listItems}
        </div>
        <div>
          <h5>Portion of Parcel</h5>
          <h6>Enter percent of parcel that comprises each type. All values are in decimals and less than 1</h6>
          {listValues}
        </div>
      </div>
    )
  }
}



export default LandcoverPreCalc
