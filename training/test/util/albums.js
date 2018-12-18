'use strict';

exports.queryAlbums = { query: `{  albums { title id } }` };

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

exports.mutationAlbumDelete = id => {
  return { query: `mutation {deleteAlbum(id: ${id})}` };
};
