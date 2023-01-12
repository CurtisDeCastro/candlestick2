import React, { useEffect, useMemo } from 'react';
import { render } from 'react-dom';
import CandleStickChartWithDarkTheme from './CandleStickChartWithDarkTheme';
import Row from "./Row";
import Background from "./Background";

// import sigma hooks and other utilities
import { getData } from "./utils";

import {
	client,
	useConfig,
	useElementColumns,
	useElementData,
} from "@sigmacomputing/plugin";

// config source columns
client.config.configureEditorPanel([
	{ name: "source", type: "element" },
	{ name: "Ticker", type: "column", source: "source", allowMultiple: false },
	{ name: "Date", type: "column", source: "source", allowMultiple: false, allowedTypes: ['datetime'] },
	{ name: "High", type: "column", source: "source", allowMultiple: false },
	{ name: "Low", type: "column", source: "source", allowMultiple: false },
	{ name: "Open", type: "column", source: "source", allowMultiple: false },
	{ name: "Close", type: "column", source: "source", allowMultiple: false, allowedTypes: ['number', 'integer'] },
	{ name: "Volume", type: "column", source: "source", allowMultiple: false, allowedTypes: ['number', 'integer'] },
]);

// create functional component for chart
const ChartComponent = () => {

  // initiate hooks	
  const config = useConfig();
  const sigmaCols = useElementColumns(config.source);
  const sigmaData = useElementData(config.source);

  const data = useMemo(() => {
	const result = [];

  console.log("SIGMA DATA", sigmaData);

	if (Object.keys(sigmaData).length) {

		const entries = Object.entries(sigmaData);

		for (let i = 0; i < entries[0][1].length; i++) {
			const row = {};

			for (const [columnId, values] of entries) {
				const columnName = sigmaCols[columnId].name.toLowerCase();

				let value = values[i];
				if (columnName === 'date') {
					value = new Date(values[i]);
				}

				row[columnName] = value;
			}

			result.push(row);
		}
	}

	return result;
  }, [sigmaCols, sigmaData])

//   console.log("SIGMA COLS", sigmaCols);
//   console.log("SIGMA DATA", sigmaData);

//   // create storage for column IDs 
//   const columnIds = {};

//   // create storage for transformed data
//   const newData = {}; 
//   const output = [];

//   // iterate through the sigma columns and populate the column IDs object with key-value pairs 
//   // matching the hashed column alias to the plain text column name in Sigma
//   Object.keys(sigmaCols).map(key => columnIds[sigmaCols[key].id] = sigmaCols[key].name);

//   // iterate through an array of the sigma data column alias names 
//   Object.keys(sigmaData).map(key => {
// 	// create a new property of newData named after the alias' user-facing name, and asssign it to that column's array of values
// 	newData[columnIds[key]] = sigmaData[key];
// 	// delete the original property after the new one has been created
// 	// delete sigmaData[key];
//   })

//   console.log("NEW DATA", newData);


//   if(newData.Ticker) {
// 	for (let i = 0; i < newData.Ticker.length; i++) {
// 		output.push(new Row(
// 			newData.Ticker[i],
// 			new Date(newData.Date[i]).toISOString(),
// 			newData.High[i],
// 			newData.Low[i],
// 			newData.Open[i],
// 			newData.Close[i],
// 			newData.Volume[i]
// 		))
// 	};
// 	console.log("OUTPUT",JSON.stringify(output));
//   }

//   const [data, setData] = React.useState(null);

//   React.useEffect(() => {
// 	console.log("Using effect");
// 	getData().then(data => {
// 	  console.log("DATA", JSON.stringify(data));
// 	  setData(data);
// 	})
//   }, []);

  if(!data || !data.length) {
    return (<div>Loading...</div>)
  }

  return (
	<Background>
		<CandleStickChartWithDarkTheme 
			type={"hybrid"}
			data={data} 
		/>
   </Background>
  )

}

render(
	<ChartComponent />,
	document.getElementById("root")
);
