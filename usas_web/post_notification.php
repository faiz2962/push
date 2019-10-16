<?php
class Notification{
	private $title;
	private $message;
	private $data;
	
	function __construct(){
         
	}
 
	public function setTitle($title){
		$this->title = $title;
	}
 
	public function setMessage($message){
		$this->message = $message;
	}
 
	public function setPayload($data){
		$this->data = $data;
	}
	
	public function getNotificatin(){
		$notification = array();
		$notification['title'] = $this->title;
		$notification['message'] = $this->message;
		return $notification;
	}
}
?>