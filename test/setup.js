const { sequelize } = require('../models');

before(async function() {
  await sequelize.sync({ force: true });
});

after(async function() {
  await sequelize.close();
});
