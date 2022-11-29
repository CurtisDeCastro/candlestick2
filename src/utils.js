import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

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

	// must output an array of objects

	const promiseMSFT = fetch('https://res.cloudinary.com/dajho2imi/raw/upload/v1668838674/tsla_stock_qk2lxb.tsv')
	  .then(response => response.text())
	  .then(data => tsvParse(data, parseData(parseDate)))

	return promiseMSFT;


}