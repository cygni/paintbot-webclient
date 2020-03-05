provider "aws" {
  region  = "${var.aws_region}"
}

terraform {
  backend "s3" {
    encrypt        = true
    bucket         = "paintbot-terraform-remote-state-storage"
    dynamodb_table = "paintbot-terraform-state-lock"
    region         = "eu-west-1"
    key            = "paintbot-webapp.tfstate"
  }
}

resource "aws_s3_bucket" "app_bucket" {
  bucket_prefix = "${var.bucket_name}-"
  region        = "${var.aws_region}"
  acl           = "public-read"

  website {
    index_document = "index.html"
  }
}

resource "aws_s3_bucket_policy" "read_policy" {
  bucket = "${aws_s3_bucket.app_bucket.id}"

  policy = <<POLICY
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": ["s3:GetObject"],
            "Resource": ["${aws_s3_bucket.app_bucket.arn}/*"]
        }
    ]
}
POLICY
}
