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
 * bullsfirst/views/TradeView
 *
 * @author Alasdair Swan
 */
define(
    [
        'backbone',
        'bullsfirst/domain/MarketPrice',
        'bullsfirst/domain/UserContext',
        'bullsfirst/framework/ErrorUtil',
        'bullsfirst/views/ModalView',
        'bullsfirst/views/TemplateManager'
    ],
    function( Backbone, MarketPrice, UserContext, ErrorUtil, ModalView, TemplateManager ) {
        'use strict';

        return Backbone.View.extend({

            modal: null,

            collection: UserContext.getBrokerageAccounts(),

            initialize: function() {
                var settings = {
                    title: 'Trade',
                    type: 'trade',
                    content: '',
                    draggable: true,
                    position: 'right'
                };

                this.render(settings, this.collection);

                return false;
            },

            render: function(settings, collection) {

                var template = TemplateManager.getTemplate('trade');
                
                settings.content = template(collection);

                this.modal = new ModalView({
                    el: '#user-page',
                    modalId: '#' + settings.type + '-modal',
                    settings: settings,
                    trigger: '#trade-button'
                });

                // TODO: init symbol field

                return false;
            },

            /*_fetchMarketPrice: function(symbol) {
                this.marketPrice = new MarketPrice({symbol: symbol});
                this.marketPrice.fetch({
                    success: _.bind(this._marketPriceFetched, this),
                    error: ErrorUtil.showBackboneError
                });
            },*/

            trade: function(){
                return false;
            }
        });
    }
);