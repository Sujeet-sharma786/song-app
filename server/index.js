const express = require('express');
const ffmpeg = require('fluent-ffmpeg');
const request = require('request');
const stream = require('stream');

const app = express();
const PORT = 3000;

app.get('/convert-mp3', (req, res) => {
  const mp4Url = req.query.url;
  console.log(mp4Url);

  if (!mp4Url) {
    return res.status(400).send('Missing url parameter');
  }

  const passthroughStream = new stream.PassThrough();

  ffmpeg(request(mp4Url))
    .format('mp3')
    .on('error', (err) => {
      console.error('Conversion error:', err.message);
      res.status(500).send('Conversion failed');
    })
    .pipe(passthroughStream);

  res.setHeader('Content-Type', 'audio/mpeg');
  passthroughStream.pipe(res);
});

app.listen(5000);
