import { Button, Card, Checkbox, Col, Divider, Input, Layout, Modal, Popconfirm, Progress, Radio, Row, Table, Tooltip, message } from 'antd';
import jsyaml from 'js-yaml';
import { useEffect, useState } from 'react';
import createOWSTGStore, { Category, Substep } from './stores/MethodologyStore';

const { TextArea } = Input;
const { Header, Content } = Layout;

const OWSTG = ({ id }: { id: string }) => {
  const useStore = createOWSTGStore(id);
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
          const response = await fetch('https://raw.githubusercontent.com/LasCC/Hack-Tools/dev/src/pages/popup/assets/data/Methodology/owstg.yaml');
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
    message.success('Resetted');
  };

  const cancel = () => {
    message.error('Cancelled');
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
      // filter by checkbox and reference link since some tests have the same name but different reference links


      filters: [
        { text: 'Yes', value: true },
        { text: 'No', value: false },
      ],
      onFilter: (value, record) => record.wasTested === value,

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

      filters: [
        { text: 'Vulnerable', value: true },
        { text: 'Not Vulnerable', value: false },
      ],
      onFilter: (value, record) => record.wasVulnerable === value,
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
  const [exportOption, setExportOption] = useState('all');
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);

  const openExportModal = () => {
    setIsExportModalVisible(true);
  };

  const closeExportModal = () => {
    setIsExportModalVisible(false);
  };





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

  const exportCSVModal = (
    <Modal
      title="Export as CSV"
      open={isExportModalVisible}
      onOk={() => {
        downloadCSV(exportOption);
        closeExportModal();
      }}
      onCancel={closeExportModal}
    >
      <p>Please select which tests you want to export:</p>
      <Radio.Group onChange={(e) => setExportOption(e.target.value)} value={exportOption}>
        <Radio value='all'>All Tests</Radio>
        <Radio value='vulnerable'>Vulnerable Tests</Radio>
        <Radio value='not_vulnerable'>Not Vulnerable Tests</Radio>
      </Radio.Group>
    </Modal>

  )

  const onDescriptionCaseClickModal = (
    <Modal open={isModalVisible} onCancel={closeModal}>
      <h2>{currentTest?.description}</h2>
      <TextArea
        rows={4}
        value={currentTest?.note}
        placeholder="Notes"
        onChange={(e) => setNote(currentTest?.categoryId, currentTest?.id, e.target.value)}
      />
      <Divider />

      {currentTest?.substeps.map((substep: Substep) => (
        <>
          <p>{`${substep}`}</p>
        </>
      ))}

    </Modal>)



  return (
    <>


      <Row gutter={[16, 16]}>

        <Col span={24} >
          <Card title="Total progress" style={{ width: "100%" }}>
            <Tooltip title={`${completedTests} / ${totalTests} completed`}>
              <Progress
                type="circle"
                percent={parseFloat(((completedTests / totalTests) * 100).toFixed(2))}
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                style={{ marginRight: '10px' }}
                size='small'
              />
            </Tooltip>
            <Tooltip title={`${vulnerableTests} / ${totalTests} issue(s) identified`}>
              <Progress
                type="circle"
                percent={parseFloat(((vulnerableTests / totalTests) * 100).toFixed(2))}
                strokeColor="red"
                style={{ marginTop: '10px' }}
                size='small'
              />
            </Tooltip>
            <Button type="primary" onClick={openExportModal} style={{ marginLeft: '10px' }}>Export as CSV</Button>
            <Popconfirm
              title="Are you sure to reset all your progress?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
              placement="bottom"

            >
              <Button type="primary" danger style={{ marginLeft: '10px' }} >Reset</Button>
            </Popconfirm>

          </Card>
        </Col>




      </Row>


      <Divider />

      <Table columns={columns} dataSource={data} rowKey="id" />

      {onDescriptionCaseClickModal}
      {exportCSVModal}
    </>
  );
};

export default OWSTG;



