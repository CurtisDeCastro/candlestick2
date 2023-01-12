// import { tsvParse, csvParse } from  "d3-dsv";
// import { timeParse } from "d3-time-format";

// function parseData(parse) {
// 	return function(d) {
// 		d.date = parse(d.date);
// 		d.open = +d.open;
// 		d.high = +d.high;
// 		d.low = +d.low;
// 		d.close = +d.close;
// 		d.volume = +d.volume;

// 		return d;
// 	};
// }

// const parseDate = timeParse("%Y-%m-%d");

// export function getData() {

// 	console.log("Getting Data");
// 	// must output an array of objects representing each row

// 	const AAPL = 'https://res.cloudinary.com/dajho2imi/raw/upload/v1670275073/AAPL_zvxqwi.csv';

// 	const promise = fetch(AAPL)
// 	  .then(response => response.text())
// 	  .then(data => csvParse(data, parseData(parseDate)))

// 	return promise;
// }



import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

import {
	client,
	useConfig,
	useElementColumns,
	useElementData,
  } from "@sigmacomputing/plugin";

function parseData(parse) {
	return function(d) {
		d.date = parse(d.date);
		d.open = +d.open;
		d.high = +d.high;
		d.low = +d.low;
		d.close = +d.close;
		d.volume = +d.volume;

		return d;
	};
}

const parseDate = timeParse("%Y-%m-%d");

export function getData() {

	// must output an array of objects representing each row

	const TSLA = 'https://res.cloudinary.com/dajho2imi/raw/upload/v1668838674/tsla_stock_qk2lxb.tsv';
	const AAPL = 'https://res.cloudinary.com/dajho2imi/raw/upload/v1670275073/AAPL_zvxqwi.csv';
	const BTC = 'https://res.cloudinary.com/dajho2imi/raw/upload/v1670274133/BTC2_-_BITCOIN_PRICES_3_lkmw5t_1_qx6wxu.tsv';

	// const promiseMSFT = fetch(BTC)
	//   .then(response => response.text())
	//   .then(data => tsvParse(data, parseData(parseDate)))

	  const promise = fetch(AAPL)
	  .then(response => response.text())
	  .then(data => csvParse(data, parseData(parseDate)))

	return promise;


}