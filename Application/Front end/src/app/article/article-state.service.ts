import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ArticleStateService {
  articleSubscriptionStatus$: Subject<{
    articleOwnerId: number;
    isSubscribed: boolean;
  }> = new Subject<{ articleOwnerId: number; isSubscribed: boolean }>();

  updateSubscriptionStatus(
    articleOwnerId: number,
    isSubscribed: boolean
  ): void {
    this.articleSubscriptionStatus$.next({ articleOwnerId, isSubscribed });
  }
}
