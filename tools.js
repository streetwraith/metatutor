const sleep = function(time) {
	return new Promise(resolve => setTimeout(resolve, time));
}

module.exports = {
	sleep: sleep,
};