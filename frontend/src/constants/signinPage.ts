export const iconOpacityMotion = {
  rest: {
    opacity: 0.2,
    y: 100,
    transition: {
      duration: 1,
    },
  },
  hover: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
    },
  },
};

export const signInOpacityMotion = {
  rest: {
    opacity: 0,
    x: -100,
    transition: {
      duration: 1,
    },
  },
  hover: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 1,
    },
  },
};

export const inputContainerMotion = {
  rest: {
    width: 0,
    transition: {
      duration: 1,
    },
  },
  hover: {
    width: "full",
    transition: {
      duration: 1,
    },
  },
};

export const flexMotion = {
  rest: {
    flex: 1,
    transition: {
      duration: 1,
    },
  },
  hover: {
    flex: 5,
    transition: {
      duration: 1,
    },
  },
};
