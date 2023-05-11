import * as React from 'react';
import { Tabs } from 'antd';
import { TabsProps, Breadcrumb, BreadcrumbItemProps } from 'antd';
import NOTEPAD from '../misc/Notepad';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { goTo, getCurrent, Link } from 'react-chrome-extension-router';
import PersistedState from 'use-persisted-state';
import CreateProjectPage from './CreateProjectPage';
import HomeMethdologyPane from './HomeMethodologyPage';

const onChange = (key: string) => {
    console.log(key);
};



const items: TabsProps['items'] = [
    {
        key: '1',
        label: `Quick Note`,
        children: <NOTEPAD />,
    },
    {
        key: '2',
        label: `Checklist`,
        children: (
        <div>
            {/* <BreadcrumbMenu/> */}
            <HomeMethdologyPane/>
        </div>
        
        ),
    },
    // {
    //     key: '3',
    //     label: `Tab 3`,
    //     children: `Overview `,
    // },
];



const breadCrumbGeneralMenuItems = [
    {
        key: '1',
        label: 'Project XXX - Dynamic',
    },
];



function BreadcrumbMenu () {
    return
    //  <Breadcrumb
    // items={[
    //     {
    //         title: (
    //             <>
    //             <HomeOutlined/>
    //             <a href="">Home</a>
    //             </>
    //         ),
    //     },
        // {
        //     title: "Methodology",
        //     menu: { items: breadCrumbGeneralMenuItems },
//         // },
//     ]}
// />
}



export function TabMenu () {
    return (
        <>
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </>

    )
}
