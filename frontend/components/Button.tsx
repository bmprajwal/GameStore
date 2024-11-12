import React from "react";

type ButtonProps = {
	type: "edit" | "delete" | "normal"; 
	label: string; 
	onClick: () => void; 
};

const Button: React.FC<ButtonProps> = ({ type, label, onClick }) => {
	let buttonStyle = "";

	switch (type) {
		case "edit":
			buttonStyle = "bg-blue-500 hover:bg-blue-700 text-white";
			break;
		case "delete":
			buttonStyle = "bg-red-500 hover:bg-red-700 text-white";
			break;
		case "normal":
			buttonStyle = "bg-gray-500 hover:bg-gray-700 text-white";
			break;
	}

	return (
		<button
			onClick={onClick}
			className={`py-2 px-4 rounded ${buttonStyle} transition-all duration-300`}
		>
			{label}
		</button>
	);
};

export default Button;
