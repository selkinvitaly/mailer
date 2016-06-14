"use strict";

const oid = require("../libs/oid");

require("users"); // load mongoose model

module.exports = [{
  _id: oid("john"),
  fullName: "John Larson",
  email: "john@test.ru",
  address: "Moscow",
  avatarUrl: "https://randomuser.me/api/portraits/men/50.jpg",
  birthdate: new Date(2014, 2, 14),
  gender: "M",
  password: "john"
}, {
  _id: oid("mike"),
  fullName: "Mike Ledner",
  email: "mike@test.ru",
  address: "Brasilia",
  avatarUrl: "https://randomuser.me/api/portraits/men/34.jpg",
  birthdate: new Date(2013, 2, 14),
  gender: "M",
  password: "mike"
}, {
  _id: oid("alice"),
  fullName: "Alice Cruz",
  email: "alice@test.ru",
  address: "Saint-Petersburg",
  birthdate: new Date(2012, 2, 14),
  gender: "F",
  password: "alice"
}, {
  _id: oid("sindy"),
  fullName: "Sindy Myers",
  email: "sindy@test.ru",
  address: "Mexico",
  avatarUrl: "https://randomuser.me/api/portraits/women/43.jpg",
  birthdate: new Date(2011, 2, 14),
  gender: "F",
  password: "sindy"
}, {
  _id: oid("darrell"),
  fullName: "Darrell Simmmons",
  email: "darrell@test.ru",
  address: "Mexico",
  avatarUrl: "https://randomuser.me/api/portraits/men/11.jpg",
  birthdate: new Date(1983, 2, 5),
  gender: "M",
  password: "darrell"
}, {
  _id: oid("wallace"),
  fullName: "Mattie Wallace",
  email: "wallace@test.ru",
  address: "4624 China Ave",
  avatarUrl: "https://randomuser.me/api/portraits/women/3.jpg",
  birthdate: new Date(1984, 7, 2),
  gender: "F",
  password: "wallace"
}, {
  _id: oid("hayes"),
  fullName: "Kyle Hayes",
  email: "hayes@test.ru",
  address: "1407 Brown Terrace",
  avatarUrl: "https://randomuser.me/api/portraits/men/84.jpg",
  birthdate: new Date(1982, 12, 2),
  gender: "M",
  password: "wallace"
}, {
  _id: oid("alexander"),
  fullName: "Emily Alexander",
  email: "alexander@test.ru",
  address: "6081 Barn St",
  avatarUrl: "https://randomuser.me/api/portraits/women/82.jpg",
  birthdate: new Date(1978, 5, 5),
  gender: "F",
  password: "alexander"
}, {
  _id: oid("garrett"),
  fullName: "Bruce Garrett",
  email: "garrett@test.ru",
  address: "8306 Groveland Terrace",
  avatarUrl: "https://randomuser.me/api/portraits/men/52.jpg",
  birthdate: new Date(1976, 10, 6),
  gender: "M",
  password: "garrett"
}, {
  _id: oid("coleman"),
  fullName: "Abigail Coleman",
  email: "coleman@test.ru",
  address: "8876 N Stelling Rd",
  birthdate: new Date(1975, 8, 6),
  gender: "F",
  password: "coleman"
}, {
  _id: oid("ryan"),
  fullName: "Troy Ryan",
  email: "ryan@test.ru",
  address: "6933 Hickory Creek Dr",
  birthdate: new Date(1978, 11, 3),
  gender: "M",
  password: "ryan"
}, {
  _id: oid("steward"),
  fullName: "Vicki Steward",
  email: "steward@test.ru",
  address: "4648 Arther St",
  avatarUrl: "https://randomuser.me/api/portraits/women/14.jpg",
  birthdate: new Date(1982, 9, 5),
  gender: "F",
  password: "steward"
}, {
  _id: oid("taylor"),
  fullName: "Gladys Taylor",
  email: "taylor@test.ru",
  address: "1763 College St",
  avatarUrl: "https://randomuser.me/api/portraits/women/77.jpg",
  birthdate: new Date(1985, 6, 5),
  gender: "F",
  password: "taylor"
}, {
  _id: oid("douglas"),
  fullName: "Dustin Douglas",
  email: "douglas@test.ru",
  address: "4837 Dogwood Ave",
  avatarUrl: "https://randomuser.me/api/portraits/men/12.jpg",
  birthdate: new Date(1984, 2, 1),
  gender: "M",
  password: "douglas"
}, {
  _id: oid("lewis"),
  fullName: "Linda Lewis",
  email: "lewis@test.ru",
  address: "2541 View St",
  avatarUrl: "https://randomuser.me/api/portraits/women/67.jpg",
  birthdate: new Date(1979, 7, 7),
  gender: "F",
  password: "lewis"
}, {
  _id: oid("kelly"),
  fullName: "Dan Kelly",
  email: "kelly@test.ru",
  address: "5073 Hamilton Ave",
  birthdate: new Date(1979, 3, 1),
  gender: "M",
  password: "kelly"
}, {
  _id: oid("byrd"),
  fullName: "Eduardo Byrd",
  email: "byrd@test.ru",
  address: "2877 Airport Ave",
  avatarUrl: "https://randomuser.me/api/portraits/men/38.jpg",
  birthdate: new Date(1977, 12, 1),
  gender: "M",
  password: "byrd"
}, {
  _id: oid("washington"),
  fullName: "Deanna Washington",
  email: "washington@test.ru",
  address: "3272 W Belt Line Rd",
  avatarUrl: "https://randomuser.me/api/portraits/women/25.jpg",
  birthdate: new Date(1983, 4, 4),
  gender: "F",
  password: "washington"
}, {
  _id: oid("henderson"),
  fullName: "George Henderson",
  email: "henderson@test.ru",
  address: "6784 College St",
  birthdate: new Date(1975, 12, 3),
  gender: "M",
  password: "henderson"
}, {
  _id: oid("wells"),
  fullName: "Bruce Wells",
  email: "wells@test.ru",
  address: "6382 Mckinley Ave",
  avatarUrl: "https://randomuser.me/api/portraits/men/76.jpg",
  birthdate: new Date(1973, 8, 12),
  gender: "M",
  password: "wells"
}, {
  _id: oid("lawrence"),
  fullName: "Robert Lawrence",
  email: "lawrence@test.ru",
  address: "4498 Cherry St",
  avatarUrl: "https://randomuser.me/api/portraits/men/88.jpg",
  birthdate: new Date(1977, 4, 9),
  gender: "M",
  password: "lawrence"
}, {
  _id: oid("cole"),
  fullName: "Aiden Cole",
  email: "cole@test.ru",
  address: "7418 Elisworth Ave",
  birthdate: new Date(1969, 4, 9),
  gender: "M",
  password: "cole"
}, {
  _id: oid("daniels"),
  fullName: "Lena Daniels",
  email: "daniels@test.ru",
  address: "7449 Marsh Ln",
  avatarUrl: "https://randomuser.me/api/portraits/women/59.jpg",
  birthdate: new Date(1977, 4, 9),
  gender: "F",
  password: "daniels"
}, {
  _id: oid("gutierrez"),
  fullName: "Paula Gutierrez",
  email: "daniels@test.ru",
  address: "4663 Pine Rd",
  avatarUrl: "https://randomuser.me/api/portraits/women/55.jpg",
  birthdate: new Date(1983, 4, 9),
  gender: "F",
  password: "gutierrez"
}, {
  _id: oid("sutton"),
  fullName: "Cassandra Sutton",
  email: "sutton@test.ru",
  address: "5824 E Broadway St",
  avatarUrl: "https://randomuser.me/api/portraits/women/95.jpg",
  birthdate: new Date(1982, 4, 9),
  gender: "F",
  password: "sutton"
}, {
  _id: oid("foster"),
  fullName: "Mia Foster",
  email: "foster@test.ru",
  address: "1609 Cackson St",
  avatarUrl: "https://randomuser.me/api/portraits/women/24.jpg",
  birthdate: new Date(1985, 4, 9),
  gender: "F",
  password: "foster"
}, {
  _id: oid("richards"),
  fullName: "Jacqueline Richards",
  email: "richards@test.ru",
  address: "3920 E Sandy Lake Rd",
  birthdate: new Date(1979, 4, 9),
  gender: "F",
  password: "richards"
}, {
  _id: oid("armstrong"),
  fullName: "Bobby Armstrong",
  email: "armstrong@test.ru",
  address: "3604 Andreas Ave",
  avatarUrl: "https://randomuser.me/api/portraits/men/21.jpg",
  birthdate: new Date(1972, 4, 9),
  gender: "M",
  password: "armstrong"
}, {
  _id: oid("craig"),
  fullName: "Martin Craig",
  email: "craig@test.ru",
  address: "5498 First Street",
  avatarUrl: "https://randomuser.me/api/portraits/men/57.jpg",
  birthdate: new Date(1983, 4, 9),
  gender: "M",
  password: "craig"
}, {
  _id: oid("reed"),
  fullName: "Ashley Reed",
  email: "reed@test.ru",
  address: "1773 Fourth St",
  birthdate: new Date(1983, 4, 9),
  gender: "F",
  password: "reed"
}];
