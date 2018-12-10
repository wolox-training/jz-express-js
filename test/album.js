'user strict';

const chai = require('chai'),
  dictum = require('dictum.js'),
  nock = require('nock'),
  server = require('./../app'),
  config = require('../config'),
  User = require('../app/models').User,
  { createUser, login, userOne, adminUser } = require('./util/users'),
  {
    queryAlbums,
    mutationAlbum,
    otherMutationAlbum,
    albumCreateApi,
    mutationCreateAlbum
  } = require('./util/albums'),
  url = `${config.common.albumsApi.url}/albums`,
  { albums } = require('./util/albumsMocker'),
  { photos } = require('./util/photosMocker'),
  Album = require('../app/models').AlbumUser,
  expect = chai.expect;

describe('albums', () => {
  describe('/albums/ GET', () => {
    it('should list albums with graphql without problems because are loged', done => {
      nock(url)
        .get('')
        .reply(200, albums);
      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        }).then(res => {
          chai
            .request(server)
            .post('/graph-albums')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .send(queryAlbums)
            .then(result => {
              expect(result).have.status(200);
              expect(result.body.data.albums.length).to.equal(albums.length);
              expect(result.body.data.albums[3].title).to.be.equal(
                'non esse culpa molestiae omnis sed optio'
              );
              dictum.chai(result, 'get albums');
              done();
            });
        });
      });
    });

    it('should list albums  without problems because are loged', done => {
      nock(url)
        .get('')
        .reply(200, albums);
      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        }).then(res => {
          chai
            .request(server)
            .get('/albums')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .then(result => {
              expect(result).have.status(200);
              expect(result.body.length).to.equal(albums.length);
              expect(result.body[3]).have.property('userId');
              expect(result.body[3].userId).to.be.equal(1);
              expect(result.body[3].title).to.be.equal('non esse culpa molestiae omnis sed optio');
              dictum.chai(result, 'get albums');
              done();
            });
        });
      });
    });

    it('should fail list albums because the service fail', done => {
      nock(url)
        .get('')
        .reply(503);

      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        }).then(res => {
          chai
            .request(server)
            .get('/albums')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .catch(err => {
              expect(err).have.status(503);
              expect(err.response.body).have.property('message');
              expect(err.response.body).have.property('internal_code');
              expect(err.response.body.internal_code).to.equal('albums_api_error');
              done();
            });
        });
      });
    });

    it('should fail list albums because token is no sent or the  user is not logged', done => {
      chai
        .request(server)
        .get('/albums')
        .catch(err => {
          expect(err).have.status(401);
          expect(err.response.body).have.property('message');
          expect(err.response.body).have.property('internal_code');
          expect(err.response.body.internal_code).to.equal('authorization_error');
          done();
        });
    });
  });

  describe('Delete album with graphql ', () => {
    it('should deleted with graphql the album purchased without problems because user is logged and and he has the albums', done => {
      const [mockedAlbum] = albums;

      nock(`${url}/1`)
        .get('')
        .reply(200, mockedAlbum);

      User.create(adminUser).then(() => {
        login({
          email: 'dami@wolox.com',
          password: 'woloxwoloA152022'
        }).then(res => {
          chai
            .request(server)
            .post('/albums/1')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .send()
            .then(() => {
              chai
                .request(server)
                .post('/graph-albums')
                .set(config.common.session.header_name, res.headers[config.common.session.header_name])
                .send(mutationAlbum)
                .then(async result => {
                  const album = await Album.find({
                    where: {
                      albumId: 1,
                      userId: 1
                    }
                  });
                  expect(result).have.status(200);
                  expect(result.body.data.deleteAlbum).to.equal('Album  is deleted');
                  expect(album).to.be.equal(null);
                  done();
                });
            });
        });
      });
    });

    it('should fail delete with graphql the album because user does not have this album', done => {
      const [mockedAlbum] = albums;

      nock(`${url}/1`)
        .get('')
        .reply(200, mockedAlbum);

      User.create(adminUser).then(() => {
        login({
          email: 'dami@wolox.com',
          password: 'woloxwoloA152022'
        }).then(res => {
          chai
            .request(server)
            .post('/albums/1')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .send()
            .then(() => {
              chai
                .request(server)
                .post('/graph-albums')
                .set(config.common.session.header_name, res.headers[config.common.session.header_name])
                .send(otherMutationAlbum)
                .then(async result => {
                  const album = await Album.find({
                    where: {
                      albumId: 1,
                      userId: 1
                    }
                  });
                  expect(result).have.status(200);
                  expect(result.body.data.deleteAlbum).to.equal('Album not found');
                  expect(album.albumId).to.be.equal(1);
                  done();
                });
            });
        });
      });
    });
  });

  describe('create Album with graphql', () => {
    it('should create album with graphql without problems because user is logged ', done => {
      nock(`${url}/albums`)
        .post('')
        .reply(200, albumCreateApi);

      User.create(adminUser).then(() => {
        login({
          email: 'dami@wolox.com',
          password: 'woloxwoloA152022'
        }).then(res => {
          chai
            .request(server)
            .post('/graph-albums')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .send(mutationCreateAlbum)
            .then(result => {
              expect(result).have.status(200);
              done();
            });
        });
      });
    });
  });
  describe('/albums/:id POST', () => {
    it('should order an albums without problems because are loged', done => {
      const [mockedAlbum] = albums;

      nock(`${url}/1`)
        .get('')
        .reply(200, mockedAlbum);

      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        }).then(res => {
          chai
            .request(server)
            .post('/albums/1')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .send()
            .then(async result => {
              const album = await Album.find({
                where: {
                  albumId: 1,
                  userId: 1
                }
              });
              expect(album.albumId).to.be.equal(1);
              expect(album.userId).to.be.equal(1);
              dictum.chai(result, 'buy an album');
              done();
            });
        });
      });
    });

    it('should fail because try to buy multiples times same album', done => {
      const [mockedAlbum] = albums;

      nock(`${url}/1`)
        .get('')
        .reply(200, mockedAlbum);

      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        }).then(res => {
          chai
            .request(server)
            .post('/albums/1')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .send()
            .then(() => {
              nock(`${url}/1`)
                .get('')
                .reply(200, mockedAlbum);

              chai
                .request(server)
                .post('/albums/1')
                .set(config.common.session.header_name, res.headers[config.common.session.header_name])
                .send()
                .catch(err => {
                  expect(err).have.status(400);
                  expect(err.response.body).have.property('message');
                  expect(err.response.body).have.property('internal_code');
                  expect(err.response.body.internal_code).to.equal('album_order_error');
                  done();
                });
            });
        });
      });
    });

    it('should fail because the album is not found', done => {
      nock(`${url}/41`)
        .get('')
        .reply(404, 'missing album');

      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        }).then(res => {
          chai
            .request(server)
            .post('/albums/41')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .send()
            .catch(err => {
              expect(err.response.body.message).to.be.equal('Error 404 No found');
              expect(err).have.status(404);
              done();
            });
        });
      });
    });

    it('should fail order an albums because the service fail', done => {
      nock(`${url}/1`)
        .get('')
        .reply(503);

      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        }).then(res => {
          chai
            .request(server)
            .post('/albums/1')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .send()
            .catch(err => {
              expect(err).have.status(503);
              done();
            });
        });
      });
    });

    it('should fail order an album because token is no sent or user is no loged', done => {
      chai
        .request(server)
        .post('/albums/1')
        .catch(err => {
          expect(err).have.status(401);
          expect(err.response.body).have.property('message');
          expect(err.response.body).have.property('internal_code');
          expect(err.response.body.internal_code).to.equal('authorization_error');
          done();
        });
    });
  });
  describe('/users/:userId/albums GET', () => {
    it('should list all purchased albums without problems because are loged and is his id', done => {
      const [mockedAlbum] = albums;

      nock(`${url}/1`)
        .persist()
        .get('')
        .reply(200, mockedAlbum);

      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        }).then(res => {
          chai
            .request(server)
            .post('/albums/1')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .send()
            .then(() => {
              chai
                .request(server)
                .get(`/users/1/albums`)
                .set(config.common.session.header_name, res.headers[config.common.session.header_name])
                .then(result => {
                  expect(result.body[0]).have.property('id');
                  expect(result.body[0].id).to.equal(1);
                  expect(result.body[0]).have.property('title');
                  expect(result.body[0].title).to.equal('quidem molestiae enim');
                  expect(result).have.status(200);
                  dictum.chai(result, 'list all purchased albums');
                  done();
                });
            });
        });
      });
    });

    it('should fail list all purchased albums because is requesting the albums from other user', done => {
      const [mockedAlbum] = albums;

      nock(`${url}/1`)
        .persist()
        .get('')
        .reply(200, mockedAlbum);

      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        }).then(res => {
          chai
            .request(server)
            .post('/albums/1')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .send()
            .then(() => {
              chai
                .request(server)
                .get(`/users/2/albums`)
                .set(config.common.session.header_name, res.headers[config.common.session.header_name])
                .catch(err => {
                  expect(err).have.status(401);
                  expect(err.response.body).have.property('message');
                  expect(err.response.body).have.property('internal_code');
                  expect(err.response.body.internal_code).to.equal('authorization_error');
                  done();
                });
            });
        });
      });
    });

    it('should list all purchased albums from other user because is an admin user', done => {
      const [mockedAlbum] = albums;

      nock(`${url}/1`)
        .persist()
        .get('')
        .reply(200, mockedAlbum);

      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        }).then(res => {
          chai
            .request(server)
            .post('/albums/1')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .send()
            .then(() => {
              User.create(adminUser).then(() => {
                login({
                  email: 'dami@wolox.com',
                  password: 'woloxwoloA152022'
                }).then(response => {
                  chai
                    .request(server)
                    .get(`/users/1/albums`)
                    .set(
                      config.common.session.header_name,
                      response.headers[config.common.session.header_name]
                    )
                    .then(result => {
                      expect(result.body[0]).have.property('id');
                      expect(result.body[0].id).to.equal(1);
                      expect(result.body[0]).have.property('title');
                      expect(result.body[0].title).to.equal('quidem molestiae enim');
                      expect(result).have.status(200);
                      done();
                    });
                });
              });
            });
        });
      });
    });
    it('should administrator sees his own list all purchased ', done => {
      const [mockedAlbum] = albums;

      nock(`${url}/1`)
        .persist()
        .get('')
        .reply(200, mockedAlbum);

      User.create(adminUser).then(() => {
        login({
          email: 'dami@wolox.com',
          password: 'woloxwoloA152022'
        }).then(res => {
          chai
            .request(server)
            .post('/albums/1')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .send()
            .then(() => {
              login({
                email: 'dami@wolox.com',
                password: 'woloxwoloA152022'
              }).then(response => {
                chai
                  .request(server)
                  .get(`/users/1/albums`)
                  .set(config.common.session.header_name, response.headers[config.common.session.header_name])
                  .then(result => {
                    expect(result.body[0]).have.property('id');
                    expect(result.body[0].id).to.equal(1);
                    expect(result.body[0]).have.property('title');
                    expect(result.body[0].title).to.equal('quidem molestiae enim');
                    expect(result).have.status(200);
                    done();
                  });
              });
            });
        });
      });
    });
  });
  describe('/users/albums/:id/photos GET', () => {
    it('should list all album photos without problems because user purchased the album', done => {
      const mockedPhotos = photos,
        [mockedAlbum] = albums;

      nock(`${url}/1`)
        .get('')
        .reply(200, mockedAlbum);

      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        }).then(res => {
          chai
            .request(server)
            .post('/albums/1')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .send()
            .then(() => {
              nock(`${url}/1/photos`)
                .get('')
                .reply(200, mockedPhotos);

              chai
                .request(server)
                .get(`/users/albums/1/photos`)
                .set(config.common.session.header_name, res.headers[config.common.session.header_name])
                .then(async result => {
                  expect(result).have.status(200);
                  expect(result.body[2].albumId).to.be.equal(1);
                  expect(result.body[2].id).to.be.equal(3);
                  expect(result.body[2].title).to.be.equal('officia porro iure quia iusto qui ipsa ut modi');
                  dictum.chai(result, 'list all album photos from purchased albums by user');
                  done();
                });
            });
        });
      });
    });

    it('should list all album photos without problems because user purchased the album when user is admin', done => {
      const mockedPhotos = photos,
        [mockedAlbum] = albums;

      nock(`${url}/1`)
        .get('')
        .reply(200, mockedAlbum);

      User.create(adminUser).then(() => {
        login({
          email: 'dami@wolox.com',
          password: 'woloxwoloA152022'
        }).then(res => {
          chai
            .request(server)
            .post('/albums/1')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .send()
            .then(() => {
              nock(`${url}/1/photos`)
                .get('')
                .reply(200, mockedPhotos);

              chai
                .request(server)
                .get(`/users/albums/1/photos`)
                .set(config.common.session.header_name, res.headers[config.common.session.header_name])
                .then(result => {
                  expect(result).have.status(200);
                  expect(result.body[2].albumId).to.be.equal(1);
                  expect(result.body[2].id).to.be.equal(3);
                  expect(result.body[2].title).to.be.equal('officia porro iure quia iusto qui ipsa ut modi');
                  dictum.chai(result, 'list all album photos from purchased albums by user');
                  done();
                });
            });
        });
      });
    });

    it('should fail list album photos because the user do not have this album yet', done => {
      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        }).then(res => {
          chai
            .request(server)
            .get(`/users/albums/1/photos`)
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .catch(err => {
              expect(err).have.status(404);
              expect(err.response.body).have.property('message');
              expect(err.response.body).have.property('internal_code');
              expect(err.response.body.internal_code).to.equal('albums_not_found');
              done();
            });
        });
      });
    });

    it('should fail list album photos because the user admin do not have this album yet', done => {
      User.create(adminUser).then(() => {
        login({
          email: 'dami@wolox.com',
          password: 'woloxwoloA152022'
        }).then(res => {
          chai
            .request(server)
            .get(`/users/albums/1/photos`)
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .catch(err => {
              expect(err).have.status(404);
              expect(err.response.body).have.property('message');
              expect(err.response.body).have.property('internal_code');
              expect(err.response.body.internal_code).to.equal('albums_not_found');
              done();
            });
        });
      });
    });

    it('should fail list album photos because the albums were not purchased by the administrator user', done => {
      const [mockedAlbum] = albums;

      nock(`${url}/1`)
        .get('')
        .reply(200, mockedAlbum);

      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        }).then(res => {
          chai
            .request(server)
            .post('/albums/1')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .send()
            .then(() => {
              User.create(adminUser).then(() => {
                login({
                  email: 'dami@wolox.com',
                  password: 'woloxwoloA152022'
                }).then(res2 => {
                  chai
                    .request(server)
                    .get(`/users/albums/1/photos`)
                    .set(config.common.session.header_name, res2.headers[config.common.session.header_name])
                    .catch(err => {
                      expect(err).have.status(404);
                      expect(err.response.body).have.property('message');
                      expect(err.response.body).have.property('internal_code');
                      expect(err.response.body.internal_code).to.equal('albums_not_found');
                      done();
                    });
                });
              });
            });
        });
      });
    });

    it('should fail list album photos because the service is fail', done => {
      const [mockedAlbum] = albums;

      nock(`${url}/1`)
        .get('')
        .reply(200, mockedAlbum);

      createUser(userOne).then(() => {
        login({
          email: 'sarahi12hg@wolox.com',
          password: 'woloxwoloA1520'
        }).then(res => {
          chai
            .request(server)
            .post('/albums/1')
            .set(config.common.session.header_name, res.headers[config.common.session.header_name])
            .send()
            .then(() => {
              nock(`${url}/1/photos`)
                .get('')
                .reply(503);

              chai
                .request(server)
                .get(`/users/albums/1/photos`)
                .set(config.common.session.header_name, res.headers[config.common.session.header_name])
                .catch(err => {
                  expect(err).have.status(503);
                  expect(err.response.body).have.property('message');
                  expect(err.response.body).have.property('internal_code');
                  expect(err.response.body.internal_code).to.equal('albums_api_error');
                  done();
                });
            });
        });
      });
    });
  });
});
