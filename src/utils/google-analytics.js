// src/analytics.js
import ReactGA from 'react-ga4';

export const initGA = () => {
  ReactGA.initialize('G-KD9BB3N9E5');
};

export const trackEvent = ({ category, action, label, value }) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};
