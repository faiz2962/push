<!DOCTYPE html>
<html lang="en">
	<head>
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	</head>
	<body>
    <form action="" method="post">
    <div class="form-group">
        <label for="author">Author:</label>
        <input type="text" required="" class="form-control" id="author" placeholder="Author..." name="title">
      </div>
      <div class="form-group">
        <label for="title">Title:</label>
        <input type="text" required="" class="form-control" id="title" placeholder="Title..." name="title">
      </div>
      <div class="form-group">
        <label for="message">Message:</label>
        <textarea required="" class="form-control" rows="5" id="message" placeholder="Message..." name="message"></textarea>
      </div>
      <div class="checkbox">
        <label><input type="checkbox"id="include_image" name="include_image"> Include Image</label>
      </div>
      <div class="form-group" style="display: none" id="image_url_group">
        <label for="image_url">Image URL:</label>
        <input type="file" class="form-control" id="image_url" placeholder="Paste Full Link" name="image_url">
      </div>
      <div class="checkbox">
        <label><input type="checkbox" id="include_video" name="include_video"> Include Video <i>(Must From Youtube)</i></label>
      </div>
      <div class="form-group" style="display: none" id="video_url_group">
        <label for="video_url">Destination:</label>
        <input type="text" class="form-control" id="video_url" placeholder="Paste Full Video Link" name="video_url">
      </div>
      <div class="form-group">
        <input type="hidden" id="news_type" name="video_url">
      </div>

      <button type="submit" class="btn btn-info">Submit</button>
    </form>
    <?php include("post_process.php"); ?>
		<script>
    	$("#news_type").val("text");
			$('#include_image').change(function(e){
					if($(this).prop("checked")==true){
						$('#image_url_group').show();
						$("#image_url").prop('required',true);
            $("#news_type").val("image");
            $('#include_video').prop('checked', false);
            $('#video_url_group').hide();
						$("#video_url").prop('required',false);
					}else{
						$('#image_url_group').hide();
						$("#image_url").prop('required',false);
            $("#news_type").val("text");
					}
				});
			$('#include_video').change(function(e){
					if($(this).prop("checked")==true){
						$('#video_url_group').show();
						$("#video_url").prop('required',true);
            $("#news_type").val("video");
            $('#include_image').prop('checked', false);
            $('#image_url_group').hide();
						$("#image_url").prop('required',false);
					}else{
						$('#video_url_group').hide();
						$("#video_url").prop('required',false);
            $("#news_type").val("text");
					}
				});
		</script>
	</body>
</html>