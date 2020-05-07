import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Params, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {ForumService} from 'src/app/shared/forum.service';
import {Post} from '../../models/post.model';
import {PostService} from '../../shared/post.service';

@Injectable({providedIn: 'root'})
export class SubForumResolverService implements Resolve<Post[]> {
  constructor(private forumService: ForumService, private postService: PostService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const threads = this.forumService.getThreads();
    console.log('This is the resolver');

    let id = '';
    route.params.subscribe((params: Params) => {
      id = params.id;
    });

    if (threads.length === 0) {
      return this.postService.fetchPosts(id);
    } else {
      return threads;
    }
  }
}
