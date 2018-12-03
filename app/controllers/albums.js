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

exports.listPhotosAlbum = async (req, res, next) => {
  try {
    const album = await Album.getAlbumBy({
      albumId: req.params.id,
      userId: req.user.id
    });
    if (!album) throw error.albumsNotFound('You have not bought this album yet');
    const photos = await getResources(`/albums/${album.albumId}/photos`);
    res.status(200).send(photos);
  } catch (err) {
    next(err);
  }
};

exports.listPurchasedAlbums = async (req, res, next) => {
  try {
    const albumUser = await Album.getAllAlbumBy({
      userId: req.params.userId
    });

    const promisesAlbumPhotos = albumUser.map(album => getResources(`/albums/${album.albumId}`));

    const albumPhotos = await Promise.all(promisesAlbumPhotos);
    res.status(200).send(albumPhotos);
  } catch (err) {
    next(err);
  }
};
