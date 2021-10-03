import React from 'react';
import { Bar } from 'react-chartjs-2';

export const BarChart = (props) => {
    const backgroundColor = props.horizontal.map((item, index) => {
        return(`rgba(${index*15}, ${index*5}, ${index*25}, ${.2})`);
    });
    const color = props.horizontal.map((item, index) => {
        return(`rgba(${index*15}, ${index*5}, ${index*25}, ${1})`);
    });

    return(
        <div>
            <Bar
            options={{responsive: true, maintainAspectRatio: true}}
            data={{
                labels: [...props.horizontal],
                datasets: [{
                    label: 'Incident Count',
                    data: [...props.vertical],
                    backgroundColor: [...backgroundColor],
                    borderColor: [...color],
                    // backgroundColor: [
                    //     'rgba(255, 99, 132, 0.2)',
                    //     'rgba(54, 162, 235, 0.2)',
                    //     'rgba(255, 206, 86, 0.2)',
                    //     'rgba(75, 192, 192, 0.2)',
                    //     'rgba(153, 102, 255, 0.2)'
                    // ],
                    // borderColor: [
                    //     'rgba(255, 99, 132, 1)',
                    //     'rgba(54, 162, 235, 1)',
                    //     'rgba(255, 206, 86, 1)',
                    //     'rgba(75, 192, 192, 1)',
                    //     'rgba(153, 102, 255, 1)'
                    // ],
                    borderWidth: 1
                }]
            }}>
            </Bar>
        </div>
    );
}