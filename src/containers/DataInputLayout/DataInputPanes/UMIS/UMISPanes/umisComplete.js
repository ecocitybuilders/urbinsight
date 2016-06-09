import React, { PropTypes } from 'react'
import { Button, Well } from 'react-bootstrap'

type Props = {
  formReset: PropTypes.func,
  map: PropTypes.object,
  cityTag: PropTypes.string
}
class UmisComplete extends React.Component {
  props: Props;
  render () {
    return (
      <div className='umis-data'>
        <h2 className='umis-data-title'>Congratulations!</h2>
        <Well>
          You've successfully submitted a parcel audit.
          Next steps can be to compare this data to other parcel audits that have been created.
          Additionally, you can view the visualization dashboard to see the aggregated data of an area.
        </Well>
        <br/>
        <br/>
        <br/>
        <br/>
        <Button bsStyle='success' onClick={this.props.formReset} block>
          {/* <span className='glyphicon glyphicon-circle-arrow-left'></span> Return to Beginning*/}
          Submit Another Audit
        </Button>
      </div>
    )
  }
  componentDidMount () {
    this.props.map.setFilter('lots-hover', ['==', this.props.cityTag, ''])
    this.props.map.removeLayer('point')
  }
}

export default UmisComplete
