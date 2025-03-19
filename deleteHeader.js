const version = 'V1.0.3';

function setHeaderValue(e, a, d) {
  var r = a.toLowerCase();
  r in e ? e[r] = d : e[a] = d;
}

var modifiedHeaders = $request.headers;

setHeaderValue(modifiedHeaders, "X-RevenueCat-ETag", "");

setHeaderValue(modifiedHeaders, "X-Forwarded-For", "104.28.0.1");
setHeaderValue(modifiedHeaders, "CF-Connecting-IP", "104.28.0.1");
setHeaderValue(modifiedHeaders, "Accept-Language", "en-US,en;q=0.9");
setHeaderValue(modifiedHeaders, "Geo-Location", "37.7749,-122.4194");

$done({ headers: modifiedHeaders });
