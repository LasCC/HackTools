import { Table } from 'antd';
import { useState } from 'react';
import scanmeData from './scanme.json';

const Tabler = () => {
    const [data, setData] = useState(scanmeData);

    const columns = [
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        // Add more columns as needed
    ];

    return (
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
    );
};

export default Tabler;