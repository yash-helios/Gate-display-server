const path=require('path')

// Emulate __dirname in ES Modules


module.exports= {
  entry: './server.cjs', // Entry point of your application
  output: {
    path: path.resolve(__dirname, 'build'), // Output directory
    filename: 'bundle.cjs', // Output bundle file
    clean: true, // Clean the output directory before emit
  },
  target: 'node', // Specify the target environment
  mode: 'production', // Set mode to production for optimizations
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader', // Use Babel to transpile JS files
      },
    ],
  },
  resolve: {
    extensions: ['.js'], // Resolve these extensions
  },
};
