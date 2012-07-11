<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>VK API</title><meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <script src="http://vk.com/js/api/openapi.js" type="text/javascript"></script>
<!--        <script src="http://vk.com/js/api/xd_connection.js?2" type="text/javascript"></script>-->
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
        <script src="/js/global.js"></script>
    </head>
    <body>
        <?php
        $app_id = 3031984;
        $app_secret = 'KSSzgOtYyctNu519EEWy';
        ?>
        <?php
        if (!count($_GET)) {
            header('Location:http://api.vk.com/oauth/authorize?client_id=' . $app_id . '&redirect_uri=http://vk.dev.com/photo.php&display=popup&scope=photos,friends,offline');
        }

        if (isset($_GET['code'])) {
            header('location:https://oauth.vk.com/access_token?client_id='.$app_id.'&client_secret='.$app_secret.'&code='.$_GET['code']);
        }
//        header('location:https://api.vk.com/method/photos.createAlbum?title=album&access_token=KSSzgOtYyctNu519EEWy')
        ?>
        <script>
            var code = '<?php echo $_GET['code'] ?>';
            var appid = '<?php echo $app_id ?>';
            var secret = '<?php echo $app_secret ?>';
            var url = 'https://oauth.vk.com/access_token?client_id=' + appid + '&client_secret=' + secret + '&code=' + code;
            console.log(url)
            $.get(url, function(data) {
                console.log(data);
            });
        </script>
        <input type="file" value=""/>
        <a id="send-photo" href="#">Загрузить фотографию</a>
    </body>
</html>