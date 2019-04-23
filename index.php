<?php
    include('common/funcs.php');
    // DB接続
    $pdo = db_con();
    // カテゴリー取得
    $stmt = $pdo->prepare("SELECT * FROM categories");
    $status = $stmt->execute();

    // データ取得処理後
    if($status==false){
        queryError($stmt);  
    }else{
        //Selectデータの数だけ自動でループしてくれる
        $category = array();
        while( $result = $stmt->fetch(PDO::FETCH_ASSOC)){
            array_push($category, $result['category']);
        }
    }
    // jqeuryで扱えるようにする
    $category = json($category);

    // 書籍リストを取得
    $stmt = $pdo->prepare("SELECT * FROM booklists");
    $status = $stmt->execute();
    // データ取得処理後
    if($status==false){
        queryError($stmt);  
    }else{
        //Selectデータの数だけ自動でループしてくれる
        $books = array();
        while( $result = $stmt->fetch(PDO::FETCH_ASSOC)){
            array_push($books, $result);
        }
    }
    // 配列を逆順に
    $books = array_reverse($books);
    // Jqueryで使用できるように
    $books = json($books);
    




?>

<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>読書履歴サイト</title>
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/index.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/themes/base/jquery-ui.min.css">
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1/i18n/jquery.ui.datepicker-ja.min.js"></script>
</head>
<body>
    <div class="field">
        <!-- サイドバー -->
        <div class="sidebar">
            <ul class="menu">
                <a href="" class="history"><li class="menulist clicked">読書履歴</li></a>
                <a href="" class="category"><li class="menulist">ジャンル登録</li></a> 
                <a href="" class="input"><li class="menulist">書籍登録</li></a> 
            </ul>
        </div>
        <!-- メイン部分 -->
        <div class="main"></div>
    </div>
</body>
<script>
    let category = <?php echo $category ?>;
    let books = <?php echo $books ?>;
</script>
<script src="js/index.js"></script>
</html>