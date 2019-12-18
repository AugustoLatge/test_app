const testFunctionPartial = (a,dydt, y, t) => {
  return function (dydt, y, t) {
    dydt[0] = y[1];
    dydt[1] = 2*(a-t)*y[0]^2;
  }
}

export default testFunctionPartial;