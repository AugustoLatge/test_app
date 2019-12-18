const yamamotoSteadyStateModel = (
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
  var V2 = TVV2 * Math.exp(eta[0]);
  var Q = TVQ * Math.exp(eta[0]);
  var S1 = V1;
  var K = CL / V1;
  var K12 = Q / V1;
  var K21 = Q / V2;

  var beta =
    (1 / 2) * (K12 + K21 + K - Math.sqrt((K12 + K21 + K) ^ 2 - 4 * K21 * K));

  var alfa = (K21 * K) / beta;

  var A = (1 / V1) * ((alfa - K21) / (alfa - beta));

  var B = (1 / V1) * ((beta - K21) / (beta - alfa));

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
      // Concentration in first compartment
      X =
        (D / Tinf) *
        ((A / alfa) * ((1 - Math.exp(-alfa * (t - tD))) +
          Math.exp(-alfa * Tau) *
            (((1 - Math.exp(-alfa * Tinf)) *
              Math.exp(-alfa * (t - tD - Tinf))) /
              (1 - Math.exp(-alfa * Tau)))) +
          (B / beta) * ((1 - Math.exp(-beta * (t - tD))) +
          Math.exp(-beta * Tau) *
            (((1 - Math.exp(-beta * Tinf)) *
              Math.exp(-beta * (t - tD - Tinf))) /
              (1 - Math.exp(-beta * Tau)))));
    } else {
      // Concentration in first compartment
      X =
        (D / Tinf) * ((A / alfa) * (((1 - Math.exp(-alfa * (Tinf))) * Math.exp(-alfa * (t - tD - Tinf))) / (1 - Math.exp(-alfa * Tau))) + (B / beta)*(((1 - Math.exp(-beta * Tinf)) * Math.exp(-beta * (t - tD - Tinf))) / (1 - Math.exp(-beta * Tau))));        
    }

    results.push({x: t, y: X}); // add current time and concentration to results

    t = t + dt; // advance one time step    
  }

  return results;
};

export default yamamotoSteadyStateModel;
