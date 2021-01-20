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
                        "<tr id='row'><td id='stuid'><input type='text' style='width:30px;' readonly='readonly' class='input' value=" + stuid +
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