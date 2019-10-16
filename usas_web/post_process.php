<?php
  if(isset($_POST['title'])){

    require_once __DIR__ . '/post_notification.php';
    $notification = new Notification();

    $author = $_POST['author'];
    $title = $_POST['title'];
    $message = isset($_POST['message'])?$_POST['message']:'';
    $imageUrl = isset($_POST['image_url'])?$_POST['image_url']:'';
    $videoUrl = isset($_POST['video_url'])?$_POST['video_url']:'';

    // ---------------------------------------- SETUP TO DATABASE ---------------------------------------- //


    

    // ---------------------------------------- SETUP TO FIREBASE ---------------------------------------- //

    $notification->setTitle($title);
    $notification->setMessage($message);
    
    // Set SERVER KEY
    $firebase_api = 'AAAA-5TcAQo:APA91bFBiwO8IJODhnKZJLHIr2UfLHe38uRb-4c5qMkesuYAvu-_cv8DIB7yBgFH8bG4Xa-fHoK1ftexazIttsWz0ROB8yhvqbLp_yyTDBE3uTwYqYVUC3Crt3UrIH8-dbG0yTv4TOXG';
    
    // SELECT TOPIC
    $topic = 'group_1';
    
    //KANDUNGAN
    $requestData = $notification->getNotificatin();
    
    $fields = array(
      'to' => '/topics/' . $topic,
      'data' => $requestData,
    );

    // Set POST variables
    $url = 'https://fcm.googleapis.com/fcm/send';

    $headers = array(
      'Authorization: key=' . $firebase_api,
      'Content-Type: application/json'
    );
    
    // Open connection
    $ch = curl_init();

    // Set the url, number of POST vars, POST data
    curl_setopt($ch, CURLOPT_URL, $url);

    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // Disabling SSL Certificate support temporarily
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($fields));

    // Execute post
    $result = curl_exec($ch);
    if($result === FALSE){
      die('Curl failed: ' . curl_error($ch));
    }

    // Close connection
    curl_close($ch);
    
  }
?>