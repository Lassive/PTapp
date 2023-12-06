import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import _ from 'lodash';

function Statistics() {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        fetchTrainings();

    }, []);

    const fetchTrainings = () => {
        fetch('https://traineeapp.azurewebsites.net/gettrainings')
            .then(response => {
                if (response.ok)
                    return response.json();
                else
                    throw new Error("Error in fetch: " + response.statusText);
            })
            .then(data => setTrainings(data))
            .catch(err => console.error(err));       
    }

  const groupedData = _.groupBy(trainings, 'activity');
  const summarizedData = _.map(groupedData, (group, key) => ({
    activity: key,
    totalMinutes: _.sumBy(group, 'duration'),
  }));

  return (
    <div>
      <h1>Statistics page</h1>
      <BarChart width={1000} height={400} data={summarizedData}>
        <XAxis dataKey="activity" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="totalMinutes" name="Duration (min)" />


      </BarChart>
    </div>
  );
}

export default Statistics;
