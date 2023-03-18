import { Sequelize, DataTypes } from 'sequelize'

export const sequelize = new Sequelize(process.env.SQLITE_DATABASE, process.env.SQLITE_USER, process.env.SQLITE_PASSWORD, {
	host: process.env.SEQUELIZE_HOST,
	dialect: process.env.SEQUELIZE_DIALECT,
	logging: Boolean(process.env.SEQUELIZE_LOGGING),
	storage: process.env.SEQUELIZE_STORAGE,
});

export const UserModel = sequelize.define(process.env.SQLITE_TABLE, {
	server_id: {
		type: DataTypes.STRING,
		primaryKey: true
	},
	user_id: {
		type: DataTypes.STRING,
		primaryKey: true
	},
	user_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	user_display_name: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	user_tag: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	attendance_count: {
		type: DataTypes.INTEGER,
		defaultValue: 1,
		allowNull: false,
	}
})