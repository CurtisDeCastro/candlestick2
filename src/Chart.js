import React from "react";
import PropTypes from "prop-types";

import { ChartCanvas, Chart } from "react-stockcharts";
import {
	CandlestickSeries,
	BarSeries,
} from "react-stockcharts/lib/series";

import { XAxis, YAxis } from "react-stockcharts/lib/axes";

import { discontinuousTimeScaleProvider } from "react-stockcharts/lib/scale";
import { fitWidth } from "react-stockcharts/lib/helper";
import { last } from "react-stockcharts/lib/utils";

import {
	CrossHairCursor,
	MouseCoordinateX,
	MouseCoordinateY
} from "react-stockcharts/lib/coordinates";

import { format } from "d3-format";
import { timeFormat } from "d3-time-format";

import { OHLCTooltip } from "react-stockcharts/lib/tooltip";

class CandleStickStockScaleChart extends React.Component {
	render() {
		const { type, data: initialData, width, ratio } = this.props;

		console.log(this.props);

		const xScaleProvider = discontinuousTimeScaleProvider
			.inputDateAccessor(d => d.date);
		const {
			data,
			xScale,
			xAccessor,
			displayXAccessor,
		} = xScaleProvider(initialData);
		const xExtents = [
			xAccessor(last(data)),
			xAccessor(data[data.length - 100])
		];

		return (
			<ChartCanvas height={400}
				ratio={ratio}
				width={width}
				margin={{ left: 50, right: 50, top: 10, bottom: 30 }}
				type={type}
				seriesName="MSFT"
				data={data}
				xScale={xScale}
				xAccessor={xAccessor}
				displayXAccessor={displayXAccessor}
				xExtents={xExtents}
				color="#303030"
			>
				<Chart 
					id={1} 
					yExtents={d => [d.high, d.low]}
				>
					<XAxis axisAt="bottom" orient="bottom" ticks={6}/>
					<YAxis axisAt="left" orient="left" ticks={5} />
					<CandlestickSeries />
					<OHLCTooltip forChart={1} origin={[0, 0]} />
				</Chart>
				<Chart
					id={2}
					height={150}
					yExtents={d => d.volume}
					origin={(w, h) => [0, h - 150]}
				>
					<YAxis
						axisAt="right"
						orient="right"
						ticks={5}
						tickFormat={format(".2s")}
					/>
					<MouseCoordinateX
						at="bottom"
						orient="bottom"
						displayFormat={timeFormat("%Y-%m-%d")}
					/>
					<MouseCoordinateY
						at="left"
						orient="left"
						displayFormat={format(".4s")}
					/>
					<BarSeries
						yAccessor={d => d.volume}
						fill={d => (d.close > d.open ? "#6BA583" : "#FF0000")}
					/>
				</Chart>
				<CrossHairCursor/>
			</ChartCanvas>
		);
	}
}

CandleStickStockScaleChart.propTypes = {
	data: PropTypes.array.isRequired,
	width: PropTypes.number.isRequired,
	ratio: PropTypes.number.isRequired,
	type: PropTypes.oneOf(["svg", "hybrid"]).isRequired,
};

CandleStickStockScaleChart.defaultProps = {
	type: "svg",
};
CandleStickStockScaleChart = fitWidth(CandleStickStockScaleChart);

export default CandleStickStockScaleChart;

