# Titer Calculator: compute titers from endpoint dilution assays

## Overview

This repository contains the source code for the titer calculator web application for computing 
titers from standard endpoint dilution assays. The app currently implements the following calculation methods:

1. [Reed-Muench](https://doi.org/10.1093/oxfordjournals.aje.a118408)
2. [midSIN](https://midsin.physics.ryerson.ca/)

## Tech Stack

This project was built using [Svelte](https://svelte.dev/) and [SvelteKit](https://kit.svelte.dev/docs/introduction). Calculations are handled via javascript, specifically the [jstat](https://www.npmjs.com/package/jstat) and [brent-local-min-generator](https://www.npmjs.com/package/brent-local-min-generator) packages. Plotting is currently implemented via the [vega-lite](https://vega.github.io/vega-lite/) framework.

## Contributing

Bug reports, feature requests, and PRs are welcome.

### Setting up the development environment

Install Node.js and npm. Instructions can be found [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

```
npm install
npm run dev
```
