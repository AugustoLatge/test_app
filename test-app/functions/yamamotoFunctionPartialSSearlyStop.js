const yamamotoFunctionPartial = (
  CRCL,
  WT,
  tDarray,
  Darray,
  TinfArray,
  theta,
  eta,
  y0,
  t,
  y
) => {

  var TO = +!(CRCL < 85);
  
  var CL1 = theta[0];
  var CL2 = theta[1] * CRCL + theta[2];
  var TVCL = (CL1 * TO) + (CL2 * (1 - TO));
  var TVV1 = theta[3] * WT;
  var TVV2 = theta[4];
  var TVQ = theta[5];
  var CL = TVCL * Math.exp(eta[0]);
  var V1 = TVV1 * Math.exp(eta[1]);
  var V2 = TVV2 * Math.exp(eta[2]);
  var Q = TVQ * Math.exp(eta[3]);
  var S1 = V1;
  var K = CL/V1;
  var K12 = Q/V1;
  var K21 = Q/V2;

  var doseCounter = 0; // first dose

  var concAtDoses = [];

  return function (t, y) {

    // Checking dose characteristics for each dose interval
    if (t === tDarray[doseCounter]) {
      var tD = tDarray[doseCounter];
      var D = Darray[doseCounter];
      var Tinf = TinfArray[doseCounter];

      concAtDoses.push(y);

      // Test to validate if steady state
      if (doseCounter != 0) {

        var prevConc = concAtDoses[concAtDoses.length-2][0]; // previous concentration at dose

        // If the change of concentration is less than 1% we consider SS
        if (y[0] - prevConc <= .05 * prevConc) {
          return {dydt: dydt, SS: true};
        }
      }
      doseCounter++;
    }

    if (t-tD >= 0 && t-tD <= Tinf) {
      var input = (D/Tinf)*(1/V1);
    } else {
      var input = 0;
    }
    
    var dydt = [0, 0];
    dydt[0] =  -K * y[0] - K12 * y[0] + K21 * y[1] + input;
    dydt[1] =  -K21 * y[1] + K12 * y[0];
    return {dydt: dydt, SS: false};
  }

  //   (t, X, CRCL, WT, tD, Tinf, D, theta, eta, n)
  //   TO = ~(CRCL < 85)';
  // %     if CRCL < 85
  // %         TO = 0;
  // %     else
  // %         TO = 1;
  // %     end
  //   CL1(1:n)  = theta(1);
  //   CL2(1:n)  = theta(2)*CRCL+theta(3);
  //   TVCL(1:n) = (CL1.*TO)+(CL2.*(1-TO));
  //   TVV1(1:n) = theta(4)*WT;
  //   TVV2(1:n) = theta(5);
  //   TVQ(1:n)  = theta(6);
  //   CL(1:n)   = TVCL.*exp(eta(:,1)');
  //   V1(1:n)   = TVV1.*exp(eta(:,2)');
  //   V2(1:n)   = TVV2.*exp(eta(:,3)');
  //   Q(1:n)    = TVQ.*exp(eta(:,4)');
  //   S1(1:n)   = V1;
  //   K(1:n) = CL./V1;
  //   K12(1:n) = Q./V1;
  //   K21(1:n) = Q./V2;
  //   if t-tD >= 0 && t-tD <= Tinf
  //       input = (D'./Tinf).*(1./V1);
  //   else
  //       input = 0;
  //   end
  //   dX = zeros(n*2,1);
  //   % ODE system
  // %     dX(1,:) =  -K*X(1) -K12*X(1)  +K21*X(2) +input;
  // %     dX(2,:) =  -K21*X(2) +K12*X(1);
  //   dX(1:n) =  -K.*X(1:n)' -K12.*X(1:n)'  +K21.*X(n+1:n*2)' +input;
  //   dX(n+1:n*2) =  -K21.*X(n+1:n*2)' +K12.*X(1:n)';
};

export default yamamotoFunctionPartial;
