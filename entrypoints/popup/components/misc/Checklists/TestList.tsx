import React from 'react';
import { List, Checkbox, Button } from 'antd';


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
    onRemoveTest: ( categoryName: string, testId: string ) => void;
};

const TestList: React.FC<Props> = ( { category, onRemoveTest } ) => {
    const handleRemoveTest = ( testId: string ) => {
        onRemoveTest( category.name, testId );
    };

    return (
        <List
            dataSource={category.tests}
            renderItem={( test: Test ) => (
                <List.Item>
                    <Checkbox checked={test.completed}>{test.name}</Checkbox>
                    <Button type="link" danger onClick={() => handleRemoveTest( test.id )}>
                        Remove
                    </Button>
                </List.Item>
            )}
        />
    );
};

export default TestList;
