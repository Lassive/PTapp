import { AgGridReact } from "ag-grid-react";
import { useEffect, useState } from "react";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { Button } from "@mui/material";
import AddTraining from "./AddTraining";
import DeleteIcon from '@mui/icons-material/Delete';

import { CSVLink } from 'react-csv';



function CustomerList() {

    const [customers, setCustomers] = useState([]);



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
            cellRenderer: params => 
            <EditCustomer data={params.data} fetchCustomers={fetchCustomers}> </EditCustomer>,
            width: 90
        },
        {
            cellRenderer: params => 
            <Button size="small" onClick={() => deleteCustomer(params.data.links[0].href)}><DeleteIcon style={{ color: 'red' }}/></Button>,
            width: 90
            
        },
        {
            cellRenderer: params =>
            <AddTraining data={params.data} fetchCustomers={fetchCustomers} />
        }
        
    ]);

    const deleteCustomer = (url) => {
        if (window.confirm("Are you sure?")) {
            fetch(url, { method: 'DELETE' })
                .then(response => {
                    if (response.ok)
                        return fetchCustomers();
                    else
                        throw new Error("Error in Delete: " + response.statusText);
                })
                .catch(err => console.error(err));
        }
    }

    const customerDataExport = customers.map(customer => ({
        firstname: customer.firstname,
        lastname: customer.lastname,
        streetaddress: customer.streetaddress,
        postcode: customer.postcode,
        city: customer.city,
        email: customer.email,
        phone: customer.phone,
    }));
 
    
return (
    <>
        <br/>
        <td>
        <AddCustomer fetchCustomers={fetchCustomers} />
        </td>
        <td>
        <Button variant="outlined">
                <CSVLink
                    data={customerDataExport}
                    headers={[
                        { label: 'First Name', key: 'firstname' },
                        { label: 'Last Name', key: 'lastname' },
                        { label: 'Street Address', key: 'streetaddress' },
                        { label: 'Postcode', key: 'postcode' },
                        { label: 'City', key: 'city' },
                        { label: 'Email', key: 'email' },
                        { label: 'Phone', key: 'phone' },
                    ]}
                    filename={"customer_data.csv"}>
                    Export to CSV
                </CSVLink>
            </Button>
        </td>
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