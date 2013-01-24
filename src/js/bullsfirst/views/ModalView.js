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
 * bullsfirst/views/ModalView
 *
 * @authors Bob Holt & Alasdair Swan
 */

define(
  [
    'backbone',
    'bullsfirst/framework/MessageBus',
    'bullsfirst/views/TemplateManager',
    'jquery'
  ],

  function(Backbone, MessageBus, TemplateManager, $ ) {
    'use strict';

    var ModalView = Backbone.ModalView = Backbone.View.extend({
      
      className: 'modal',

      defaultOptions: {
        title: '',
        type: '',
        content: '',
        overlay: false,
        closeButton: true,
        draggable: false,
        position: 'center'
      },

      events: {
        'click .modal-close': 'closeModal'
      },

      initialize: function() {
        var modalView = this;

        modalView.render(modalView.options.settings);

        $(window).on('keyup', function(e) {
          if (e.which === 27) { // Escape
            modalView.closeModal();
          }
        });
      },

      render: function(settings) {

        var hash = $.extend( {}, this.defaultOptions, settings ),
          modalId = this.options.modalId,
          template = TemplateManager.getTemplate('modal');

        $('#user-page header').append( template(hash) );
        
        if ( $('.modal-overlay').css('display') === 'none' ) {
          $('.modal-overlay').show();
        }
        
        if ( hash.overlay )  {
          $('.modal-overlay').addClass('show');
        }

        if ( !hash.closeButton ) {
          $( modalId + ' .modal-close').css('display', 'none');
          $('.modal-overlay').removeClass('show');
        }

        if ( hash.draggable ) {
          $(modalId).draggable();
        }

        if ( hash.style ) {
          $(modalId).addClass( hash.style );
        }

      },

      closeModal: function(e) {
        var opt = this.options;

        if (e) {
          e.preventDefault();
        }

        $(opt.modalId).remove();

        if ( $('.modal-overlay').attr('display') !== 'none') {
          $('.modal-overlay').hide();
        }

        $(opt.trigger).removeClass('disabled');
        
      }

    });

    return ModalView;
  }
);