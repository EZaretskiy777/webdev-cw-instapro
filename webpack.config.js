module.exports = {
  entry: "./src/scripts/index.js", // Входной файл, в котором мы пишем свой код
  output: {
    filename: "index.js", // Выходной файл, который подключаем к HTML
    // Обратите внимание, сохранится он по пути "./dist/main.js"
  },
};