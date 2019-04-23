<?php 
    include('common/funcs.php');

    // 入力チェック
    if(
        !isset($_POST['category']) || $_POST['category'] == "" ||
        !isset($_POST['bookname']) || $_POST['bookname'] == "" ||
        !isset($_POST['writer']) || $_POST['writer'] == "" ||
        !isset($_POST['date']) || $_POST['date'] == ""
    ){
        echo 'データが全て登録されていません';
        exit();
    }
    $category = h($_POST['category']);
    $bookname = h($_POST['bookname']);
    $writer = h($_POST['writer']);
    $readdate = h($_POST['date']);
    $comment = h($_POST['comment']);

    // 写真登録
    if (isset($_FILES["photo"] ) && $_FILES["photo"]["error"] ==0 ) {
        $file = $_FILES['photo'];
        $photo = upload($file);
    }else {
        echo '写真が送られていません';
    }

    // DB接続
    $pdo = db_con();
    // データ登録
    $stmt = $pdo->prepare("INSERT INTO booklists (category, bookname, writer, readdate, photo, comment) VALUES (:category,:bookname,:writer,:readdate, :photo, :comment)");
    $stmt->bindValue(':category', $category, PDO::PARAM_STR);
    $stmt->bindValue(':bookname', $bookname, PDO::PARAM_STR);
    $stmt->bindValue(':writer', $writer, PDO::PARAM_STR);
    $stmt->bindValue(':readdate', $readdate, PDO::PARAM_STR);
    $stmt->bindValue(':photo', $photo, PDO::PARAM_STR);
    $stmt->bindValue(':comment', $comment, PDO::PARAM_STR);
    $status = $stmt->execute();

    //４．データ登録処理後
    if($status==false){
        queryError($stmt);  
    }else{
        //５．index.phpへリダイレクト
        header("Location: index.php");
        exit();
    }



    


?>