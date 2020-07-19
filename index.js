import app from './server/server';

const PORT = 9000;

app.listen(process.env.PORT || PORT, () => {
  console.log(`server now listening for requests ${PORT}`);
});
