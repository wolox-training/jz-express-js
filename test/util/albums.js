'use strict';

exports.queryAlbums = { query: `{  albums { title id } }` };
exports.mutationAlbumDelete = id => {
  return { query: `mutation {deleteAlbum(id: ${id})}` };
};
