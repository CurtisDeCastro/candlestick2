import React, { useEffect } from 'react';
import { render } from 'react-dom';
import CandleStickChartWithDarkTheme from './CandleStickChartWithDarkTheme';

// import utilities
import { getData } from "./utils";
import {
	client,
	useConfig,
	useElementColumns,
	useElementData,
  } from "@sigmacomputing/plugin";

// CSS style for background element using 'styled components'
import styled from 'styled-components';
const Background = styled.div`
  background-color: #303030;
  height: 100%;
`;


const ChartComponent = () => {
	const config = useConfig();
	const [data, setData] = React.useState(null);
	
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

render(
	<ChartComponent />,
	document.getElementById("root")
);
