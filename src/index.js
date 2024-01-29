import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import NavBar from './componats/NavBar';
import MainSlidebar from './componats/mainSlidebar';
import reportWebVitals from './reportWebVitals';
import './componats/Teacher-dashboard.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <NavBar name="DnyanDeep Tutorial" />
    <section>
      <aside class="main-slidebar">
        <MainSlidebar name="DashBoard" />
      </aside>
    </section>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
