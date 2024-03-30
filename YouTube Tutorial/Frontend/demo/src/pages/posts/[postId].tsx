import React from "react";

const Post = ({ post }: any) => {
	return (
		<>
			<h2>{post.id}</h2>
			<h4>{post.body}</h4>
		</>
	);
};

export default Post;

export const getStaticPaths = async () => {
	const response = await fetch("https://jsonplaceholder.typicode.com/posts");
	const data = await response.json();

	const paths = data.map((post: { id: number }) => {
		return {
			params: {
				postId: `${post.id}`,
			},
		};
	});

	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps = async (context: any) => {
	const { params } = context;
	const response = await fetch(
		`https://jsonplaceholder.typicode.com/posts/${params.postId}`
	);
	const data = await response.json();

	return {
		props: {
			post: data,
		},
	};
};
