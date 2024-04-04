import React from 'react';
import "chart.js/auto";
import { Line } from 'react-chartjs-2';

const AdmissionDropoutGraph = () => {
    const data = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'Admissions',
                data: [50, 60, 40, 60, 90, 10, 80], // Placeholder data for admissions
                borderColor: 'rgba(75,192,192,1)',
                backgroundColor: 'rgba(75,192,192,0.2)',
                fill: false
            },
            {
                label: 'Dropouts',
                data: [10, 20, 30, 20, 30, 10, 20], // Placeholder data for dropouts
                borderColor: 'rgba(255,99,132,1)',
                backgroundColor: 'rgba(255,99,132,0.2)',
                fill: false
            }
        ]
    };

    return (
        <div>
            <h2 color='white'>Admissions & Dropouts</h2>
            <Line data={data} />
        </div>
    );
};

export default AdmissionDropoutGraph;
