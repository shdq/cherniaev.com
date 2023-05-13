---
title: "Optimizing SVG Images for Dark Mode: Inverting Colors with CSS and JavaScript"
date: "2023-05-13"
excerpt: "Learn how to optimize SVG images for dark mode by inverting colors with CSS and JavaScript. This article provides easy-to-follow steps to ensure your SVG images remain visible regardless of the user's preferred theme."
image: ""
tags: ["front-end", "javascript", "react", "css", "svg"]
---

## Understanding the problem

If you've ever tried to display SVG images with transparent backgrounds in dark mode, you might have noticed that they become invisible. This is because the background color of the page is dark, making the SVG image blend in.

The easiest solution for this is to use a background, but if it's light, it can be very bright for people who use dark mode. In this article, we'll explore a better solution to this problem: inverting the colors of the SVG image when the theme changes.

## Prepare your CSS

In the global CSS file (e.g., `style.css`), create a CSS variable with the initial value of `none` for the light theme. The name of the CSS variable goes after `--` I called it `svg-invert-filter`:

```css
:root {
  --svg-invert-filter: none;
}
```

`:root` pseudo-class represents the root element in the DOM tree which is technically the `html` element but with higher specificity.

Let's apply the CSS variable to the `filter` property in the same CSS file:

```css
article svg {
  filter: var(--svg-invert-filter);
}
```

In this example, I only want to invert the colors of SVG images inside blog posts, so I put the `article` selector in front of `svg`. The `var()` function here inserts the value of our CSS variable.

## Add some JavaScript

We need to create a helper function that updates the CSS variable based on the current theme value. If theme is `light` CSS variable is `none`, if theme is `dark` we apply `invert()` and `hue-rotate()` functions to the `filter` property.

`helper.js`:

```javascript
const themes = {
  light: {
    svgInvertFilter: "none",
  },
  dark: {
    svgInvertFilter: "invert(93%) hue-rotate(180deg)",
  },
};

export const invertSvg = (theme) => {
  document.body.style.setProperty(
    "--svg-invert-filter",
    themes[theme].svgInvertFilter
  );
};
```

Provided values works well for inverting the colors of SVG images because the `invert(93%)` flips the color scheme of the image while the `hue-rotate(180deg)` function shifts the colors by 180 degrees, ensuring that the resulting image has a natural look and is easily recognizable. However, these values may need to be adjusted depending on the specific colors and shades used in the SVG image.

## Trigger the function

We use the `useEffect()` react hook on the page that triggers this function when the theme changes.

`page.jsx`

```javascript
import { invertSvg } from "../helper";

export default function Page() {
  const { theme } = useTheme();

  useEffect(() => {
    invertSvg(theme);
  }, [theme]);

  // ... rest of you page's code ...
}
```

That's it.

## Look at the result

Inverting colors technique is simple to implement and helps to make sure that our SVG images remain visible regardless of the theme that your users prefer.

You can see an example of this technique in action by visiting my blog post titled [«How to Find a Duplicate in an Array of Positive Numbers with Constant Space Complexity»](/find-duplicate-number-in-array), where I have used it to invert the colors of the SVG images in dark mode.

Thank you for your time! Please follow me on [twitter](https://twitter.com/shdq "@shdq"), and if you have a question, feel free to ask.

## Additional resources for learning

- CSS variables (custom properties): [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- `filter` CSS property: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/filter)
- `var()` function: [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/CSS/var)
- `useEffect()` hook: [React documentation](https://react.dev/reference/react/useEffect)
