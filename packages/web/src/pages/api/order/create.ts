import type { NextApiRequest, NextApiResponse } from "next";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: "John Doe" });
};

export default handler;
