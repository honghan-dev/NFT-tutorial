import { comments } from "../../../../data/comment";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	switch (req.method) {
		case "GET":
			res.status(200).json(comments);
			break;
		case "POST":
			const comment = req.body.comment;
			const newComment = {
				id: comments.length + 1,
				text: comment,
			};
			comments.push(newComment);
			res.status(201).json(newComment);
			break;
		default:
			res.setHeader("Allow", ["GET", "POST"]);
			res.status(405).end(`Method ${req.method} Not Allowed`);
	}
}
