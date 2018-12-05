'use strict';

const logger = require('../logger'),
  errors = require('../errors');

module.exports = (sequelize, DataTypes) => {
  const AlbumUser = sequelize.define(
    'AlbumUser',
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

  AlbumUser.associate = models => {
    AlbumUser.belongsTo(models.User);
  };

  AlbumUser.createModel = album =>
    AlbumUser.create(album).catch(err => {
      logger.error(err);
      if (err.name === 'SequelizeUniqueConstraintError') {
        throw errors.albumOrderError('User already have this album');
      }
      throw errors.databaseError(err.message);
    });

  AlbumUser.deteleAlbumPurchased = param =>
    AlbumUser.destroy({
      where: param
    }).catch(err => {
      logger.error(err);
      throw errors.databaseError(err);
    });

  AlbumUser.getAllAlbumBy = param =>
    AlbumUser.findAll({
      where: param
    }).catch(err => {
      logger.error(err);
      throw errors.databaseError(err);
    });

  AlbumUser.getAlbumBy = param =>
    AlbumUser.findOne({
      where: param
    }).catch(err => {
      logger.error(err);
      throw errors.databaseError(err);
    });

  return AlbumUser;
};
