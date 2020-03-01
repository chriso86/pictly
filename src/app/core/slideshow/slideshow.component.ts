import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {SlideshowModel} from '../shared-models/slideshow.model';

@Component({
    selector: 'pictly-slideshow',
    templateUrl: './slideshow.component.html'
})
export class SlideshowComponent {
    constructor(
        public dialogRef: MatDialogRef<SlideshowComponent>,
        @Inject(MAT_DIALOG_DATA) public data: SlideshowModel) {}

    onCloseClick(): void {
        this.dialogRef.close();
    }
}
