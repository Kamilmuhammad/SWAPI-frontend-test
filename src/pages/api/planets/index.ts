// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  data: any;
  error: any;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { page } = req.headers;
  try {
    const response = await fetch(`https://swapi.dev/api/planets${page}`);
    const data = await response.json();
    res.status(200).json({
      data,
      error: undefined
    });
  } catch (err) {
    res.status(500).json({
      error: 'failed to load data',
      data: undefined
    });
  }
}
