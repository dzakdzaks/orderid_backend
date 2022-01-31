import { Injectable, NestMiddleware } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { Request, Response } from 'express';
import { FirebaseApp } from '../firebase/firebase-app';

@Injectable()
export class PreAuthMiddleware implements NestMiddleware {

    private auth: firebase.auth.Auth;

    constructor(private firebaseApp: FirebaseApp) {
        this.auth = firebaseApp.getAuth();
    }

    use(req: Request, res: Response, next: () => void) {
        const token = req.headers.authorization;
        if (token != null && token != '') {
            this.auth
                .verifyIdToken(token.replace('Bearer ', ''))
                .then(async (decodedToken) => {
                    req['user'] = {
                        uid: decodedToken.uid,
                        email: decodedToken.email
                    }
                    next()
                })
                .catch(error => {
                    console.error(error);
                    PreAuthMiddleware.accessDenied(req.url, res);
                })
        } else {
            PreAuthMiddleware.accessDenied(req.url, res);
        }
    }

    private static accessDenied(url: string, res: Response) {
        res.status(403).json({
            statusCode: 403,
            message: 'Access Denied',
            timestamp: new Date().toISOString(),
            path: url,
        });
    }

}