import { Button } from "antd";
import React from "react";
import { useStore } from "./store";

const SaveButton: React.FC = () => {
	const request = useStore((state) => state.request);

	const saveFile = () => {
		// logic to save file will go here
	};

	return <Button onClick={saveFile}>Save</Button>;
};

export default SaveButton;
