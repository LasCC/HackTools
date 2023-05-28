import React, { useEffect, useState } from 'react';
import { Card, Table, Checkbox, Radio, Divider, Button, Popconfirm, Tooltip, Progress, Layout, Row, Col, Modal } from 'antd';
import jsyaml from 'js-yaml';
import useStore from './store';
import { Category, Test, Substep } from './store';
import { Input } from 'antd';

const { TextArea } = Input;
const { Header, Content } = Layout;

const OWSTG = () => {
  const setCategories = useStore((state) => state.setCategories);
  const categories = useStore((state) => state.categories);
  const toggleTested = useStore(state => state.toggleTested);
  const setVulnerable = useStore(state => state.setVulnerable);
  const setNote = useStore(state => state.setNote);
  const downloadCSV = useStore((state) => state.downloadCSV);
  const reset = useStore((state) => state.reset);
  const totalTests = categories.reduce((total, category) => total + category.atomic_tests.length, 0);
  const completedTests = categories.reduce((total, category) => total + category.atomic_tests.filter(test => test.wasTested).length, 0);

  const vulnerableTests = categories.reduce((total, category) => total + category.atomic_tests.filter(test => test.wasVulnerable).length, 0);
  const notVulnerableTests = categories.reduce((total, category) => total + category.atomic_tests.filter(test => !test.wasVulnerable && test.wasTested).length, 0);


  useEffect(() => {
    const fetchChecklist = async () => {
      // Only fetch if categories are empty
      if (categories.length === 0) {
        try {
          const response = await fetch('https://raw.githubusercontent.com/rb-x/ht-methodology-test/master/owstg.yaml');
          const data = await response.text();
          const parsedData = jsyaml.load(data).map(item => item.category) as Category[];
          console.log(parsedData);
          setCategories(parsedData);
        } catch (error) {
          console.error('Failed to fetch OWSTG checklist:', error);
        }
      }
    };

    fetchChecklist();
  }, [setCategories, categories]);


  const confirm = () => {
    reset();
  };

  const cancel = () => {
    console.log("Cancelled");
  };


  const columns = [
    {
      title: 'Test ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      filters: categories.flatMap((category) =>
        category.atomic_tests.map((test) => ({ text: test.description, value: test.description }))
      ),

    onFilter: (value, record) => record.description.indexOf(value) === 0,
    render: (text, record) => (
      <a onClick={() => openModal(record)}>{text}</a>
    ),
    },
    {
      title: 'Tested',
      dataIndex: 'wasTested',
      key: 'wasTested',
      render: (text, record) => (
        <Checkbox
          checked={record.wasTested}
          onClick={(e) => {
            e.stopPropagation();
            toggleTested(record.categoryId, record.id);
          }}
        >
          Was Tested
        </Checkbox>
      ),
    },
    {
      title: 'Vulnerability',
      dataIndex: 'wasVulnerable',
      key: 'wasVulnerable',
      render: (text, record) => (
        <Radio.Group
          value={record.wasVulnerable}
          onChange={(e) => {
            e.stopPropagation();
            setVulnerable(record.categoryId, record.id, e.target.value);
          }}
        >
          <Radio value={true}>Vulnerable</Radio>
          <Radio value={false}>Not Vulnerable</Radio>
        </Radio.Group>
      ),
    },
    {
      title: 'Notes',
      dataIndex: 'note',
      key: 'note',
      render: (text, record) => (
        <TextArea
          rows={4}
          value={record.note}
          placeholder="Notes"
          onChange={(e) => setNote(record.categoryId, record.id, e.target.value)}
        />
      ),
    },
  ];

  const data = categories.flatMap((category) =>
    category.atomic_tests.map((test) => ({ ...test, categoryId: category.id }))
  );

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);



  // Open the modal and set the current test
  const openModal = (record) => {
    setCurrentTest(record);
    setIsModalVisible(true);
  };

  // Close the modal and clear the current test
  const closeModal = () => {
    setCurrentTest(null);
    setIsModalVisible(false);
  };
  
  return (
    <>
    <Table columns={columns} dataSource={data} rowKey="id" />
    <Modal open={isModalVisible} onCancel={closeModal}>
      <h2>{currentTest?.description}</h2>
      <TextArea
        rows={4}
        value={currentTest?.note}
        placeholder="Notes"
        onChange={(e) => setNote(currentTest?.categoryId, currentTest?.id, e.target.value)}
      />
    </Modal>
  </>
  );
};

export default OWSTG;



