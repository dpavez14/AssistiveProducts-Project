import {Component, Input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommentData, CommentDialogComponent } from './comment-dialog/comment-dialog.component';
import * as moment from 'moment';

interface Comment {
  name: string;
  comment: string;
  date: string;
}

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  @Input() id: number;
  comments: Comment[] = [];
  matchDate = new Date('07/23/2018');

  constructor(public dialog: MatDialog) {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CommentDialogComponent, {
      width: '400px',
      data: {
        name: '',
        comment: ''
      }
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
      }
    });
  }

}
