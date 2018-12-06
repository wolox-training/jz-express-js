'use strict';

exports.queryAlbums = { query: `{  albums { title id } }` };
exports.mutationAlbum = { query: `mutation {deleteAlbum(id: 1)}` };
exports.otherMutationAlbum = { query: `mutation {deleteAlbum(id: 6)}` };
