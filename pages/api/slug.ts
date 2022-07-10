import type { NextApiRequest, NextApiResponse } from 'next';
import data from '../../json/data.json';

export default (req: NextApiRequest, res: NextApiResponse) => {
  
  if (!req.query.slug) {
    res.statusCode = 400;
    res.end("Must have a name");
  } else {
    //read and filter artist by slug
    const found = data.artists.filter(artist => artist.slug === req.query.slug);

    if (found.length === 0) {
      res.statusCode = 404;
      res.end(`Pokemon ${req.query.slug} not found`);
    } else {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify(found[0]));
    }
  }
};
