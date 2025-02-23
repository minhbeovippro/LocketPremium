var specificDate = "2025-02-22T00:00:00Z";

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

var locketgold = {
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

var gold_entitlement = {
  grace_period_expires_date: null,
  purchase_date: specificDate,
  product_identifier: "com.locket.premium.yearly",
  expires_date: "2099-12-31T01:04:17Z"
};

// Mở khóa tất cả các tính năng
obj.subscriber.subscriptions["com.locket.premium.yearly"] = locketgold;
obj.subscriber.entitlements["Locket"] = gold_entitlement;

// Thêm các quyền khác nếu cần
obj.subscriber.entitlements["app_icon_picker"] = gold_entitlement;
obj.subscriber.entitlements["camera_roll"] = gold_entitlement;
obj.subscriber.entitlements["camera_theme"] = gold_entitlement;
obj.subscriber.entitlements["locket_views"] = gold_entitlement;
obj.subscriber.entitlements["remove_ads"] = gold_entitlement;
obj.subscriber.entitlements["custom_widget_frames"] = gold_entitlement;
obj.subscriber.entitlements["long_captions"] = gold_entitlement;
obj.subscriber.entitlements["unlimited_friends"] = gold_entitlement;
obj.subscriber.entitlements["priority_support"] = gold_entitlement;
obj.subscriber.entitlements["profile_badge"] = gold_entitlement;
obj.subscriber.entitlements["video"] = gold_entitlement;
obj.subscriber.entitlements["streak_recovery"] = gold_entitlement;

$done({ body: JSON.stringify(obj) });