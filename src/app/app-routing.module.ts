import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocsComponent } from './docs/docs.component';
import { LoginComponent } from './login/login.component';
import { ShareDocComponent } from './share-doc/share-doc.component';
import { TexteditorComponent } from './texteditor/texteditor.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'text-editor/:id/:user', component: TexteditorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'docs', component: DocsComponent },
  { path: 'share-doc/:userId/:docId/:role', component: ShareDocComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
