<?php
header("Content-type:text/html;Charset=utf-8");
include "../Model/DB.class.php";
class Users{
	/**
	 * 获取全部的用户
	 */
	public function getUsers(){
		$db=new DB();
		$sql="select * from Users;";
		$res=$db->fetchAll($sql);
		return $res;
	}
	/**
	 * 根据id删除用户
	 */
	public function removeUsers($id){
		$db=new DB();
		$sql="delete from Users where id=$id";
		$res=$db->my_query($sql);
		if($res){
			return 1;
		}else{
			return -1;
		}
	}
	/**
	 * 根据id查找用户
	 * @param {Object} $id
	 */
	public function SelectUserById($id){
		$db=new DB();
		$sql="select * from Users where id='$id'";
		$res=$db->fetchRow($sql);
		return $res;
	}
	/**
	 * 根据用户名查找用户
	 */
	public function SelectUserByName($name){
		$db=new DB();
		$sql="select * from Users where Username like '%$name%'";
		$res=$db->fetchAll($sql);
		return $res;
	}
	/**
	 * 注册用户信息
	 * @param {Object} $id
	 * @param {Object} $uname
	 * @param {Object} $pass
	 */
	public function addUsers($uname,$pass){
		$db=new DB();
		// 查找用户名是否已经存在
		$sql1="select * from User where User_name='$uname'";
		$res1=$db->fetchRow($sql1);
		// 当用户名不存在时
		if($res1==null){
			$sql="insert into User (User_name,User_pass) values ('$uname','$pass')";
			$res=$db->my_query($sql);
			return $res;
		}else{
			// 否则返回false
			return false;
		}
	}
	/**
	 * 修改用户信息
	 * @param $id
	 */
	public function upDate($id,$uname,$pass){
		$db=new DB();
		$sql="update Users set Username='$uname',Password='$pass' where id='$id'";
		$res=$db->my_query($sql);
		return $res;
	}
	/**
	 * 用户登录
	 */
	public function Login($uname,$pass){
		$db=new DB();
		$sql="select User_name,User_pass from User where User_name='$uname' and User_pass='$pass'";
		$res=$db->fetchRow($sql);
		return $res;
	}
	/**
	 * 用户名检测
	 */
	public function CheckRegister($uname){
		$db=new DB();
		$sql="select User_name from User where User_name='$uname'";
		$res=$db->fetchRow($sql);
		if($res==null){
			return -1;
		}else{
			return 1;
		}
	}
	/**
	 * 上传文件
	 */
	public function upLoadFile($title,$pic){
		$db=new DB();
		$sql="insert into file (title,pic) values ('$title','$pic')";
		$res=$db->my_query($sql);
		return $res;
	}
}