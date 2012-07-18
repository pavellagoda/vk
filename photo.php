<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>VK API</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <script src="http://vk.com/js/api/openapi.js" type="text/javascript"></script>
        <script src="http://vk.com/js/api/xd_connection.js?2" type="text/javascript"></script>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
        <script src="/js/global.js"></script>
    </head>
    <body>
        <?php
        $filename = 0;
        $fileerror = 0;
        if ($_FILES) {
            $size = $_FILES['photo']['size'];
            $allowedSize = 2 * 1024 * 1024;
            $allowedTypes = array('image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp');
            if (!in_array($_FILES['photo']['type'], $allowedTypes)) {
                $fileerror = 'Вы загрузили недопустимый тип файла!';
            } else if ($size > $allowedSize) {
                $fileerror = 'Вы загрузили слишком большой файл! Выберите фал размером не более 2 Мб';
            } else {
                move_uploaded_file($_FILES['photo']['tmp_name'], $_SERVER['DOCUMENT_ROOT'] . '/upload/' . $_FILES['photo']['name']);
                $filename = $_FILES['photo']['name'];
            }
        }
        ?>
        <form method="post" action="#" enctype="multipart/form-data" id="form">
            <input type="file" name="photo"/>
            <input type="text" name="album-id"/>
            <input type="hidden" name="filename" value="<?php echo $filename ?>"/>
            <input type="hidden" name="fileerror" value="<?php echo $fileerror ?>"/>
        </form>
        <a id="send-photo" href="#">Загрузить фотографию</a>
<?php if ($_FILES): ?>
            <script>
                uploadPhoto();
            </script>
<?php endif; ?>
    </body>
</html>