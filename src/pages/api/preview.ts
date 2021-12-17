import { NextApiRequest, NextApiResponse } from "next";

import { getPrismicClient } from "services/prismic";

import { Document } from "@prismicio/client/types/documents";

const linkResolver = (doc: Document): string => (doc.type === "posts" ? `/post/${doc.uid}` : "/");

export default async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
	const { token: ref, documentId } = req.query;
	const notFoundPort = 401;
	const foundPort = 302;

	const redirectUrl = await getPrismicClient(req)
		.getPreviewResolver(String(ref), String(documentId))
		.resolve(linkResolver, "/");

	if (!redirectUrl) {
		res.status(notFoundPort).json({ message: "Invalid token" });

		return;
	}

	res.setPreviewData({ ref });
	res.writeHead(foundPort, { Location: redirectUrl });
	res.end();
};
