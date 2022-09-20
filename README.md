# 映画・ドラマ検索アプリ
映画やドラマのデータベースを提供している、OMDB APIを利用した検索サイトです。
キーワードや検索条件を入れることで、該当する映画やドラマを最大10件表示します。

[Movie_search](https://user-images.githubusercontent.com/85279065/176999505-ed6fe023-9c6c-4366-87cd-127430940716.webm)

## `URL`
https://movies-series-search.herokuapp.com/

## `使い方`
検索窓にキーワードを入力することで、お探しの映画やキーワードに関連した映画等の情報が表示されます。DBは海外のものであるため、キーワードは英語入力としてください。  
また"Advanced search"と表記されたアコーディオンメニューをクリックすると詳細検索ができます。

## `アプリ作成の意図`
外部APIの利用方法を学習するために作成しました。

## `使用技術`
#### `フロントエンド`
* react: 17.0.2 (create-react-app)
* react-bootstrap: 2.4.0
* OMDB API

#### `インフラ`
* Heroku

## ` 機能一覧`
* 検索結果の文字表記(検索キーワード、詳細検索内容、ヒット数の表示)
* 詳細検索(映画かドラマかの指定及び、公開年度の指定)
* レプポンシブデザイン

## `今後の改善点`
* アルファベットの検索しか受け付けない等のバリデーション(React Hook Formを試してみる)
* OMDB APIは1回のリクエストの取得上限が10件のため、ページネーションを実装し、検索結果の表示件数を増やす

## `ローカルでの動作方法`
```bash
$ git clone https://github.com/Shota-mancity/movie-search.git
$ cd movie-search
```

```bash
$ npm install
```

package.jsonの  
"scripts": {  
&emsp;"start": "node index.js",  
},  
を  
"scripts": {  
&emsp;"start": "react-scripts start",  
},  
に変更

```bash
$ npm start
```
