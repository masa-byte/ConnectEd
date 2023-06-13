import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewArticleComponent } from './review-article.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [ReviewArticleComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatDividerModule,
    MatSliderModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatExpansionModule,
    MatIconModule,
  ],
  exports: [ReviewArticleComponent],
})
export class ReviewArticleModule {}
