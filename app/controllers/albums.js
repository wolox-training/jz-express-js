'use strict';

const { getResources } = require('../services/album'),
  { decoder, AUTHORIZATION } = require('../services/session'),
  User = require('../models').User,
  Album = require('../models').AlbumUser;

const getUser = auth => {
  const user = decoder(auth);
  return User.getUserBy({
    email: user.email
  });
};

exports.albumList = (req, res, next) =>
  getResources('/albums')
    .then(albums => {
      res.status(200).send(albums);
    })
    .catch(next);

exports.buyAlbum = async (req, res, next) => {
  try {
    const album = await getResources(`/albums/${req.params.id}`);
    const auth = req.headers[AUTHORIZATION];
    const user = await getUser(auth);

    const newAlbum = {
      albumId: album.id,
      userId: user.id
    };
    await Album.createModel(newAlbum);

    res.status(200).send(album);
  } catch (err) {
    next(err);
  }
};

exports.listPurchasedAlbums = async (req, res, next) => {
  try {
    const albumUser = await Album.getAllAlbumBy({
      userId: req.params.userId
    });

    const promises = albumUser.map(async x => {
      const album = await getResources(`/albums/${x.albumId}`);
      return album;
    });

    const results = await Promise.all(promises);
    console.log(`AQUI ESTAN LOS ALBUMS QUE SE VAN A ENVIAR ${JSON.stringify(results)}`);
    res.status(200).send(results);
  } catch (err) {
    next(err);
  }
};
