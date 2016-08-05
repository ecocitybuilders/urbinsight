import React, { PropTypes } from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import EnergyDemandJunctions from './DemandJunctions'

type Props = {
  nextSection: PropTypes.func.isRequired,
  prevSection: Proptypes.func,
  saveValues: PropTypes.func

}
