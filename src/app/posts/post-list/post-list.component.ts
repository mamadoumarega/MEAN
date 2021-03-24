import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {PostModel} from '../post.model';
import {PostsService} from '../posts.service';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit, OnDestroy{

  posts: PostModel[] = [];
  private postsSub: Subscription;
  isLoading = false;
  /*
    {title: 'First Post', content: 'This is the first post\s content'},
    {title: 'Second Post', content: 'This is the second post\s content'},
    {title: 'Third Post', content: 'This is the third post\s content'}
    * */

  constructor(public postService: PostsService) {
  }

  ngOnInit(): void {
     this.isLoading = true;
     this.postService.getPosts();
     this.postsSub = this.postService.getPostsUpdated().subscribe((posts: PostModel[]) => {
       this.isLoading = false;
       this.posts = posts;
     });
  }

  onDelete(id: string): void {
    this.postService.deletePost(id);
  }

  ngOnDestroy(): void {
    if (this.postsSub) {
      this.postsSub.unsubscribe();
    }
  }


}
