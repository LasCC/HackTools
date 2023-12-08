import { Col, Row } from "antd";
import DropdownSelect from "./DropdownSelect";
import FormRenderer from "./FormRenderer";

const App = () => {
	return (
		<Row justify="center" gutter={[24, 24]}>
			<Col xs={24}>
				<DropdownSelect />
			</Col>
			<Col xs={24}>
				<FormRenderer />
			</Col>
		</Row>
	);
};

export default App;
