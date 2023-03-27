import { Component, DoCheck, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormArray,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import {
  ref,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import { storage } from 'src/environments/environment';

import { AlbumsService } from 'src/services/albums.service';
import { AuthenticationService } from 'src/services/authentication/auth.service';
import { DataStorageService } from 'src/services/data_storage.service';
import { I_CanComponentDeactivate } from 'src/shared/models/canDeactivate.model';

import { Album } from '../../../shared/models/album.model';

@Component({
  selector: 'app-album-form',
  templateUrl: './album_form.component.html',
  styleUrls: ['./album_form.component.scss']
})
export class AlbumFormComponent
  implements OnInit, DoCheck, I_CanComponentDeactivate
{
  imagePath = new BehaviorSubject<any>(null);
  imgPath = '';
  isImgUploaded = false;
  isImgBlur = true;

  id!: number;
  editMode!: boolean;
  albumForm!: FormGroup;
  changesSaved: boolean = false;
  user: string = '';

  constructor(
    private albumsService: AlbumsService,
    private dataStorageService: DataStorageService,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = Number(params['id']);
      this.editMode = params['id'] ? true : false;
      this.initForm();
    });

    this.authService.user.subscribe((userData) => {
      this.user = userData.email;
    });
  }

  ngDoCheck(): void {
    if (this.imgPath) this.isImgUploaded = true;
  }

  canDeactivate():
    | boolean
    | Observable<boolean>
    | Promise<boolean> {
    if (this.editMode) {
      const selectedAlbum = this.albumsService.getAlbum(this.id);
      const formValue = this.albumForm.value;

      if (
        formValue.title !== selectedAlbum.title ||
        formValue.description !== selectedAlbum.description ||
        this.imgPath !== selectedAlbum.imageURL
      ) {
        return confirm('Do you want to discard changes?');
      } else {
        return true;
      }
    } else {
      if (
        (this.albumForm.value.title !== '' ||
          this.albumForm.value.description !== '' ||
          this.albumForm.value.imageURL !== '') &&
        !this.changesSaved
      ) {
        return confirm('Do you want to discard changes?');
      } else {
        return true;
      }
    }
  }

  onSubmit() {
    const edittedAlbum: Album = this.albumsService.getAlbum(
      this.id
    );

    // set image Path
    let imgPath;
    if (this.editMode && this.imgPath === '') {
      imgPath = edittedAlbum.imageURL;
    } else {
      imgPath = this.imgPath;
    }

    const newAlbum = new Album(
      this.albumForm.value.title,
      this.albumForm.value.description,
      this.user,
      imgPath,
      this.albumForm.value.comments,
      edittedAlbum?.reactions,
      this.editMode ? this.id : new Date().getTime()
    );

    this.changesSaved = true;

    if (this.editMode) {
      this.albumsService.updateAlbum(this.id, newAlbum);
    } else {
      this.albumsService.addAlbum(newAlbum);
    }

    console.log(this.albumForm);

    // fetch albums for every add new Album
    this.dataStorageService
      .storeAlbums()
      .subscribe((responseData) => {
        console.log(responseData);
        this.router.navigate(['/albums'], {
          relativeTo: this.route
        });
      });
  }

  // Init FORM
  private initForm() {
    let albumTitle = '';
    let albumDescription = '';
    let albumCreated = this.user;
    let albumImageURL = '';
    let albumComments = new FormArray<any>([]);
    let albumReactions = new FormGroup({});

    // edit Form
    if (this.editMode) {
      const album = this.albumsService.getAlbum(this.id);

      albumTitle = album.title;
      albumDescription = album.description;
      albumImageURL = album.imageURL;
      this.imgPath = album.imageURL;

      this.isImgBlur = false;
      this.isImgUploaded = false;

      if (album['comments']) {
        for (let comment of album.comments) {
          albumComments.push(
            new FormGroup({
              author: new FormControl(comment.author),
              content: new FormControl(comment.content)
            })
          );
        }
      }
    }

    // initialize Form
    this.albumForm = new FormGroup({
      title: new FormControl(albumTitle, [
        Validators.required,
        Validators.maxLength(40)
      ]),
      description: new FormControl(
        albumDescription,
        Validators.required
      ),
      imageURL: new FormControl(albumImageURL, [
        Validators.required
      ]),
      comments: albumComments,
      reactions: albumReactions
    });
  }

  // upload image to FB Storage
  uploadAlbumImage(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    const image = files[0];

    if (target == null) return;

    const imageRef = ref(
      storage,
      `albumImages/${
        image.name + new Date().getTime().toString()
      }`
    );

    uploadBytes(imageRef, image).then((snaphshot) => {
      getDownloadURL(snaphshot.ref).then((url) => {
        this.imagePath.next(url);

        this.isImgBlur = true;
        setTimeout(() => {
          this.isImgBlur = false;
        }, 800);
      });
    });

    this.imagePath.subscribe((url) => (this.imgPath = url));
    this.isImgUploaded = false;
  }
}
