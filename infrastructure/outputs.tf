output "bucket_name" {
  value = "${aws_s3_bucket.app_bucket.bucket}"
}

output "website_endpoint" {
  value = "${aws_s3_bucket.app_bucket.website_endpoint}"
}
