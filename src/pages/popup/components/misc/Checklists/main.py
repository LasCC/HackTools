import yaml
import json
import os

# Configurable file paths
yaml_file_path = 'pentest.yml'
json_file_path = 'output.json'

# Check if YAML file exists
if not os.path.exists(yaml_file_path):
    print(f"YAML file {yaml_file_path} does not exist.")
    exit(1)

try:
    # Open the YAML file and load into a Python object
    with open(yaml_file_path, 'r') as yaml_file:
        yaml_data = yaml.safe_load(yaml_file)
except Exception as e:
    print(f"Failed to load YAML file {yaml_file_path}: {str(e)}")
    exit(1)

# Iterate over the data and transform 'substeps' from a list of strings to a list of objects
# and add 'testCaseStatus' to each atomic test
for category in yaml_data:
    for atomic_test in category.get('category', {}).get('atomic_tests', []):
        substeps = atomic_test.get('substeps', [])
        atomic_test['substeps'] = [
            {
                "step": f'Step {i+1}', 
                "description": substep
            } 
            for i, substep in enumerate(substeps)
        ]
        atomic_test['testCaseStatus'] = "NOT_TESTED"  # Add testCaseStatus field
        if 'wasTested' in atomic_test: del atomic_test['wasTested']  # Remove wasTested field
        if 'hasConcern' in atomic_test: del atomic_test['hasConcern']  # Remove hasConcern field

try:
    # Convert the Python object to JSON and write to a new file
    with open(json_file_path, 'w') as json_file:
        json.dump(yaml_data, json_file, indent=4)
except Exception as e:
    print(f"Failed to write JSON file {json_file_path}: {str(e)}")
    exit(1)