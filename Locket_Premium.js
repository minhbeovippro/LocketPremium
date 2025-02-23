const specificDate = "2025-02-22T00:00:00Z";

const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip'],
  'Locket': ['Gold']
};

var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];

try {
  var obj = JSON.parse($response.body);
} catch (e) {
  $done({});
}

if (!obj.subscriber) obj.subscriber = {};
if (!obj.subscriber.entitlements) obj.subscriber.entitlements = {};
if (!obj.subscriber.subscriptions) obj.subscriber.subscriptions = {};

var locketGold = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-31T01:04:17Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: specificDate,
  purchase_date: specificDate,
  store: "app_store"
};

var goldEntitlement = {
  grace_period_expires_date: null,
  purchase_date: specificDate,
  product_identifier: "com.locket.gold.yearly",
  expires_date: "2099-12-31T01:04:17Z"
};

const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
  let entitlementKey = mapping[match][0] || "Gold";
  let subscriptionKey = "com.locket.gold.yearly";
  obj.subscriber.subscriptions[subscriptionKey] = locketGold;
  obj.subscriber.entitlements[entitlementKey] = goldEntitlement;
} else {
  obj.subscriber.subscriptions["com.locket.gold.yearly"] = locketGold;
  obj.subscriber.entitlements["Gold"] = goldEntitlement;
}

$done({ body: JSON.stringify(obj) });