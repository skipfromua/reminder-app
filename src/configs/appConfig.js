export default Object.keys(process.env).reduce((conf, varName) => {
  if (varName.includes('REACT_APP')) {
    const shortName = varName.split('REACT_APP_')[1]
    conf[shortName] = process.env[varName]
  }
  return conf
}, {})
