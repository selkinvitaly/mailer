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
      resolve: {
        letters: function(LettersApi, MailboxesStore, LettersStore, $stateParams) {
          "ngInject";

          let boxid = $stateParams.mailboxid;
          let page = $stateParams.page || 1;

          let { limit, offset } = LettersStore.getOffsetByPage(page);

          LettersStore.deselectAll();
          MailboxesStore.select(boxid);

          return LettersApi
            .getByMailbox(boxid, offset, limit)
            .then(letters => LettersStore.set(letters));
        }
      }
    })
    .state("cabinet.letter", {
      url: "/mailboxes/:mailboxid/letters/:letterid",
      template: `<view-letter class="v-letter" />`,
      resolve: {
        letter: function(LettersApi, MailboxesStore, LetterDetailsStore, $stateParams) {
          "ngInject";

          let letterid = $stateParams.letterid;
          let boxid = $stateParams.mailboxid;

          MailboxesStore.select(boxid);

          return LettersApi
            .getById(letterid)
            .then(letter => LetterDetailsStore.set(letter));
        }
      }
    })
    .state("cabinet.contacts", {
      url: "/contacts",
      template: `<view-contacts class="v-contacts" />`,
      resolve: {
        letters: function(UsersApi, UsersStore, LettersStore, MailboxesStore) {
          "ngInject";

          MailboxesStore.resetSelection();
          LettersStore.deselectAll();

          return UsersApi
            .getUsers(0, UsersStore.LIMIT)
            .then(users => UsersStore.set(users));
        }
      }

    })
    .state("cabinet.user", {
      url: "/contacts/:userid",
      template: `<view-user class="v-user" />`,
      resolve: {
        letter: function(UsersApi, MailboxesStore, UserDetailsStore, $stateParams) {
          "ngInject";

          let userid = $stateParams.userid;

          MailboxesStore.resetSelection();

          return UsersApi
            .getById(userid)
            .then(users => UserDetailsStore.set(users));
        }
      }
    });

};

export function run($transitions) {
  "ngInject";

  $transitions.onError({ to: "*" }, (ErrorHandler, $error$) => {
    "ngInject";

    ErrorHandler.handle($error$);
  });

};
