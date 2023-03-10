// Implements the Reed Muench formula for titer calculation
// Based on the implementation found at https://github.com/jbloomlab/reedmuenchcalculator

import { ParsePlateStore } from './Utils.js'

export const ReedMuench = (samples, volume, dilution) => {
	let nWells = 8;
	let titers = [];
	samples.forEach(sample => {
		let uninfected = Array(nWells).fill(0);
		let n = 0;
		for (var i = 0; i < uninfected.length; i++) {
			uninfected[i] = n + sample.maxWell.filter(x => x < i).length;
			n = uninfected[i];
		}
		let infected = Array(nWells).fill(0);
		n = 0;
		for(var i = (infected.length-1); i >= 0 ; i--){
			infected[i] = n + sample.maxWell.filter(x => x >= i).length;
			n = infected[i];
		}
		let percentInfected = Array(nWells).fill(0);
		for (var i = 0; i < percentInfected.length; i++) {
			percentInfected[i] = (100 * infected[i]) / (infected[i] + uninfected[i])
		}
		let rowabove50;
		let percentrowabove50;
		let percentrowbelow50;
		let startdilution;
		for (var i = 0; i < percentInfected.length; i++) {
			if (percentInfected[i] < 50) {
				rowabove50 = i - 1;
				percentrowabove50 = percentInfected[i - 1];
				percentrowbelow50 = percentInfected[i];
				startdilution = i - 1;
				break;
			}
		}
		let index = (percentrowabove50 - 50.0) / (percentrowabove50 - percentrowbelow50)
		let titer = dilution ** (startdilution + index) / volume;
		if (isNaN(titer)) {
			titer = 0;
		}
		titers = [{
			sample: sample.name,
			nrep: sample.maxWell.length,
			titer: titer
		}, ...titers];
	});
	return titers;
}

