const Users = (props: any) => {
	return <div>Users {props.users[0].email}</div>;
};

export default Users;

export const getStaticProps = async () => {
	const response = await fetch("https://jsonplaceholder.typicode.com/users");
	const data = await response.json();
	console.log(data);

	return {
		props: {
			users: data,
		},
	};
};
