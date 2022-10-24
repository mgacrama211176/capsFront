import React from "react";

const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "1920px",
  desktopL: "2560px",
};

export const device = {
  mobileS: `(max-width: ${size.mobileS}) { ... }`,
  mobileM: `(min-width: ${size.mobileM} and (max-width: 424px)) { ... }`,
  mobileL: `(min-width: ${size.mobileL} and (max-width: 767px)) { ... }`,
  tablet: `(min-width: ${size.tablet} and (max-width: 1023px)) { ... }`,
  laptop: `(min-width: ${size.laptop} and (max-width: 1440px)) { ... }`,
  laptopL: `(min-width: ${size.laptopL} and (max-width: 1919px)) { ... }`,
  desktop: `(min-width: ${size.desktop} and (max-width: 2559px)) { ... }`,
  desktopL: `(min-width: ${size.desktopL}) { ... }`,
};

const media = () => {
  return <div></div>;
};

export default media;
