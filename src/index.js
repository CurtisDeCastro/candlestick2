import React from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import CandleStickStockChart from './Chart';
import { getData } from "./utils";
import data2 from './dummyData.js';

import { TypeChooser } from "react-stockcharts/lib/helper";

import {
	client,
	useConfig,
	useElementColumns,
	useElementData,
  } from "@sigmacomputing/plugin";

client.config.configureEditorPanel([
	{ name: "source", type: "element" },
	{ name: "Open", type: "column", source: "source", allowMultiple: true },
	{ name: "High", type: "column", source: "source", allowMultiple: true },
	{ name: "Low", type: "column", source: "source", allowMultiple: true },
	{ name: "Close", type: "column", source: "source", allowMultiple: true, allowedTypes: ['number', 'integer'] },
	{ name: "X-Axis", type: "column", source: "source", allowMultiple: true, allowedTypes: ['datetime'] },
  ]);

class ChartComponent extends React.Component {

	
	componentDidMount() {

		getData().then(data => {
			this.setState({data})
		})
	}
	render() {
		if (this.state == null) {
			return <div>Loading...</div>
		}
		return (
			<CandleStickStockChart type={"hybrid"} data={this.state.data} />
			// <TypeChooser>
			// 	{type => <Chart type={type} data={this.state.data} />}
			// </TypeChooser>
		)
	}
}

render(
	<ChartComponent />,
	document.getElementById("root")
);