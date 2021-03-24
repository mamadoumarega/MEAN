import { PostModel } from './post.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private posts: PostModel[];
  private postsUpdated = new Subject<PostModel[]>();

  constructor(private httpClient: HttpClient, private router: Router) {
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
  getPost(id: string) {
     return this.httpClient.get<{_id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id);
    // return {... this.posts.find(p => p.id === id )};
  }

  // tslint:disable-next-line:typedef
  addPost(title: string, content: string){
    const post: PostModel = {id: null , title, content};
    this.httpClient.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        post.id = responseData.postId;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      })
    ;

  }

  // tslint:disable-next-line:typedef
  updatePost(id: string, title: string, content: string) {
    const post: PostModel = { id, title, content };
    this.httpClient.put('http://localhost:3000/api/posts/'  + id, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/']);
      })
    ;
  }

  deletePost(postId: string): void{
  this.httpClient.delete('http://localhost:3000/api/posts/' + postId)
    .subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== postId);
      this.postsUpdated.next([...this.posts]);
    });

  }


}
