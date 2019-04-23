//////////////////////////////////////////////////
// 変数・関数一覧
//////////////////////////////////////////////////
// カテゴリー一覧
category;
// console.log(category);

// 読書履歴一覧
books;
// console.log(books);

// 写真投影
$(function(){
    //画像ファイルプレビュー表示のイベント追加 fileを選択時に発火するイベントを登録
    $(document).on('change', 'input[type="file"]', function(e) {
        
    $('.photoarea').empty();
      var file = e.target.files[0],
          reader = new FileReader(),
          $preview = $(".photoarea");
          t = this;
  
      // 画像ファイル以外の場合は何もしない
      if(file.type.indexOf("image") < 0){
        return false;
      }
  
      // ファイル読み込みが完了した際のイベント登録
      reader.onload = (function(file) {
        return function(e) {
          //既存のプレビューを削除
          $preview.empty();
          // .prevewの領域の中にロードした画像を表示するimageタグを追加
          $preview.append($('<img>').attr({
                    src: e.target.result,
                    width: "150px",
                    class: "preview",
                    title: file.name
                }));
        };
      })(file);
  
      reader.readAsDataURL(file);
    });
  });


// 読み込み時に描画
if(books.length != 0){
    $('.main').append(viewbooklist(books));
}



//////////////////////////////////////////////////
// クリック処理
//////////////////////////////////////////////////
// 読書履歴描画
$(document).on('click', '.history, .back', function(e){
    e.preventDefault();
    $('.clicked').removeClass('clicked');
    window.location.reload();
})

// ジャンル登録画面描画
$(document).on('click', '.category', function(e){
    e.preventDefault();
    $('.clicked').removeClass('clicked');
    $(this).find('li').addClass('clicked');
    $('.main').html(viewCategory());
})

// 書籍登録画面描画
$(document).on('click', '.input', function(e){
    e.preventDefault();
    $('.clicked').removeClass('clicked');
    $(this).find('li').addClass('clicked');
    $('.main').html(viewBook());
    $('.categorylist').append(viewCategorylist(category));
    // カレンダー表示
    $('#datepicker').datepicker();
})

// ajax処理
// 詳細表示
$(document).on('click', '.detailbtn', function(e){
    e.preventDefault();
    // 対象リストID
    let id = $(this).attr('data-id');
    // ajax処理
    $.ajax({
        url:'detail.php',
        type:'POST',
        data:{
            id:id
        }
    })
    .done((data)=>{
        let book = $.parseJSON(data);
        console.log(book);
        $('.main').html(viewBookDetail(book));
    })
    .fail((data)=>{
        alert('インターネット接続環境をご確認ください');
        console.log('失敗'+data);
    })
})

// 書籍データ削除
$(document).on('click', '.deletebtn', function(e){
    e.preventDefault();
    // 対象リストID
    let id = $(this).attr('data-id');
    // ajax処理
    $.ajax({
        url:'delete.php',
        type:'POST',
        data:{
            id:id
        }
    })
    .done((data)=>{
        // console.log(data);
        alert('データ削除が完了しました');
        window.location.reload();
    })
    .fail((data)=>{
        alert('インターネット接続環境をご確認ください');
        console.log('失敗'+data);
    })
})


//////////////////////////////////////////////////
// VIEW
//////////////////////////////////////////////////
// カテゴリー登録画面
function viewCategory(){
    let view = `
        <div class="inputCategory">
            <form action="categoryInput.php" method="POST">
            カテゴリー：<input type="text" name="category"><br>
            <button class="btn">登録</button>
            </form>
        </div>
    `;
    return view;
}

// 書籍登録画面
function viewBook(){
    let view = `
        <div class="inputBook">
            <form action="bookInput.php" method="POST" enctype="multipart/form-data">
            <table>
                <tr>
                    <td>カテゴリー：</td>
                    <td><select class="categorylist" name="category"></select></td>
                <tr>
                <tr>
                    <td>書籍名：</td>
                    <td><input type="text" name="bookname"></td>
                </tr>
                <tr>
                    <td>著者名：</td>
                    <td><input type="text" name="writer"></td>
                </tr>
                <tr>
                    <td>読了日：</td>
                    <td><input type="text" id="datepicker" name="date" placeholder="クリックしてください"><td>
                </tr>
                <tr>
                    <td>書籍画像：</td>
                    <td><input type="file" name="photo"><div class="photoarea"></div></td>
                </tr>
                <tr>
                    <td class="tabletitle">感想：</td>
                    <td><textarea type="text" name="comment" cols="30" class="comment"></textarea></td>
                </tr>
            </table>
            <button class="btn">登録</button>
            </form>
        </div>
    `;
    return view;
}

// カテゴリーリスト
function viewCategorylist(category){
    let view = '';
    for(let i= 0;i<category.length;i++){
        view += '<option value="'+category[i]+'">'+category[i]+'</option>';
    }
    return view;
}

// 書籍リスト
function viewbooklist(books){
    let view = '';
    for(let i=0;i<books.length;i++){
        view += `
            <div class="book">
                <p class="booktitle text">書籍名：`+books[i]['bookname']+`</p>
                <p class="bookwriter text">著者：`+books[i]['writer']+`</p>
                <img src="upload/`+books[i]['photo']+`" class="bookimg">
                <div class="btnflex">
                    <div class="detail flexarea">
                        <a href="" class="detailbtn flexbtn" data-id="`+books[i]['booklist_id']+`">詳細</a>
                    </div>
                    <div class="delete flexarea">
                        <a href="" class="deletebtn flexbtn" data-id="`+books[i]['booklist_id']+`">削除</a>
                    </div>
                </div>
            </div>
        `;
    }
    return view;
}

// 詳細書籍情報
function viewBookDetail(data){
    let view = `
        <div class="bookdetail">
            <p class="booktitle text">書籍名：`+data['bookname']+`</p>
            <p class="bookwrter text">著者：`+data['writer']+`</p>
            <img src="upload/`+data['photo']+`" class="bookimg">
            <p class="booktime text">読了日：`+data['readdate']+`</p>
            <p class="bookcomment">`+data['comment']+`</p>
            <button class="back">戻る</button>
        </div>
    `;
    return view;
}