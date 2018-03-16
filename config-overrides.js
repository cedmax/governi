
module.exports = config => {
  config.entry = config.entry.filter(entry => {
    return !entry.includes('react-dev-utils/webpackHotDevClient');
  });
  return config;
};
