import React from 'react'
import { Input } from 'react-bootstrap'

class LandcoverPreCalc extends React.Component {
  constructor () {
    super()
    this.state = {
      turfGreen: false,
      perennialGrassesAndShrubs: false,
      treeCanopyOverVegetatedGround: false,
      treeCanopyOverSealedSurfaces: false,
      wetOrDryPondsAndInfiltrationTrenches: false,
      vegetatedRoof: false,
      mainRoof: false,
      secondaryRoof: false,
      openDecking: false,
      sealedDecking: false,
      gravel: false,
      bareEarth: false,
      sealedPavement: false,
      paversAndBricks: false,
      permeableAsphalt: false
    }
  }
  changeHandler (stateName) {
    this.setState({[stateName]: !this.state[stateName]})
  }
  render () {
    let surfaceTypes = [
      {
        stateName: 'turfGreen',
        label: 'Turf (Green)'
      },
      {
        stateName: 'perennialGrassesAndShrubs',
        label: 'Perennial Grasses and Shrubs'
      },
      {
        stateName: 'treeCanopyOverVegetatedGround',
        label: 'Tree Canopy Over Vegetated Ground'
      },
      {
        stateName: 'treeCanopyOverSealedSurfaces',
        label: 'Tree Canopy Over Sealed Surfaces'
      },
      {
        stateName: 'wetOrDryPondsAndInfiltrationTrenches',
        label: 'Wet or Dry Ponds and Infiltration Trenches'
      },
      {
        stateName: 'vegetatedRoof',
        label: 'Vegetated Roofs'
      },
      {
        stateName: 'mainRoof',
        label: 'Main Roof'
      },
      {
        stateName: 'secondaryRoof',
        label: 'Secondary Roof'
      },
      {
        stateName: 'openDecking',
        label: 'Open Decking'
      },
      {
        stateName: 'sealedDecking',
        label: 'Sealed Decking'
      },
      {
        stateName: 'gravel',
        label: 'Gravel'
      },
      {
        stateName: 'bareEarth',
        label: 'Bare Earth'
      },
      {
        stateName: 'sealedPavement',
        label: 'Sealed Pavement'
      },
      {
        stateName: 'paversAndBricks',
        label: 'Pavers and Bricks'
      },
      {
        stateName: 'permeableAsphalt',
        label: 'Permeable Asphalt'
      }
    ]
    let listItems = surfaceTypes.map(function (surfaceType, key) {
      return <Input key={key} label={surfaceType.label} type='checkbox'
        onChange={() => this.changeHandler(surfaceType.stateName)}/>
    }.bind(this))
    let listValues = surfaceTypes.map(function (surfaceType, key) {
      return (this.state[surfaceType.stateName]
        ? <Input key={key} label={surfaceType.label} type='number' ref={surfaceType.stateName} /> : null)
    }.bind(this))
    return (
      <div>
        <div>
          <h4>Land Cover Pre Calculation</h4>
          <Input label='Percentage of parcel with Rainwater Catchment:' type='number' />
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
