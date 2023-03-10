// Implements the Reed Muench formula for titer calculation
// Based on the implmentation found at https://github.com/cbeauc/midSIN

import brents from 'brent-local-min-generator';
import jstat from 'jstat';
import { ParsePlateStore } from './Utils.js'

export const MidSin = (samples, volume, dilution) => {
	const ndilutions = 8;
	const dilmin = 1 / dilution;
	dilution = dilmin;
	volume = (volume / 1000) * (1/dilmin);
	let titers = [];
	samples.forEach(sample => {
		const ntot = Array(ndilutions).fill(sample.maxWell.length);
		let VDS = Array(ntot.length).fill(0);
		for (var i = 0; i < ntot.length; i++) {
			VDS[i] = volume * dilmin * (dilution ** i);
		}
		const bracket = [-1 * Math.log10(VDS[0]*10.0), 
			-1 * Math.log10(VDS[VDS.length-1]/10.0)];		
		
		let ninf = Array(ntot[0]).fill(0)
		for (var i = 0; i < ntot.length; i++) {
			ninf[i] = sample.maxWell.filter(arr => {
				if (arr >= i) {
					return true;
				}
				return false;
			}).length;
		}
		let titer = 0;
		if (ninf[0] != 0) {
			titer = brents.local_min(
				x => -1 * PosteriorLH(x, VDS, ntot, ninf),
				bracket[0],
				bracket[1],
				0.0001
			).x;
		}
		let sample_titer = {
				sample: sample.name,
				nrep: sample.maxWell.length,
				titer: titer,
				titer_ul: (10 ** titer)/1000
			};
		if (sample_titer['titer'] == 0) {
			sample_titer['titer_ul'] = 0;
		};
		titers = [sample_titer, ...titers];

	});
	return titers;
}

export const PosteriorLH = (lCvec, VDS, ntot, ninf) => {
	let P = 1;
	for (var i = 0; i < VDS.length; i++) {
		let pinfvec = -1 * Math.expm1(10.0 ** lCvec * -1 * VDS[i]);
		P = P * jstat.binomial.pdf(ninf[i], ntot[i], pinfvec);
	};
	return(P);
};


