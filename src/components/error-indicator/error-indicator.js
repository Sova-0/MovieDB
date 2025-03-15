import React from 'react';
import { Alert } from 'antd';

function ErrorIndicator({ errorMessage }) {
  <Alert message="Error" description={errorMessage} type="error" showIcon />;
}
export default ErrorIndicator;
