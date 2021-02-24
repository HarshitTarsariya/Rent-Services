import {roles} from './role';

export class user{
    constructor(){}
    name:String;
    email_id:String;
    password:String;
    confirm_password:String;
    mobile_no:String;
    role:roles
}