'use strict';

const { getResources } = require('../services/album'),
  { decoder, AUTHORIZATION } = require('../services/session'),
  User = require('../models').User,
  error = require('../errors'),
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

exports.listPurchasedAlbums = (req, res, next) =>
  Album.getAlbumBy({
    userId: req.params.userId
  })
    .then(albumUser => {
      res.status(200).send(albumUser);
    })
    .catch(next);

exports.listPhotosAlbum = async (req, res, next) => {
  try {
    const albums = await Album.getAlbumBy({
      albumId: req.params.id
    });
    if (!albums.length) throw error.albumsNotFound('You have not bought this album yet');
    const photos = await getResources(`/albums/${albums[0].albumId}/photos`);
    res.status(200).send(photos);
  } catch (err) {
    next(err);
  }
};
