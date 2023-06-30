import React from 'react';
import { Select } from 'antd';
import { useStore } from './store';

const { Option } = Select;

const payloadOptions = ['Zabbix', 'MySQL', 'Custom'];

const DropdownSelect: React.FC = () => {
  const payload = useStore((state) => state.payload);
  const setPayload = useStore((state) => state.setPayload);

  const handlePayloadChange = (value: string) => {
    setPayload(value);
  };

  return (
    <div>
      <Select placeholder="Select a payload" value={payload}  showSearch onChange={handlePayloadChange}>
        {payloadOptions.map((option) => (
          <Option key={option} value={option}>
            {option}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default DropdownSelect;
