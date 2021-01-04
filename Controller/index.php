<?php
include "../Model/selectUsers.php";
header("Content-type:text/html;Charset=utf-8");
//ajax传入参数，根据参数调用不同的函数
$c=$_GET['c'];
/**
 * 获取全部的用户
 */
function getUser(){
	$getuser=new Users();
	// var_dump($getuser->getUsers());
	echo json_encode($getuser->getUsers());
}
/**
 * 用户注册
 */
function addUser(){
	$adduser=new Users();
	//以对象方式接收前台传来的数据
	$username=$_GET['uname'];
	$password=$_GET['pass'];
	//调用添加方法
	$result=$adduser->addUsers($username,$password);
	// 如果返回false表示数据表中已经存在该用户名,返回error
	if($result==false){
		echo "error";
	}else{
		echo "ok";
	}
}
/**
 * 删除用户信息
 */
function Remove(){
	$getuser=new Users();
	$data=$_GET["a"];
	$res=$getuser->removeUsers($data);
	if($res==1){
		echo 1;
	}else{
		echo 0;
	}
}
/**
 * 修改用户信息
 */
function upDataUser(){
	$updata=new Users();
	$id=$_GET['id'];
	$username=$_GET['uname'];
	$password=$_GET['pass'];
	$result=$updata->upDate($id,$username,$password);
	echo json_encode($result);
}
/**
 * 通过id查找用户信息
 */
function SearchById(){
	$getuser=new Users();
	// var_dump($getuser);
	$id=$_GET["a"];
	$result=$getuser->SelectUserById($id);
	// var_dump($result);
	echo json_encode($result);
}
/**
 * 通过用户名查询用户信息
 */
function SearchByName(){
	$getuser=new Users();
	$name=$_GET['uname'];
	$result=$getuser->SelectUserByName($name);
	echo json_encode($result);
}
/**
 * 登录
 */
function login(){
	$uname=$_GET['uname'];
	$pass=$_GET['pass'];
	$login=new Users();
	$result=$login->Login($uname,$pass);
    $result=json_encode($result);
	echo $result;
}
function CheckRegister(){
	$uname=$_GET['uname'];
	$check=new Users();
	$result=$check->CheckRegister($uname);
	// $result=json_encode($result);
	if($result==1){
		echo 'ok';
	}else{
		echo 'error';
	}
}
/**
 * 判断传入的参数
 */
if($c=="getuser"){
	getUser();
}else if($c=="adduser"){
	addUser();
}else if($c=="delete"){
	Remove();
}else if($c=="search"){
	SearchById();
}else if($c=="updata"){
	upDataUser();
}else if($c=="login"){
	login();
}else if($c=="searchbyname"){
	SearchByName();
}else if($c=="checkregister"){
	CheckRegister();
}
