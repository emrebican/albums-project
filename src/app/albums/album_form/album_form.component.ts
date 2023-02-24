import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';

import { AlbumsService } from 'src/app/services/albums.service';

import { Album } from '../album.model';

@Component({
  selector: 'app-album-form',
  templateUrl: './album_form.component.html',
  styleUrls: ['./album_form.component.scss']
})
export class AlbumFormComponent implements OnInit {
  albumForm!: FormGroup;
  constructor(private albumsService: AlbumsService) {}

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit() {
    const newAlbum = new Album(
      this.albumForm.value.title,
      this.albumForm.value.description,
      this.albumForm.value.imageURL,
      this.albumForm.value.comments
    );

    this.albumsService.addAlbum(newAlbum);

    console.log(newAlbum);
  }

  // Init FORM
  private initForm() {
    let albumTitle = '';
    let albumDescription = '';
    let albumImageURL = '';
    let albumComments = new FormArray([]);

    this.albumForm = new FormGroup({
      title: new FormControl(albumTitle),
      description: new FormControl(albumDescription),
      imageURL: new FormControl(albumImageURL),
      comments: albumComments
    });
  }
}
