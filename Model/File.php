<?php
header("Content-type:text/html;Charset=utf-8");
include "../Model/DB.class.php";
class Files{
	public function addVideo($title,$intro,$path,$size,$name){
		$db=new DB();
		$sql="insert into video (video_title,video_intro,video_path,video_size,video_name) values ('$title','$intro',
		'$path','$size','$name')";
		$res=$db->my_query($sql);
		return $res;
	}
}