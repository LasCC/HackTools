import React, { useState } from 'react';
import { Collapse, List, Checkbox, Radio, Input, Button, Divider, Popconfirm, message } from 'antd';
import Papa from 'papaparse'; // Import PapaParse
import WSTG from '../../../assets/data/Methodology/WSTG.json';

const { Panel } = Collapse;
const { TextArea } = Input;

const MethodologyChecklist = () => {
    const [state, setState] = useState({});

    const prepareDataForCSV = () => {
        const result = [];
        Object.entries(WSTG.categories).forEach(([category, tests]) => {
            tests.tests.forEach(test => {
                const stateTest = state[category]?.[test.id] || {};
                result.push({
                    category,
                    id: test.id,
                    name: test.name,
                    reference: test.reference,
                    tested: stateTest.tested || 'No',
                    vuln: stateTest.vuln || 'N/A',
                    vulnDescription: stateTest.vulnDescription || '',
                });
            });
        });
        return result;
    };

    // Function to export the state to a CSV file
    const exportToCSV = () => {
        const data = prepareDataForCSV();
        const csv = Papa.unparse(data);
        const csvData = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const csvURL = window.URL.createObjectURL(csvData);
        const tempLink = document.createElement('a');
        tempLink.href = csvURL;
        tempLink.setAttribute('download', 'export.csv');
        tempLink.click();
    };

    const handleChange = (category, id, value, field) => {
        setState(prevState => {
            const existingTestData = prevState[category]?.[id] || {};

            if (!existingTestData.name) {
                const originalTestData = WSTG.categories[category].tests.find(test => test.id === id);
                existingTestData.name = originalTestData.name;
                existingTestData.reference = originalTestData.reference;
                existingTestData.objectives = originalTestData.objectives;
            }

            if (field === 'isDone') {
                existingTestData.tested = value ? 'Yes' : 'No';
                existingTestData.vuln = value ? existingTestData.vuln || 'No' : 'N/A';
            }

            if (field === 'hasVuln') {
                existingTestData.vuln = value ? 'Yes' : 'No';
            }





            return {
                ...prevState,
                [category]: {
                    ...(prevState[category] || {}),
                    [id]: {
                        ...existingTestData,
                        [field]: value,
                    },
                },
            };
        });
    };


    const confirm = (e: React.MouseEvent<HTMLElement>) => {
        setState({});
        message.success('Checklist data cleared');
    };

    const cancel = (e: React.MouseEvent<HTMLElement>) => {
        message.error('Canceled');
    };

    return (
        <>
            <Button onClick={exportToCSV} style={{ position: 'absolute', right: 0, top: 0 }}>Export to CSV</Button>
            <Popconfirm
                title="Delete the task"
                description="Are you sure to clear all your checklist ?"
                onConfirm={confirm}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
            >
                <Button type="link">Delete</Button>
            </Popconfirm>
            <Collapse accordion>
                {Object.entries(WSTG.categories).map(([key, value]) => (
                    <Panel header={key} key={value.id}>
                        <List
                            dataSource={value.tests}
                            renderItem={item => (
                                <List.Item.Meta
                                    title={<a href={item.reference}>{`[${item.id}]`} - {item.name} </a>}
                                    description={
                                        <>
                                            <h4>{item.objectives[0]}</h4>
                                            <Divider />
                                            <Checkbox
                                                checked={state[key]?.[item.id]?.isDone || false}
                                                onChange={e => handleChange(key, item.id, e.target.checked, 'isDone')}
                                            >
                                                Done
                                            </Checkbox>
                                            <Radio.Group
                                                value={state[key]?.[item.id]?.hasVuln || 'no'}
                                                onChange={e => handleChange(key, item.id, e.target.value, 'hasVuln')}
                                            >
                                                <Radio value='yes'>Vulnerable</Radio>
                                                <Radio value='no'>Not Vulnerable</Radio>
                                            </Radio.Group>
                                            <TextArea
                                                value={state[key]?.[item.id]?.vulnDescription || ''}
                                                onChange={e => handleChange(key, item.id, e.target.value, 'vulnDescription')}
                                            />
                                        </>
                                    }
                                />
                            )}
                        />
                    </Panel>
                ))}
            </Collapse>
        </>
    );
};

export default MethodologyChecklist;

