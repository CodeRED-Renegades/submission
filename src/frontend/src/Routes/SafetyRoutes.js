import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Dashboard } from '../Pages/Dashboard/Dashboard';
import { ReportForm } from '../Pages/Form/ReportForm';

export const SafetyRoutes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={Dashboard} />
                <Route exact path='/form' component={ReportForm} />
            </Switch>
        </BrowserRouter>
    );
}