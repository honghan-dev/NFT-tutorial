import Link from "next/link";
import React from "react";

const PostList = ({ posts }: any) => {
	return (
		<>
			<div>List of Posts</div>;
			{posts.map((post: any) => {
				return (
					<>
						<Link
							href={`posts/${post.id}`}
							passHref
						>
							<h2>{post.id}</h2>
							<h4>{post.title}</h4>
						</Link>
						<hr />
					</>
				);
			})}
		</>
	);
};

export default PostList;

export const getStaticProps = async () => {
	const response = await fetch("https://jsonplaceholder.typicode.com/posts");
	const data = await response.json();
	return {
		props: {
			posts: data,
		},
	};
};
