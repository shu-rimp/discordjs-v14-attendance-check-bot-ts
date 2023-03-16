import { Sequelize, DataTypes } from 'sequelize'

const sequelize = new Sequelize(process.env.SQLITE_DATABASE, process.env.SQLITE_USER, process.env.SQLITE_PASSWORD, {
	host: process.env.SEQUELIZE_HOST,
	dialect: process.env.SEQUELIZE_DIALECT,
	logging: Boolean(process.env.SEQUELIZE_LOGGING),
	storage: process.env.SEQUELIZE_STORAGE,
});

export const Usertable = sequelize.define(process.env.SQLITE_TABLE, {
	server_id: {
		type: DataTypes.STRING,
		primaryKey: true
	},
	user_id: {
		type: DataTypes.STRING,
		primaryKey: true
	},
	user_name: DataTypes.STRING,
	user_tag: DataTypes.STRING,
	attendance_count: {
		type: DataTypes.INTEGER,
		defaultValue: 0,
		allowNull: false,
	}
});