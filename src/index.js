import React from 'react';
import { render } from 'react-dom';
import Chart from './Chart';
import CandleStickStockChart from './Chart';
import CandleStickChartWithDarkTheme from './CandleStickChartWithDarkTheme';
import { getData } from "./utils";
import data2 from './dummyData.js';

import { TypeChooser } from "react-stockcharts/lib/helper";

import {
	client,
	useConfig,
	useElementColumns,
	useElementData,
  } from "@sigmacomputing/plugin";

import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #303030;
  height: 100%;
`;

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
			<Wrapper>
				<CandleStickChartWithDarkTheme 
					type={"hybrid"}
					data={this.state.data} 
				/>
			</Wrapper>
		)
	}
}

render(
	<ChartComponent />,
	document.getElementById("root")
);