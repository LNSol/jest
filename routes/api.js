export const hello = (req, res) => {
  res.status(200).send('Hello World@@@');
};

// ../api/:appid/:version/:schemas/:idcmd?searchStr1=abc&searchStr2=def
export const apiParams = (req, res) => {
  const { appid, version, schemas, idcmd } = req.params;
  res.json({
    appid,
    version,
    schemas,
    idcmd,
    query: req.query,
  });
};
