import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ForumService } from 'src/app/shared/forum.service';

@Injectable({ providedIn: 'root' })
export class SubForumResolverService implements Resolve<Post[]> {
  constructor(private forumService: ForumService) {}

  resolve(
    route: ActivatedRouteSnapshot
  ): Observable<Post[]> | Promise<Post[]> | Post[] {
    return;
  }
}
