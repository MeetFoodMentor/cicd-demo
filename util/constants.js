exports.userType = Object.freeze({
  CUSTOMER: 'customer',
  BUSINESS_OWNER: 'business_owner',
  BUSINESS_ADMIN: 'business_admin'
});

exports.statesArray = Object.freeze([
  'AL',
  'AK',
  'AZ',
  'AR',
  'CA',
  'CO',
  'CT',
  'DC',
  'DE',
  'FL',
  'GA',
  'HI',
  'ID',
  'IL',
  'IN',
  'IA',
  'KS',
  'KY',
  'LA',
  'ME',
  'MD',
  'MA',
  'MI',
  'MN',
  'MS',
  'MO',
  'MT',
  'NE',
  'NV',
  'NH',
  'NJ',
  'NM',
  'NY',
  'NC',
  'ND',
  'OH',
  'OK',
  'OR',
  'PA',
  'RI',
  'SC',
  'SD',
  'TN',
  'TX',
  'UT',
  'VT',
  'VA',
  'WA',
  'WV',
  'WI',
  'WY'
]);

exports.currencyArray = Object.freeze(['usd']);

// TODO: Add more status related to delivery, etc.
exports.orderStatusArray = Object.freeze([
  // After order is getting created.
  'CREATED',
  // Vendor accepted the order.
  'VENDOR_ACCEPTED',
  // After payment is charged.
  'PAYMENT_CHARGED',
  // Order is cancelled by the user.
  'CANCELLED',
  // Payment is denied by payment processor.
  'PAYMENT_FAILED'
]);

exports.transactionTypeArray = Object.freeze([
  'WITHDRAW',
  'REAL_WITHDRAW',
  'SALE'
]);

exports.operationStatus = Object.freeze({
  OPEN: 'OPEN',
  CLOSED: 'CLOSED'
});

exports.menuType = Object.freeze({
  CHANGING: 'Changing',
  PERMANENT: 'Permanent'
});

exports.ReportReasonType = Object.freeze({
  UNCIVIL: 'Uncivil, unneighborly or offensive',
  FRAUD: 'Misinformation, fraud',
  PLAGIARIZ: "Plagiarizing others' workCopy",
  OTHERS: 'Others'
});

exports.changingMenuHourCategory = Object.freeze({
  LUNCH: 'Lunch',
  DINNER: 'Dinner',
  ONE_DAY: 'OneDay'
});

exports.restaurantTypeArray = Object.freeze([
  'Chinese',
  'French',
  'Mediterranean',
  'Indian',
  'Italian',
  'Japanese',
  'Korean',
  'Mexican',
  'Thai',
  'Private Chef',
  'Meal Kit',
  'Breakfast',
  'Fastfood'
]);

exports.businessType = Object.freeze({
  TRAFFIC_TARGETED: 'trafficTargetBusiness',
  FULLY_ONBOARD: 'fullyOnBoardBusiness',
  CLAIMABLE: 'claimableBusiness'
});

exports.defaultAvatar = Object.freeze({
  BUSINESS:
    'https://meetfood-profile-photos.s3.amazonaws.com/profile-photos/merchant_default_avatar.png'
});

exports.reportStatusType = Object.freeze({
  OPEN: 'open',
  CLOSE: 'close',
  RESOLVE: 'resolve',
  REJECT: 'reject'
});
