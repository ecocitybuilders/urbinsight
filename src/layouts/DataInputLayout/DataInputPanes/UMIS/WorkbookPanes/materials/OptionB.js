import React from 'react';
import { Button } from 'react-bootstrap'
import { Input } from 'react-bootstrap';
import { Grid } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

class MaterialsOptionB extends React.Component {
  constructor(){
    super();
  }
  render(){
    return(
    <div ng-show="optionSelected === 'B'">
      <h3>Option B:</h3>
      <label>Kilograms:<input name="paperUnits" type="radio"  value="KG" /></label>
      <label>Percentage:<input name="paperUnits" type="radio" value="%" /></label>
      <table>
        <tbody>
        <tr>
          <th>Paper</th>
          <th>Amount</th>
          <th>Types</th>
        </tr>
        <tr>
          <td><label htmlFor="usedPaper">Used Paper</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.paper.usedPaper" id="usedPaper" /></td>
          <td>Full toilet paper roll (0.2 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="officeSupplies">Office Supplies</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.paper.officeSupplies" id="officeSupplies" /></td>
          <td>Yellow Legal Pad (0.2 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="phonebook">Phonebook</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.paper.phonebook" id="phonebook" /></td>
          <td>Phonebook (1.8 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="newsprint">Newsprint</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.paper.newsprint" id="newsprint" /></td>
          <td>Newspaper (0.6 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="computerPaper">Computer Paper</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.paper.computerPaper" id="computerPaper" /></td>
          <td>Computer Paper (0.4 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="corrugatedCardboard">Corrugated Cardboard</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.paper.corrugatedCardboard" id="corrugatedCardboard" /></td>
          <td>Cardboard flattend, Loose (0.03 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="mixedWastePaper">Mixed Waste Paper</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.paper.mixedWastePaper" id="mixedWastePaper" /></td>
          <td>Mixed paper, Loose (0.2 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="nonRecyclablePaper">Non-recyclable Paper</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.paper.nonRecyclablePaper" id="nonRecyclablePaper" /></td>
          <td>Magazine, Loose (0.6 kg/cubic dm)</td>
        </tr>
        </tbody>
      </table>
      <br />
      <label>Kilograms:<Input name="organicsUnits" type="radio"  value="KG" /></label>
      <label>Percentage:<Input name="organicsUnits" type="radio" value="%" /></label>
      <table>
        <tbody>
        <tr>
          <th>Organics</th>
          <th>Amount</th>
          <th>Types</th>
        </tr>
        <tr>
          <td><label htmlFor="starches">Starches</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.organics.starches.amount" id="starches" /></td>
          <td>Break, Bulk (0.3 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="fish">Proteins - Fish</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.organics.proteins.fish" id="fish" /></td>
          <td>Fish, Scraps (0.7 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="meat">Proteins - Meat</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.organics.proteins.meat" id="meat" /></td>
          <td>Meat, Ground (0.8 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="shells">Proteins - Oyster Shells</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.organics.proteins.shells" id="shells" /></td>
          <td>Oyster Shells, Whole (1.2 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="milk">Dairy - Milk</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.organics.dairy.milk" id="milk" /></td>
          <td>Milk (1.0 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="cheese">Dairy - Cheese</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.organics.dairy.cheese" id="cheese" /></td>
          <td>Cheese (0.5 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="butter">Dairy - Butter</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.organics.dairy.butter" id="butter" /></td>
          <td>Butter (1.0 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="solidFat">Fats - Solid Fat</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.organics.fats.solidFat" id="solidFat" /></td>
          <td>Solid Fat (0.4 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="oil">Fats - Oil, Cooking</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.organics.fats.cookingOil" id="oil" /></td>
          <td>Oil, Cooking (0.9 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="produceWaste">Produce - Produce Waste</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.organics.produce.produceWaste" id="produceWaste" /></td>
          <td>Produce waste, mixed (0.9 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="foodWaste">Other - Food Waste</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.organics.other.foodWaste" id="foodWaste" /></td>
          <td>Food waste, as animal feed (0.6 kg/cubic dm)</td>
        </tr>
        </tbody>
      </table>
      <br/>
      <label>Kilograms:<Input name="plasticUnits" type="radio"  value="KG" /></label>
      <label>Percentage:<Input name="plasticUnits" type="radio" value="%" /></label>
      <table>
        <tbody>
        <tr>
          <th>Plastics</th>
          <th>Amount</th>
          <th>Types</th>
        </tr>
        <tr>
          <td><label htmlFor="largeBottles">Bottles - PETE large bottles</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.bottles.largeBottles" id="largeBottles" /></td>
          <td>PETE large bottles (0.05 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="smallBottles">Bottles - PETE small bottles</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.bottles.smallBottles" id="smallBottles" /></td>
          <td>PETE small bottles (0.02 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="unpigmented">Bottles - HDPE bottles, unpigmented</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.bottles.unpigmented" id="unpigmented" /></td>
          <td>HDPE bottles, unpigmented (0.02 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="pigmented">Bottles - HDPE bottles, pigmented</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.bottles.pigmented" id="pigmented" /></td>
          <td>HDPE bottles, pigmented (0.03 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="beverageCase">Plastic Film - HDPE beverage case</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.film.beverageCase" id="beverageCase" /></td>
          <td>HDPE beverage case (0.54 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="breadCase">Plastic Film - HDPE bread case</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.film.breadCase" id="breadCase" /></td>
          <td>HDPE bread case (0.68 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="gallonContainer">Plastic Film - HDPE gallon container</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.film.gallonContainer" id="gallonContainer" /></td>
          <td>HDPE gallon container (0.03 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="bags">Bags - Plastic bags</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.bags.amount" id="bagsSmall" /></td>
          <td>Plastic bags (0.01 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="styrofoam">Packaging - Styrofoam Kernels</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.packaging.styrofoamKernels" id="styrofoam" /></td>
          <td>Styrofoam kernels (0.004 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="polystyrene">Packaging - Polystyrene foam</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.packaging.polystyreneFoam" id="polystyrene" /></td>
          <td>Polystyrene foam (0.01 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="pet">Packaging - PET uncompacted</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.packaging.petUncompacted" id="pet" /></td>
          <td>PET uncompacted (0.02 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="otherPlastics">Other plastics</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.plastics.other.amount" id="otherPlastics" /></td>
          <td>Other plastics</td>
        </tr>
      </tbody>
      </table>
      <br/>
      <label>Kilograms:<Input name="textileUnits" type="radio"  value="KG" /></label>
      <label>Percentage:<Input name="textileUnits" type="radio" value="%" /></label>
      <table>
        <tbody>
        <tr>
          <th>Textiles</th>
          <th>Amount</th>
          <th>Types</th>
        </tr>
        <tr>
          <td><label htmlFor="sweaters">Clothes - Wool Sweaters</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.clothes.sweaters" id="sweaters" /></td>
          <td>Wool Sweaters (0.5 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="shirts">Clothes - Shirts</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.clothes.shirts" id="shirts" /></td>
          <td>Shirts (0.2 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="pants">Clothes - Pants</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.clothes.pants" id="pants" /></td>
          <td>Pants (0.6 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="socks">Clothes - Socks</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.clothes.socks" id="socks" /></td>
          <td>Socks (0.1 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="leatherShoes">Shoes - Leather pair</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.shoes.leather" id="leatherShoes" /></td>
          <td>Leather pair (0.9 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="canvasShoes">Shoes - Canvas pair</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.shoes.canvas" id="canvasShoes" /></td>
          <td>Canvas pair (0.8 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="towels">Linens - Bath Towels</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.linens.towels" id="towels" /></td>
          <td>Bath Towels (3.7 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="sheets">Linens - Sheets</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.linens.sheets" id="sheets" /></td>
          <td>Sheets (1.9 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="tablecloths">Large Textiles - Tablecloths</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.largeTextiles.tablecloths" id="tablecloths" /></td>
          <td>Tablecloths (0.002 kg/sq dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="carpet">Large Textiles - Carpet</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.largeTextiles.carpet" id="carpet" /></td>
          <td>Carpet (0.02 kg/sq dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="canvas">Large Textiles - Canvas</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.largeTextiles.canvas" id="canvas" /></td>
          <td>Canvas (0.005 kg/sq dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="looseClothing">Mixed Clothing - Clothing, mixed loose</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.mixedClothing.looseClothing" id="looseClothing" /></td>
          <td>Clothing, mixed loose (0.1 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="compactClothing">Mixed Clothing - Clothing, mixed compacted</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.textiles.mixedClothing.compactClothing" id="compactClothing" /></td>
          <td>Clothing, mixed compacted(0.1 kg/cubic dm)</td>
        </tr>
      </tbody>
      </table>
      <br/>
      <label>Kilograms:<Input name="metalsUnits" type="radio"  value="KG" /></label>
      <label>Percentage:<Input name="metalsUnits" type="radio" value="%" /></label>
      <table>
        <tbody>
        <tr>
          <th>Metals</th>
          <th>Amount</th>
          <th>Types</th>
        </tr>
        <tr>
          <td><label htmlFor="steelCans">Tin Coated Steel Cans</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.metals.steelCans.amount" id="steelCans" /></td>
          <td>Tin Coated Steel Cans (0.3 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="tinCans">Tin Cans, ferrous</label> </td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.metals.tinCans.amount" id="tinCans" /></td>
          <td>Tin Coated, ferrous (0.4 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="petFood">Pet Food Tin Can, ferrous</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.metals.petFood.amount" id="petFood" /></td>
          <td>Pet Food Tin Can, ferrous (0.3 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="aluminumCans">Aluminum Cans (whole)</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.metals.aluminumCans.amount" id="aluminumCans" /></td>
          <td>Aluminum Cans (whole) (0.3 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="oilFilters">Used Oil Filters</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.metals.oilFilters.amount" id="oilFilters" /></td>
          <td>Used Oil Filters (0.2 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="radiator">Radiator, ferrous (19 Liters)</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.metals.radiator.amount" id="radiator" /></td>
          <td>Radiator, ferrous (19 Liters) (1.0 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="aluminumFoil">Aluminum Foil</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.metals.aluminumFoil.amount" id="aluminumFoil" /></td>
          <td>Aluminum Foil (2.7 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="compositeMetal">Remainder/Composite Metal</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.metals.compositeMetal.amount" id="compositeMetal" /></td>
          <td>Remainder/Composite Metal (0.5 kg/cubic dm)</td>
        </tr>
      </tbody>
      </table>
      <br/>
      <label>Kilograms:<Input name="glassUnits" type="radio"  value="KG"/></label>
      <label>Percentage:<Input name="glassUnits" type="radio" value="%"/></label>
      <table>
        <tbody>
        <tr>
          <th>Glass</th>
          <th>Amount</th>
          <th>Types</th>
        </tr>
        <tr>
          <td><label htmlFor="standardBottles">Bottles - Standard Bottles</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.glass.bottles.standardBottles" id="standardBottles" /></td>
          <td>Standard Bottles (0.2 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="largerBottles">Bottles - Larger Bottles</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.glass.bottles.largerBottles" id="largerBottles" /></td>
          <td>Larger Bottles (0.4 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="jugs">Bottles - Jugs</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.glass.bottles.jugs" id="jugs" /></td>
          <td>Jugs (1.1 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="windowGlass">Windows - Window Glass</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.glass.windows.windowGlass" id="windowGlass" /></td>
          <td>Window Glass (2.4 mm thick) (0.1 kg/sq dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="mixedGlass">Mixed Glass - Composite or Broken Glass</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.glass.mixedGlass.compositeGlass" id="mixedGlass" /></td>
          <td>Composite or Broken Glass (1.3 kg/cubic dm)</td>
        </tr>
        </tbody>
      </table>
      <br/>
      <label>Kilograms:<Input name="trimmingsUnits" type="radio"  value="KG"/></label>
      <label>Percentage:<Input name="trimmingsUnits" type="radio" value="%"/></label>
      <table>
        <tbody>
        <tr>
          <th>Trimmings</th>
          <th>Amount</th>
          <th>Types</th>
        </tr>
        <tr>
          <td><label htmlFor="yardTrimming">Garden Waste - Yard Trimming, mixed</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.trimmings.gardenWaste.yardTrimming" id="yardTrimming" /></td>
          <td>Yard Trimming, mixed (0.1 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="grassClipping">Garden Waste - Grass Clippings</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.trimmings.gardenWaste.grassClippings" id="grassClippings" /></td>
          <td>Grass Clippings (0.2 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="leaves">Garden Waste - Leaves</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.trimmings.gardenWaste.leaves" id="leaves" /></td>
          <td>Leaves (0.4 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="largeLimbs">Garden Waste - Large Limbs and Stumps</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.trimmings.gardenWaste.largeLimbsandStumps" id="largeLimbs" /></td>
          <td>Large Limbs and Stumps (0.6 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="dryPrunings">Garden Waste - Prunings, dry</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.trimmings.gardenWaste.dryPrunings" id="dryPrunings" /></td>
          <td>Prunings, dry (0.2 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="greenPrunings">Garden Waste - Prunings, green</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.trimmings.gardenWaste.greenPrunings" id="greenPrunings" /></td>
          <td>Prunings, green (0.03 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="baledStraw">Garden Waste - Hay/Straw, baled</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.trimmings.gardenWaste.baledStraw" id="baledStraw" /></td>
          <td>Hay/Straw, baled (0.4 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="looseStraw">Garden Waste - Hay/Straw, loose</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.trimmings.gardenWaste.looseStraw" id="baledStraw" /></td>
          <td>Hay/Straw, loose (0.05 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="compost">Garden Waste - Compost</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.trimmings.gardenWaste.compost" id="compost" /></td>
          <td>Compost (0.6 kg/cubic dm)</td>
        </tr>
        </tbody>
      </table>
      <br/>
      <label>Kilograms:<Input name="applianceUnits" type="radio"  value="KG"/></label>
      <label>Percentage:<Input name="applianceUnits" type="radio" value="%"/></label>
      <table>
        <tbody>
        <tr>
          <th>Appliances</th>
          <th>Amount</th>
          <th>Types</th>
        </tr>
        <tr>
          <td><label htmlFor="airConditioner">Major Appliances - Air Conditioner</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.appliances.majorAppliances.airConditioner" id="airConditioner" /></td>
          <td>Air Conditioner (29.1 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="microwave">Major Appliances - Microwave</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.appliances.majorAppliances.microwave" id="microwave" /></td>
          <td>Microwave (22.7 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="waterHeater">Major Appliances - Water Heater</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.appliances.majorAppliances.waterHeater" id="waterHeater" /></td>
          <td>Water Heater (59.4 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="incandescentBulbs">Lighting - Incandescent Bulbs</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.appliances.lighting.incandescentBulbs" id="incandescentBulbs" /></td>
          <td>Incandescent Bulbs (0.031 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="fluorescentBulbs">Lighting - Fluorescent Bulbs</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.appliances.lighting.fluorescentBulbs" id="fluorescentBulbs" /></td>
          <td>Fluorescent Bulbs (4ft Ballast) (1.6 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="otherAppliances">Other - Miscellaneous Appliances</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.appliances.other.amount" id="otherAppliances" /></td>
          <td>Uncategorized Appliances</td>
        </tr>
        </tbody>
      </table>
      <br/>
      <label>Kilograms:<Input name="hazardousUnits" type="radio"  value="KG"/></label>
      <label>Percentage:<Input name="hazardousUnits" type="radio" value="%"/></label>
      <table>
        <tbody>
        <tr>
          <th>Hazardous Waste</th>
          <th>Amount</th>
          <th>Types</th>
        </tr>
        <tr>
          <td><label htmlFor="paints">Paints</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.harzardousWaste.paint.amount" id="paints" /></td>
          <td>Paints (3.6 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="antifreeze">Antifreeze</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.harzardousWaste.antifreeze.amount" id="antifreeze" /></td>
          <td>Antifreeze (4.3 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="usedMotorOil">Used Motor Oil</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.harzardousWaste.usedMotorOil.amount" id="usedMotorOil" /></td>
          <td>Used Motor Oil (0.8 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="motorVehicleBatteries">Motor Vehicle Batteries</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.harzardousWaste.motorVehicleBatteries.amount" id="motorVehicleBatteries" /></td>
          <td>Motor Vehicle Batteries (18.1 kg)</td>
        </tr>
        <tr>
          <td><label htmlFor="tires">Tire, passenger car</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.harzardousWaste.tires.amount" id="tires" /></td>
          <td>Tire, passenger car (6.5 kg)</td>
        </tr>
      </tbody>
      </table>
      <br/>
      <label>Kilograms:<Input name="inertsUnits" type="radio"  value="KG"/></label>
      <label>Percentage:<Input name="inertsUnits" type="radio" value="%"/></label>
      <table>
        <tbody>
        <tr>
          <th>Inerts and Others</th>
          <th>Amount</th>
          <th>Types</th>
        </tr>
        <tr>
          <td><label htmlFor="concrete">Construction materials - Concrete</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.inerts.constructionmaterials.concrete" id="concrete" /></td>
          <td>Concrete (1.1 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="asphaltPaving">Construction materials - Asphalt Paving</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.inerts.constructionmaterials.asphaltPaving" id="asphaltPaving" /></td>
          <td>Asphalt Paving (.8 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="asphaltRoofing">Construction materials - Asphalt Roofing</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.inerts.constructionmaterials.asphaltRoofing" id="asphaltRoofing" /></td>
          <td>Asphalt Roofing (1.7 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="brick">Construction materials - Brick</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.inerts.constructionmaterials.brick" id="brick" /></td>
          <td>Brick (1.8 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="fiberglassInsulation">Construction materials - Fiberglass Insulation</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.inerts.constructionmaterials.fiberglassInsulation" id="fiberglassInsulation" /></td>
          <td>Fiberglass Insulation (0.01 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="gypsum">Construction materials - Gypsum Board</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.inerts.constructionmaterials.gypsumBoard" id="gypsum" /></td>
          <td>Gypsum Board (2.3 kg/cubic dm)</td>
        </tr>
        <tr>
          <td><label htmlFor="woodAshes">Construction materials - Wood Ashes</label></td>
          <td><Input type="number" ng-model="parcel.workbooks.materials.estimateDemand.optionB.demandJunctions.inerts.constructionmaterials.woodAshes" id="woodAshes" /></td>
          <td>Wood Ashes (0.8 kg/cubic dm)</td>
        </tr>
        </tbody>
      </table>
    </div>
  )
  }
}

export default MaterialsOptionB
