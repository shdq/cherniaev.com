const themes = {
  light: {
    imageFilter: "grayscale(0%)",
    svgInverseFilter: "none",
  },
  dark: {
    imageFilter: "grayscale(25%)",
    svgInverseFilter: "invert(93%) hue-rotate(180deg)",
  },
};

export const inverseSvg = (theme) => {
  document.body.style.setProperty(
    "--svg-inverse-filter",
    themes[theme].svgInverseFilter
  );
}

export const reduceImageBrightness = (theme) => {
  document.body.style.setProperty(
    "--image-filter",
    themes[theme].imageFilter
  );
}