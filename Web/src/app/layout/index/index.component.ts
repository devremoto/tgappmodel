import { Component, OnInit } from '@angular/core';
import { Router, RouterEvent, NavigationStart, NavigationError, NavigationEnd } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { LanguageCustomService } from '../../services/custom/Language';
import { ContactCustomService } from '../../services/custom/Contact';
import { Contact } from '../../models/Contact';
declare var $: any;
declare var window: any;
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  name: string;
  contact: Contact = new Contact();
  errorMessage: string;
  loading = false;
  constructor(
    translate: LanguageCustomService,
    private _toasterService: ToasterService,
    private _contactService: ContactCustomService,
    router: Router
  ) {
    translate.init();
    router.events.subscribe((event: RouterEvent) => {
      if (event instanceof NavigationStart) {
      }

      if (event instanceof NavigationEnd) {
      }

      if (event instanceof NavigationError) {
      }
    });
  }

  ngOnInit() {
    // $(document).ready(window.contactWidget)

    // submenu dropdown click event
    $('ul.dropdown-menu [data-toggle=dropdown]').on('click', (e: any) => {
      e.preventDefault();
      e.stopPropagation();
      $(this)
        .parent()
        .siblings()
        .removeClass('open');
      $(this)
        .parent()
        .toggleClass('open');
    });

    // hide collapsible menu once menu item clicked
    $('.nav-onepage li a').click(() => {
      const navbarCollapse = $(this).parents('.navbar-collapse.collapse');

      if (navbarCollapse.hasClass('in')) {
        navbarCollapse.collapse('hide');
      }
    });

    // full transparent fixed-top navbar should have background when scrolled
    if ($('.navbar-fixed-top.navbar-no-background').length > 0) {
      $(window).scroll(() => {
        if ($(document).scrollTop() > 100) {
          $('.navbar-fixed-top').removeClass('navbar-no-background');
        } else {
          $('.navbar-fixed-top').addClass('navbar-no-background');
        }
      });
    }

    // transparent fixed-top navbar should have solid background when scrolled
    if ($('.navbar-fixed-top.navbar-transparent').length > 0) {
      $(window).scroll(() => {
        if ($(document).scrollTop() > 100) {
          $('.navbar-fixed-top').removeClass('navbar-transparent');
        } else {
          $('.navbar-fixed-top').addClass('navbar-transparent');
        }
      });
    }

    if ($('.navbar-auto-hiding').length > 0) {
      $('.navbar-auto-hiding').autoHidingNavbar();
    }

    if ($('.navbar-fixed-top.navbar-shrinkable').length > 0) {
      $(window).scroll(() => {
        if ($(document).scrollTop() > 300) {
          $('.navbar-fixed-top').addClass('shrink-active');
        } else {
          $('.navbar-fixed-top').removeClass('shrink-active');
        }
      });
    }

    // scroll to top
    if ($(window).width() > 992) {
      $(window).scroll(() => {
        if ($(this).scrollTop() > 300) {
          $('.back-to-top').fadeIn();
        } else {
          $('.back-to-top').fadeOut();
        }
      });

      $('.back-to-top').click((e) => {
        e.preventDefault();

        $('body, html').animate(
          {
            scrollTop: 0
          },
          800,
          'easeInOutExpo'
        );
      });
    }

    // onepage scroll links
    if ($('.nav-onepage').length > 0 || $('.internal-links').length > 0) {
      $('.nav-onepage, .internal-links').localScroll({
        duration: 1000,
        offset: -($('.navbar-fixed-top').height() + 30),
        easing: 'easeInOutExpo'
      });
    }

    if ($('.nav-onepage').length > 0) {
      $('body').scrollspy({ target: '#main-navbar', offset: 120 });
    }

    if ($('#contact-widget-bottom').length > 0) {
      const $widgetHeight = $('#contact-widget-bottom').innerHeight();
      const $panelBodyHeight = 410;
      const $panelHeading = $('#contact-widget-bottom').find('.panel-heading');
      let $panelShown = false;

      // initial position
      $('#contact-widget-bottom').animate(
        {
          bottom: '-=' + $panelBodyHeight
        },
        1000,
        'swing'
      );

      // use min-height for any changing content
      $('#contact-widget-bottom').css('min-height', $widgetHeight);

      $panelHeading.on('click', () => {
        if (!$panelShown) {
          $('#contact-name').focus();
          $('#contact-widget-bottom').animate(
            {
              bottom: '+=' + $panelBodyHeight
            },
            300,
            'swing'
          );

          $panelHeading.find('.icon-up').addClass('hide');
          $panelHeading.find('.icon-down').removeClass('hide');
          $panelShown = true;
        } else {
          $('#contact-widget-bottom').animate(
            {
              bottom: '-=' + $panelBodyHeight
            },
            300,
            'swing'
          );

          $panelHeading.find('.icon-up').removeClass('hide');
          $panelHeading.find('.icon-down').addClass('hide');

          $panelShown = false;
        }
      });
    }
  }

  public sendEmail(contact: Contact) {
    // if (this.validate()) {
    this.loading = true;
    this._contactService.sendEmail(contact).subscribe(
      result => {
        this.name = contact.name;
        this.contact = new Contact();
        // this.open();
        this._toasterService.pop('success', 'Mensagem enviada', 'Mensagem enviada com sucesso');
        this.loading = false;
      },
      error => {
        this.errorMessage = 'Problema no envio da mensagem, tente novamente';
        this._toasterService.pop('error', 'Erro', this.errorMessage);
        this.loading = false;
      },
      () => {
        this.loading = false;
      }
    );
  }

  // }
}
