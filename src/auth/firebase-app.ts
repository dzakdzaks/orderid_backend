import {Injectable} from "@nestjs/common";
import * as firebase from "firebase-admin";
import * as serviceAccount from './FirebaseServiceAccount.json'


const firebaseParams = {
    type: serviceAccount.type,
    projectId: serviceAccount.project_id,
    privateKeyId: serviceAccount.private_key_id,
    privateKey: serviceAccount.private_key,
    clientEmail: serviceAccount.client_email,
    clientId: serviceAccount.client_id,
    authUri: serviceAccount.token_uri,
    authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
    clientC509CertUrl: serviceAccount.client_x509_cert_url
}

@Injectable()
export class FirebaseApp {
    private firebaseApp: firebase.app.App;

    constructor() {
        this.firebaseApp = firebase.initializeApp({
            credential: firebase.credential.cert(firebaseParams),
            databaseURL: 'https://orderid-904b9-default-rtdb.asia-southeast1.firebasedatabase.app'
        });
    }

    getAuth = (): firebase.auth.Auth => {
        return this.firebaseApp.auth();
    }

    firestore = (): firebase.firestore.Firestore => {
        return this.firebaseApp.firestore();
    }
}