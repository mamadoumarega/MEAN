import {PostModel} from './post.model';
import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: PostModel[] = [];
  private postsUpdated = new Subject<PostModel[]>();

  constructor(private httpClient: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  getPosts(){
     this.httpClient.get<{message: string, posts: PostModel[]}>('http://localhost:3000/api/posts')
       .subscribe((postData) => {
         this.posts = postData.posts;
         this.postsUpdated.next([...this.posts]);
       })
     ;
  }

  // tslint:disable-next-line:typedef
  getPostsUpdated() {
    return this.postsUpdated.asObservable();
  }

  // tslint:disable-next-line:typedef
  addPost(title: string, content: string){
    const post: PostModel = {id: null , title, content};
    this.httpClient.post<{message: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        console.log(responseData.message);
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      })
    ;

  }
}
