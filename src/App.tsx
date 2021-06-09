import { h, render } from 'preact';
import { useEffect, useState, useMemo } from 'preact/hooks';

const AppElement = document.querySelector(`#app`);

const App = () => (
  <div>
    <button>connect pen</button>
  </div>
);

if (AppElement) {
  render(<App />, AppElement);
}
