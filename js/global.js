$(document).ready(function() {
    var app_id = 3033190;
    $('a#send-post').click(function(){
        var text = $('textarea[name="message"]').val();
        postMessage(text)
        return false;
    }) 
    $('a#send-photo').click(function(){
        $('form#form').submit();
    //        uploadPhoto();
    }) 
    function postMessage(text) {
        VK.init({
            apiId: 3031984
        });
        
        
        VK.callMethod("showSettingsBox", 8192);
        VK.addCallback("onSettingsChanged", onSettingsChanged);
        function onSettingsChanged(settings) {
            VK.api('wall.post',{
                message: text
            }, function(data) {
                if (data.response) {
                    window.location.href = '/photo.php';
                } else {
                    alert('Error: ' + data.error.error_code + ' ' + data.error.error_msg);
                }
            });
        }
    }
})

function uploadPhoto() {
    if($('input[name="fileerror"]').val()!='0') {
        alert($('input[name="fileerror"]').val())
    } else {
        VK.init({
            apiId: 3031984
        });
        
        VK.callMethod("showSettingsBox", 4+1);
        VK.addCallback("onSettingsChanged", onSettingsChanged);
        function onSettingsChanged(settings) {
            var albumid = 159517308
            VK.api('photos.getUploadServer',{
                aid:albumid
            }, function(data){ 
                if (data.response)  
                { 
                    var filename = $('input[name="filename"]').val();
                    $.post("/upload.php",{
                        upsrv:data.response.upload_url,
                        upsl:filename
                    },function(datas){ 
                        datas = JSON.parse(datas); 
                        if (datas.server) 
                        { 
                            VK.api('photos.save',{
                                aid: datas.aid, 
                                server: datas.server, 
                                photos_list: datas.photos_list, 
                                hash: datas.hash
                            }, function(dataf){ 
                                alert('Фотография успешно загружена!')
                            }); 
                        } 
                    }); 
                }  
            });
        }
    }
}