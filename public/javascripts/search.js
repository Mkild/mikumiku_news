var sbtn = document.getElementById("sbtn");
var search = document.getElementById("search");
sbtn.onclick = function() {
    if(search.value==null || search.value=="") {
        alert("请输入查询关键字");
        return false;
    }
}