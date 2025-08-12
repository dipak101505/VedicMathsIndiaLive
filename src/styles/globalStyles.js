import { Global, css } from '@emotion/react';

const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Roboto', 'Arial', sans-serif;
        line-height: 1.6;
        color: #212121;
        background-color: #f5f5f5;
      }

      .App {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      /* Custom scrollbar */
      ::-webkit-scrollbar {
        width: 8px;
      }

      ::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      ::-webkit-scrollbar-thumb {
        background: #c1c1c1;
        border-radius: 4px;
      }

      ::-webkit-scrollbar-thumb:hover {
        background: #a8a8a8;
      }

      /* Utility classes */
      .text-center {
        text-align: center;
      }

      .text-left {
        text-align: left;
      }

      .text-right {
        text-align: right;
      }

      .d-flex {
        display: flex;
      }

      .justify-center {
        justify-content: center;
      }

      .justify-between {
        justify-content: space-between;
      }

      .align-center {
        align-items: center;
      }

      .w-100 {
        width: 100%;
      }

      .h-100 {
        height: 100%;
      }

      .mb-1 { margin-bottom: 0.25rem; }
      .mb-2 { margin-bottom: 0.5rem; }
      .mb-3 { margin-bottom: 1rem; }
      .mb-4 { margin-bottom: 1.5rem; }
      .mb-5 { margin-bottom: 3rem; }

      .mt-1 { margin-top: 0.25rem; }
      .mt-2 { margin-top: 0.5rem; }
      .mt-3 { margin-top: 1rem; }
      .mt-4 { margin-top: 1.5rem; }
      .mt-5 { margin-top: 3rem; }

      .p-1 { padding: 0.25rem; }
      .p-2 { padding: 0.5rem; }
      .p-3 { padding: 1rem; }
      .p-4 { padding: 1.5rem; }
      .p-5 { padding: 3rem; }
    `}
  />
);

export default GlobalStyles;
