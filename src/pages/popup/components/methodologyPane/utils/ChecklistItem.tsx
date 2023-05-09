import * as React from 'react';
import { useState } from 'react';
import { Collapse, Button } from 'antd';
import Progress from 'antd/lib/progress';
const { Panel } = Collapse;



const projects = [
    {
        id: 1,
        name: 'Project XXX - X%',
        methodology: 'OWSTG',
        checks: 'X/Y finished - %',
    },
    {
        id: 2,
        name: "Project YYY - X%",
        methodology: 'OWSTG',
        checks: 'X/Y finished - %',
    }
];

const items = projects.map((project) => {
    return (
        <Panel header={project.name} key={project.id}>
            <p>Name of the project : {project.name}</p>
            <p>Methodofology : {project.methodology}</p>
            <p>Checks : {project.checks}</p>
            <Button type="primary">Continue</Button>
        </Panel>
    );
});




const ChecklistItem = (props: any) => {
    return (
        <Collapse>
            {items}
        </Collapse>
    )
};


export default ChecklistItem;