# Frontend Webpack Edition ¯\\\_(ツ)_/¯

## Структура

    .
    ├── bower_components		# Компоненты, установленные через bower
    ├── dist                   	# Собранный фронтенд
    ├── node_modules            # Модули ноды, необходимые для сборки
    ├── src                     # Исходники frontend 
	│   ├── css					# Стили (sass/scss)
	│   ├── fonts				# Шрифты
	│   ├── img					# Картинки
	│   ├── js					# JS-скрипты
	│   ├── layout				# Pug-шаблоны и компоненты
	│   ├── static				# Статичные файлы, кроме шрифтов
	│   └── index.pug			# Пример компилируемой pug-странички
    ├── .babelrc				# Конфиг babel, пресеты ((es7|es6)->es5)
    ├── .gitignore				# .gitignore
    ├── package.json			# package.json
    ├── package-lock.json		# package-lock.json
    ├── README.md				# Readme
    └── webpack.config.js		# Файл конфигурации Webpack

## Установка

```bash
npm i
```

## Запуск 

### Команды

В общем виде команда запуска сборщика выглядит так:

```npm run [command] [--build-output={relative_path}] [--skip-html] [--skip-images]```, где ```[command]``` - одна из нижеперечисленных команд.

##### serve
Запускает webpack-dev-server, запускает вотчеры, совершает сборку в режиме **DEVELOPMENT** без физического создания файлов.
##### dist
Cовершает сборку в режиме **PRODUCTION**.
##### watch
Аналогично ```dist```, но также запускает вотчеры для отслеживания изменений. 

### Опции

```--skip-html``` - отключает сборку и парсинг html-файлов, может быть полезно, если требуется лишь сборка ассетов  
```--skip-images``` - отключает сжатие картинок, может быть полезно, когда не требуется сжимать картинки  
```--build-output={relative_path}``` - указывает путь для сборки, пример: ```--build-output=web/bundles/frontend```

### Альтернативный синтаксис

Опции можно передать через переменные окружения, команда запуска сборщика приобретает следующий вид:  
```[BUILD_OUTPUT={relative_path}] [SKIP_HTML=true] [SKIP_IMAGES=true] npm run [command]```


### ENVIRONMENT
> Из коробки поддерживаются два вида окружений, development и production. Окружения передаются в pug-шаблоны в виде
переменной ENV, а также в JS в виде констант ```IS_DEVELOPMENT``` и ```IS_PRODUCTION```, а также переменной ```process.env.NODE_ENV```

###### Development
+ Стили подключаются через url-loader
+ Генерируются sourcemaps для стилей
+ Включен dev-режим вебпака
###### Production
+ Стили минифицируются
+ Включен prod-режим вебпака
+ В путях картинок и шрифтов подставляется начальный слэш

### JS
+ рекомендуется использование ES6 (ES2015), допускается использование ES7-фич при условии подключения соответствующих полифиллов
+ основным entry point для вебпака является файл ./src/js/index.js, который компилируется в main.bundle.js 
+ дополнительные entry points для вебпака следует расположить в ./src/js, файлы должны соответствовать нэймингу вида index_{bundleName}.js, где {bundleName} - название бандла; подобный файл скомпилируется в {bundleName}.bundle.js
+ бандл должен содержать все необходимые для работы модули и включать в себя релевантный scss-файл
+ вендорный legacy-js находится в ./src/js/vendor, файлы конкатенируются в vendor.js
+ также вендорные файлы можно подключать прямо в entry point бандла через import из node_modules 

### PUG
+ основные шаблоны и шаблоны блоков находятся в ./src/layout
+ шаблоны страниц находятся в ./src
+ css подключается на страницу с помощью mixin ```+loadCSS('/css/example.css')```

### SCSS
+ в рамках проекта допускается использование scss и sass, но не обоих одновременно
+ компилируемые css-бандлы принято импортировать в соответствующий js-бандл, пример - ```import style from "../css/style.scss";```
+ в компилируемый css-бандл принято включать все необходимые css-модули из субдиректорий

### FONTS
+ шрифты находятся в ./src/fonts (ранее находились в static-директории)
+ допустимые и необходимые форматы шрифтов - ```woff, woff2, ttf```

### STATIC
+ директория для статики - ./src/static
+ файлы без какой-либо обработки копируются в корень указанной dist-директории (по умолчанию - ./dist)