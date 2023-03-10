import { DetalhelistaComponent } from './componentes/detalhelista/detalhelista.component';
import { ListasComponent } from './componentes/listas/listas.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', component: ListasComponent},
  {path:'detalhe/:1', component: DetalhelistaComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
