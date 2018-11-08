import ejs from 'ejs-mate';
import favicon from 'serve-favicon';
import path from 'path';
import express from 'express';

module.exports = app => {
    app.use(express.static(path.join(__dirname, '../public')));
    app.use(favicon(path.join(__dirname, '../public', 'Images', 'final_logo.ico')));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.engine('ejs', ejs);
    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '../views'));
};