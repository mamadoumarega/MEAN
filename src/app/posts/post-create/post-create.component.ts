import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PostModel} from '../post.model';
import {FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {PostsService} from '../posts.service';
import {ActivatedRoute, ParamMap} from '@angular/router';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{
  enteredTitle = '';
  enteredContent = '';
  post: PostModel;
  private mode = 'create';
  private postId: string;
  isLoading = false;
  form: FormGroup;
  imagePreview: string | ArrayBuffer;

  constructor(public postService: PostsService, public route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postService.getPost(this.postId).subscribe(postData => {
          this.isLoading = false;
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          };
          this.form.setValue({
            title: this.post.title,
            content: this.post.content
          });
        });
      } else{
        this.mode = 'create';
        this.postId = null;
      }
    });
  }

  onSavePost(): void {
    if (this.form.invalid){
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create'){
      this.postService.addPost(
        this.form.value.title,
        this.form.value.content
      );
    }
    else {
      this.postService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content
      );
    }

    this.form.reset();
  }


  // tslint:disable-next-line:typedef
  onImagePicked($event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }
}
