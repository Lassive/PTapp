import { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

import dayjs from 'dayjs';

function TrainingsList() {

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

    const [columnDefs] = useState([
        { field: 'date', sortable: true, filter: true, valueFormatter: params => dayjs(params.data.date).format('DD-MM-YYYY HH:mm') },
        { field: 'duration', sortable: true, filter: true },
        { field: 'activity', sortable: true, filter: true },
        {
            headerName: 'Customer',
            field: 'customer',
            sortable: true,
            filter: true,
            valueFormatter: params => {
                if (params.value) {
                  return `${params.value.firstname} ${params.value.lastname}`;
                }
              }
        }
    ]);

    return (
<>
        <div className="ag-theme-material" style={{ width: '100%', height: 650 }}>
            <AgGridReact
                rowData={trainings}
                columnDefs={columnDefs}
                pagination={true}
                paginationAutoSize={true} />
        </div>
        </>
    );

}

export default TrainingsList;