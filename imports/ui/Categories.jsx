import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { browserHistory } from 'react-router';
import NotificationSystem from 'react-notification-system';
import categories from '../categories.json';
import '../stylesheets/categories.less';

export default class Categories extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const listBooks = categories.books.map((book) =>
            <div className="cat-item" key={book.id}>{book.name}</div>
        );
        const listDocs = categories.documents.map((document) =>
            <div className="doc-item" key={document.id}>{document.name}</div>
        );
        return (
            <div className="categories-container">
                <div className="books-container">
                    <div className="books-title"> <i className="fa fa-book" aria-hidden="true" /> Kitap Kategorileri</div>
                    {listBooks}
            </div>
            <div className="documents-container">
                <div className="documents-title"> <i className="fa fa-file-text-o" aria-hidden="true" /> Döküman Kategorileri</div> 
                {listDocs}   
            </div>
            </div>
        );
    }
}