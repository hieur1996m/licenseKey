<?php  
	// include thư mục libraries || lib tùy từng source mỗi người

	include_once _lib."config.php";
	// include class.database nếu có
	$d = new database($config['database']);

	$licenseKey = $_POST['licenseKey'];
	$licenseName = $_POST['licenseName'];

	$f = "../ckfinder/config.php";
	$file_contents = file_get_contents($f);
	$setLicenseKey = str_replace('@@key@@',$licenseKey,$file_contents);
	$setLicenseName = str_replace('@@name@@',$licenseName,$setLicenseKey);
	
	$out_file = fopen($f, 'w');
	fwrite($out_file, $setLicenseName);
	fclose($out_file);

	
	$d->reset();
	$data['key_ckfinder'] = $licenseKey;
	$d->setTable("setting");
	$d->update($data);
?>