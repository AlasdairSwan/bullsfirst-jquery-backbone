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
 * bullsfirst/views/FilterView
 *
 * @author Alasdair Swan
 */
define(
    [
        'backbone',
        'bullsfirst/framework/MessageBus',
        'bullsfirst/views/TemplateManager',
        'jquery',
        'moment'
    ],
    
    function( Backbone, MessageBus, TemplateManager, $, moment ) {
        'use strict';
        

        return Backbone.View.extend({
			
			events: {
				'click .js-reset-filters-button': 'clickReset',
                'click .js-apply-filters-button': 'clickApply'
			},

			initialize: function(){
				this.collection.bind('reset', this.render, this);
			},

			render: function(){

				var	tab = this.options.tab,
					template = TemplateManager.getTemplate('filter-' + tab);

                var hash = {
					models: this.collection.models,
					tab: tab
                };

				$(this.el).html(template(hash));

				// Create date pickers
				$('#' + tab + '-fromDate').datepicker();
				$('#' + tab + '-toDate').datepicker();

				this.resetFilter();

				// Subscribe to events
				MessageBus.on('UpdateTransactions', function() {
					this.updateTransactions();
				}, this);

			},

			clickReset: function(e) {
				e.preventDefault();
				this.resetFilter();
			},

			resetFilter: function() {
				document.getElementById(this.options.tab + '-filter-accountId').selectedIndex = 0;
				$('#' + this.options.tab + '-fromDate').datepicker('setDate', new Date());
				$('#' + this.options.tab + '-toDate').datepicker('setDate', new Date());
			},

			clickApply: function(e) {
				e.preventDefault();
				this.updateTransactions();
			},

			updateTransactions: function() {

				// Process filter criteria to server format
				var filterCriteria = {},
                    accountId = $('#' + this.options.tab + '-filter-accountId').val();

                if ( accountId > 0 ) {
                    filterCriteria.accountId = accountId;
                }

				if ( $('#' + this.options.tab + '-fromDate').val().length > 0 ) {
					filterCriteria.fromDate = moment( $('#' + this.options.tab + '-fromDate').datepicker('getDate') ).format('YYYY-MM-DD');
				}

				if ( $('#' + this.options.tab + '-toDate').val().length > 0 ) {
					filterCriteria.toDate = moment( $('#' + this.options.tab + '-toDate').datepicker('getDate') ).format('YYYY-MM-DD');
				}

				// Send OrderFilterChanged message with filter criteria
				MessageBus.trigger('TransactionFilterChanged', filterCriteria);
			}

        });
    }
);