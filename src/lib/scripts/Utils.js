// Parse the PlateStore object into more workable structure

import { ReedMuench } from './ReedMuench.js'
import { MidSin } from './MidSin.js'

export const ParsePlateStore = (PlateStore) => {
	let sampleNames = [];
	let samples = [];
	let sample;
	PlateStore.forEach(plate => {
		if (plate.added) {
			for (var i = 0; i < plate.maxWell.length; i++) {
				if (sampleNames.includes(plate.colNames[i])) {
					sample = samples.find((sample) => sample.name == plate.colNames[i]);
					sample.maxWell = [plate.maxWell[i], ...sample.maxWell];
				} else {
					sample = {name: plate.colNames[i], maxWell: [plate.maxWell[i]]};
					sampleNames = [sample.name, ...sampleNames];
					samples = [sample, ...samples];
				}
	    	}
	    }
	});
	return samples;
}

export const ComputeTiters = (PlateStore, volume, dilution) => {
	if (volume == null | dilution == null) {
		return(null);
	}
	const samples = ParsePlateStore(PlateStore);
	let data = [];
	const RM_results = ReedMuench(samples, volume, dilution);
	const MS_results = MidSin(samples, volume, dilution);
	for (var i = 0; i < RM_results.length; i++) {
		data = [{
			sample: RM_results[i].sample,
			nrep: RM_results[i].nrep,
			rm_titer: RM_results[i].titer,
			ms_titer: MS_results[i].titer,
			ms_titer_ul: MS_results[i].titer_ul
		}, ...data];
	}
	console.log(data);
	return(data); 
}