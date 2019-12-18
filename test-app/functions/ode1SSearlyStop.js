const ode1 = function (F, t0, dt, tfinal, y0) {
  // ODE1 A simple ODE solver.
  //  result = ODE1(F, t0, dt, tfinal, y0) uses Euler's
  //  method with fixed step size h on the interval
  //    t0 <= t <= tfinal
  //  to solve
  //    dy/dt = F(t, y)
  //  with y(t0) = y0.

  var y = y0;

  var result = [{x: t0, y: y}]; // adding initial conditions

  for (var t = t0; t <= tfinal - dt; t = t + dt) {
    var s = F(t, y);
    if (!s.SS) { // if not still steady state
      // y = y + dt*s
      y = y.map((a,i) => a + s.dydt.map((x) => x * dt)[i]);
      result.push({x: t + dt, y: y});
    } else {
      return result;
    }    
  }

  return result;
}

export default ode1;