import React, { useMemo } from 'react';
import { render } from 'react-dom';
import CandleStickChartWithDarkTheme from './CandleStickChartWithDarkTheme';
import Background from "./Background";

import {
	client,
	useConfig,
	useElementColumns,
	useElementData,
} from "@sigmacomputing/plugin";

client.config.configureEditorPanel([
	{ name: "source", type: "element" },
	{ name: "Ticker", type: "column", source: "source", allowMultiple: false, allowedTypes: ['text'] },
	{ name: "Date", type: "column", source: "source", allowMultiple: false, allowedTypes: ['datetime'] },
	{ name: "High", type: "column", source: "source", allowMultiple: false, allowedTypes: ['number', 'integer'] },
	{ name: "Low", type: "column", source: "source", allowMultiple: false, allowedTypes: ['number', 'integer'] },
	{ name: "Open", type: "column", source: "source", allowMultiple: false, allowedTypes: ['number', 'integer'] },
	{ name: "Close", type: "column", source: "source", allowMultiple: false, allowedTypes: ['number', 'integer'] },
	{ name: "Volume", type: "column", source: "source", allowMultiple: false, allowedTypes: ['number', 'integer'] },
]);

const ChartComponent = () => {

  const config = useConfig();
  const sigmaCols = useElementColumns(config.source);
  const sigmaData = useElementData(config.source);

  const data = useMemo(() => {
	const result = [];
	if (Object.keys(sigmaData).length) {
		const entries = Object.entries(sigmaData);
		for (let i = 0; i < entries[0][1].length; i++) {
			const row = {};
			for (const [columnId, values] of entries) {
				if (sigmaCols[columnId].name) {
					const columnName = sigmaCols[columnId].name.toLowerCase();
					let value = values[i];
					if (columnName === 'date') {
						value = new Date(values[i]);
					}
					row[columnName] = value;
				}
			}
			result.push(row);
		}
	}
	return result;
  }, [sigmaCols, sigmaData])

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
