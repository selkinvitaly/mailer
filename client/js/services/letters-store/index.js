"use strict";

export default function() {

  class Store {
    constructor() {
      this.LIMIT = 10;

      this.data = [];
      this.selected = [];
      this.count = {};
    }

    getOffsetByPage(page) {
      let limit = this.LIMIT;

      return { limit, offset: limit * (page - 1) };
    }

    getSelected() {
      return this.selected.slice();
    }

    set(items) {
      this.data = items.slice();
    }

    setCount(countData) {
      this.count = countData;
    }

    getCountByMailbox(boxid) {
      return this.count[boxid] || 0;
    }

    remove(id) {
      let items = this.data;

      for (let i = 0; i < items.length; i++) {
        if (id !== items[i]) continue;

        return items.splice(i, 1);
      }
    }

    removeAll(mailboxid) {
      this.data = [];

      this.count[mailboxid] = null;
    }

    deselect(id) {
      let items = this.selected;

      for (let i = 0; i < items.length; i++) {
        if (id !== items[i]) continue;

        return items.splice(i, 1);
      }
    }

    select(id) {
      return this.selected.push(id);
    }

    toggleSelect(id) {
      if (this.isSelected(id)) {
        this.deselect(id);
      } else {
        this.select(id);
      }
    }

    toggleAll() {
      if (this.isSelectedAll()) {
        this.deselectAll();
      } else {
        this.selectAll();
      }
    }

    selectAll() {
      this.selected = this.data.map(item => item._id);
    }

    isSelectedAll() {
      return !!this.data.length && (this.selected.length === this.data.length);
    }

    isSelected(id) {
      let items = this.selected;

      return ~items.indexOf(id) ? true : false;
    }

    deselectAll() {
      let items = this.selected;

      return items.splice(0, items.length);
    }

    formatDate(date) {
      const ONE_DAY = 24 * 3600 * 1000;

      let created = new Date(date);
      let now = new Date();

      let formatter = ((now - created) < ONE_DAY)
        ? new Intl.DateTimeFormat("ru", { hour: "numeric", minute: "numeric" })
        : new Intl.DateTimeFormat("ru", { day: "numeric", month: "numeric", year: "numeric" });

      return formatter.format(created);
    }

  }

  return new Store();

};
