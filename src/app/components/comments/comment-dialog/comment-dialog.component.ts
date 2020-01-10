import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {LiveAnnouncer} from '@angular/cdk/a11y';

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
  commentsControl = new FormControl('', [Validators.required, Validators.maxLength(1000)]);

  constructor(
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommentData,
    private liveAnnouncer: LiveAnnouncer
  ) { }

  ngOnInit() {
  }

  onCancel() {
    this.dialogRef.close();
  }

  getCommentsErrorMessage(): string {
    return this.commentsControl.hasError('required') ? 'Error: You must write a comment' :
      this.commentsControl.hasError('maxLength') ? 'The comment can\'t exceed 1000 characters' :
        '';
  }

  announceComment() {
    this.liveAnnouncer.announce('Comment added successfully', 'assertive');
  }
}
