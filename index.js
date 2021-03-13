const chalk = require('chalk')

function FileListPlugin() {}

FileListPlugin.prototype.apply = function (compiler) {
  // emit 钩子：输出 assets 到 output 目录之前执行，所以可以在这里生成文件并追加
  compiler.plugin('emit', function (compilation, callback) {
    // 生成文件中，创建一个头部字符串
    var fileList = 'In this build:\n\n'

    // 遍历所有资源文件
    // 每个文件名添加一行内容
    for (var filename in compilation.assets) {
      fileList += `- ${filename}\n`
    }

    // 将所有文件名添加到一个新的文件 fileList.md，并插入到 webpack 的构建流程中
    compilation.assets['fileList.md'] = {
      source: function () {
        return fileList
      },
      size: function () {
        return fileList.length
      },
    }

    console.log(chalk.green('\ncreate fileList.md success'))

    callback()
  })
}

module.exports = FileListPlugin
