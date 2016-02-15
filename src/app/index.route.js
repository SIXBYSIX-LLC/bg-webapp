(function() {
  'use strict';

  angular
    .module('BG')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home',{
         url:'/',
         templateUrl:'app/views/home/home.html',
         controller:'HomeCtrl'
      })
      .state('main',{
          templateUrl:'app/views/main/main.html',
          controller:"MainCtrl"
      })
      .state('main.account',{
        url:'/account',
        abstract:true,
        controller:'AccountCtrl',
        templateUrl:'app/views/account/account.html'
      })
      .state('main.contactUs',{
        url:'/contact-us',
        templateUrl:'app/views/contact-us/contact-us.html'
      })
      .state('main.account.bookings',{
        url:'/bookings',
        templateUrl:'app/views/account/bookings/bookings.html'
      })
      .state('main.account.invoices',{
        url:'/invoices',
        templateUrl:'app/views/account/invoices/invoices.html',
        controller:'InvoicesCtrl'
      })
      .state('main.account.invoices.list',{
        url:'/list',
        templateUrl:'app/views/account/invoices/list/list.html',
        controller:'ListInvoicesCtrl'
      })
      .state('main.account.invoices.view',{
        url:'/view/{id}',
        templateUrl:'app/views/account/invoices/view/view.html',
        controller:'ViewInvoiceCtrl'
      })
      .state('main.account.dashboard',{
        url:'/dashboard',
        templateUrl:'app/views/account/dashboard/dashboard.html',
        controller:'DashboardCtrl'
      })
      .state('main.account.equipments',{
        url:'/equipments',
        abstract:true,
        templateUrl:'app/views/account/equipments/equipments.html',
        controller:'EquipmentsCtrl'
      })
      .state('main.account.equipments.list',{
        url:'/list',
        templateUrl:'app/views/account/equipments/list/list.html',
        controller:'ListEquipmentsCtrl'
      })
      .state('main.account.equipments.add',{
        url:'/add',
        templateUrl:'app/views/account/equipments/add/add.html',
        controller:'AddEquipmentCtrl'
      })
      .state('main.account.equipments.edit',{
        url:'/edit/{id}',
        templateUrl:'app/views/account/equipments/add/add.html',
        controller:'AddEquipmentCtrl'
      })
      .state('main.account.favorites',{
        url:'/favorites',
        templateUrl:'app/views/account/favorites/favorites.html',
        controller:'FavoritesCtrl'
      })
      .state('main.account.jobsites',{
        url:'/jobsites',
        templateUrl:'app/views/account/jobsites/jobsites.html'
      })
      .state('main.account.jobsites.add',{
        url:'/add',
        templateUrl:'app/views/account/jobsites/add/add.html',
        controller:'AddJobsiteCtrl'
      })
      .state('main.account.jobsites.edit',{
        url:'/edit/{id}',
        templateUrl:'app/views/account/jobsites/add/add.html',
        controller:'AddJobsiteCtrl'
      })
      .state('main.account.jobsites.list',{
        url:'/list',
        templateUrl:'app/views/account/jobsites/list/list.html',
        controller:'ListJobsitesCtrl'
      })
      .state('main.account.inventory',{
        url:'/inventory',
        abstract:true,
        templateUrl:'app/views/account/inventory/inventory.html',
        controller:'InventoryCtrl'
      })
      .state('main.account.inventory.list',{
        url:'/list',
        templateUrl:'app/views/account/inventory/list/list.html',
        controller:'ListInventoryCtrl'
      })
      .state('main.account.inventory.add',{
        url:'/add',
        templateUrl:'app/views/account/inventory/add/add.html',
        controller:'AddInventoryCtrl'
      })
      .state('main.account.inventory.edit',{
        url:'/edit/{id}',
        templateUrl:'app/views/account/inventory/add/add.html',
        controller:'AddInventoryCtrl'
      })
      .state('main.account.orders',{
        url:'/orders',
        abstract:true,
        templateUrl:'app/views/account/orders/orders.html'
      })
      .state('main.account.orders.list',{
        url:'/list',
        templateUrl:'app/views/account/orders/list/list.html',
        controller:'ListOrdersCtrl'
      })
      .state('main.account.orders.view',{
        url:'/view/{id}',
        templateUrl:'app/views/account/orders/view/view.html',
        controller:'ViewOrderCtrl'
      })
      .state('main.account.profile',{
        abstract:true,
        url:'/profile',
        templateUrl:'app/views/account/profile/profile.html',
        controller:'ProfileCtrl'
      })
      .state('main.account.profile.edit',{
        url:'/edit',
        templateUrl:'app/views/account/profile/edit/edit.html',
        controller:'EditProfileCtrl'
      })
      .state('main.account.profile.view',{
        url:'/view',
        templateUrl:'app/views/account/profile/view/view.html',
        controller:'ViewProfileCtrl'
      })
      .state('main.account.profile.changePassword',{
        url:'/change-password',
        templateUrl:'app/views/account/profile/change-password/change-password.html',
        controller:'ChangePasswordCtrl'
      })
      .state('main.account.requests',{
        url:'/requests',
        templateUrl:'app/views/account/requests/requests.html'
      })











      .state('main.account.inquiries',{
        url:'/inquiries',
        templateUrl:'app/views/account/inquiries/inquiries.html'
      })
      .state('main.account.inquiries.list',{
        url:'/list',
        templateUrl:'app/views/account/inquiries/list/list.html',
        controller:'InquiryListCtrl'
      })
      .state('main.account.inquiries.history',{
        url:'/history/{id}',
        templateUrl:'app/views/account/inquiries/history/history.html',
        controller:'InquiryHistoryCtrl'
      })
      .state('main.account.inquiries.view',{
        url:'/view/{id}',
        templateUrl:'app/views/account/inquiries/view/view.html',
        controller:'InquiryViewCtrl'
      })
      .state('main.account.inquiries.new',{
        url:'/new/{id}',
        templateUrl:'app/views/account/inquiries/new/new.html',
        controller:'InquiryNewCtrl'
      })

















      .state('main.sellerAccount',{
        url:'/seller-account',
        abstract:true,
        controller:'SellerAccountCtrl',
        templateUrl:'app/views/seller-account/seller-account.html'
      })

      .state('main.sellerAccount.dashboard', {
        url:'/dashboard',
        templateUrl: 'app/views/seller-account/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      })

      .state('main.sellerAccount.equipments', {
        url:'/equipments',
        templateUrl: 'app/views/seller-account/equipments/equipments.html'
      })

      .state('main.sellerAccount.inventory', {
        url:'/inventory',
        templateUrl: 'app/views/seller-account/inventory/inventory.html'
      })

      .state('main.sellerAccount.orders',{
        url:'/orders',
        templateUrl:'app/views/seller-account/orders/orders.html'
      })
      .state('main.sellerAccount.orders.list',{
        url:'/list',
        templateUrl:'app/views/seller-account/orders/list/list.html',
        controller:'ListSellerOrdersCtrl'
      })
      .state('main.sellerAccount.orders.view',{
        url:'/view/{id}',
        templateUrl:'app/views/seller-account/orders/view/view.html',
        controller:'ViewSellerOrderCtrl'
      })
      .state('main.sellerAccount.orders.process',{
        url:'/process/:id/:itemIndex',
        templateUrl:'app/views/seller-account/orders/process/process.html',
        controller:'ProcessSellerOrderCtrl'
      })
      .state('main.sellerAccount.invoices',{
        url:'/invoices',
        templateUrl:'app/views/seller-account/invoices/invoices.html'
      })
      .state('main.sellerAccount.invoices.list',{
        url:'/list',
        templateUrl:'app/views/seller-account/invoices/list/list.html',
        controller:'SellerInvoiceListCtrl'
      })
      .state('main.sellerAccount.invoices.edit',{
        url:'/edit/{id}',
        templateUrl:'app/views/seller-account/invoices/edit/edit.html',
        controller:'SellerInvoiceEditCtrl'
      })
      .state('main.sellerAccount.invoices.view',{
        url:'/view/{id}',
        templateUrl:'app/views/seller-account/invoices/view/view.html',
        controller:'SellerInvoiceViewCtrl'
      })
      .state('main.sellerAccount.inquiries',{
        url:'/inquiries',
        templateUrl:'app/views/seller-account/inquiries/inquiries.html'
      })
      .state('main.sellerAccount.inquiries.list',{
        url:'/list',
        templateUrl:'app/views/seller-account/inquiries/list/list.html',
        controller:'InquiryListCtrl'
      })
      .state('main.sellerAccount.inquiries.history',{
        url:'/history/{id}',
        templateUrl:'app/views/seller-account/inquiries/history/history.html',
        controller:'InquiryHistoryCtrl'
      })
      .state('main.sellerAccount.inquiries.view',{
        url:'/view/{id}',
        templateUrl:'app/views/seller-account/inquiries/view/view.html',
        controller:'InquiryViewCtrl'
      })
      .state('main.sellerAccount.inquiries.new',{
        url:'/new/{id}',
        templateUrl:'app/views/seller-account/inquiries/new/new.html',
        controller:'InquiryNewCtrl'
      })
      .state('main.sellerAccount.settings',{
        url:'/settings',
        templateUrl:'app/views/seller-account/settings/settings.html',
        controller:'SettingsCtrl'
      })
      .state('main.sellerAccount.settings.general',{
        url:'/general',
        templateUrl:'app/views/seller-account/settings/general/general.html',
        controller:'SettingsGeneralCtrl'
      })
      .state('main.sellerAccount.settings.additionalCharges',{
        url:'/additional-charges',
        templateUrl:'app/views/seller-account/settings/additional-charges/additional-charges.html',
        controller:'SettingsAdditionalChargesCtrl'
      })
      .state('main.sellerAccount.settings.shipping',{
        url:'/shipping',
        templateUrl:'app/views/seller-account/settings/shipping/shipping.html',
        controller:'SettingsShippingCtrl'
      })




      .state('main.search',{
        url:'/search/{query:.*}',
        templateUrl:'app/views/search/search.html',
        controller:'SearchCtrl'
      })
      .state('main.payment',{
        url:'/pay/{invoiceId}',
        templateUrl:'app/views/payment/payment.html',
        controller:'PaymentCtrl'
      })
      .state('main.orderConfirmation',{
        url:'/order-confirmation',
        templateUrl:'app/views/order-confirmation/order-confirmation.html'
      })
      .state('main.checkoutAddress',{
        url:'/checkout-address/{carId}',
        controller:'CheckoutAddressCtrl',
        templateUrl:'app/views/checkout-address/checkout-address.html'
      })
      .state('main.cardDetails',{
        url:'/card-details',
        templateUrl:'app/views/card-details/card-details.html'
      })
      .state('main.equiDetails',{
        url:'/equipment/{id}',
        templateUrl:'app/views/equi-details/equi-details.html',
        controller:'EquiDetailsCtrl'
      })
      .state('main.cart',{
        url:'/cart/{id}',
        templateUrl:'app/views/cart/cart.html',
        controller:'CartCtrl'
      });



    $urlRouterProvider.otherwise('/');
  }

})();
