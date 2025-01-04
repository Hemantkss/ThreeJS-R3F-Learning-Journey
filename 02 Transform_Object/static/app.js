const path = require('path');

console.log("Resolved Static Directory Path:", path.resolve(__dirname, 'static'));

module.exports = {
   devServer: {
       static: {
           directory: path.resolve(__dirname, 'static'),
       },
   },
};
