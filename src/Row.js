class Row {
	constructor(Ticker, date, high, low, open, close, volume) {
	  this.Ticker = Ticker;
      this.date = date;
	  this.high = high;
	  this.low = low; 
	  this.open = open; 
	  this.close = close;
      this.volume = volume;
	}
}

export default Row;

const sampleRows = [
	{"Ticker":"AAPL","date":"1980-12-07T08:00:00.000Z","high":29,"low":29,"open":29,"close":29,"volume":2093900},
	{"Ticker":"AAPL","date":"1980-12-14T08:00:00.000Z","high":28,"low":25,"open":27,"close":28,"volume":2188100},
  ];

