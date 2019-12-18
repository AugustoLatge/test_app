var ode45 = require('ode45-cash-karp');

var yValues0 = [];
var yValues1 = [];
var tValues= [];

// var a = .25;
// The derivative function for a Van der Pol oscillator:
// var testFunction = testFunctionPartial(a);
var testFunction = function (dydt, y, t) {
  tValues.push(t);
  yValues0.push(y[0]);
  yValues1.push(y[1]);
  dydt[0] = y[1];
  dydt[1] = 4 * (1-y[0]*y[0])*y[1] - y[0];
}
// var testFunction = function (dydt, y, t) {
//   dydt[0] = 2*t
// };

// Initialize:
// var y0 = [0],
var y0 = [2, 0],
    t0 = 0,
    dt0 = 1e-3,
    integrator = ode45( y0, testFunction, t0, dt0 );

// Integrate up to tmax:
var tmax = 10, t = [], y = [];
while( integrator.step( tmax ) ) {
  // Store the solution at this timestep:
  t.push( integrator.t )
  y.push( integrator.y )
};

const runResult = async () => {
  // console.log(y.length);
  // for (elem of y) {
  //   console.log(elem[0]);
  // }    
  // console.log("finish");
  var lengtht = tValues.length;
  console.log("t values: length = " + lengtht);
  console.log(tValues[lengtht-1]);

  console.log("y0 values");
  console.log(yValues0[lengtht-1]);

  console.log("y1 values");
  console.log(yValues1[lengtht-1]);

};

runResult();