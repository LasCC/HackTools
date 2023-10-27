import { useEffect, useState } from 'react';
import { Table, Input} from 'antd';
import scanmeData from './scanme.json';
import alasql from 'alasql';

const Tabler = () => {
    const [data, setData] = useState([]);

    const columns = [
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        // Add more columns as needed
    ];
    useEffect(() => {
        // Load db in memory
        alasql('CREATE TABLE nmap');
        scanmeData.forEach((result) => {
            result.services.forEach((service) => {
                alasql('INSERT INTO nmap VALUES ?', [{
                    ...result,
                    ...service,
                }]);
            });
        });
        
        setData(scanmeData); // Display all data by default
    }, []);
    const handleQuerySubmit = (query) => {
        try {
            const filteredData = alasql(query);
            setData(filteredData);
        } catch (error) {
            console.error("Invalid SQL query: ", error);
            setData(scanmeData); // Display all data if query is invalid
        }
    };

    return ( <>
            <Input.Search
                placeholder="Enter SQL query"
                enterButton="Submit"
                size="large"
                onSearch={handleQuerySubmit}
            />
            <Table 
                columns={columns}
                dataSource={data}
                rowKey="address"
                expandable={{
                    expandedRowRender: record => (
                      <>
                        <p>{`Hostname: ${record.hostnames}`}</p>
                        <p>{`Uptime: ${record.uptime}`}</p>
                        <p>{`Distance: ${record.distance}`}</p>
                      </>
                    ),
                }}
            />
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </>
    );
};

export default Tabler;