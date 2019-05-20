import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { UserService} from '../../services/user.service';
import { VideoService } from '../../services/video.service';
import { Video } from '../../models/video';

@Component({
  selector: 'app-video-edit',
  templateUrl: '../video-new/video-new.component.html',
  styleUrls: ['./video-edit.component.css'],
  providers: [UserService,VideoService]
})
export class VideoEditComponent implements OnInit {

  public page_title: string;
  public identity;
  public token;
  public status;
  public video: Video;
  constructor(
                private _userService: UserService,
                private _videoService: VideoService,
                private _router: Router,
                private _route: ActivatedRoute
            ){ 
                this.page_title= 'Modificar este video';
                this.identity = this._userService.getIdentity();
                this.token = this._userService.getToken();
                
            }

  ngOnInit() {
    this.video = new Video(1,this.identity.sub,'','','','',null,null);
    this.getVideo();
  }

  getVideo(){
      this._route.params.subscribe(params => {
            var id = +params['id'];

            this._videoService.getVideo(this.token, id).subscribe(
                  response => {
                    if(response.status == 'success'){
                        this.video= response.video;
                    }else{
                      this._router.navigate(['/inicio']);
                    }
                  },
                  error    =>{
                    console.log(error);
                    this.status='error';
                  }
            );
      });  
  }


  onSubmit(form){
    this._videoService.update(this.token, this.video, this.video.id).subscribe(
          response => {
            if(response.status == 'success'){
              this.status= 'success';

              this._router.navigate(['/inicio']);
            }else{
              this.status= 'error';  
            }
          },
          error    =>{
            this.status= 'error';
            console.log(error);
          }
    );
  }

}
