import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { DashboardComponent } from './pages/user/dashboard/dashboard.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { BadgesComponent } from './components/badges/badges.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { ButtonsComponent } from './components/buttons/buttons.component';
import { CardsComponent } from './components/cards/cards.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ListGroupComponent } from './components/list-group/list-group.component';
import { ModalComponent } from './components/modal/modal.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { ProgressComponent } from './components/progress/progress.component';
import { SpinnersComponent } from './components/spinners/spinners.component';
import { TooltipsComponent } from './components/tooltips/tooltips.component';
import { FormsElementsComponent } from './components/forms-elements/forms-elements.component';
import { FormsLayoutsComponent } from './components/forms-layouts/forms-layouts.component';
import { FormsEditorsComponent } from './components/forms-editors/forms-editors.component';
import { TablesGeneralComponent } from './components/tables-general/tables-general.component';
import { TablesDataComponent } from './components/tables-data/tables-data.component';
import { ChartsChartjsComponent } from './components/charts-chartjs/charts-chartjs.component';
import { ChartsApexchartsComponent } from './components/charts-apexcharts/charts-apexcharts.component';
import { IconsBootstrapComponent } from './components/icons-bootstrap/icons-bootstrap.component';
import { IconsRemixComponent } from './components/icons-remix/icons-remix.component';
import { IconsBoxiconsComponent } from './components/icons-boxicons/icons-boxicons.component';
import { UsersProfileComponent } from './pages/user/users-profile/users-profile.component';
import { PagesFaqComponent } from './pages/user/pages-faq/pages-faq.component';
import { PagesContactComponent } from './pages/user/pages-contact/pages-contact.component';
import { PagesRegisterComponent } from './pages/user/pages-register/pages-register.component';
import { PagesLoginComponent } from './pages/admin/pages-login/pages-login.component';
import { PagesError404Component } from './pages/admin/pages-error404/pages-error404.component';
import { PagesBlankComponent } from './pages/admin/pages-blank/pages-blank.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopupComponent } from './layouts/popup/popup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDialogModule } from '@angular/material/dialog';
import { UserLoginComponent } from './pages/user/user-login/user-login.component'
import { AuthGuardService } from './services/auth-service/auth-guard.service';
import { ServiceService } from './services/service.service';
import { AdminGuardService } from './services/auth-service/admin-guard.service';
import { ForgotComponent } from './pages/user/forgot/forgot.component';
import { CountdownModule } from 'ngx-countdown';
import { NewpasswordComponent } from './pages/user/newpassword/newpassword.component';
import { RegisterotpComponent } from './pages/user/registerotp/registerotp.component';

import { HttpClientModule } from '@angular/common/http';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';
import { AdminHeaderComponent } from './layouts/admin-header/admin-header.component';
import { AdminSidebarComponent } from './layouts/admin-sidebar/admin-sidebar.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminServiceService } from './services/admin-service.service';
import { AdminAddtenderComponent } from './pages/admin/admin-addtender/admin-addtender.component';
import { AdminTenderinfoComponent } from './pages/admin/admin-tenderinfo/admin-tenderinfo.component';
import { AdminTenderbidComponent } from './pages/admin/admin-tenderbid/admin-tenderbid.component';
import { AdminTenderbidinfoComponent } from './pages/admin/admin-tenderbidinfo/admin-tenderbidinfo.component';
import { UserTenderapplyComponent } from './pages/user/user-tenderapply/user-tenderapply.component';
import { UserTenderinfoComponent } from './pages/user/user-tenderinfo/user-tenderinfo.component';
import { UserMakepaymentComponent } from './pages/user/user-makepayment/user-makepayment.component';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    AlertsComponent,
    AccordionComponent,
    BadgesComponent,
    BreadcrumbsComponent,
    ButtonsComponent,
    CardsComponent,
    CarouselComponent,
    ListGroupComponent,
    ModalComponent,
    TabsComponent,
    PaginationComponent,
    ProgressComponent,
    SpinnersComponent,
    TooltipsComponent,
    FormsElementsComponent,
    FormsLayoutsComponent,
    FormsEditorsComponent,
    TablesGeneralComponent,
    TablesDataComponent,
    ChartsChartjsComponent,
    ChartsApexchartsComponent,
    IconsBootstrapComponent,
    IconsRemixComponent,
    IconsBoxiconsComponent,
    UsersProfileComponent,
    PagesFaqComponent,
    PagesContactComponent,
    PagesRegisterComponent,
    PagesLoginComponent,
    PagesError404Component,
    PagesBlankComponent,
    PopupComponent,
    UserLoginComponent,
    ForgotComponent,
    NewpasswordComponent,
    RegisterotpComponent,
    AdminHeaderComponent,
    AdminSidebarComponent,
    AdminDashboardComponent,
    AdminAddtenderComponent,
    AdminTenderinfoComponent,
    AdminTenderbidComponent,
    AdminTenderbidinfoComponent,
    UserTenderapplyComponent,
    UserTenderinfoComponent,
    UserMakepaymentComponent,

  ],
  entryComponents: [PopupComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    CountdownModule,
    HttpClientModule,
    ShowHidePasswordModule,

    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  providers: [AuthGuardService,ServiceService,AdminGuardService,AdminServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
