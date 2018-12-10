'use strict';

exports.queryAlbums = { query: `{  albums { title id } }` };
exports.mutationAlbum = { query: `mutation {deleteAlbum(id: 1)}` };
exports.otherMutationAlbum = { query: `mutation {deleteAlbum(id: 6)}` };
exports.mutationCreateAlbum = {
  query: `mutation {
    createAlbum(title: "hola") {
      id
      title
    }
  }`
};

exports.albumCreatedApi = {
  id: '101',
  title: 'hola'
};
