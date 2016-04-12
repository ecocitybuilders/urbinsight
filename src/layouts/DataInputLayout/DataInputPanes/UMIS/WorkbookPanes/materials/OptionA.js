import React from 'react';
import { Button } from 'react-bootstrap'
import { Input } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

class MaterialsOptionA extends React.Component {
  constructor(){
    super();
  }
  render(){
    let materials = [
      {
        name: "paper",
        label: "Paper"
      },
      {
        name: "organics",
        label: "Organics"
      },
      {
        name: "plastics",
        label: "Plastics"
      },
      {
        name: "textiles",
        label: "Textiles"
      },
      {
        name: "metal",
        label: "Metal"
      },
      {
        name: "glass",
        label: "Glass"
      },
      {
        name: "trimmings",
        label: "Trimmings"
      },
      {
        name: "appliances",
        label: "Appliances"
      },
      {
        name: "hazardousWaste",
        label: "Hazardous Waste"
      },
      {
        name: "inertsAndOthers",
        label: "Inerts and Others"
      },
    ]
    let stateString = "parcel.workbooks.materials.estimateDemand.optionA.demandJunctions."
    let materialsList = materials.map(function(material, key){
      return (
        <tr key={key}>
          <td><label htmlFor={material.name}>{material.label}</label></td>
          <td><Input type="number" id={material.name} /></td>
      </tr>
      )
    })
  return (
    <div>
      <h3>Option A:</h3>
      <Input label="Total Weight (kg):" type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionA.totalWeight" />
      <table>
        <tbody>
        <tr>
          <th>Category</th>
          <th>%</th>
        </tr>
        {materialsList}
        </tbody>
      </table>
   </div>
  )
  }
}

export default MaterialsOptionA
