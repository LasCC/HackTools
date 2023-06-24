import { Button, Card, Checkbox, Col, Divider, Form, Input, Layout, Modal, Popconfirm, Progress, Radio, Row, Table, Tooltip, message } from 'antd';
import jsyaml from 'js-yaml';
import { useEffect, useRef, useState } from 'react';
import createOWSTGStore, { Category, Substep } from './stores/MethodologyStore';
import tabStateStore from './stores/TabStateStore';
const { TextArea } = Input;
const { Header, Content } = Layout;


const OWSTG = ({ id }: { id: string }) => {
  const useStore = createOWSTGStore(id);
  const setCategories = useStore((state) => state.setCategories);
  const categories = useStore((state) => state.categories);
  const toggleTested = useStore(state => state.toggleTested);
  const setVulnerable = useStore(state => state.setHasConcern);
  const setNote = useStore(state => state.setNote);
  const downloadCSV = useStore((state) => state.downloadCSV);
  const reset = useStore((state) => state.reset);
  const typeOfChecklist = useStore((state) => state.typeOfChecklist);
  const setTypeOfChecklist = useStore((state) => state.setTypeOfChecklist);


  const fetchMethodology = useStore((state) => state.fetchMethodology);
  const [methodologyURL, setMethodologyURL] = useState('');

  const methodologyOption = useStore((state) => state.methodologyOption);
  const setMethodologyOption = useStore((state) => state.setMethodologyOption);


  const totalTests = categories.reduce((total, category) => total + category.atomic_tests.length, 0);
  const completedTests = categories.reduce((total, category) => total + category.atomic_tests.filter(test => test.wasTested).length, 0);
  const vulnerableTests = categories.reduce((total, category) => total + category.atomic_tests.filter(test => test.hasConcern).length, 0);
  const notVulnerableTests = categories.reduce((total, category) => total + category.atomic_tests.filter(test => !test.hasConcern && test.wasTested).length, 0);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to export state
  const exportState = () => {
    const tabName = tabStateStore.getState().items.find(item => item.key === id)?.label;
    const currentState = useStore.getState();
    const blob = new Blob([JSON.stringify(currentState)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = data[0]?.url;
    link.download = `methodology_state_${tabName}_${new Date().toISOString()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };


  const importState = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      console.warn("No file selected!");
      return;
    }
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      const newState = JSON.parse(result);
      useStore.setState(newState);
    };
    reader.readAsText(file);
  };

  // Fetch OWSTG checklist
  useEffect(() => {
    const fetchChecklist = async () => {
      if (categories.length === 0) {
        try {
          const response = await fetch('https://raw.githubusercontent.com/rb-x/ht-methodology-test/master/owstg.yaml');
          let data = jsyaml.load(await response.text())
          setCategories(data.map(item => item.category).filter(item => item) as Category[]);
          setTypeOfChecklist(data[0]?.type)
        } catch (error) {
          console.error('Failed to fetch OWSTG checklist:', error);
        }
      }
    };

    fetchChecklist();
  }, [setCategories, categories]);

  // Popconfirm functions
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
      render: (text, record) => (
        <a href={`${record.reference}`} target="_blank" rel="noreferrer">{text}</a>
      ),
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
      title: typeOfChecklist === 'pentest' ? 'Vulnerable' : 'Has Concern',
      dataIndex: 'hasConcern',
      key: 'hasConcern',

      filters: [
        { text: 'Vulnerable', value: true },
        { text: 'Not Vulnerable', value: false },
      ],
      onFilter: (value, record) => record.hasConcern === value,
      render: (text, record) => (
        <Radio.Group
          value={record.hasConcern}
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


  // Table data
  const data = categories.flatMap((category) =>
    category.atomic_tests.map((test) => ({ ...test, categoryId: category.id }))
  );

  // Modal states
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentTest, setCurrentTest] = useState(null);
  const [exportOption, setExportOption] = useState('all');
  const [isExportModalVisible, setIsExportModalVisible] = useState(false);
  const [isMethodologyModalVisible, setIsMethodologyModalVisible] = useState(false);




  const openMethodologyModal = () => {
    setIsMethodologyModalVisible(true);
  };

  const closeMethodologyModal = () => {
    setIsMethodologyModalVisible(false);
  };
  const loadMethodology = async () => {
    await fetchMethodology(methodologyURL);
    closeMethodologyModal();
  };

  // Modal functions
  const openExportModal = () => {
    setIsExportModalVisible(true);
  };
  const closeExportModal = () => {
    setIsExportModalVisible(false);
  };
  const openModal = (record) => {
    setCurrentTest(record);
    setIsModalVisible(true);
  };
  const closeModal = () => {
    setCurrentTest(null);
    setIsModalVisible(false);
  };

  const onChangeMethodologyOption = (e) => {
    // @ts-ignore
    setMethodologyOption(e.target.value);
  };


  const loadMethodologyModal = (
    <Modal
      title="Load Methodology"
      open={isMethodologyModalVisible}
      onOk={loadMethodology}
      onCancel={closeMethodologyModal}
    >
      <Radio.Group onChange={onChangeMethodologyOption} value={methodologyOption}>
        <Radio value="default">Load Default OWSTG</Radio>
        <Radio value="custom">Load Custom Methodology</Radio>
      </Radio.Group>

      {methodologyOption === 'custom' && (
        <Form.Item label="Methodology URL">
          <Input value={methodologyURL} onChange={(e) => setMethodologyURL(e.target.value)} />
        </Form.Item>
      )}
    </Modal>
  );



  // Modal components
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
            <Button type="primary" onClick={exportState} style={{ marginLeft: '10px' }}>Export State</Button>
            <input ref={fileInputRef} type="file" hidden onChange={importState} />
            <Button type="primary" onClick={() => fileInputRef.current?.click()} style={{ marginLeft: '10px' }}>Import State</Button>
            <Button type="primary" onClick={openMethodologyModal} style={{ marginLeft: '10px' }}>
              Load Methodology
            </Button>
          </Card>
        </Col>
      </Row>

      <Divider />

      <Table columns={columns} dataSource={data} rowKey="id" />

      {onDescriptionCaseClickModal}
      {exportCSVModal}
      {loadMethodologyModal}

    </>
  );
};

export default OWSTG;
