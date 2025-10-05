// src/analytics.js
import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-ED24P8B9ZD');
};

export const trackEvent = ({ category, action, label, value }) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};
