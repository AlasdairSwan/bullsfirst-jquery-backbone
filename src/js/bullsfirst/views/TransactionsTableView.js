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
 * bullsfirst/views/TransactionsTableView
 *
 * @author Alasdair Swan
 */
define(
    [
        'backbone',
        'bullsfirst/framework/MessageBus',
        'bullsfirst/views/TemplateManager',
        'bullsfirst/views/TransactionView'
    ],
    
    function( Backbone, MessageBus, TemplateManager, TransactionView ) {
        'use strict';
        

        return Backbone.View.extend({

			initialize: function(){

				this.collection.bind('reset', this.render, this);


				// Subscribe to events
				MessageBus.on('TransactionFilterChanged', function(filterCriteria) {
					this.collection.fetch({data: filterCriteria});
				}, this);

				this.render();
			},

			render: function(){
				this.$el.find('tbody').html('');

				// Add new rows from orders collection. Pass this object as context
				this.collection.each(function(txn) {
					var view = new TransactionView({model: txn});
					this.$el.append(view.render().el);
				}, this);

			}

        });
    }
);