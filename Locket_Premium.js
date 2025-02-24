var specificDate = "2025-02-25T00:00:00Z"; 

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

obj.subscriber = obj.subscriber || {};
obj.subscriber.entitlements = obj.subscriber.entitlements || {};
obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};

var locketgold = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-31T00:00:00Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: specificDate,
  purchase_date: specificDate,
  store: "app_store"
};

var gold_entitlement = {
  grace_period_expires_date: null,
  purchase_date: specificDate,
  product_identifier: "com.locket.premium.yearly",
  expires_date: "2099-12-31T00:00:00Z"
};

const match = Object.keys(mapping).find(e => ua.includes(e));

if (match) {
  let entitlementKey = mapping[match][0] || "Locket";
  let subscriptionKey = mapping[match][1] || "com.locket.premium.yearly";

  obj.subscriber.subscriptions[subscriptionKey] = locketgold;
  obj.subscriber.entitlements[entitlementKey] = gold_entitlement;
} else {
  obj.subscriber.subscriptions["com.locket.premium.yearly"] = locketgold;
  obj.subscriber.entitlements["Locket"] = gold_entitlement;
}

$done({ body: JSON.stringify(obj) });
