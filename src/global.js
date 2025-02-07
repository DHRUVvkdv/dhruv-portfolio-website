import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  :root {
    --color-body: ${({ theme }) => theme.body};
    --color-text: ${({ theme }) => theme.text};
    --color-highlight: ${({ theme }) => theme.highlight};
    --color-dark: ${({ theme }) => theme.dark};
    --color-secondaryText: ${({ theme }) => theme.secondaryText};
    --color-imageHighlight: ${({ theme }) => theme.imageHighlight};
    --color-splashBg: ${({ theme }) => theme.splashBg};
  }

  body {
    align-items: center;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    display: flex;
    // flex-direction: column;
    // justify-content: center;
    // height: 100vh;
    // margin: 0;
    // padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }`;
