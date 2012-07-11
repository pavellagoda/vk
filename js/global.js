$(document).ready(function() {
    $('a#send-post').click(function(){
        var text = $('textarea[name="message"]').val();
        postMessage(text)
    }) 
    function postMessage(text) {
        VK.init({
            apiId: 3031762
        });
        VK.api('wall.post',{
            message: text
        }, function(data) {
            if (data.response) { // если получен ответ
                alert('Сообщение отправлено! ID сообщения: ' + data.response.post_id);
                window.location.href = '/photo.php';
            } else { // ошибка при отправке сообщения
                alert('Ошибка! ' + data.error.error_code + ' ' + data.error.error_msg);
            }
        });
    }
})