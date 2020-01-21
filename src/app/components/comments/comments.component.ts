import {Component, Inject, Input, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import { CommentData, CommentDialogComponent } from './comment-dialog/comment-dialog.component';
import * as moment from 'moment';
import {ApiService} from '../../services/api.service';

export interface Comment {
  name: string;
  comment: string;
  date: string;
}

interface CommentsData {
  id: number;
  localTeam: string;
  visitorTeam: string;
  date: string;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
  comments: Comment[] = [];
  matchDate = new Date('07/23/2018');

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<CommentDialogComponent>,
    public apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: CommentsData
  ) {
  }

  ngOnInit(): void {
    this.comments = this.apiService.loadComments(this.data.id);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '400px',
      data: {
        name: '',
        comment: ''
      },
      ariaLabel: 'New comment'
    });

    dialogRef.afterClosed().subscribe((result: CommentData) => {
      if (result) {
        let nameText = 'Anonymous';
        if (result.name.length > 0) {
          nameText = result.name;
        }
        this.comments.push({
          name: nameText,
          comment: result.comment,
          date: moment().toISOString()
        });
        this.apiService.saveComments(this.data.id, this.comments);
      }
    });
  }

}
