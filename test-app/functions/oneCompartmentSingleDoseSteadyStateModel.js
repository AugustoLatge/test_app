const oneCompartmentSingleDoseSteadyStateModel = (
  t0,
  tf,
  dt,
  CRCL,
  WT,
  Darray,
  tDarray,
  TinfArray,
  TauArray,
  theta,
  eta
) => {
  var results = []; // to hold time and concentration values up to final time (tf)

  var X = 0; // variable to hold the concentration values

  var doseCounter = 0; // first dose
  var t = t0; // initial time

  var TO = CRCL < 85 ? 0 : 1;

  var CL1 = theta[0];
  var CL2 = theta[1] * CRCL + theta[2];
  var TVCL = CL1 * TO + CL2 * (1 - TO);
  var TVV1 = theta[3] * WT;
  var TVV2 = theta[4];
  var TVQ = theta[5];
  var CL = TVCL * Math.exp(eta[0]);
  var V1 = TVV1 * Math.exp(eta[0]);
  // var V2 = TVV2 * Math.exp(eta[0]);
  // var Q = TVQ * Math.exp(eta[0]);
  // var S1 = V1;
  var K = CL / V1;
  // var K12 = Q / V1;
  // var K21 = Q / V2;

  while (t <= tf) {
    // Checking dose characteristics for each dose interval
    if (t === tDarray[doseCounter]) {
      var tD = tDarray[doseCounter];
      var D = Darray[doseCounter];
      var Tinf = TinfArray[doseCounter];
      var Tau = TauArray[doseCounter];
      doseCounter++;
    }

    if (t - tD <= Tinf) {
      X =
        (D / Tinf) *
        (1 / (K * V1)) *
        ((1 - Math.exp(-K * (t - tD))) +
          Math.exp(-K * Tau) *
            (1 - Math.exp(-K * Tinf)) *
            Math.exp(-K * (t - tD - Tinf)) /
            (1 - Math.exp(-K * Tau)));
    } else {
      X =
        (D / Tinf) *
        (1 / (K * V1)) *
        (((1 - Math.exp(-K * Tinf)) * Math.exp(-K * (t - tD - Tinf))) /
          (1 - Math.exp(-K * Tau)));
    }

    results.push({x: t, y: X}); // add current time and concentration to results

    t = t + dt; // advance one time step
  }

  return results;
};

export default oneCompartmentSingleDoseSteadyStateModel;
