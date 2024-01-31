$(document).ready(function() {
 timer = setTimeout(loadMessages, 1000);
});
var timer;

function loadMessages() {
 $.ajax({
 url : "/ajax/messages.json?lastClientMessage=" + lastClientMessage,
 success : function(messages) {
 if (messages && messages.length) {
 lastClientMessage = new Date(messages[0].date).getTime();
 $(".message").first().before(createMessageList(messages));
 $(".ajaxNew").slideDown(600, "swing", function() {
 $(this).removeClass("ajaxNew");
 });
 }
 timer = setTimeout(loadMessages, 1000);
 },
 error : function() {
 timer = setTimeout(loadMessages, 1000);
 },
 cache : false
 })
}
function createMessageList(messages) {
 var messageList = "";
 for (i in messages) {
 messageList += "<section class='ajaxNew message' style='display:none'>";
 messageList += "<h2>"+messages[i].user.username + " </h2> " + messages[i].date+"</br>";
 messageList += "<span>" + messages[i].text + "</span>";
 messageList += "</section>";
 }
 return messageList;
}