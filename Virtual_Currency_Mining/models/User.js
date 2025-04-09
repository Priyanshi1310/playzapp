const { DataTypes } = require("sequelize");
const sequelize  = require('../sequelize')

const User = sequelize.define('User', {
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    balance: { type: DataTypes.INTEGER, defaultValue: 0 },
    lastClaimAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    minedSince: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    earnToday: { type: DataTypes.INTEGER, defaultValue: 0},
})

module.exports =  User;