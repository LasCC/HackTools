import * as React from 'react';
// import BreadCrumbMenu from './BreadCrumbMenu';
import Button from 'antd/lib/button';
import Divider from 'antd/lib/divider';

import ChecklistItem from './utils/ChecklistItem';

import { Collapse } from 'antd';

const { Panel } = Collapse;


const HomeMethodologyPage: React.FC = () => {
    return (
        <div>
            <Button type="primary">Create Project</Button>
            <Divider />
            <ChecklistItem />
        </div>
    );
};


export default HomeMethodologyPage;