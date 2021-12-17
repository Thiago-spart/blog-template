/* eslint-disable require-await */
import { NextApiResponse } from "next";

export default async (_: unknown, res: NextApiResponse): Promise<void> => {
	const temporaryRedirectPort = 307;

	res.clearPreviewData();

	res.writeHead(temporaryRedirectPort, { Location: "/" });
	res.end();
};
