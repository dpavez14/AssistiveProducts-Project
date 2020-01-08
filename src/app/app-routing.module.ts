import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentsComponent } from './components/comments/comments.component';
import { ResultsComponent } from './components/results/results.component';
import { PositionsComponent } from './components/positions/positions.component';
import {FixturesComponent} from './components/fixtures/fixtures.component';

const routes: Routes = [
  { path: 'fixtures', component: FixturesComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'standings', component: PositionsComponent },
  { path: 'comments/:id', component: CommentsComponent },
  { path: '', redirectTo: '/fixtures', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
