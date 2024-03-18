import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
    badge: {
      variant: 'info',
      text: 'NEW',
    },
  },
  {
    name: 'Enerty',
    title: true,
  },
  {
    name: 'Admins',
    url: '/users/users',
    icon: 'icon-user',
  },
  {
    name: 'Advertisement',
    url: '/advertise/advertise-list',
    icon: 'icon-user',
  },
  {
    name: 'Question List',
    url: '/questions/question-list',
    icon: 'icon-user',
  },
  // {
  //   name: 'Organization',
  //   url: '/organization/organization-list',
  //   icon: 'icon-user',
  // },

//  {
//    name: 'Subscription',
//    url: '/subscription/subscription-list',
//    icon: 'icon-user',
//  },
 {
  name: 'Customer',
  url: '/customer/customer-list',
  icon: 'icon-user',
},
{
  name: "Enquiry's",
  url: '/users/enquiry-table',
  icon: 'icon-user',
},
{
  name: "Collaborate",
  url: '/users/collaborate-table',
  icon: 'icon-user',
},
     
  // {
  //   name: 'Users Management',
  //   icon: 'icon-user',
  //   url: '/users',
  //   children: [
  //     {
  //       name: 'Users',
  //       url: '/users/users',
  //       icon: 'icon-user',
  //     },
  //     {
  //       name: 'Shop',
  //       url: '/shop/shop-list',
  //       icon: 'icon-user',
  //     },

  //     {
  //       name: 'Customer',
  //       url: '/customer/customer-list',
  //       icon: 'icon-user',
  //     },
  //   ],
  // },
//  {
//     name: 'Slider',
//     url: '/images/image/1',
//     icon: 'cil-image-plus',
//   },
 
//  {
//     name: 'Business Type',
//     url: '/businessType/business-list',
//     icon: 'cil-map',
//   },
//   {
//     name: 'Advertise',
//     url: '/advertise/advertise-list',
//     icon: 'cil-image-plus',
//   },
//   {
//     name: 'Offer',
//     url: '/offer/offer-list',
//     icon: 'cil-image-plus',
//   },
//  {
//     name: 'Category',
//     url: '/category/category-list',
//     icon: 'cil-window-maximize',
//   },

//   {
//     name: ' Sub Category',
//     url: '/subCategory/subCategory-list',
//     icon: 'cil-window-maximize',
//   },
//   {
//     name: 'Catalogue',
//     url: '/catalogue/catalogue-list',
//     icon: 'cil-map',
//   },

//  {
//     name: 'Notification',
//     url: '/notification/notification-list',
//     icon: 'icon-bell',
//   },
//   {
//     name: 'Account Setting',
//     url: '/users/users',
//     icon: 'cis-settings',
//   },
];
