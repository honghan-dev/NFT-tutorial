import { useState } from "react";
import axios from "axios";

interface Comment {
	id: number;
	text: string;
}

export const CommentsPage = () => {
	const [comments, setComments] = useState<Comment[]>([]);
	const [comment, setComment] = useState<string>("");

	const fetchComments = async () => {
		const response = await fetch("/api/comments");
		const data = await response.json();
		setComments(data);
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setComment(e.target.value);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLButtonElement>) => {
		e.preventDefault();
		// const response = await fetch("/api/comments", {
		// 	method: "POST",
		// 	body: JSON.stringify({ comment }),
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 	},
		// });
		let data;
		try {
			data = await axios.post("/api/comments", { comment });
		} catch (error) {
			console.log(error);
		}
		console.log(data);
		// setComments((prev) => [...prev, data]);
		// setComment("");
	};

	return (
		<>
			<input
				type="text"
				value={comment}
				onChange={handleChange}
				className="text-black"
			/>
			<button onClick={handleSubmit}>Add comment</button>
			<button onClick={fetchComments}>Load comments</button>
			{comments.map((comment) => {
				return (
					<div key={comment.id}>
						{comment.id} - {comment.text}
					</div>
				);
			})}
		</>
	);
};

export default CommentsPage;
