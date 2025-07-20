import '@testing-library/jest-dom'

if (typeof CSS === 'undefined') {
  global.CSS = {} as any;
}

if (!CSS.supports) {
  CSS.supports = () => true;
}