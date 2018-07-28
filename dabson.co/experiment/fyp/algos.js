function mAvg(data, period, index) { //calculate a moving average to begin with
	if(period > index)
		alert('ERROR in mAVG!: '+period+' '+index);
	var ret = 0;

	for(var i=(index-period);i<index;i++) {
		ret += data[i];
	}

	ret /= parseFloat(period);
	ret = parseFloat(ret.toFixed(4));
	return ret;
}

function updateAvg(currentavg, data, period, index) { //update a moving average, index is current val
	var ret = currentavg*period;
	ret -= data[index-period];   //remove the first point
	ret += data[index];          //add the last point
	ret /= period;               //re-average
	return ret;
}

function tripleMomentum(price, m1, m2, m3) {
	if(m1==0 && m2==0 && m3==0) //ignore the first n datapoints while we assess the market (typically n=200)
		return 'sell'

	var a = 0;
	if(price > m1) a++;
	if(price > m2) a++;
	if(price > m3) a++;

	if(a>=2) //if the current market price is shifting above 2 or more of its n-day averages, we can infer an upwards trend
			 //this strat is a little more conservative (specifically, risk-averse), which might explain why it does so well in the GFC
		return 'buy';
	else 
		return 'sell';
}

function randomWalk() { //dumb as bricks, included for reference
	if(Math.round(Math.random()) == 1)
		return 'buy';
	else 
		return 'sell';
}

function buyAndHold() { //dumber than bricks, and it still consistently outperforms randomWalk haha
	return 'buy'; //love this one
}

//PRECOND: Ensure principle is never zero!
function calcProfit(principle, kitty, currentlyheld, currentprice) {
	var ret = 0.; //(0.5-Math.random())*10000;
	//ret = Math.round(ret/100.)*100.; //round to the thousands

	ret = kitty + currentlyheld * currentprice;
	ret -= parseFloat(principle);

	return ret;
}

function formatProfit(profit) {
	var p2 = Math.round(Math.abs(profit)/100.)*100.
	var p2 = intNumberSpacing(p2);
	var ret = profit >= 0. ? '&nbsp;$' : '-$';
	ret = ret.concat(p2); //abs & round
	return ret
}

function intNumberSpacing(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}