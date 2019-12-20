import { create, all } from 'mathjs'

const config = { }
const math = create(all, config)

const ode1SSearlyStop = function (F, t0, dt, tfinal, y0) {
  // ODE1 A simple ODE solver.
  //  result = ODE1(F, t0, dt, tfinal, y0) uses Euler's
  //  method with fixed step size h on the interval
  //    t0 <= t <= tfinal
  //  to solve
  //    dy/dt = F(t, y)
  //  with y(t0) = y0.

  var y = y0;

  var result = [{x: t0, y: y}]; // adding initial conditions

  var nDecCase = 0;

  var dtCases = dt - Math.floor(dt);

  while ( dtCases < 1 ) {
    nDecCase++;
    dtCases = dtCases * 10;
  }

  for (var t = t0; t <= tfinal - dt; t = t + dt) {
    tRound = Number(t.toFixed(nDecCase));
    var s = F(tRound, y);
    if (!s.SS) { // if not still steady state
      // y = y + dt*s
      // y = y.map((a,i) => a + s.dydt.map((x) => x * dt)[i]);
      y = math.add(y, math.multiply(s.dydt,dt));
      result.push({x: tRound + dt, y: y});
    } else {
      return result;
    }    
  }

  return result;
}

export default ode1SSearlyStop;