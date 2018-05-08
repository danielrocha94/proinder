module.exports = {
  hrPool: {
    user          : "admin",
    password      : "password",
    connectString : "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=proinder.cikpr4aojpml.us-west-2.rds.amazonaws.com)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=ORCL)))",
    poolMin: 10,
    poolMax: 10,
    poolIncrement: 0
  },
  port: process.env.HTTP_PORT || 3000
};
