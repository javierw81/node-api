import { Schema, model, Document, SchemaTypes } from 'mongoose';
import { emailValidator } from './validators/emailValidator';

export interface User {
    username: string
    email: string
    password: string
    name: string
    surname: string
    active: boolean,
    verify: boolean,
}

export interface UserDocument extends Document, User { }

const UserSchema = new Schema({
    username: {
        type: SchemaTypes.String,
        required: true,
        unique: true,
        lowercase: true,
        maxlength: 30,
        trim: true
    },
    email: {
        type: SchemaTypes.String,
        required: true,
        trim: true,
        validate: emailValidator
    },
    password: {
        type: SchemaTypes.String,
        required: true,
        unique: false,
    },
    name: {
        type: SchemaTypes.String,
        required: true,
        unique: false,
        maxlength: 100,
        trim: true,
    },
    surname: {
        type: SchemaTypes.String,
        required: true,
        unique: false,
        maxlength: 100,
        trim: true,
    },
    active: {
        type: SchemaTypes.Boolean,
        required: true,
        default: false,
    },
    verify: {
        type: SchemaTypes.Boolean,
        required: true,
        default: false,
    },
    createdAt: {
        type: Date,
        immutable: true
    }
}, { timestamps: true }).index({ username: 1, active: 1 });

export const UserModel = model<UserDocument>(
    'Users',
    UserSchema,
);
