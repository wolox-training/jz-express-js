'use strict';

const logger = require('../logger'),
  errors = require('../errors');

module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define(
    'Album',
    {
      albumId: { type: DataTypes.INTEGER, allowNull: false, field: 'album_id' },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'user_id',
        references: {
          model: 'User',
          key: 'id'
        }
      }
    },
    {
      indexes: [
        {
          unique: true,
          fields: ['album_id', 'user_id']
        }
      ],

      underscored: true,
      freezeTableName: true
    }
  );

  Album.associate = models => {
    Album.belongsTo(models.User);
  };

  Album.createModel = album =>
    Album.create(album).catch(err => {
      logger.error(err);
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw errors.albumOrderError('User already have this album');
      }
      throw errors.databaseError(err.message);
    });

  Album.getAlbumBy = param =>
    Album.findAll({
      where: param
    }).catch(err => {
      logger.error(err);
      throw errors.databaseError(err);
    });

  return Album;
};
