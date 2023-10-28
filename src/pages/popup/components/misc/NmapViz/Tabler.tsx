// import { useEffect } from 'react';
// import { Table, Input, AutoComplete} from 'antd';
// import useStore from './store';

// const Tabler = () => {
//     const { data, queryData } = useStore();

//     const columns = [
//         {
//             title: 'Address',
//             dataIndex: 'address',
//             key: 'address',
//         },
//         // Add more columns as needed
//     ];

//     const handleQuerySubmit = (query) => {
//         queryData(query);
//     };

//     const handleSearch = (value) => {
//         if (value) {
//             queryData(value);
//         }
//     };

//     const fields = [
//         'address',
//         'hostnames',
//         'uptime',
//         'distance',
//         'port',
//         'state',
//         'protocol',
//         'service',
//         'banner',
//         'scripts_results',
//         'metadata_state',
//         'metadata_observation'
//     ];


//     return (<>
//         <Input.Search
//             placeholder="Enter SQL query"
//             enterButton="Submit"
//             size="large"
//             onSearch={handleQuerySubmit}
//         />
//         {/* <Table
//             columns={columns}
//             dataSource={data}
//             rowKey="address"
//             expandable={{
//                 expandedRowRender: record => (
//                     <>
//                         <p>{`Hostname: ${record.hostnames}`}</p>
//                         <p>{`Uptime: ${record.uptime}`}</p>
//                         <p>{`Distance: ${record.distance}`}</p>
//                     </>
//                 ),
//             }}
//         /> */}
//         <pre>{JSON.stringify(data, null, 2)}</pre>
//     </>
//     );
// };

// export default Tabler;