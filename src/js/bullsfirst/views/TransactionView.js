/**
 * Copyright 2012 Archfirst
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
 * bullsfirst/views/TransactionView
 *
 * @author Naresh Bhatia
 */
define(
    [
        'backbone',
        'bullsfirst/framework/Formatter',
        'bullsfirst/views/TemplateManager',
        'jquery',
        'moment'
    ],

    function( Backbone, Formatter, TemplateManager, $, moment ) {
        'use strict';

        return Backbone.View.extend({

            tagName: 'tr',

            render: function() {
                // Format transaction values for display
                var transaction = this.model.toJSON();  // returns a copy of the model's attributes
                transaction.creationTimeFormatted = Formatter.formatMoment2DateTime(moment(transaction.creationTime));
                transaction.amountFormatted = Formatter.formatMoney(transaction.amount);

                // Render using template
                var hash = {
                    transaction: transaction
                };

                var template = TemplateManager.getTemplate('transaction');

                $(this.el).html( template(hash) );

                return this;
            }
        });
    }
);