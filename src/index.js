import React, { useMemo } from 'react';
import { render } from 'react-dom';
import CandleStickChartWithDarkTheme from './CandleStickChartWithDarkTheme';
import DarkBackground from "./DarkBackground";
import LightBackground from "./LightBackground";

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
	{ name: "Preferences", type: "group" },
	{ name: "Enable Dark Mode?", type: "toggle", source: "Preferences" },
	{ name: "Slow STO", type: "toggle", source: "Preferences" },
	{ name: "Fast STO", type: "toggle", source: "Preferences" },
	{ name: "Full STO", type: "toggle", source: "Preferences" },
	{ name: "Bollinger Bands", type: "toggle", source: "Preferences" },
	{ name: "Moving Average", type: "toggle", source: "Preferences" },
	{ name: "EMA 20", type: "toggle", source: "Preferences" },
	{ name: "EMA 50", type: "toggle", source: "Preferences" },
	{ name: "Advanced Preferences", type: "group" },
    { name: 'Chart Height', source: 'Advanced Preferences', type: 'text' },
]);

const ChartComponent = () => {

  const config = useConfig();
  const sigmaCols = useElementColumns(config.source);
  const sigmaData = useElementData(config.source);

  const prefs = {
	SlowSTO: client.config.getKey("Slow STO"),
	FastSTO: client.config.getKey("Fast STO"),
	FullSTO: client.config.getKey("Full STO"),
	BollingerBands: client.config.getKey("Bollinger Bands"),
	EMA20: client.config.getKey("EMA 20"),
	EMA50: client.config.getKey("EMA 50"),
	ChartHeight: client.config.getKey("Chart Height"),
  }
  
  console.log(prefs, "PREFERENCES");

  const DarkModeEnabled = client.config.getKey("Enable Dark Mode?");

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
	<div height="100%">
		{
			DarkModeEnabled ? 
				<DarkBackground>
					<CandleStickChartWithDarkTheme 
						type={"svg"}
						data={data} 
						prefs={prefs}
					/>
				</DarkBackground> :
				<LightBackground>
					<CandleStickChartWithDarkTheme 
						type={"svg"}
						data={data} 
						prefs={prefs}
					/>
			    </LightBackground>
		}
	</div>
  )
}

render(
	<ChartComponent />,
	document.getElementById("root")
);
