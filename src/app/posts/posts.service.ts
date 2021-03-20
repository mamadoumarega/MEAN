import {PostModel} from './post.model';
import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: PostModel[];
  private postsUpdated = new Subject<PostModel[]>();

  constructor(private httpClient: HttpClient) {
  }

  // tslint:disable-next-line:typedef
  getPosts(){
     this.httpClient.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
       .pipe(map((postData) => {
        // console.log(postData);
         return postData.posts.map(post => {
           return {
             title: post.title,
             content: post.content,
             id: post._id
           };
         });
    }))
       .subscribe((transformedposts) => {
         this.posts = transformedposts;
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
    this.httpClient.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        post.id = responseData.postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      })
    ;

  }

  deletePost(postId: string): void{
  this.httpClient.delete('http://localhost:3000/api/posts/' + postId)
    .subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    });

  }


}
