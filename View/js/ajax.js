/*
获取全部的用户信息
*/
function Getall() {
    var canshu = "getuser";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "../Controller/index.php?a=" + Math.random() + "&c=" + canshu, true);
    xhr.send(null);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                var res = xhr.responseText;
                res = JSON.parse(res);
                console.log(res);
                console.log(typeof(res));
                var newHtml = document.querySelector('#container').innerHTML;
                for (var i = 0; i < res.length; i++) {
                    var item = res[i];
                    var stuid = item.User_id;
                    // console.log(stuid);
                    var name = item.User_name;
                    var pass = item.User_pass;
                    var qq = item.User_qq;
                    var phone = item.User_phone;
                    var pic = item.User_pic;
                    var innerhtml =
                        "<tr id='row'><td id='stuid'><input type='text' readonly='readonly' class='input' value=" + stuid +
                        "></td><td id='stuname'><input type='text' readonly='readonly' class='input' value=" + name +
                        "></td><td id='stupass'><input type='text' readonly='readonly' class='input' value=" + pass +
                        "></td><td id='stuphone'><input type='text' readonly='readonly' class='input' value=" + phone +
                        "></td><td id='stuqq'><input type='text' readonly='readonly' class='input' value=" + qq +
                        "></td><td><a onclick='remove(" + i + ")' id='delete' href='#'>删除</a>&nbsp;&nbsp;<a id='bj' onclick='change(" + (i + 1) +
                        ")' data='" + i + "' href='#'>编辑</a></td></tr>"
                    newHtml += innerhtml;
                }
                document.querySelector('#container').innerHTML = newHtml;
            }
        }
    }
}
/*
编辑用户信息
*/
function change(data) {
    console.log(data);
    //获取该行input标签，能够实现编辑
    var tr = document.querySelectorAll('tr');
    var input = tr[data].querySelectorAll('input');
    var bj = tr[data].querySelector('#bj');
    // console.log(tr);
    // console.log(tr[data]);
    // console.log(input);
    // console.log(bj);
    for (var i = 1; i < input.length; i++) {
        // console.log(input[i].value);
        input[i].readOnly = false;
    }
    bj.innerHTML = "保存";
    bj.onclick = function() {
            save();
        }
        //ajax向数据库插入数据
        //保存修改后的用户信息
    function save() {
        var tr = document.querySelectorAll('tr');
        var input = tr[data].querySelectorAll('input');
        var bj = tr[data].querySelector('#bj');
        var id = input[0].value;
        var name = input[1].value;
        var pass = input[2].value;
        var phone = input[3].value;
        var qq = input[4].value;
        bj.innerHTML = "编辑";
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "../Controller/index.php?id=" + id + "&uname=" + name + "&pass=" + pass + "&phone=" + phone + "&qq=" + qq + "&c=" + "updata", true);
        xhr.send(null);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var res = xhr.responseText;
                    // console.log(res);
                    if (res) {
                        alert('修改成功');
                        location.href = 'edituser.html';
                    } else {
                        alert('修改失败');
                    }
                }
            }
        }
    }
}
/*
删除用户信息
*/
function remove(data) {
    var res = confirm('确定删除?');
    if (res == true) {
        // document.getElementById('row').removeChild(this.parentNode);
        var data = data + 1;
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "../Controller/index.php?a=" + data + "&c=" + "delete", true);
        xhr.send(null);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var res = xhr.responseText;
                    console.log(res);
                    if (res == 1) {
                        alert('删除成功');
                        // getAll();
                        location.href = 'edituser.html';
                    } else {
                        alert('删除失败');
                    }
                }
            }
        }
    } else {
        return false;
    }
}
/*
通过用户id查找用户
*/
function SearchByid() {
    var btn = document.getElementById('searchbyid');
    var input = document.getElementById('userid');
    btn.onclick = function() {
            if (input.value == "") {
                document.getElementById('container').innerHTML = "<tr><th>编号</th><th>用户名</th><th>密码</th><th>手机号</th><th>QQ号</th><th>操作</th></tr>";
                Getall();
            } else {
                search();
            }
        }
        //查找操作ajax
    function search() {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "../Controller/index.php?a=" + input.value + "&c=" + "search", true);
        xhr.send(null);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    var res = xhr.responseText;
                    res = JSON.parse(res);
                    console.log(res);
                    if (res) {
                        var id = res.User_id;
                        var uname = res.User_name;
                        var pass = res.User_pass;
                        var phone = res.User_phone;
                        var qq = res.User_qq;
                        document.querySelector('#container').innerHTML = "<tr><th>编号</th><th>用户名</th><th>密码</th><th>手机号</th><th>QQ号</th></tr><tr id='row'><td id='stuid'> " + id +
                            "</td><td id='stuname'>" + uname +
                            "</td><td id='stupass'>" + pass +
                            "</td><td id='stuphone'>" + phone +
                            "</td><td id='stuqq'>" + qq +
                            "</td></tr>";
                    } else if (res == false) {
                        alert('未查找到相关用户');
                        location.href = 'edituser.html';
                    }
                }
            }
        }
    }
}
SearchByid(); //调用函数
/*
通过用户名查找用户信息
*/
function SearchByname() {
    var input = document.getElementById('username');
    //keyup事件快速响应文本框输入的内容
    input.addEventListener('keyup', function() {
        // alert('123');
        var xhr = new XMLHttpRequest();
        xhr.open("GET", "../Controller/index.php?c=" + "searchbyname" + "&uname=" + input.value, true);
        xhr.send(null);
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    //返回一个对象数组
                    var res = xhr.responseText;
                    res = JSON.parse(res);
                    // console.log(res);
                    //当文本框内容为空时，不显示任何信息
                    if (input.value == "") {
                        document.querySelector('#container').innerHTML = "";
                    } else {
                        //清空box中的内容
                        var newinner = document.querySelector('#container').innerHTML = "<tr><th>编号</th><th>用户名</th><th>密码</th><th>手机号</th><th>QQ号</th></tr>";
                        //document.querySelector('.box').innerHTML="id："+res.id+"<br>"+"用户名："+res.Username+"<br>"+"密码："+res.Password;
                        //遍历数组
                        for (var i = 0; i < res.length; i++) {
                            //取出对象中各个属性的数据
                            var id = res[i].User_id;
                            var name = res[i].User_name;
                            var pass = res[i].User_pass;
                            var phone = res[i].User_phone;
                            var qq = res[i].User_qq;
                            var inner = "<tr id='row'><td id='stuid'> " + id +
                                "</td><td id='stuname'>" + name +
                                "</td><td id='stupass'>" + pass +
                                "</td><td id='stuphone'>" + phone +
                                "</td><td id='stuqq'>" + qq +
                                "</td></tr>";
                            newinner += inner;
                        }
                        document.querySelector('#container').innerHTML = newinner;
                    }
                }
            }
        }
    });
}
SearchByname();