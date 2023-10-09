const config = require('../config/production');
const AWS = require('aws-sdk');

const initAWSCognito = () => {
  AWS.config.update({
    accessKeyId: config.IAMAccessKeyId,
    secretAccessKey: config.IAMSecretAccessKey,
    region: config.CognitoRegion
  });
};

// ToC use
const adminToCDeleteUser = async (username) => {
  try {
    const cognito = new AWS.CognitoIdentityServiceProvider();
    await cognito
      .adminDeleteUser({
        Username: username,
        UserPoolId: config.CognitoToCUserPoolId
      })
      .promise();

    return {
      isDeleted: true
    };
  } catch (err) {
    return {
      isDeleted: false,
      err: err
    };
  }
};

module.exports = {
  initAWSCognito,
  adminToCDeleteUser
};
