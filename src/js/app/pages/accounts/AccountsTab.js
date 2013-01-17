/**
 * Copyright 2013 Archfirst
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * app/pages/accounts/AccountsTab
 *
 * @author Naresh Bhatia
 */
define(
    [
        'framework/BaseView',
        'app/domain/Repository',
        'app/widgets/account-chart/AccountChartWidget',
        'app/widgets/account-table/AccountTableWidget',
        'text!app/pages/accounts/AccountsTabTemplate.html'
    ],
    function(BaseView, Repository, AccountChartWidget, AccountTableWidget, AccountsTabTemplate) {
        'use strict';

        return BaseView.extend({
            tagName: 'section',
            className: 'accounts-tab tab clearfix',

            template: {
                name: 'AccountsTabTemplate',
                source: AccountsTabTemplate
            },

            events: {
                'click .js-add-account-button': 'addAccount',
                'click .js-refresh-button': 'refreshAccounts'
            },

            postRender: function() {
                this.addWidgets([
                    {
                        name: 'AccountTableWidget',
                        widget: AccountTableWidget,
                        element: this.$el
                    },
                    {
                        name: 'AccountChartWidget',
                        widget: AccountChartWidget,
                        element: this.$el,
                        collection: Repository.getBrokerageAccounts()
                    }
                ]);
            },

            addAccount: function() {
                return false;
            },

            refreshAccounts: function() {
                Repository.updateAccounts();
                return false;
            }
        });
    }
);