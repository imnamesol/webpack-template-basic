// import
const path = require('path') // path : node.js의 전역 모듈
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

// export 
module.exports = {
  resolve: {
    extensions: ['.js', '.vue'],
    alias: { // 경로별칭
      '~': path.resolve(__dirname, 'src'),
      'assets': path.resolve(__dirname, 'src/assets')
    }
  },

  //파일을 읽어들이기 시작하는 진입점 설정
  entry: './src/main.js',

  //결과물(번들)을 반환하는 설정
  output: {
    // path: path.resolve(__dirname, 'dist'),
    // __dirname : 현재 파일이 있는 경로(node.js의 전역 변수)
    // filename: 'main.js', // 기본으로 dist 폴더에 main.js 가 생성되므로 적지 않아도 됨
    clean: true // 기존에 만든 내용 제거
  },

  // 모듈 처리 방식을 설정
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.s?css$/, // .scss 혹은 .css로 끝나는 확장자를 찾는 정규식
        use: [ 
          // 작성순서매우중요! 밑에서부터 처리
          'vue-style-loader',
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: 'file-loader'
      }
    ]
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설정
  plugins: [
    new HtmlPlugin({
      template: './index.html'
    }),
    new CopyPlugin({
      patterns: [
      { from: 'static' } // static 폴더로부터 복사해서 dist에 넣음
      ]
    }),
    new VueLoaderPlugin()
  ]
}