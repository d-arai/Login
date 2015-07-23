# README

Express4+MongoDBでSessionを利用したログイン機能を
勉強のために作成したパッケージです。DBはLocal使用となります。

以下、サイトを参考にさせて頂きました。
- Node.js+Express+MongoDBでSessionを利用してログイン機能を実装
  (http://qiita.com/n0bisuke/items/2514197d8791abbc7d87)
  (http://izmiz.hateblo.jp/entry/2014/05/30/230816)

## 動作環境

- express (4.x.x)
- express-session
- ejs
- mongoose

別途、以下の導入が必要となります。

- MongoDB (on OSX)

## 起動方法

1) MongoDBをインストール&起動します。

2) "npm install"を実行する。

3) appを起動してwebサーバーを立ち上げます。

4) Chromeブラウザから"http://localhost:3000"にアクセスします。

5) アカウント登録されている"Email"と"Password"が一致すればログインし
   Mainページが表示されます。
   アカウント登録後は、登録情報でログインまで行っています。

