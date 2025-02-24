var specificDate = "2025-02-25T00:00:00Z";

const mapping = {
  '%E8%BD%A6%E7%A5%A8%E7%A5%A8': ['vip+watch_vip', 'com.locket.premium.yearly'],
  'Locket': ['Locket', 'com.locket.premium.yearly']
};

// Lấy User-Agent từ request
var ua = $request.headers["User-Agent"] || $request.headers["user-agent"];

try {
  var obj = JSON.parse($response.body);
} catch (e) {
  $done({});
}

// Khởi tạo cấu trúc dữ liệu nếu chưa có
obj.subscriber = obj.subscriber || {};
obj.subscriber.entitlements = obj.subscriber.entitlements || {};
obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};

// Định nghĩa dữ liệu gói đăng ký và quyền lợi
var subscriptionData = {
  is_sandbox: false,
  ownership_type: "PURCHASED",
  billing_issues_detected_at: null,
  period_type: "normal",
  expires_date: "2099-12-31T01:01:01Z",
  grace_period_expires_date: null,
  unsubscribe_detected_at: null,
  original_purchase_date: specificDate,
  purchase_date: specificDate,
  store: "app_store"
};

var entitlementData = {
  grace_period_expires_date: null,
  purchase_date: specificDate,
  product_identifier: "com.locket.premium.yearly",
  expires_date: "2099-12-31T01:01:01Z"
};

// Tìm key phù hợp trong `mapping`
let entitlementKey = "Locket";
let subscriptionKey = "com.locket.premium.yearly";

for (let key in mapping) {
  if (ua.includes(key)) {
    entitlementKey = mapping[key][0] || entitlementKey;
    subscriptionKey = mapping[key][1] || subscriptionKey;
    break;
  }
}

// Gán dữ liệu đăng ký
obj.subscriber.subscriptions[subscriptionKey] = subscriptionData;
obj.subscriber.entitlements[entitlementKey] = entitlementData;

$done({ body: JSON.stringify(obj) });
