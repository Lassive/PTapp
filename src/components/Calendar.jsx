import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

function Calendar() {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const response = await fetch('https://traineeapp.azurewebsites.net/gettrainings');
        if (!response.ok) {
          throw new Error('Failed to fetch trainings');
        }

        const data = await response.json();
        setTrainings(data);
      } catch (error) {
        console.error('Error fetching trainings:', error);
      }
    };

    fetchTrainings();
  }, []);

  const events = trainings.map(training => {
    const startTime = new Date(training.date);
    const endTime = new Date(startTime.getTime() + training.duration * 60000);

    return {
      title: `${training.activity} - ${training.customer.firstname} ${training.customer.lastname}`,
      start: startTime,
      end: endTime,
      allDay: false,
    };
  });

  return (
    <div>
      <h1>Scheduled trainings</h1>
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
      />
    </div>
  );
}

export default Calendar;
