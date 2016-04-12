import React from 'react';
import { Button } from 'react-bootstrap'
import { Input } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

class MaterialsOptionC extends React.Component {
  constructor(){
    super();
  }
  render(){
    return(
    <div ng-show="optionSelected === 'C'">
      <h3>Option C:</h3>
      <h4>Enter weight by category</h4>
      <table>
        <tbody>
        <tr>
          <td><label htmlFor="paperTotalWeight">Paper</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionC.demandJunctions.paper.totalWeight" id="paperTotalWeight" /></td>
        </tr>
        <tr>
          <td><label htmlFor="organicTotalWeight">Organics</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionC.demandJunctions.organics.totalWeight.amount" id="organicTotalWeight" /></td>
        </tr>
        <tr>
          <td><label htmlFor="plasticsTotalWeight">Plastics</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionC.demandJunctions.plastics.totalWeight.amount" id="plasticsTotalWeight" /></td>
        </tr>
        <tr>
          <td><label htmlFor="textilesTotalWeight">Textiles</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionC.demandJunctions.textiles.totalWeight.amount" id="textilesTotalWeight:" /></td>
        </tr>
        <tr>
          <td><label htmlFor="metalTotalWeight">Metals</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionC.demandJunctions.metals.totalWeight.amount" id="metalTotalWeight" /></td>
        </tr>
        <tr>
          <td><label htmlFor="glassTotalWeight">Glass</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionC.demandJunctions.glass.totalWeight.amount" id="glassTotalWeight" /></td>
        </tr>
        <tr>
          <td><label htmlFor="trimmingsTotalWeight">Trimmings</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionC.demandJunctions.trimmings.totalWeight.amount" id="trimmingsTotalWeight" /></td>
        </tr>
        <tr>
          <td><label htmlFor="appliancesTotalWeight">Appliances</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionC.demandJunctions.appliances.totalWeight.amount" id="appliancesTotalWeight" /></td>
        </tr>
        <tr>
          <td><label htmlFor="hazardousTotalWeight">Hazardous Waste</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionC.demandJunctions.harzardousWaste.totalWeight.amount" id="hazardousTotalWeight" /></td>
        </tr>
        <tr>
          <td><label htmlFor="inertTotalWeight">Inert and Others</label></td>
          <td><input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionC.demandJunctions.inerts.totalWeight.amount" id="inertTotalWeight" /></td>
        </tr>
        </tbody>
      </table>
    </div>
  )
  }
}

export default MaterialsOptionC
