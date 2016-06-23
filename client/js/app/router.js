"use strict";

export function config($locationProvider, $stateProvider, $urlRouterProvider) {
  "ngInject";

  $urlRouterProvider.otherwise("404");
  $locationProvider.html5Mode(true);

  $stateProvider
    .state("404", {
      url: "/404",
      template: `<view-404 class="v-404" />`
    })
    .state("login", {
      url: "/login",
      template: `<view-login class="v-login" />`
    })
    .state("home", {
      url: "/",
      template: `<view-home class="v-home" />`,
      resolve: {
        mailboxes: function(MailboxesApi, MailboxesStore, $state) {
          "ngInject";

          return MailboxesApi.getAll()
            .then(mailboxes => {
              MailboxesStore.set(mailboxes);

              let inbox = MailboxesStore.getByName("inbox");

              if (inbox) {
                $state.go("cabinet.mailbox", { mailboxid: inbox._id });
              } else {
                $state.go("cabinet.mailbox", { mailboxid: MailboxesStore.getByIndex(0)._id });
              }
            });
        }
      }
    })
    .state("cabinet", {
      abstract: true,
      url: "/cabinet",
      template: `<view-cabinet class="v-cabinet" />`,
      resolve: {
        mailboxes: function(MailboxesApi, MailboxesStore) {
          "ngInject";

          return MailboxesApi.getAll()
            .then(mailboxes => {
              MailboxesStore.set(mailboxes);
            });
        },
        count: function(LettersApi, LettersStore) {
          "ngInject";

          return LettersApi
            .count()
            .then(count => LettersStore.setCount(count));
        }
      }
    })
    .state("cabinet.mailbox", {
      url: "/mailboxes/:mailboxid?page",
      template: `<view-mailbox class="v-mailbox" />`,
      controller: function(MailboxesStore, $stateParams) {
        "ngInject";

        MailboxesStore.select($stateParams.mailboxid);
      }
    })
    .state("cabinet.letter", {
      url: "/mailboxes/:mailboxid/letters/:letterid",
      template: `<view-letter class="v-letter" />`,
      controller: function(MailboxesStore, $stateParams) {
        "ngInject";

        MailboxesStore.select($stateParams.mailboxid);
      }
    })
    .state("cabinet.contacts", {
      url: "/contacts",
      template: `<view-contacts class="v-contacts" />`,
      controller: function(MailboxesStore) {
        "ngInject";

        MailboxesStore.resetSelection();
      }
    })
    .state("cabinet.user", {
      url: "/contacts/:userid",
      template: `<view-user class="v-user" />`,
      controller: function(MailboxesStore) {
        "ngInject";

        MailboxesStore.resetSelection();
      }
    });

};

export function run($transitions) {
  "ngInject";

  $transitions.onError({}, (ErrorHandler, $error$) => {
    "ngInject";

    ErrorHandler.handle($error$);
  });

  $transitions.onFinish({ from: "cabinet.*" }, LettersStore => {
    "ngInject";

    LettersStore.deselectAll();
  });

};
