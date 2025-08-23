export function fade(show) {
  const animateIn = {
    opacity: 1,
    display: "flex",
  };

  const animateOut = {
    opacity: 0,
    transitionEnd: {
      display: "none",
    },
  };

  return show ? animateIn : animateOut;
}

export function slide(show, direction, type, animateInValue, animateOutValue) {
  const animateIn = {
    [direction]: animateInValue || "0px",
    transition: { type: type, duration: 0.5 },
  };
  const animateOut = {
    [direction]: animateOutValue || "1000px",
    transition: { type: type, duration: 0.5 },
  };
  return show ? animateIn : animateOut;
}
