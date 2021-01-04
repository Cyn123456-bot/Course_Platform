<?php
header("Content-type:text/html;Charset=utf-8");
class Upload{
	protected $dir;
	public function make(){
		$this->makeDir();
		$files=$this->format();
		$saveFile=[];	//存储上传成功的文件
		// print_r($files);
		foreach($files as $file){
			//当上传成功时
			if($file['error']==0){
				if(is_uploaded_file($file['tmp_name'])){
					//为文件重新命名
					$to=$this->dir .'/'.time().'.'.pathinfo($file['name'])['extension'];
					//移动临时文件
					if(move_uploaded_file($file['tmp_name'],$to)){
						$saveFile[]=[
							'path'=>$to,
							'size'=>$file['size'],
							'name'=>$file['name']
						];
					}
				}
			}
		}
		return $saveFile;
	}
	//生成目录
	private function makeDir(){
		$path="../file/".date('y/m');
		$this->dir=$path;
		return is_dir($path) or mkdir($path,0755,true);
	}
	
	//统一数据格式
	private function format(){
		$files=[];
		foreach($_FILES as $filed){
			if(is_array($filed['name'])){
				foreach($filed['name'] as $id=>$file){
					$files[]=[
						'name'=>$filed['name'][$id],
						'type'=>$filed['type'][$id],
						'error'=>$filed['error'][$id],
						'tmp_name'=>$filed['tmp_name'][$id],
						'size'=>$filed['size'][$id]
					];
				}
			}
			else{
				$files[]=$filed;
			}
		}
		return $files;
	}
}
