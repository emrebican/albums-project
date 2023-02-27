import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { AlbumsService } from 'src/app/services/albums.service';
import { DataStorageService } from 'src/app/services/data_storage.service';

import { Album } from '../../../shared/album.model';

@Component({
  selector: 'app-album-form',
  templateUrl: './album_form.component.html',
  styleUrls: ['./album_form.component.scss']
})
export class AlbumFormComponent implements OnInit {
  id!: number;
  editMode!: boolean;
  albumForm!: FormGroup;

  constructor(
    private albumsService: AlbumsService,
    private dataStorageService: DataStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.albumsService.editMode.subscribe((data) => (this.editMode = data));

    this.route.params.subscribe((params: Params) => {
      this.id = Number(params['id']);
      this.editMode = params['id'] ? true : false;
      this.initForm();
    });
  }

  onSubmit() {
    const newAlbum = new Album(
      this.albumForm.value.title,
      this.albumForm.value.description,
      this.albumForm.value.imageURL,
      this.albumForm.value.comments
    );

    if (this.editMode) {
      this.albumsService.updateAlbum(this.id, newAlbum);
    } else {
      this.albumsService.addAlbum(newAlbum);
    }

    // fetch albums for every add new Album
    this.dataStorageService.storeAlbums().subscribe((responseData) => {
      console.log(responseData);
      this.router.navigate(['/albums'], { relativeTo: this.route });
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
      title: new FormControl(albumTitle),
      description: new FormControl(albumDescription),
      imageURL: new FormControl(albumImageURL),
      comments: albumComments
    });
  }
}
