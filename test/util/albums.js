'use strict';

exports.queryAlbums = { query: `{  albums { title id } }` };
exports.mutationAlbum = { query: `mutation {delete(id: 1)}` };
exports.otherMutationAlbum = { query: `mutation {delete(id: 6)}` };
