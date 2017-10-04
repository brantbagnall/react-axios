import React from "react";
import './Customer.css';

import Information from './Information/Information';
import Status from './Status/Status';
import RepairLog from './RepairLog/RepairLog';
import RemoveCustomer from './RemoveCustomer/RemoveCustomer';

function Customer({ id, first, last, email, phone, status, log, saveEdit, removeCustomer}) {

    return (
      <div id="Customer__container" onClick={''}>
        <Information id={ id } first={ first } last={ last } email={ email } phone={ phone } saveEdit={saveEdit} />
        <Status id={ id } status={ status } saveEdit={saveEdit} />
        <RepairLog id={ id } log={ log } saveEdit={saveEdit} />
        <RemoveCustomer id={ id } saveEdit={saveEdit} removeCustomer={removeCustomer} />
      </div>
    )
}

export default Customer;
