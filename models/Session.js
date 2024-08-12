module.exports = (sequelize, DataTypes) => {
    const Session = sequelize.define('Session', {
      sid: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      expires: DataTypes.DATE,
      data: DataTypes.TEXT,
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    }, {
      schema: 'tech_blog_schema', // Specify the schema here
      tableName: 'Sessions'
    });
  
    return Session;
  };

  