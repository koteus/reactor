if (process.env.NODE_ENV === 'production') {
  require('./app/server/production')
}
else {
  require('./app/server/development')
}
