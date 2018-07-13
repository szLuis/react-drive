import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import DriveDashboard from './DriveDashboard';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<DriveDashboard />, document.getElementById('root'));
registerServiceWorker();
