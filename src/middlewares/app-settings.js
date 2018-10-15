import ejs from 'ejs-mate';
import path from 'path';
import express from 'express';

module.exports = app => {
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.engine('ejs', ejs);
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));
};