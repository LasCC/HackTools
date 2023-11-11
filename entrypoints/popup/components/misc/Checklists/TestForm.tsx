import React, { useState } from 'react';
import { Button, Input, Space } from 'antd';


export type Test = {
    id: string;
    name: string;
    description: string;
    completed: boolean;
};

export type Category = {
    name: string;
    tests: Test[];
};

export type Checklist = {
    [ categoryName: string ]: Test[];
};

type Props = {
    category: Category;
    onAddTest: ( categoryName: string, test: Test ) => void;
};

const TestForm: React.FC<Props> = ( { category, onAddTest } ) => {
    const [ testName, setTestName ] = useState( '' );

    const handleAddTest = () => {
        const test: Test = {
            id: String( category.tests.length + 1 ),
            name: testName,
            description: '',
            completed: false,
        };
        onAddTest( category.name, test );
        setTestName( '' );
    };

    return (
        <Space>
            <Input value={testName} onChange={( e ) => setTestName( e.target.value )} placeholder="Test name" />
            <Button type="primary" onClick={handleAddTest} disabled={!testName}>
                Add Test
            </Button>
        </Space>
    );
};

export default TestForm;
