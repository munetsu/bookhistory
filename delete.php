<?php 
    include('common/funcs.php');
    // 書籍ID
    $id = h($_POST['id']);
    
    // DB接続
    $pdo = db_con();
    // 書籍情報取得
    $stmt = $pdo->prepare("DELETE FROM booklists WHERE booklist_id=:id");
    $stmt->bindValue(':id', $id, PDO::PARAM_INT);
    $status = $stmt->execute();

    // データ取得処理後
    if($status==false){
        queryError($stmt);  
    }else{
        header('location: index.php');
        exit();
    }
    
