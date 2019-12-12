import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface CommentData {
  name: string;
  comment: string;
}

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CommentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: CommentData) { }

  ngOnInit() {
  }

  onCancel() {
    this.dialogRef.close();
  }

}
