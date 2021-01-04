<?php
	class DB{
		//定义相关的属性
		private $host;//主机地址
		private $port;//端口号
		private $user;//用户名
		private $pass;//密码
		private $charset;//字符集
		private $dbname;//数据库名
		//运行时候需要的属性
		private $link;//连接资源
		
		/**
		 * 构造方法
		 */
		public function __construct(){
			//初始化属性值
			$this->init();
			//链接数据库
			$this->my_connect();
			$this->my_charset();
			$this->dbname();
		}
		private function init(){
			$this->host= '127.0.0.1';
			$this->port= '3306';
			$this->user= 'root';
			$this->pass= '';
			$this->charset= 'utf8';
			$this->dbname= 'Course';
		}
		/**
		 * 链接数据库
		 */
		private function my_connect(){
			//若连接成功，将连接资源保存到$link中
			if($link=@mysql_connect("$this->host:$this->port",$this->user,$this->pass)){
				$this->link=$link;
			}else{
				echo "数据库连接失败";
				echo "错误信息：",mysql_errno(),"<br />";
				echo "错误信息：",mysql_error(),"<br />";
				return false;
			}
		}
		
		/**
		 * 错误调试方法
		 */
		public function my_query($sql){
			$result=mysql_query($sql);
			if(!$result){
				echo "sql语句执行失败";
				echo "错误信息：",mysql_errno(),"<br />";
				echo "错误信息：",mysql_error(),"<br />";
				return false;
			}
			return $result;
		}
		/**
		 * 返回多行多列查询结果
		 * @param $sql
		 * @return array
		 */
		public function fetchAll($sql){
			//先执行sql语句
			if($result=$this->my_query($sql)){
				//执行成功
				//遍历结果集
				$rows=array();
				while($row=mysql_fetch_assoc($result)){
					$rows[]=$row;
				}
				//释放资源
				mysql_free_result($result);
				//返回结果集
				return $rows;
			}else{
				return false;
			}
		}
		/**
		 * 返回一行多列结果
		 */
		public function fetchRow($sql){
			//先执行sql语句
			if($result=$this->my_query($sql)){
				//执行成功
				$row=mysql_fetch_assoc($result);
				//释放资源
				mysql_free_result($result);
				//返回结果集
				return $row;
			}else{
				return false;
			}
		}
		/**
		 * 返回单行单列结果
		 */
		public function fetchColumn($sql){
			//执行sql语句
			if($result=$this->my_query($sql)){
				//执行成功
				$row=mysql_fetch_row($result);
				//释放结果资源集
				mysql_free_result($result);
				//返回这个单一值
				return isset($row[0]) ? $row[0] : false;
			}else{
				return false;
			}
		}
		/**
		 * 选择默认字符集
		 */
		private function my_charset(){
			$sql="set names $this->charset";
			$this->my_query($sql);
		}
		/**
		 * 选择默认的数据库
		 */
		private function dbname(){
			$sql="use $this->dbname";
			$this->my_query($sql);
		}
		/**
		 * 析构方法
		 */
		public function __destruct(){
			//释放数据库连接资源
			mysql_close($this->link);
		}
		/**
		 * __sleep方法，序列化对象时自动调用
		 */
		public function __sleep(){
			return array('host','port','user','pass','charset','dbname');
		}
		/**
		 * __wakeup函数，反序列化一个对象的时候自动调用
		 */
		public function __wakeup(){
			$this->my_connect();
			$this->my_charset();
			$this->dbname();
		}
	}