<?php 
    include('common/funcs.php');
    // POSTデータ取得
    $category = $_POST['category'];
    
    // データベース接続
    $pdo = db_con();

    // データベース登録
    $stmt = $pdo->prepare("INSERT INTO categories (category) VALUES (:category)");
    $stmt->bindvalue(':category', $category, PDO::PARAM_STR);
    $status = $stmt->execute();

    //４．データ登録処理後
    if($status==false){
        queryError($stmt);  
    }else{
        //５．index.phpへリダイレクト
        header("Location: index.php");
        exit;
    }
?>

