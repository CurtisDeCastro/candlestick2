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
