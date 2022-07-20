import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMessages from 'webpack-messages';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import SpeedMeasurePlugin from 'speed-measure-webpack-plugin';
const speedMeasurePlugin = new SpeedMeasurePlugin();

module.exports = speedMeasurePlugin.wrap({
  output: {
    path: path.join(__dirname, 'build'),
    filename: '[name].[fullhash:8].js',
    chunkFilename: '[id].[fullhash:8].js',
  },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.html', '.less'],
    fallback: { buffer: require.resolve('buffer/') },
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        include: [
          path.resolve(__dirname, 'src'),
          path.resolve(__dirname, 'styles'),
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            compact: true,
            presets: [
              '@babel/preset-typescript',
              '@babel/preset-react',
              '@babel/preset-env',
            ],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(html|htm)$/,
        use: ['html-loader'],
      },
      {
        test: /\.less$/i,
        include: [path.join(__dirname, 'styles'), path.join(__dirname, 'src')],
        use: [
          process.env.DEVELOPMENT === 'true'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, process.argv[4], 'index.html'),
    }),
    new WebpackMessages({
      name: 'reproduction',
      logger: (str) => console.log(`>> ${str}`),
    }),
    new MiniCssExtractPlugin(),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/](react|react-dom|@mui)[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimize: process.env.DEVELOPMENT !== 'true',
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: process.env.DEVELOPMENT !== 'true',
          safari10: true,
        },
        parallel: true,
        extractComments: true,
      }),
    ],
  },
});
