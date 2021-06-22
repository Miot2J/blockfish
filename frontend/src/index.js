import React from 'react';
import ReactDOM from 'react-dom';
import { CookiesProvider } from 'react-cookie';
import './styles/global.scss';
import 'slick-carousel/slick/slick.css'; // Slick Carousel css
import 'slick-carousel/slick/slick-theme.css'; // Slick Carousel css

import App from './App';

ReactDOM.render(
  <CookiesProvider>
    <App />
  </CookiesProvider>,
  document.getElementById('root'),
);
