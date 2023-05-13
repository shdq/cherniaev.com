const themes = {
  light: {
    imageFilter: "grayscale(0%)",
    svgInvertFilter: "none",
    backgroundCodeColor: "#f2f2f2",
  },
  dark: {
    imageFilter: "grayscale(25%)",
    svgInvertFilter: "invert(93%) hue-rotate(180deg)",
    backgroundCodeColor: "#343434",
  },
};

export const invertSvg = (theme) => {
  document.body.style.setProperty(
    "--svg-inverse-filter",
    themes[theme].svgInvertFilter
  );
};

export const reduceImageBrightness = (theme) => {
  document.body.style.setProperty("--image-filter", themes[theme].imageFilter);
};

export const invertBackgroundCodeColor = (theme) => {
  document.body.style.setProperty(
    "--background-code-color",
    themes[theme].backgroundCodeColor
  );
};
