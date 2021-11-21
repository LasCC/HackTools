import * as React from 'react';
import { Spin, SpinProps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function LoadingIndicator ( props: SpinProps ) {
    return (
        <div
            style={{
                height: '100%',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -520%)'
            }}>
            <Spin indicator={<LoadingOutlined />} {...props} />
        </div>
    );
}