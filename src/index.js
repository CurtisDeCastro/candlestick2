import React, { useEffect } from 'react';
import { render } from 'react-dom';
import CandleStickChartWithDarkTheme from './CandleStickChartWithDarkTheme';
import { getData } from "./utils";

import {
	client,
	useConfig,
	useElementColumns,
	useElementData,
  } from "@sigmacomputing/plugin";

import styled from 'styled-components';

const Background = styled.div`
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

const ChartComponent = () => {
  const config = useConfig();
  const sigmaData = useElementData(config.source);

  console.log(sigmaData);

  const [data, setData] = React.useState(null);
//   const [counter, setCounter] = React.useState(0);

  React.useEffect(() => {getData().then(data => setData(data))}, []);

  if(!data) {
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

// class ChartComponent extends React.Component {

// 	componentDidMount() {

// 		// console.log(sigmaData);

// 		getData().then(data => {
// 			this.setState({data})
// 		})
// 	}
// 	render() {
// 		if (this.state == null) {
// 			return <div>Loading...</div>
// 		}
// 		return (
// 			<Background>
// 				<CandleStickChartWithDarkTheme 
// 					type={"hybrid"}
// 					data={this.state.data} 
// 				/>
// 			</Background>
// 		)
// 	}
// }

render(
	<ChartComponent />,
	document.getElementById("root")
);