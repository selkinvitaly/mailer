"use strict";

import angular from "angular";
import router from "angular-ui-router";

// config, run
import { config as configFunction, run as runFunction } from "./router";

// services, api, stores
import CacheDB from "../services/cache-db";
import MailboxesApi from "../services/mailboxes-api";
import LettersApi from "../services/letters-api";
import UsersApi from "../services/users-api";
import AuthApi from "../services/auth-api";
import Notify from "../services/notify";
import ErrorHandler from "../services/error-handler";
import MailboxesStore from "../services/mailboxes-store";
import UsersStore from "../services/users-store";

// components
import appContainerComponent from "./app-container";
import notifyListComponent from "./app-container/notify-list";
import modalCleanupComponent from "./app-container/modal-cleanup";
import modalWriteComponent from "./app-container/modal-write";
import view404Component from "./app-container/view-404";
import viewLoginComponent from "./app-container/view-login";
import viewHomeComponent from "./app-container/view-home";
import viewCabinetComponent from "./app-container/view-cabinet";
import widgetLogoutComponent from "./app-container/view-cabinet/widget-logout";
import widgetMailboxesComponent from "./app-container/view-cabinet/widget-mailboxes";
import viewUserComponent from "./app-container/view-cabinet/view-user";
import widgetUserActionsComponent from "./app-container/view-cabinet/view-user/widget-user-actions";
import userDetailsComponent from "./app-container/view-cabinet/view-user/user-details";
import cabinetTabsComponent from "../shared/cabinet-tabs";
import viewMailboxComponent from "./app-container/view-cabinet/view-mailbox";
import widgetMailboxActionsComponent from "./app-container/view-cabinet/view-mailbox/widget-mailbox-actions";
import widgetPagerComponent from "./app-container/view-cabinet/view-mailbox/widget-pager";
import letterListComponent from "./app-container/view-cabinet/view-mailbox/letter-list";
import viewLetterComponent from "./app-container/view-cabinet/view-letter";
import widgetLetterActionsComponent from "./app-container/view-cabinet/view-letter/widget-letter-actions";
import letterDetailsComponent from "./app-container/view-cabinet/view-letter/letter-details";
import viewContactsComponent from "./app-container/view-cabinet/view-contacts";
import widgetContactsActionsComponent from "./app-container/view-cabinet/view-contacts/widget-contacts-actions";
import userListComponent from "./app-container/view-cabinet/view-contacts/user-list";


const app =  angular.module("app", [router]);


app.factory("CacheDB", CacheDB);
app.factory("MailboxesApi", MailboxesApi);
app.factory("LettersApi", LettersApi);
app.factory("UsersApi", UsersApi);
app.factory("Auth", AuthApi);
app.factory("Notify", Notify);
app.factory("ErrorHandler", ErrorHandler);
app.factory("MailboxesStore", MailboxesStore);
app.factory("UsersStore", UsersStore);

app.component("appContainer", appContainerComponent);
app.component("notifyList", notifyListComponent);
app.component("modalCleanup", modalCleanupComponent);
app.component("modalWrite", modalWriteComponent);
app.component("view404", view404Component);
app.component("viewLogin", viewLoginComponent);
app.component("viewHome", viewHomeComponent);
app.component("viewCabinet", viewCabinetComponent);
app.component("widgetLogout", widgetLogoutComponent);
app.component("widgetMailboxes", widgetMailboxesComponent);
app.component("viewUser", viewUserComponent);
app.component("widgetUserActions", widgetUserActionsComponent);
app.component("userDetails", userDetailsComponent);
app.component("cabinetTabs", cabinetTabsComponent);
app.component("viewMailbox", viewMailboxComponent);
app.component("widgetMailboxActions", widgetMailboxActionsComponent);
app.component("widgetPager", widgetPagerComponent);
app.component("letterList", letterListComponent);
app.component("viewLetter", viewLetterComponent);
app.component("widgetLetterActions", widgetLetterActionsComponent);
app.component("letterDetails", letterDetailsComponent);
app.component("viewContacts", viewContactsComponent);
app.component("widgetContactsActions", widgetContactsActionsComponent);
app.component("userList", userListComponent);


app.config(configFunction);
app.run(runFunction);

export default app;
