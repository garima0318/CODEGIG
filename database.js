const Sequelize = required('sequelize');
module.exports = new Sequelize('codegig','postgres','Radhika@2011',{
    host: 'localhost',
  dialect: 'postgres',
  operatorsAliases: false,
  pool:{
      max:5,
      min:0,
      acquire:30000,
      idle:10000
  },
});