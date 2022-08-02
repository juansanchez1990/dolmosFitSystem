import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';


const config = {
  apiKey: "AIzaSyCW_ShfiBzQTFS2FcrQga7qrUdoLIiMUQo",
  authDomain: "sy-gym.firebaseapp.com",
  projectId: "sy-gym",
  storageBucket: "sy-gym.appspot.com",
  messagingSenderId: "699818902602",
  appId: "1:699818902602:web:2bfde7a56580380e5f12b3"
};
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent
    

  
    
    
  
  

    
  
    


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
