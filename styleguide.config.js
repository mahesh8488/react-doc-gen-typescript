const path = require('path');
const glob = require('glob');

module.exports = {
    components: function () {
        return glob.sync(path.resolve(__dirname, 'components/*.tsx'))
          .filter(function (module) {
            return /\/[A-Z]\w*\.tsx$/.test(module);
          });
      },
    resolver: require('react-docgen').resolver.findAllComponentDefinitions,
    propsParser: require('react-docgen-typescript').withDefaultConfig({ propFilter: { skipPropsWithoutDoc: true } }).parse,
    webpackConfig: {
        module: {
          rules: [
            // Babel loader, will use your project’s .babelrc
            {
              test: /\.jsx?$/,
              exclude: /node_modules/,
              loader: 'babel-loader'
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            // Other loaders that are needed for your components
            {
              test: /\.css$/,
              //loader: 'style-loader!css-loader?modules'
              use: [
                { loader: "style-loader" },
                { loader: "css-loader" },
              ]
            }
          ]
        }
      }
  };