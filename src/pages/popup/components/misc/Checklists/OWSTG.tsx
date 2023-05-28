import React, { useEffect } from 'react';
import { Card, Collapse, List, Checkbox, Radio, Divider, Button } from 'antd';
import jsyaml from 'js-yaml';
import useStore from './store';
import { Category, Test, Substep } from './store';

import { Input } from 'antd';

const { TextArea } = Input;

const { Panel } = Collapse;

const OWSTG = () => {
  const setCategories = useStore((state) => state.setCategories);
  const categories = useStore((state) => state.categories);
  const toggleTested = useStore(state => state.toggleTested);
  const setVulnerable = useStore(state => state.setVulnerable);
  const setNote = useStore(state => state.setNote);
  const downloadCSV = useStore((state) => state.downloadCSV);

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
  

  return (
    <div>
      <Button onClick={downloadCSV}>Download CSV</Button>
      <Collapse accordion>
        {categories.map((category: Category, index: number) => (
          <Panel header={category.title} key={index} >
            {category.atomic_tests.map((test: Test) => (
              // add onlickihandler to go to owasp page
              <Card title={`${test.id} - ${test.description}`} key={test.id} style={{ marginBottom: 16 }}>


                { /* if Objectives are available, render them */}
                {test.objectives && test.objectives.length > 0 && (
                  <>

                    <h3>Objectives</h3>
                    <List
                      size="small"
                      bordered
                      dataSource={test.objectives}
                      renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                    <Divider />
                  </>
                )}



                {/* if substeps are available, render them */}
                {test.substeps && Object.values(test.substeps).length > 0 && (
                  <>
                    <h3>Substeps</h3>
                    {Object.values(test.substeps).map((substep: Substep, index: number) => (
                      <p key={index}>{substep.description}</p>
                    ))}
                    <Divider />
                  </>
                )}

                <Checkbox
                  checked={test.wasTested}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleTested(category.id, test.id);
                  }}
                >
                  Was Tested
                </Checkbox>

                <Radio.Group
                  value={test.wasVulnerable}
                  onChange={(e) => {
                    e.stopPropagation();
                    setVulnerable(category.id, test.id, e.target.value);
                  }}
                >
                  <Radio value={true}>Vulnerable</Radio>
                  <Radio value={false}>Not Vulnerable</Radio>
                </Radio.Group>

                <Divider />
                <TextArea
                  rows={4}
                  value={test.note}
                  placeholder="Notes"
                  onChange={(e) => setNote(category.id, test.id, e.target.value)}
                />
              </Card>
            ))}
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default OWSTG;
