import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";


function CustomerList() {

    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const [columnDefs] = useState([
        { field: 'firstname', sortable: true, filter: true },
        { field: 'lastname', sortable: true, filter: true },
        { field: 'streetaddress', sortable: true, filter: true },
        { field: 'postcode', sortable: true, filter: true },
        { field: 'city', sortable: true, filter: true },
        { field: 'email', sortable: true, filter: true },
        { field: 'phone', sortable: true, filter: true },
        {
            cellRenderer: params => <EditCustomer data={params.data} fetchCustomers={fetchCustomers} />
        },
    ]);

    const fetchCustomers = () => {
        fetch('https://traineeapp.azurewebsites.net/api/customers')
        .then(response => {
            if (response.ok)
              return response.json();
            else
                throw new Error("Error in fetch: " + response.statusText);
        })
        .then(data => setCustomers(data.content))
        .catch(err => console.error(err))
    }

return (
    <>
        <AddCustomer fetchCustomers={fetchCustomers} />
        <div className="ag-theme-material" style={{ width: '80%', height: 600 }}>
            <AgGridReact
                rowData={customers}
                columnDefs={columnDefs}
                pagination={true}
                paginationAutoPageSize={true}
            />
        </div>
        
    </>

)


}

export default CustomerList;