import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormArray,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { AlbumsService } from 'src/services/albums.service';
import { DataStorageService } from 'src/services/data_storage.service';
import { I_CanComponentDeactivate } from 'src/shared/canDeactivate.model';

import { Album } from '../../../shared/album.model';

@Component({
  selector: 'app-album-form',
  templateUrl: './album_form.component.html',
  styleUrls: ['./album_form.component.scss']
})
export class AlbumFormComponent
  implements OnInit, I_CanComponentDeactivate
{
  id!: number;
  editMode!: boolean;
  albumForm!: FormGroup;
  changesSaved: boolean = false;
  savedForm = new Subject<Album>();
  REGEX = /.*?(\/[\/\w\.]+)[\s\?]?.*/;

  constructor(
    private albumsService: AlbumsService,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = Number(params['id']);
      this.editMode = params['id'] ? true : false;
      this.initForm();
    });
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
        formValue.imageURL !== selectedAlbum.imageURL
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
    const newAlbum = new Album(
      this.albumForm.value.title,
      this.albumForm.value.description,
      this.albumForm.value.imageURL,
      this.albumForm.value.comments,
      this.albumForm.value.reactions
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
    let albumImageURL = '';
    let albumComments = new FormArray([]);

    if (this.editMode) {
      const album = this.albumsService.getAlbum(this.id);

      albumTitle = album.title;
      albumDescription = album.description;
      albumImageURL = album.imageURL;

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

    this.albumForm = new FormGroup({
      title: new FormControl(albumTitle, Validators.required),
      description: new FormControl(
        albumDescription,
        Validators.required
      ),
      imageURL: new FormControl(albumImageURL, [
        Validators.required,
        Validators.pattern(this.REGEX)
      ]),
      comments: albumComments
    });
  }
}
