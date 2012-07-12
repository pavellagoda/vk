$(document).ready(function() {
    var app_id = 3033190;
    $('a#send-post').click(function(){
        var text = $('textarea[name="message"]').val();
        postMessage(text)
        return false;
    }) 
    $('a#send-photo').click(function(){
        var file = $('input[type="file"]').val().replace(/.+[\\\/]/, "");
        createAlbum();
    }) 
    function postMessage(text) {
        VK.init({
            apiId: 3031984
        });
        VK.api('wall.post',{
            message: text
        }, function(data) {
            if (data.response) {
                alert('Message is sent. message id: ' + data.response.post_id);
                window.location.href = '/photo.php';
            } else {
                alert('Error: ' + data.error.error_code + ' ' + data.error.error_msg);
            }
        });
        VK.UI.button('login_button');
    }
    
    function createAlbum() {
        VK.init({
            apiId: 3031984
        });
        
        VK.callMethod("showSettingsBox", 4);
 
        // когда пользователь изменяет настройки приложений
        VK.addCallback("onSettingsChanged", onSettingsChanged);
 
        function onSettingsChanged(settings) {
            var albumid = 159517308
            VK.api('photos.getUploadServer',{
                aid:albumid
            }, function(data){ 
                if (data.response)  
                { 
                    var filename = $('input[type="file"]').val().replace(/.+[\\\/]/, "");
                    $.post("/upload.php",{
                        upsrv:data.response.upload_url,
                        upsl:'1.jpg'
                    },function(datas){ 
                        console.log(datas);
                        datas = JSON.parse(datas); 
                        if (datas.server) 
                        { 
                            //подтверждаем загрузку 
                            VK.api('photos.save',{
                                aid: datas.aid, 
                                server: datas.server, 
                                photos_list: datas.photos_list, 
                                hash: datas.hash
                            }, function(dataf){ 
                            }); 
                        } 
                    }); 
                }  
                else  
                { 
                //Код обработки ошибок для photos.getUploadServer 
                } 
            });
        }
    }
})