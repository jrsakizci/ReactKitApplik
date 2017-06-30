import { Mongo } from 'meteor/mongo';

export const Content = new Mongo.Collection('content');
export const Messages = new Mongo.Collection('messages');
