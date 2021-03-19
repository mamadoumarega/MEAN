import {PostModel} from './post.model';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: PostModel[] = [];
  private postsUpdated = new Subject<PostModel[]>();

  getPosts(): PostModel[]{
     return [...this.posts];
  }

  // tslint:disable-next-line:typedef
  getPostsUpdated() {
    return this.postsUpdated.asObservable();
  }

  // tslint:disable-next-line:typedef
  addPost(title: string, content: string){
    const post: PostModel = {title, content};
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
