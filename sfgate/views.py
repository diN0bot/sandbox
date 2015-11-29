from django.shortcuts import render
from django.http import HttpResponse
from django.template import RequestContext, loader
import requests
import re

def index(request):
    req = requests.get("http://sfgate.com")
    html = req.content
    html = re.sub(r"<header>.*?</header>", "", html, flags=re.DOTALL)
    html = re.sub(r"<h2>Connect with SFGATE.*?</table>", "", html, flags=re.DOTALL)
    html = re.sub(r"<img ", "<img width=\"200\" ", html, flags=re.DOTALL)
    html = re.sub(r"</title>", """</title>
    	<style>
	    	* { font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
	            font-size: 14px;
	            color: #333; }
	        a { text-decoration: none; color: #33f; }
	    	ul {}
	    	li { list-style: none; }
	    	img { float: left; clear: both; padding-right: 10px; padding-bottom: 10px; }
	    	h2, h2 span { font-size: 18px; clear: both; padding-top: 10px; color: #f53829; }
	    	h5 { display: inline; }
	    	.timestamp { padding-left: 10px; color: red; }
    	</style>""", html)
    latest = re.search(r"(<div class=\"headline-list aboutsfgate\".*?<!-- e hearst/collections/core_headline_list_body.tpl --></div>)", html, flags=re.DOTALL).group()
    html = re.sub(r"(<div class=\"headline-list aboutsfgate\".*?<!-- e hearst/collections/core_headline_list_body.tpl --></div>)", "", html, flags=re.DOTALL)
    html = re.sub(r"<div class=\"most-popular\"", latest+"<class=\"most-popular\"", html, flags=re.DOTALL)
    html = re.sub(r"href=\"/", "href=\"/sfgate/", html)
    return HttpResponse(html)

def page(request, path):
    req = requests.get("http://sfgate.com/"+path)
    html = req.content
    html = re.search(r"(<div class=\"article-content\".*?</div><!--/article-content-->)", html, flags=re.DOTALL).group()
    html = re.sub(r"<div class=\"social-links.*?</div>", "", html, flags=re.DOTALL)
    html = re.sub(r"<div class=\"article-share.*?</div>", "", html, flags=re.DOTALL)
    html = re.sub(r"<ul class=\"left\".*?</div>", "", html, flags=re.DOTALL)
    html = re.sub(r"<div class=\"caption  staged.*?</div>", "", html, flags=re.DOTALL)
    html = re.sub(r"<div class=\"asset_gallery.*?</div><!-- /gallery float -->", "", html, flags=re.DOTALL)
    html = re.sub(r"<div class=\"caption-full.*?</div>", "", html, flags=re.DOTALL)
    html = re.sub(r"<div class=\"caption-truncated.*?</div>", "", html, flags=re.DOTALL)
    html = re.sub(r"<div class=\"credit.*?</div>", "", html, flags=re.DOTALL)
    html = re.sub(r"<span class=\"credit.*?</span>", "", html, flags=re.DOTALL)
    html = re.sub(r"<div class=\"asset_relatedlinks.*?</div><!-- /relatedlinks float -->", "", html, flags=re.DOTALL)
    return HttpResponse("<html><body>"+html+"</body></html>")
