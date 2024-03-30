import React from "react";

type UserProps = {
	id: any;
};

const User = (props: UserProps) => {
	return <div>User {props.id ? props.id : "Please login"}</div>;
};

export default User;
