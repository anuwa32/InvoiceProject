import React from 'react';
import { slide as Menu } from 'react-burger-menu';

export default props => {

  return (
    <Menu>
      <a className="" href="/">
        Invoice
      </a>

      <a className="" href="/product">
        Product
      </a>

      <a className="" href="/report">
        Report
      </a>
    </Menu>
  );
};