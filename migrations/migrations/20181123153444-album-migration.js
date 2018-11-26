'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface
      .createTable('Album', {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          unique: true
        },
        album_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: 'User',
            key: 'id'
          }
        },
        created_at: Sequelize.DATE,
        updated_at: Sequelize.DATE
      })
      .then(() =>
        queryInterface.addIndex('Album', ['user_id', 'album_id'], {
          indicesType: 'UNIQUE'
        })
      ),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('Album')
};
